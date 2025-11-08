// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: digital-tachograph;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ############## WIDGET NAME ##################
// #############################################

WIDGET NAME   : DIGITAL COUNTDOWN
COLOUR        :
ICON          :
WIDGET SIZE   : SMALL / MEDIUM
VERSION       : V291025
DEVELOPER     : MICHAEL MATLEY
CREDIT        :

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################

1. customisable colouring and label changing.
2. Just insert selected date and time to countdown to; LINE 59

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
##w# TEAL SCDRY ###   #55D5D9 #2E9CAA #0D4D53

// #############################################
// ############## CONTENTS #####################
// #############################################

    READ ME 
    USER CONFIGURATION 
    CONSTANTS
    CORE LOGIC
    WIDGET LAYOUT
    HELPER FUNCTIONS
    END OF SCRIPT
*/
// #############################################
// ############## USER CONFIGURATION ###########
// #############################################

// PREVIEW SIZE: "small", "medium", or "large"
const previewSize = (config.runsInWidget? config.widgetFamily: "small"); 
// DATE: Must be in 'MM/DD/YYYY HH:MM:SS AM/PM' format
const endDate = '11/22/2025 12:00:00 PM'; 
// LABEL
const daysTillText = 'C O U N T D O W N'
const hoursTillText = 'HH:MM' 
// BACKGROUND COLORS
const BGGradientColors = [Color.dynamic(new Color('#EAEAEA'), new Color('#424242')), Color.dynamic(new Color('#D8D8D8'), new Color('#333333'))];
const BGGradientLocation = [0.0, 1.0];

const BGBackground = new LinearGradient()
BGBackground.colors = BGGradientColors
BGBackground.locations = BGGradientLocation

// DYNAMIC FONT COLOUR
const fontColor = Color.dynamic(new Color("#00637C"), new Color("#909090"));
const daysColor = Color.dynamic(new Color("#008794"), new Color("#D8D8D8"));
// FONT TYPE
const dummyFont = Font.boldMonospacedSystemFont(16) 
// FONT SIZE: HHH:MM format
const daysTextFONT = Font.boldMonospacedSystemFont(42) 
// LAYOUT SETTINGS (Top, Left, Bottom, Right)
const padding = { top: 0, left: 0, bottom: 0, right: 0 } 

// #############################################
// ############## END OF USER CONFIG ###########
// #############################################

// #############################################
// ############# WIDGET LAYOUT #################
// #############################################

const widget = await createWidget()
widget.backgroundGradient = BGBackground
//PADDINGS & MARGINS
widget.setPadding (padding.top, padding.left, padding.bottom, padding.right) 
// PREVIEW IN APP
if (!config.runsInWidget) {
    switch (previewSize) {
        case "small":
            await widget.presentSmall(); 
            break;
        case "medium":
            await widget.presentMedium(); 
            break;
        case "large":
            await widget.presentLarge(); 
            break; }
}
// ###############################################
// ############### WIDGET BUILD  #################
// ###############################################

Script.setWidget(widget)
Script.complete()

// ###############################################
// ################ CORE LOGIC ###################
// ###############################################

async function createWidget() {
    let daysText, dummyText, row, row2
    const widget = new ListWidget()
    const timeResult = calculateTime (endDate);
// LINE 90 (approx): Minimal top spacer to push content up from the center.
    widget.addSpacer(2); 
// STACK FOR THE NUMBER (Total Hours: Minutes)
    row = widget.addStack() 
    row.layoutHorizontally() 
    row.centerAlignContent() 
    row.addSpacer() 
// Displays the Total Hours: Minutes string
    daysText = row.addText(timeResult + "") 
    daysText.textColor = daysColor 
    daysText.font = daysTextFONT 
    row.addSpacer() 
//LINE 105 (approx): Small spacer between the number and description.
    widget.addSpacer(2); 
    
// STACK FOR THE TEXT LABEL (Description)
    row2 = widget.addStack() 
    row2.layoutHorizontally() 
    row2.centerAlignContent() 
    row2.addSpacer() 
    dummyText = row2.addText(hoursTillText) 
    dummyText.textColor = fontColor 
    dummyText.font = dummyFont 
    row2.addSpacer() 
//LINE 118 (approx): Large spacer at the bottom to force all content UP.
//Increase this value (e.g., to 30) if you need the content higher.
    widget.addSpacer(20); 
    
    // STACK FOR THE TEXT LABEL (Description)
    row2 = widget.addStack() 
    row2.layoutHorizontally() 
    row2.centerAlignContent() 
    row2.addSpacer() 
    dummyText = row2.addText(daysTillText) 
    dummyText.textColor = fontColor 
    dummyText.font = dummyFont 
    row2.addSpacer() 
    
    return widget 
}

function calculateTime (targetDate) {
    let hours, minutes, timeRemaining;
    // Convert the target date string into a Date object
    targetDate = new Date(targetDate); 
    startDate = new Date(); 
    // Calculate time remaining in milliseconds, then convert to seconds
    timeRemaining = parseInt((targetDate.getTime() - startDate.getTime()) / 1000); 
    if (timeRemaining >= 0) { 
        // Calculate total hours (rolling days into hours)
        hours = Math.floor(timeRemaining / 3600); 
        // 3600 seconds in an hour
        let remainder = timeRemaining % 3600; 
        // Calculate minutes
        minutes = Math.floor(remainder / 60); 
        
        // Helper function to pad single digits for minutes (e.g., 5 -> 05)
        const pad = (n) => (n < 10 ? "0" + n : n); 

        // Output format is HHH:MM
        return `${hours}:${pad(minutes)}`; 

    } else {
        return 'COUNTDOWN COMPLETE'; 
    }
}
