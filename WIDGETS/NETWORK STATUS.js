// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: tachometer-alt;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ############ NETWORK STATUS ##################
// #############################################

WIDGET NAME   : NETWORK STATUS
COLOUR        : GREY
ICON          : GAUGE
WIDGET SIZE   : MEDIUM & SMALL 
VERSION       : V283025
DEVELOPER     : MICHAEL MATLEY
CREDIT        :

// #############################################
// ############## WHAT & HOW ###################
// #############################################

1. PINGS TO SELECT WEBSITE TO APPROXIMATE PING
2. DETECT BATTERY STRENGTH.
3. Timestamps last data collection time.
4. Reactive colouring for ping and battery power can be adjusted in thresholds
5. Hasdynamic colours for light and dark mode.

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

// #############################################
// ############## CONTENTS #####################
// #############################################
    
    READ ME 
    USER CONFIGURATION 
    THRESHHOLDS
    LIVE DATA SEARCH
    CORE LOGIC
    WIDGET BUILD
    WIDGET DISPLAY
    END OF SCRIPT
*/
// #############################################
// ############## USER CONFIGURATION ###########
// #############################################

const PING_TARGET_PRIMARY = "https://dns.surfshark.com"; 

// --- Colour Palette ---
const textBody = Color.dynamic(new Color("#5A6A7C"), new Color("#909090"));
const textTitles = Color.dynamic(new Color('#FFFFFF'), new Color('#F9F9F9'));

const textTime = Color.dynamic(new Color('#909090'), new Color('#F5F5F5'));

const CRITICAL_RED = new Color("FF4444"); 
const WARNING_YELLOW = new Color("FFD700"); 
const EXCELLENT_GREEN = new Color("4ADE80"); 
const SLOW_ORANGE = new Color("FF8C00");

const bgBack = [Color.dynamic(new Color('#EAEAEA'), new Color('#424242')), Color.dynamic(new Color('#D8D8D8'), new Color('#444444'))];
const bgGrad = [0.0, 1.0];

const BGGRADIENT = new LinearGradient()
BGGRADIENT.colors = bgBack
BGGRADIENT.locations = bgGrad

// #############################################
// ############## THRESHHOLDS ##################
// #############################################

const BATTERY_CRITICAL = 20; // Red
const BATTERY_WARNING = 30;  // Yellow

const PING_SLOW = 350; // Orange/Yellow
const PING_EXCELLENT = 150; // Green

// #############################################
// ############# END OF USER CONFIG ############
// #############################################

// #############################################
// ############# LIVE DATA SEARCH ##############
// #############################################

async function fetchPrimaryPing() {
    const start = Date.now();
    try {
        const req = new Request(PING_TARGET_PRIMARY);
        req.timeoutInterval = 10; 
        await req.load();
        const latency = Date.now() - start;
        return `${latency} MS`;
    } catch (e) {
        return "DISCONNECTED";}}

// #############################################
// ############## CORE FUNCTION ################
// #############################################

async function createWidget() { 
    let w = new ListWidget();
    w.backgroundGradient = BGGRADIENT;
    w.setPadding(14, 10, 14, 10);
    
    // Fetch live data
    let batteryLevel = Math.round(Device.batteryLevel() * 100);
    let now = new Date();
    
    let livePingResult = await fetchPrimaryPing(); 

    // --- Determine POWER Status Colour ---
    let powerColor = textTitles;
    if (batteryLevel <= BATTERY_CRITICAL) {
        powerColor = CRITICAL_RED;
    } else if (batteryLevel <= BATTERY_WARNING) {
        powerColor = WARNING_YELLOW;
    }

    // --- Determine PRIMARY PING Status Colour ---
    let primaryPingColor = textTitles;
    const primaryLatencyValue = parseInt(livePingResult.split(' ')[0]);

    if (livePingResult === "DISCONNECTED") {
        primaryPingColor = CRITICAL_RED;
    } else if (primaryLatencyValue <= PING_EXCELLENT) {
        primaryPingColor = EXCELLENT_GREEN;
    } else if (primaryLatencyValue > PING_SLOW) {
        primaryPingColor = SLOW_ORANGE;
    }
    
// #############################################
// ############## WIDGET BUILD #################
// #############################################

    let headerStack = w.addStack();
    headerStack.layoutHorizontally();
    
    let titleTxt = headerStack.addText("NETWORK STATUS");
    titleTxt.font = Font.boldMonospacedSystemFont(12);
    titleTxt.textColor = textBody;
    
    headerStack.addSpacer();

    let timeTxt = headerStack.addText(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    timeTxt.font = Font.boldMonospacedSystemFont(8);
    timeTxt.textColor = textTime;

    w.addSpacer(8);
    
    let mainDataStack = w.addStack();
    mainDataStack.layoutVertically();
    
    // Primary Data: POWER 
    let powerStack = mainDataStack.addStack();
    powerStack.layoutHorizontally();
    let powerLabel = powerStack.addText("POWER");
    powerLabel.font = Font.boldMonospacedSystemFont(10);
    powerLabel.textColor = textBody;
    powerStack.addSpacer();
    
    let powerTxt = powerStack.addText(`${batteryLevel}%`);
    powerTxt.font = Font.boldSystemFont(24); 
    powerTxt.textColor = powerColor; // Reactive colour
    
    mainDataStack.addSpacer(10); 
    
    let pingStack = mainDataStack.addStack();
    pingStack.layoutHorizontally();
    
    let pingLabel = pingStack.addText("PING");
    pingLabel.font = Font.boldMonospacedSystemFont(10);
    pingLabel.textColor = textBody;
    pingStack.addSpacer();
    
    let pingTxt = pingStack.addText(livePingResult); 
    pingTxt.font = Font.boldSystemFont(24); 
    pingTxt.textColor = primaryPingColor; // Reactive colour

    w.addSpacer(); 

    // --- Footer: Last Update Time ---
    let footerStack = w.addStack();
    footerStack.layoutVertically();
    
    let statusLabel = footerStack.addText("DATA TIMESTAMP");
    statusLabel.font = Font.boldMonospacedSystemFont(9);
    statusLabel.textColor = textBody;

    footerStack.addSpacer(4);
    
    let updateTimeTxt = footerStack.addText(now.toLocaleTimeString()); 
    updateTimeTxt.font = Font.boldMonospacedSystemFont(12); 
    updateTimeTxt.textColor = textTime;
    
    let systemStatusTxt = footerStack.addText("LAST SUCCESSFUL CYCLE");

    systemStatusTxt.font = Font.mediumMonospacedSystemFont(8);
    systemStatusTxt.textColor = textBody;
    
    if (config.runsInWidget) {
        Script.setWidget(w);
    } else {
        w.presentSmall(); }
    
    w.refreshAfterDate = new Date(Date.now() + 60 * 1000); 
    
    Script.complete();}

createWidget();

// #############################################
// ############## END OF SCRIPT ################
// #############################################