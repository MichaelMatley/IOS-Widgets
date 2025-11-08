// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: burn;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ############## ENERGY MONITOR ###############
// #############################################

WIDGET NAME   : ENERGY MONITOR
COLOUR        : RED
ICON          : FLAME
WIDGET SIZE   : DYNAMIC
VERSION       : V051125
DEVELOPER     : MICHAEL MATLEY
CREDIT        :

// #############################################
// ############## WHAT & HOW ###################
// #############################################

1. Real-time UK energy cost tracker variable-rate tariff (like Octopus Agile), electricity prices change every 30 minutes based on supply and demand. 
### Run your washing machine at 2pm? You might pay 35p per kWh. Run it at 3am? Maybe 5p per kWh ###
2. Pulls live data from two sources:
    Carbon Intensity API - tells you how dirty the electricity grid is (coal vs. renewables)
    Octopus Agile API - tells you how expensive electricity is right now
3. Electricry prices change every 30 minutes based on supply and demand. 
	•	Current price (pence per kWh)
	•	Carbon intensity (how green the grid is)
	•	Traffic light system: Green = crack on, Orange = maybe wait, Red = absolutely not
	•	Best/worst time windows for the next 12-24 hours
	•	Graphs showing price trends (historical vs. forecast)

NOTIFICATIONS
It pre-calculates optimal windows for heavy appliances and can send you notifications when there’s an upcoming cheap/expensive window—so you’re not constantly checking.

// #############################################
// ############## COLOR SCHEMES ################
// #############################################

### BLACKS ###       #000000 #1F2327 #263137 #333333
### DRK GREY ###     #3E3E3E #424242 #444444 #4A4A4A
### MED GRAY ###     #5A6A7C #7C8C9C #909090 #AAB4C0  
### LGT GREY ###     #D8D8D8 #DDDDDD #E0E0E0 #EAEAEA 
### WHITES ###       #D7E6E6 #F9F9F9 #FFFFFF 
### B/G ACNTS ###    #1A1F2A #3C494F #2C3444 #3E4A5C  
### YLLW ACNTS ###   #FFEE8C #FFDE21 #FFD700 
### TEAL ACNTS ###   #00637C #008794 #40E0DO 
### TEAL SCDRY ###   #55D5D9 #2E9CAA #0D4D53
GRAPH COLORS:
  NOW #F59E0B  FORECAST #4ADE80  HISTORICAL #FFFFFF
  
// #############################################
// ############## CONTENTS #####################
// #############################################
    READ ME 
    API & APPLIANCES
    CORE LOGIC
    WIDGET LAYOUT
    HELPER EXECUTION
    END OF SCRIPT
*/
// #############################################
// ######## DO NOT EDIT BELOW THIS LINE ########
// #############################################

// #############################################
// ############## APPLIANCES & API #############
// #############################################
const CARBON_API = "https://api.carbonintensity.org.uk";
const OCTOPUS_AGILE_API = "https://api.octopus.energy/v1/products/AGILE-24-10-01/electricity-tariffs/E-1R-AGILE-24-10-01-A/standard-unit-rates/";

const NOTIFY_ON_OPTIMAL = true;
const OPTIMAL_THRESHOLD = "low";

const APPLIANCES = {
  washing: { name: "Washing Machine", kwh: 1.5, duration: 2 },
  dishwasher: { name: "Dishwasher", kwh: 1.2, duration: 2 },
  dryer: { name: "Tumble Dryer", kwh: 2.5, duration: 1.5 },
  oven: { name: "Oven", kwh: 2.0, duration: 1 },
  gaming: { name: "Gaming Session", kwh: 0.4, duration: 2 },
  ev: { name: "EV Charging", kwh: 7.0, duration: 1 }
};

async function getCarbonIntensity() {
  try {
    const url = `${CARBON_API}/intensity`;
    const req = new Request(url);
    const res = await req.loadJSON();
    return res.data[0];
  } catch (e) {
    console.error("Carbon API error:", e);
    return null;
  }
}

// #############################################
// ############### CORE LOGIC ##################
// #############################################

async function getHistoricalIntensity() {
  try {
    const now = new Date();
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);
    const from = yesterday.toISOString();
    const to = now.toISOString();
    const url = `${CARBON_API}/intensity/${from}/${to}`;
    const req = new Request(url);
    const res = await req.loadJSON();
    return res.data;
  } catch (e) {
    console.error("Historical error:", e);
    return null;
  }
}

async function getCarbonForecast() {
  try {
    const url = `${CARBON_API}/intensity/date`;
    const req = new Request(url);
    const res = await req.loadJSON();
    return res.data;
  } catch (e) {
    console.error("Forecast error:", e);
    return null;
  }
}

async function getAgilePricing() {
  try {
    const now = new Date();
    const from = new Date(now - 24 * 60 * 60 * 1000);
    const url = `${OCTOPUS_AGILE_API}?period_from=${from.toISOString()}`;
    const req = new Request(url);
    const res = await req.loadJSON();
    return res.results;
  } catch (e) {
    console.error("Agile error:", e);
    return null;
  }
}

function groupByHour(data, valueKey) {
  if (!data || data.length === 0) return [];
  const hourly = {};
  data.forEach(slot => {
    const time = new Date(slot.from || slot.valid_from);
    const hourKey = `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, "0")}-${String(time.getDate()).padStart(2, "0")} ${String(time.getHours()).padStart(2, "0")}:00`;
    if (!hourly[hourKey]) {
      hourly[hourKey] = { time, values: [] };
    }
    const value = valueKey === "intensity" ? slot.intensity?.actual || slot.intensity?.forecast : slot.value_inc_vat;
    if (value !== null && value !== undefined) {
      hourly[hourKey].values.push(value);
    }
  });
  return Object.values(hourly).map(h => ({
    time: h.time,
    value: h.values.reduce((a, b) => a + b, 0) / h.values.length
  })).sort((a, b) => a.time - b.time);
}

function findOptimalWindow(forecast, hours = 6) {
  if (!forecast || forecast.length === 0) return null;
  const now = new Date();
  const upcoming = forecast.filter(slot => {
    const slotTime = new Date(slot.from);
    return slotTime > now;
  }).slice(0, hours * 2);
  if (upcoming.length === 0) return null;
  const best = upcoming.reduce((min, slot) => {
    const minVal = min.intensity?.actual || min.intensity?.forecast || 999;
    const slotVal = slot.intensity?.actual || slot.intensity?.forecast || 999;
    return slotVal < minVal ? slot : min;
  });
  return best;
}

function findBestAndWorstWindows(agile) {
  if (!agile || agile.length === 0) return { best: [], worst: [] };
  const now = new Date();
  const upcoming = agile.filter(slot => {
    const slotTime = new Date(slot.valid_from);
    return slotTime > now;
  }).slice(0, 24);
  if (upcoming.length === 0) return { best: [], worst: [] };
  const sorted = [...upcoming].sort((a, b) => a.value_inc_vat - b.value_inc_vat);
  return {
    best: sorted.slice(0, 3),
    worst: sorted.slice(-3).reverse()
  };
}

function calculateCost(appliance, ratePerKwh) {
  return (appliance.kwh * ratePerKwh / 100).toFixed(2);
}

function getRecommendation(intensity, currentPrice, agileData) {
  if (!intensity && !currentPrice) {
    return { text: "UNKNOWN: NO DATA", color: Color.gray(), emoji: "?" };
  }
  
  // Calculate price thresholds from available data
  let priceStatus = "unknown";
  if (currentPrice && agileData && agileData.length > 0) {
    const prices = agileData.map(s => s.value_inc_vat);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const lowThreshold = avgPrice * 0.7;  // 30% below average
    const highThreshold = avgPrice * 1.3; // 30% above average
    
    if (currentPrice <= lowThreshold) {
      priceStatus = "low";
    } else if (currentPrice >= highThreshold) {
      priceStatus = "high";
    } else {
      priceStatus = "moderate";
    }
  }
  
  // Get carbon intensity status
  const carbonIndex = intensity?.intensity?.index || "UNKNOWN";
  let carbonStatus = "unknown";
  if (carbonIndex === "VERY LOW" || carbonIndex === "LOW") {
    carbonStatus = "low";
  } else if (carbonIndex === "MODERATE") {
    carbonStatus = "moderate";
  } else if (carbonIndex === "HIGH" || carbonIndex === "VERY HIGH") {
    carbonStatus = "high";
  }
  
  // Prioritise price, but factor in carbon
  // Price takes precedence for financial optimisation
  if (priceStatus === "low" && (carbonStatus === "low" || carbonStatus === "moderate")) {
    return { text: "EXCELLENT: RUN ANYTHING", color: Color.green(), emoji: "✅ " };
  } else if (priceStatus === "low" && carbonStatus === "high") {
    return { text: "CHEAP BUT DIRTY: YOUR CALL", color: new Color("#4ADE80"), emoji: "💰 " };
  } else if (priceStatus === "high") {
    return { text: "HIGH COST: AVOID USAGE", color: Color.red(), emoji: "❌ " };
  } else if (priceStatus === "moderate" && carbonStatus === "high") {
    return { text: "MODERATE: DELAY IF POSSIBLE", color: Color.orange(), emoji: "⚠ " };
  } else if (priceStatus === "moderate" || carbonStatus === "moderate") {
    return { text: "MODERATE: WAIT FOR BETTER", color: Color.orange(), emoji: "⚠ " };
  } else if (carbonStatus === "low") {
    return { text: "GREEN GRID: DECENT TIME", color: new Color("#4ADE80"), emoji: "♻️ " };
  } else {
    return { text: "CHECKING CONDITIONS...", color: Color.gray(), emoji: "⏳" };
  }
}

async function checkAndNotify(current, forecast, agile) {
  if (!NOTIFY_ON_OPTIMAL || !current || !forecast || !agile) return;
  try {
    let lastNotification = null;
    try {
      lastNotification = await Keychain.get("lastGridNotification");
    } catch (e) {
      lastNotification = null;
    }
    const nowTime = Date.now();
    if (lastNotification && nowTime - parseInt(lastNotification) < 4 * 60 * 60 * 1000) {
      return;
    }
    const upcomingPrices = agile.filter(slot => {
      const slotTime = new Date(slot.valid_from);
      const currentTime = new Date();
      const fourHoursLater = new Date(nowTime + 4 * 60 * 60 * 1000);
      return slotTime > currentTime && slotTime < fourHoursLater;
    }).map(s => s.value_inc_vat);
    if (upcomingPrices.length === 0) return;
    const avgPrice = upcomingPrices.reduce((a, b) => a + b, 0) / upcomingPrices.length;
    const minPrice = Math.min(...upcomingPrices);
    const maxPrice = Math.max(...upcomingPrices);
    let shouldNotify = false;
    let message = "";
    if (minPrice < avgPrice * 0.7) {
      shouldNotify = true;
      message = `LOW PRICE WINDOW COMING (${minPrice.toFixed(1)}p/kWh). GOOD TIME FOR HEAVY APPLIANCES.`;
    } else if (maxPrice > avgPrice * 1.3) {
      shouldNotify = true;
      message = `HIGH PRICE WINDOW COMING (${maxPrice.toFixed(1)}p/kWh). AVOID HEAVY USAGE.`;
    }
    if (shouldNotify) {
      const notification = new Notification();
      notification.title = "ENERGY MONITOR ALERT";
      notification.body = message;
      notification.sound = "default";
      await notification.schedule();
      try {
        await Keychain.set("lastGridNotification", nowTime.toString());
      } catch (e) {
        console.log("Could not save notification time:", e);
      }
    }
  } catch (e) {
    console.log("Notification check error:", e);
  }
}

function drawChart(widget, historical, forecast, width, height) {
  try {
    const allData = [...historical, ...forecast];
    if (allData.length === 0) return null;
    const canvas = new DrawContext();
    canvas.size = new Size(width, height);
    canvas.opaque = false;
    canvas.respectScreenScale = true;
    const values = allData.map(d => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;
    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    canvas.setStrokeColor(new Color("#FFFFFF", 0.1));
    canvas.setLineWidth(1);
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      const gridPath = new Path();
      gridPath.move(new Point(padding, y));
      gridPath.addLine(new Point(width - padding, y));
      canvas.addPath(gridPath);
      canvas.drawPath();
    }
    if (historical.length > 1) {
      canvas.setStrokeColor(new Color("#FFFFFF", 0.9));
      canvas.setLineWidth(3);
      const histPath = new Path();
      for (let i = 0; i < historical.length; i++) {
        const x = padding + (chartWidth * i / (allData.length - 1));
        const normalized = (historical[i].value - minVal) / range;
        const y = padding + chartHeight - (normalized * chartHeight);
        if (i === 0) {
          histPath.move(new Point(x, y));
        } else {
          histPath.addLine(new Point(x, y));
        }
      }
      canvas.addPath(histPath);
      canvas.drawPath();
    }
    if (forecast.length > 1) {
      canvas.setStrokeColor(new Color("#4ADE80", 0.9));
      canvas.setLineWidth(3);
      const forecastStartIdx = historical.length - 1;
      for (let i = 0; i < forecast.length - 1; i++) {
        const x1 = padding + (chartWidth * (forecastStartIdx + i) / (allData.length - 1));
        const x2 = padding + (chartWidth * (forecastStartIdx + i + 1) / (allData.length - 1));
        const norm1 = (forecast[i].value - minVal) / range;
        const norm2 = (forecast[i + 1].value - minVal) / range;
        const y1 = padding + chartHeight - (norm1 * chartHeight);
        const y2 = padding + chartHeight - (norm2 * chartHeight);
        const segPath = new Path();
        segPath.move(new Point(x1, y1));
        segPath.addLine(new Point(x2, y2));
        canvas.addPath(segPath);
        canvas.drawPath();
      }
    }
    if (historical.length > 0) {
      const nowX = padding + (chartWidth * (historical.length - 1) / (allData.length - 1));
      canvas.setStrokeColor(new Color("#F59E0B", 0.9));
      canvas.setLineWidth(2);
      const nowPath = new Path();
      nowPath.move(new Point(nowX, padding));
      nowPath.addLine(new Point(nowX, height - padding));
      canvas.addPath(nowPath);
      canvas.drawPath();
    }
    return canvas.getImage();
  } catch (e) {
    console.error("Chart error:", e);
    return null;
  }
}

function drawTextChart(widget, historical, forecast, agileData) {
  const chartStack = widget.addStack();
  chartStack.layoutVertically();
  if (!agileData || agileData.length === 0) {
    const noData = chartStack.addText("Price data unavailable");
    noData.textColor = Color.gray();
    noData.font = Font.systemFont(10);
    return;
  }
  const currentTime = new Date();
  const historicalPrices = [];
  const forecastPrices = [];
  agileData.forEach(slot => {
    const slotTime = new Date(slot.valid_from);
    const price = slot.value_inc_vat;
    if (slotTime < currentTime) {
      historicalPrices.push({ time: slotTime, value: price });
    } else {
      forecastPrices.push({ time: slotTime, value: price });
    }
  });
  const allPrices = [...historicalPrices.map(p => p.value), ...forecastPrices.map(p => p.value)];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const range = maxPrice - minPrice || 1;
  const blocks = ["▂", "▃", "▄", "▅", "▆", "▇", "█"];
  const histLabel = chartStack.addText("Last 24h:");
  histLabel.textColor = Color.white();
  histLabel.font = Font.boldSystemFont(10);
  chartStack.addSpacer(2);
  const histBarsStack = chartStack.addStack();
  histBarsStack.layoutHorizontally();
  histBarsStack.spacing = 1;
  const sortedHistorical = [...historicalPrices].sort((a, b) => a.time - b.time);
  const histStep = Math.max(1, Math.floor(sortedHistorical.length / 12));
  for (let i = 0; i < 12; i++) {
    const idx = i * histStep;
    if (idx < sortedHistorical.length) {
      const barStack = histBarsStack.addStack();
      barStack.layoutVertically();
      barStack.centerAlignContent();
      const price = sortedHistorical[idx].value;
      const normalized = (price - minPrice) / range;
      const blockIdx = Math.floor(normalized * (blocks.length - 1));
      const priceLabel = barStack.addText(price.toFixed(0) + "p");
      priceLabel.textColor = Color.white();
      priceLabel.font = Font.systemFont(7);
      const bar = barStack.addText(blocks[blockIdx]);
      bar.textColor = Color.white();
      bar.font = Font.systemFont(32);
      const hourStr = String(sortedHistorical[idx].time.getHours()).padStart(2, "0") + "00";
      const hour = barStack.addText(hourStr);
      hour.textColor = Color.gray();
      hour.font = Font.systemFont(6);
    }
  }
  chartStack.addSpacer(8);
  const foreLabel = chartStack.addText("NEXT 12H:");
  foreLabel.textColor = new Color("#4ADE80");
  foreLabel.font = Font.boldSystemFont(10);
  chartStack.addSpacer(2);
  const foreBarsStack = chartStack.addStack();
  foreBarsStack.layoutHorizontally();
  foreBarsStack.spacing = 1;
  const sortedForecast = [...forecastPrices].sort((a, b) => a.time - b.time);
  const hourlyForecast = [];
  const seenHours = new Set();
  for (const slot of sortedForecast) {
    const hour = slot.time.getHours();
    if (!seenHours.has(hour) && hourlyForecast.length < 12) {
      hourlyForecast.push(slot);
      seenHours.add(hour);
    }
  }
  for (let i = 0; i < hourlyForecast.length; i++) {
    const barStack = foreBarsStack.addStack();
    barStack.layoutVertically();
    barStack.centerAlignContent();
    const price = hourlyForecast[i].value;
    const normalized = (price - minPrice) / range;
    const blockIdx = Math.floor(normalized * (blocks.length - 1));
    const priceLabel = barStack.addText(price.toFixed(0) + "p");
    priceLabel.textColor = new Color("#4ADE80");
    priceLabel.font = Font.systemFont(7);
    const bar = barStack.addText(blocks[blockIdx]);
    bar.textColor = new Color("#4ADE80");
    bar.font = Font.systemFont(32);
    const hourStr = String(hourlyForecast[i].time.getHours()).padStart(2, "0") + "00";
    const hour = barStack.addText(hourStr);
    hour.textColor = Color.gray();
    hour.font = Font.systemFont(6);
  }
  chartStack.addSpacer(2);
}

// #############################################
// ############# WIDGET LAYOUT #################
// #############################################

function createSmallWidget(data) {
  const widget = new ListWidget();
  widget.setPadding(12, 12, 12, 12);
  const gradient = new LinearGradient();
  gradient.colors = [new Color("#1A1F2A"), new Color("#2C3444")];
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  
  if (!data.current) {
    const errorText = widget.addText("Unable to fetch grid data");
    errorText.textColor = Color.white();
    errorText.font = Font.systemFont(12);
    return widget;
  }
  
  const title = widget.addText("UK ENRGY MNTR");
  title.textColor = Color.white();
  title.font = Font.boldSystemFont(14);
  
  widget.addSpacer(8);
  
const rec = getRecommendation(data.current, data.currentPrice, data.agile);
  const statusText = widget.addText(`${rec.emoji} ${rec.text}`);
  statusText.textColor = rec.color;
  statusText.font = Font.semiboldSystemFont(11);
  
  widget.addSpacer(12);
  
  const statsStack = widget.addStack();
  statsStack.layoutHorizontally();
  statsStack.centerAlignContent();
  
  const intensityStack = statsStack.addStack();
  intensityStack.layoutVertically();
  const intensityLabel = intensityStack.addText("INTENSITY");
  intensityLabel.textColor = Color.gray();
  intensityLabel.font = Font.systemFont(9);
  const intensity = data.current.intensity?.actual || data.current.intensity?.forecast || 0;
  const intensityValue = intensityStack.addText(`${intensity}`);
  intensityValue.textColor = rec.color;
  intensityValue.font = Font.boldSystemFont(28);
  const intensityUnit = intensityStack.addText("gCO2/kWh");
  intensityUnit.textColor = Color.gray();
  intensityUnit.font = Font.systemFont(8);
  
  statsStack.addSpacer();
  
  if (data.currentPrice) {
    const priceStack = statsStack.addStack();
    priceStack.layoutVertically();
    const priceLabel = priceStack.addText("PRICE");
    priceLabel.textColor = Color.gray();
    priceLabel.font = Font.systemFont(9);
    const priceValue = priceStack.addText(`${data.currentPrice.toFixed(1)}p`);
    priceValue.textColor = Color.white();
    priceValue.font = Font.boldSystemFont(28);
    const priceUnit = priceStack.addText("per kWh");
    priceUnit.textColor = Color.gray();
    priceUnit.font = Font.systemFont(8);
  }
  
  widget.addSpacer(4);
  
  if (data.agile && data.agile.length > 0) {
    const windows = findBestAndWorstWindows(data.agile);
    if (windows.best.length > 0 && windows.worst.length > 0) {
      const infoStack = widget.addStack();
      infoStack.layoutHorizontally();
      
      const bestTime = new Date(windows.best[0].valid_from);
      const bestStr = bestTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      const bestPrice = windows.best[0].value_inc_vat.toFixed(1);
      
      const bestText = infoStack.addText(`BEST: ${bestStr} (${bestPrice}p)`);
      bestText.textColor = new Color("#4ADE80");
      bestText.font = Font.systemFont(9);
      
      infoStack.addSpacer(8);
      
      const worstTime = new Date(windows.worst[0].valid_from);
      const worstStr = worstTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      const worstPrice = windows.worst[0].value_inc_vat.toFixed(1);
      
      const worstText = infoStack.addText(`AVOID: ${worstStr} (${worstPrice}p)`);
      worstText.textColor = new Color("#EF4444");
      worstText.font = Font.systemFont(9);
    }
  }
  
  return widget;
}

function createMediumWidget(data) {
  const widget = new ListWidget();
  widget.setPadding(16, 16, 16, 16);
  const gradient = new LinearGradient();
  gradient.colors = [new Color("#1A1F2A"), new Color("#2C3444")];
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  
  if (!data.current) {
    const errorText = widget.addText("Unable to fetch grid data");
    errorText.textColor = Color.white();
    errorText.font = Font.systemFont(12);
    return widget;
  }
  
  const headerStack = widget.addStack();
  headerStack.layoutHorizontally();
  const title = headerStack.addText("UK ENERGY MONITOR");
  title.textColor = Color.white();
  title.font = Font.boldSystemFont(16);
  headerStack.addSpacer();
const rec = getRecommendation(data.current, data.currentPrice, data.agile);
  const emoji = headerStack.addText(rec.emoji);
  emoji.font = Font.systemFont(20);
  
  widget.addSpacer(12);
  
  const statsStack = widget.addStack();
  statsStack.layoutHorizontally();
  statsStack.centerAlignContent();
  
  const intensityStack = statsStack.addStack();
  intensityStack.layoutVertically();
  const intensityLabel = intensityStack.addText("INTENSITY");
  intensityLabel.textColor = Color.gray();
  intensityLabel.font = Font.systemFont(9);
  const intensity = data.current.intensity?.actual || data.current.intensity?.forecast || 0;
  const intensityValue = intensityStack.addText(`${intensity}`);
  intensityValue.textColor = rec.color;
  intensityValue.font = Font.boldSystemFont(24);
  const intensityUnit = intensityStack.addText("gCO2/kWh");
  intensityUnit.textColor = Color.gray();
  intensityUnit.font = Font.systemFont(9);
  
  statsStack.addSpacer();
  
  if (data.currentPrice) {
    const priceStack = statsStack.addStack();
    priceStack.layoutVertically();
    const priceLabel = priceStack.addText("PRICE");
    priceLabel.textColor = Color.gray();
    priceLabel.font = Font.systemFont(9);
    const priceValue = priceStack.addText(`${data.currentPrice.toFixed(1)}p`);
    priceValue.textColor = Color.white();
    priceValue.font = Font.boldSystemFont(24);
    const priceUnit = priceStack.addText("per kWh");
    priceUnit.textColor = Color.gray();
    priceUnit.font = Font.systemFont(9);
  }
  
  widget.addSpacer(12);
  
  if (data.agile && data.agile.length > 0) {
    const windows = findBestAndWorstWindows(data.agile);
    
    const windowsRow = widget.addStack();
    windowsRow.layoutHorizontally();
    windowsRow.spacing = 12;
    
    if (windows.best.length > 0) {
      const bestStack = windowsRow.addStack();
      bestStack.layoutVertically();
      
      const bestTitle = bestStack.addText("BEST TIMES:");
      bestTitle.textColor = new Color("#4ADE80");
      bestTitle.font = Font.boldSystemFont(11);
      
      bestStack.addSpacer(4);
      
      for (let i = 0; i < Math.min(2, windows.best.length); i++) {
        const slot = windows.best[i];
        const time = new Date(slot.valid_from);
        const timeStr = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const priceStr = slot.value_inc_vat.toFixed(1);
        
        const line = bestStack.addText(`${timeStr} (${priceStr}p)`);
        line.textColor = Color.white();
        line.font = Font.systemFont(10);
        bestStack.addSpacer(2);
      }
      
      windowsRow.addSpacer();
    }
    
    if (windows.worst.length > 0) {
      const worstStack = windowsRow.addStack();
      worstStack.layoutVertically();
      
      const worstTitle = worstStack.addText("AVOID:");
      worstTitle.textColor = new Color("#EF4444");
      worstTitle.font = Font.boldSystemFont(11);
      
      worstStack.addSpacer(4);
      
      for (let i = 0; i < Math.min(2, windows.worst.length); i++) {
        const slot = windows.worst[i];
        const time = new Date(slot.valid_from);
        const timeStr = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const priceStr = slot.value_inc_vat.toFixed(1);
        
        const line = worstStack.addText(`${timeStr} (${priceStr}p)`);
        line.textColor = Color.white();
        line.font = Font.systemFont(10);
        worstStack.addSpacer(2);
      }
    }
  }
  
  return widget;
}

function createLargeWidget(data) {
  const widget = new ListWidget();
  widget.setPadding(16, 16, 16, 16);
  const gradient = new LinearGradient();
  gradient.colors = [new Color("#1A1F2A"), new Color("#2C3444")];
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  
  if (!data.current) {
    const errorText = widget.addText("Unable to fetch grid data");
    errorText.textColor = Color.white();
    errorText.font = Font.systemFont(12);
    return widget;
  }
  
  const title = widget.addText("UK ENERGY MONITOR");
  title.textColor = Color.white();
  title.font = Font.boldSystemFont(18);
  
  widget.addSpacer(8);
  
const rec = getRecommendation(data.current, data.currentPrice, data.agile);
  const statusStack = widget.addStack();
  statusStack.layoutHorizontally();
  statusStack.centerAlignContent();
  const statusText = statusStack.addText(`${rec.emoji} ${rec.text}`);
  statusText.textColor = rec.color;
  statusText.font = Font.semiboldSystemFont(14);
  
  widget.addSpacer(10);
  
  const statsStack = widget.addStack();
  statsStack.layoutHorizontally();
  statsStack.centerAlignContent();
  
  const intensityStack = statsStack.addStack();
  intensityStack.layoutVertically();
  const intensityLabel = intensityStack.addText("INTENSITY");
  intensityLabel.textColor = Color.gray();
  intensityLabel.font = Font.systemFont(9);
  const intensity = data.current.intensity?.actual || data.current.intensity?.forecast || 0;
  const intensityValue = intensityStack.addText(`${intensity}`);
  intensityValue.textColor = rec.color;
  intensityValue.font = Font.boldSystemFont(32);
  const intensityUnit = intensityStack.addText("gCO2/kWh");
  intensityUnit.textColor = Color.gray();
  intensityUnit.font = Font.systemFont(9);
  
  statsStack.addSpacer();
  
  if (data.currentPrice) {
    const priceStack = statsStack.addStack();
    priceStack.layoutVertically();
    const priceLabel = priceStack.addText("PRICE");
    priceLabel.textColor = Color.gray();
    priceLabel.font = Font.systemFont(9);
    const priceValue = priceStack.addText(`${data.currentPrice.toFixed(1)}p`);
    priceValue.textColor = Color.white();
    priceValue.font = Font.boldSystemFont(32);
    const priceUnit = priceStack.addText("per kWh");
    priceUnit.textColor = Color.gray();
    priceUnit.font = Font.systemFont(9);
  }
  
  widget.addSpacer(12);
  
  if (data.historicalHourly.length > 0 || data.forecastHourly.length > 0) {
    const chartImage = drawChart(widget, data.historicalHourly.slice(-24), data.forecastHourly.slice(0, 12), 320, 140);
    if (chartImage) {
      const imageStack = widget.addStack();
      imageStack.layoutHorizontally();
      imageStack.addSpacer();
      const img = imageStack.addImage(chartImage);
      img.imageSize = new Size(320, 140);
      imageStack.addSpacer();
    } else {
      drawTextChart(widget, data.historicalHourly.slice(-24), data.forecastHourly.slice(0, 12), data.agile);
    }
  } else {
    const noDataText = widget.addText("Fetching data...");
    noDataText.textColor = Color.gray();
    noDataText.font = Font.systemFont(10);
  }
  
  widget.addSpacer(4);
  
  if (data.agile && data.agile.length > 0) {
    const windows = findBestAndWorstWindows(data.agile);
    const windowsRow = widget.addStack();
    windowsRow.layoutHorizontally();
    windowsRow.spacing = 8;
    
    if (windows.best.length > 0) {
      const bestStack = windowsRow.addStack();
      bestStack.layoutVertically();
      const bestTitle = bestStack.addText("BEST TIME SLOTS:");
      bestTitle.textColor = new Color("#4ADE80");
      bestTitle.font = Font.boldSystemFont(11);
      bestStack.addSpacer(2);
      
      for (let i = 0; i < Math.min(3, windows.best.length); i++) {
        const slot = windows.best[i];
        const time = new Date(slot.valid_from);
        const timeStr = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const priceStr = slot.value_inc_vat.toFixed(1);
        const line = bestStack.addText(`${timeStr} (${priceStr}p)`);
        line.textColor = Color.white();
        line.font = Font.systemFont(9);
      }
      
      windowsRow.addSpacer();
    }
    
    if (windows.worst.length > 0) {
      const worstStack = windowsRow.addStack();
      worstStack.layoutVertically();
      const worstTitle = worstStack.addText("TIMES TO AVOID:");
      worstTitle.textColor = new Color("#EF4444");
      worstTitle.font = Font.boldSystemFont(11);
      worstStack.addSpacer(2);
      
      for (let i = 0; i < Math.min(3, windows.worst.length); i++) {
        const slot = windows.worst[i];
        const time = new Date(slot.valid_from);
        const timeStr = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const priceStr = slot.value_inc_vat.toFixed(1);
        const line = worstStack.addText(`${timeStr} (${priceStr}p)`);
        line.textColor = Color.white();
        line.font = Font.systemFont(9);
      }
    }
  }
  
  widget.addSpacer();
  
  const updateTime = new Date().toLocaleTimeString("en-GB");
  const updateText = widget.addText(`UPDATED: ${updateTime}`);
  updateText.textColor = Color.darkGray();
  updateText.font = Font.systemFont(8);
  
  return widget;
}

// #############################################
// ############ WIDGET EXECUTION ###############
// #############################################

async function main() {
  const current = await getCarbonIntensity();
  const historical = await getHistoricalIntensity();
  const forecast = await getCarbonForecast();
  const agile = await getAgilePricing();
  
  await checkAndNotify(current, forecast, agile);
  
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
  
  const historicalHourly = groupByHour(historical, "intensity");
  const forecastHourly = groupByHour(forecast, "intensity");
  const optimal = findOptimalWindow(forecast, 12);
  
  let optimalPrice = null;
  if (optimal && agile) {
    const optTime = new Date(optimal.from);
    const optSlot = agile.find(slot => {
      const from = new Date(slot.valid_from);
      const to = new Date(slot.valid_to);
      return optTime >= from && optTime < to;
    });
    if (optSlot) {
      optimalPrice = optSlot.value_inc_vat;
    }
  }
  
  const data = {
    current,
    forecast,
    historical,
    historicalHourly,
    forecastHourly,
    currentPrice,
    optimal,
    optimalPrice,
    agile
  };
  
  const widgetFamily = config.widgetFamily || "medium";
  let widget;
  
  if (widgetFamily === "small") {
    widget = createSmallWidget(data);
  } else if (widgetFamily === "large") {
    widget = createLargeWidget(data);
  } else {
    widget = createMediumWidget(data);
  }
  
  if (config.runsInWidget) {
    Script.setWidget(widget);
  } else {
    widget.presentLarge();
  }
  
  Script.complete();
}

await main();

// #############################################
// ############## END OF SCRIPT ################
// #############################################
