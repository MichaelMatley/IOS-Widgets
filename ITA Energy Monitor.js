// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
// ENTSO-E ITALY INTEGRATION FOR SCRIPTABLE
// Replace UK APIs with Italian energy data

const ENTSOE_API = "https://web-api.tp.entsoe.eu/api";
const ENTSOE_API_KEY = "YOUR_API_KEY_HERE";
const ITALY_DOMAIN = "10YIT-GRTN-----B";

const WHOLESALE_TO_RETAIL_MULTIPLIER = 1.45;
const VAT_RATE = 1.10;
const FIXED_CHARGES_PER_KWH = 0.015;

async function getENTSOEPricing() {
  try {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 36 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 36 * 60 * 60 * 1000);
    
    const periodStart = formatENTSOEDate(yesterday);
    const periodEnd = formatENTSOEDate(tomorrow);
    
    const params = new URLSearchParams({
      securityToken: ENTSOE_API_KEY,
      documentType: "A44",
      in_Domain: ITALY_DOMAIN,
      out_Domain: ITALY_DOMAIN,
      periodStart: periodStart,
      periodEnd: periodEnd
    });
    
    const url = ENTSOE_API + "?" + params.toString();
    const req = new Request(url);
    const xmlText = await req.loadString();
    
    if (!xmlText || xmlText.includes("Unauthorized") || xmlText.includes("error")) {
      console.error("ENTSO-E API error - check your API key");
      return null;
    }
    
    const prices = parseENTSOEXML(xmlText);
    
    return prices.map(slot => {
      const wholesaleEuroPerMWh = slot.price;
      const wholesaleEuroPerKWh = wholesaleEuroPerMWh / 1000;
      const retailBeforeTax = (wholesaleEuroPerKWh * WHOLESALE_TO_RETAIL_MULTIPLIER) + FIXED_CHARGES_PER_KWH;
      const retailWithVAT = retailBeforeTax * VAT_RATE;
      const centesimi = retailWithVAT * 100;
      
      return {
        valid_from: slot.start,
        valid_to: slot.end,
        value_inc_vat: centesimi,
        wholesale_raw: wholesaleEuroPerMWh
      };
    });
    
  } catch (e) {
    console.error("ENTSO-E pricing error:", e);
    return null;
  }
}

function parseENTSOEXML(xmlText) {
  const prices = [];
  
  try {
    const periodMatch = xmlText.match(/<time_Period\.timeInterval>\s*<start>(.*?)<\/start>\s*<end>(.*?)<\/end>/s);
    if (!periodMatch) {
      console.error("Could not find period in XML");
      return prices;
    }
    
    const periodStart = new Date(periodMatch[1]);
    
    const resolutionMatch = xmlText.match(/<resolution>(.*?)<\/resolution>/);
    const resolution = resolutionMatch ? resolutionMatch[1] : "PT60M";
    const minutesPerSlot = parseResolution(resolution);
    
    const pointRegex = /<Point>\s*<position>(\d+)<\/position>\s*<price\.amount>([\d.]+)<\/price\.amount>\s*<\/Point>/g;
    let match;
    
    while ((match = pointRegex.exec(xmlText)) !== null) {
      const position = parseInt(match[1]);
      const price = parseFloat(match[2]);
      
      const slotStart = new Date(periodStart.getTime() + (position - 1) * minutesPerSlot * 60 * 1000);
      const slotEnd = new Date(slotStart.getTime() + minutesPerSlot * 60 * 1000);
      
      prices.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        price: price,
        position: position
      });
    }
    
    return prices.sort((a, b) => new Date(a.start) - new Date(b.start));
    
  } catch (e) {
    console.error("XML parsing error:", e);
    return prices;
  }
}

function parseResolution(resolution) {
  const match = resolution.match(/PT(\d+)M/);
  return match ? parseInt(match[1]) : 60;
}

function formatENTSOEDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  
  return year + month + day + hours + minutes;
}

async function getItalyGenerationMix() {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const periodStart = formatENTSOEDate(oneHourAgo);
    const periodEnd = formatENTSOEDate(now);
    
    const params = new URLSearchParams({
      securityToken: ENTSOE_API_KEY,
      documentType: "A75",
      processType: "A16",
      in_Domain: ITALY_DOMAIN,
      periodStart: periodStart,
      periodEnd: periodEnd
    });
    
    const url = ENTSOE_API + "?" + params.toString();
    const req = new Request(url);
    const xmlText = await req.loadString();
    
    if (!xmlText || xmlText.includes("Unauthorized")) {
      return estimateCarbonIntensity();
    }
    
    const mix = parseGenerationMix(xmlText);
    return calculateCarbonIntensity(mix);
    
  } catch (e) {
    console.error("Generation mix error:", e);
    return estimateCarbonIntensity();
  }
}

function parseGenerationMix(xmlText) {
  const mix = {
    fossil: 0,
    renewable: 0,
    nuclear: 0,
    other: 0,
    total: 0
  };
  
  try {
    const timeSeriesRegex = /<TimeSeries>[\s\S]*?<PsrType>(.*?)<\/PsrType>[\s\S]*?<quantity>([\d.]+)<\/quantity>[\s\S]*?<\/TimeSeries>/g;
    let match;
    
    while ((match = timeSeriesRegex.exec(xmlText)) !== null) {
      const psrType = match[1];
      const quantity = parseFloat(match[2]);
      
      if (["B01", "B02", "B03"].includes(psrType)) {
        mix.fossil += quantity;
      } else if (["B09", "B10", "B11", "B12", "B15", "B16", "B18", "B19"].includes(psrType)) {
        mix.renewable += quantity;
      } else if (psrType === "B14") {
        mix.nuclear += quantity;
      } else {
        mix.other += quantity;
      }
      
      mix.total += quantity;
    }
    
    return mix;
    
  } catch (e) {
    console.error("Mix parsing error:", e);
    return mix;
  }
}

function calculateCarbonIntensity(mix) {
  if (mix.total === 0) {
    return estimateCarbonIntensity();
  }
  
  const COAL_FACTOR = 820;
  const GAS_FACTOR = 490;
  const NUCLEAR_FACTOR = 12;
  const RENEWABLE_FACTOR = 15;
  const OTHER_FACTOR = 400;
  
  const fossilPct = mix.fossil / mix.total;
  const renewablePct = mix.renewable / mix.total;
  const nuclearPct = mix.nuclear / mix.total;
  const otherPct = mix.other / mix.total;
  
  const weightedFossil = (GAS_FACTOR * 0.7 + COAL_FACTOR * 0.3) * fossilPct;
  
  const intensity = Math.round(
    weightedFossil +
    (RENEWABLE_FACTOR * renewablePct) +
    (NUCLEAR_FACTOR * nuclearPct) +
    (OTHER_FACTOR * otherPct)
  );
  
  return {
    intensity: {
      actual: intensity,
      forecast: intensity,
      index: getIntensityIndex(intensity)
    },
    from: new Date().toISOString(),
    to: new Date(Date.now() + 30 * 60 * 1000).toISOString()
  };
}

function estimateCarbonIntensity() {
  const hour = new Date().getHours();
  let baseIntensity = 320;
  
  if (hour >= 11 && hour <= 15) {
    baseIntensity = 280;
  } else if (hour >= 18 && hour <= 22) {
    baseIntensity = 360;
  }
  
  return {
    intensity: {
      actual: null,
      forecast: baseIntensity,
      index: getIntensityIndex(baseIntensity)
    },
    from: new Date().toISOString(),
    to: new Date(Date.now() + 30 * 60 * 1000).toISOString()
  };
}

function getIntensityIndex(intensity) {
  if (intensity < 100) return "VERY LOW";
  if (intensity < 200) return "LOW";
  if (intensity < 300) return "MODERATE";
  if (intensity < 400) return "HIGH";
  return "VERY HIGH";
}

function getRecommendationItaly(intensity, currentPrice, priceData) {
  if (!intensity && !currentPrice) {
    return { text: "DATI NON DISPONIBILI", color: Color.gray(), emoji: "?" };
  }
  
  let priceStatus = "unknown";
  if (currentPrice && priceData && priceData.length > 0) {
    const prices = priceData.map(s => s.value_inc_vat);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const lowThreshold = avgPrice * 0.7;
    const highThreshold = avgPrice * 1.3;
    
    if (currentPrice <= lowThreshold) {
      priceStatus = "low";
    } else if (currentPrice >= highThreshold) {
      priceStatus = "high";
    } else {
      priceStatus = "moderate";
    }
  }
  
  const carbonIndex = intensity?.intensity?.index || "UNKNOWN";
  let carbonStatus = "unknown";
  if (carbonIndex === "VERY LOW" || carbonIndex === "LOW") {
    carbonStatus = "low";
  } else if (carbonIndex === "MODERATE") {
    carbonStatus = "moderate";
  } else if (carbonIndex === "HIGH" || carbonIndex === "VERY HIGH") {
    carbonStatus = "high";
  }
  
  if (priceStatus === "low" && (carbonStatus === "low" || carbonStatus === "moderate")) {
    return { text: "OTTIMO: USA TUTTO", color: Color.green(), emoji: "OK" };
  } else if (priceStatus === "low" && carbonStatus === "high") {
    return { text: "ECONOMICO MA SPORCO", color: new Color("#4ADE80"), emoji: "$" };
  } else if (priceStatus === "high") {
    return { text: "COSTO ALTO: EVITA", color: Color.red(), emoji: "X" };
  } else if (priceStatus === "moderate" && carbonStatus === "high") {
    return { text: "MODERATO: RIMANDA", color: Color.orange(), emoji: "!" };
  } else if (priceStatus === "moderate" || carbonStatus === "moderate") {
    return { text: "MODERATO: ASPETTA", color: Color.orange(), emoji: "!" };
  } else if (carbonStatus === "low") {
    return { text: "RETE VERDE: OK", color: new Color("#4ADE80"), emoji: "+" };
  } else {
    return { text: "CONTROLLO IN CORSO", color: Color.gray(), emoji: "..." };
  }
}

async function getItalyEnergyData() {
  console.log("Fetching Italian energy data from ENTSO-E");
  
  const agile = await getENTSOEPricing();
  const current = await getItalyGenerationMix();
  
  let currentPrice = null;
  if (agile && agile.length > 0) {
    const nowTime = new Date();
    const currentSlot = agile.find(slot => {
      const from = new Date(slot.valid_from);
      const to = new Date(slot.valid_to);
      return nowTime >= from && nowTime < to;
    });
    if (currentSlot) {
      currentPrice = currentSlot.value_inc_vat;
    }
  }
  
  const forecast = agile ? agile.filter(slot => {
    return new Date(slot.valid_from) > new Date();
  }).map(slot => ({
    from: slot.valid_from,
    to: slot.valid_to,
    intensity: current.intensity
  })) : [];
  
  return {
    current,
    agile,
    currentPrice,
    forecast,
    historical: []
  };
}
