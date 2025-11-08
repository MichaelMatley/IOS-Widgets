// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: space-shuttle;
/*#####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ######### EXISTENTIAL WIDGET ################
// #############################################

WIDGET NAME   : EXISTENTIAL WIDGET
COLOUR        :
ICON          :
VERSION       : V151025
DEVELOPER     : MICHAEL MATLEY
CREDIT        : 
 
Existential Metrics Widget for Scriptable
A darkly humorous take on life’s fleeting moments

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################

Existential Metrics Widget for Scriptable
A darkly humorous take on life’s fleeting moments automatically cycles through some interesting existential stats.
Dynamically set to dark & light mode

Update your date of birth; LINE 54

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
    CONSTANTS
    CORE LOGIC
    WIDGET LAYOUT
    HELPER FUNCTIONS
    END OF SCRIPT
*/

// #############################################
// ############ USER CONFIGURATION #############
// #############################################

const now = new Date()
const birthYear = 1983
const currentYear = now.getFullYear()
const age = currentYear - birthYear

// #############################################
// ############ END OF USER CONFIG #############
// #############################################

// #############################################
// ############ CORE LOGIC #####################
// #############################################

// Metric calculations
const heartbeatsLived = age * 365.25 * 24 * 60 * 70
const secondsAlive = age * 365.25 * 24 * 60 * 60
const breathsTaken = secondsAlive / 4
const blinksCompleted = age * 365.25 * 28800

function formatLargeNumber(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B"
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M"
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K"
  return Math.floor(num).toString()
}

const hourMetrics = [
  { label: "HEARTBEATS", value: formatLargeNumber(heartbeatsLived), unit: "& COUNTING" },
  { label: "BREATHS TAKEN", value: formatLargeNumber(breathsTaken), unit: "INHALES" },
  { label: "BLINKS", value: formatLargeNumber(blinksCompleted), unit: "CLOSURES" },
  { label: "ROTATIONS", value: age.toString(), unit: "SOLAR LAPS" },
  { label: "ENTROPY", value: "INCREASING", unit: "ENERGY" },
  { label: "HEAT DEATH", value: "10^100", unit: "YEARS AWAY" }
]

const currentMetric = hourMetrics[now.getHours() % hourMetrics.length]

const perspectives = [
  "8 MINUTES SOL",
  "TEARS IN THE RAIN",
  "DRAKE EQUATION",
  "AI BLACK BOX",
  "42 THGTTG",
  "ORION"
]


// Vertical gradient: dark (#111111) to light (#EAEAEA)
const bgBack = [Color.dynamic(new Color('#DDDDDD'),new Color('#424242')),Color.dynamic(new Color('#D8D8D8'),new Color('#444444'))];
const bgGrad = [0.0, 1.0];

const BGGRADIENT = new LinearGradient()
BGGRADIENT.colors = bgBack
BGGRADIENT.locations = bgGrad

// #############################################
// ############## WIDGET BUILD #################
// #############################################

const widget = new ListWidget()
widget.backgroundGradient = BGGRADIENT
widget.setPadding(12, 12, 12, 12)

//   VOIDOMETER
const titleText = widget.addText("EXISTENTIALLY")
titleText.font = Font.boldRoundedSystemFont(17)
titleText.textColor = new Color("#777777")
titleText.leftAlignText()
widget.addSpacer(10)

const valueText = widget.addText(currentMetric.value)
valueText.font = Font.boldMonospacedSystemFont(20)
valueText.textColor = new Color("#40E0D0") // 00ff88
valueText.centerAlignText()
valueText.minimumScaleFactor = 2
widget.addSpacer(10)

const labelText = widget.addText(currentMetric.label)
labelText.font = Font.mediumRoundedSystemFont(16)
labelText.textColor = new Color("#F5F5F5")
labelText.leftAlignText()
widget.addSpacer(10)

const unitText = widget.addText(currentMetric.unit)
unitText.font = Font.regularRoundedSystemFont(14)
unitText.textColor = new Color("#FFFFFF")
unitText.rightAlignText()
widget.addSpacer(10)

const footerText = widget.addText(perspectives[now.getMinutes() % perspectives.length])
footerText.font = Font.italicSystemFont(16)
footerText.textColor = new Color("00637C")
footerText.leftAlignText()

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentSmall()
}

Script.complete()

// #############################################
// ############ END OF SCRIPT ##################
// #############################################
