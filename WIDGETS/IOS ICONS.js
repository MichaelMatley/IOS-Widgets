// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: mobile-alt;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ############## IOS ICONS ##################
// #############################################

WIDGET NAME   : IOS CUSTOM ICONS
COLOUR        : RED
ICON          : WAND
WIDGET SIZE   : LARGE
VERSION       : V281025
DEVELOPER     : MICHAEL MATLEY
CREDIT        :

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################

1. template to create your own custom iOS app  icons.
2. Set your own colouring and SF symbols with or without labels
3. Once set enable widget, screenshot, duplicate and crop
4, Set up your desired shortcuts in Shortcuts iOS then add to home screen and choose imageand select your desired icon
Can create 16 icons at once and already preset to dark and light mode. 

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
// ############## USER CONFIGURATION ###########
// #############################################

const colours = {
  light: {
    background: ["#EAEAEA", "#D8D8D8"],
    buttonStart: 230,
    buttonEnd: 180,
    icon: "#008794",
    text: "#111111"
  },
  dark: {
    background: ["#444444", "#424242"],
    buttonStart: 30,
    buttonEnd: 100,
    icon: "#40E0D0",
    text: "#FFFFFF"
  }
}
const mode = Device.isUsingDarkAppearance() ? "dark" : "light"
const palette = colours[mode]
function dyn(light, dark) {
  return Color.dynamic(new Color(light), new Color(dark))
}

// ###################################################
// ############## ICON CONFIGURATION #################
// ###################################################

const shortcuts = [
  {  symbol: "circle.hexagongrid" },
  {  symbol: "square.grid.3x3.square" },
  {  symbol: "waveform.and.person.filled" },
  {  symbol: "hexagon" },
  {  symbol: "play.circle" },
  {  symbol: "list.bullet.rectangle.portrait" },
  {  symbol: "widget.large" },
  {  symbol: "lanyardcard" },
  {  symbol: "leaf" },
  {  symbol: "play.rectangle.on.rectangle" },
  {  symbol: "building.columns" },
  {  symbol: "lock" },
  {  symbol: "cart" },
  {  symbol: "calendar" },
  {  symbol: "rectangle.3.group.bubble" },
  {  symbol: "server.rack" }
]

// ###################################################
// ############## WIDGET SIZE DETECT #################
// ###################################################

let rows, cols

switch (config.widgetFamily) {
  case "medium":
    rows = 2
    cols = 4
    break
  case "large":
    rows = 4
    cols = 4
    break
  default: // 
    rows = 2
    cols = 2
}
const totalButtons = rows * cols

// ###################################################
// ################# ICON LAYOUT #####################
// ###################################################

const widget = new ListWidget()
widget.setPadding(2, 2, 2, 2)

// Background gradient
const bgGradient = new LinearGradient()
bgGradient.colors = palette.background.map(c => new Color(c))
bgGradient.locations = [1, 1]
widget.backgroundGradient = bgGradient

// Layout constants
const buttonSize = 85
const buttonHeight = 85
const iconSize = 60
const textSize = 0

// ###################################################
// ################ ICON LAYOUT #######################
// ####################################################

for (let r = 0; r < rows; r++) {
  const row = widget.addStack()
  row.layoutHorizontally()
  row.addSpacer()
  for (let c = 0; c < cols; c++) {
    const i = r * cols + c
    if (i >= totalButtons || i >= shortcuts.length) break
    const shortcut = shortcuts[i]
    const button = row.addStack()
    button.size = new Size(buttonSize, buttonHeight)
    button.layoutVertically()
    button.backgroundColor = dyn("#D8D8D8", "#333333")
    button.cornerRadius = 12

    button.addSpacer(4)

    // === ICON ===
    const iconStack = button.addStack()
    iconStack.layoutHorizontally()
    iconStack.addSpacer()
    const sym = SFSymbol.named(shortcut.symbol)
    const img = iconStack.addImage(sym.image)
    img.imageSize = new Size(iconSize, iconSize)
    img.tintColor = dyn(palette.icon, palette.icon)
    iconStack.addSpacer()

    button.addSpacer(4)
   if (c < cols - 1) row.addSpacer(6)
  }

  row.addSpacer()
  if (r < rows - 1) widget.addSpacer(12)
}

// ####################################################
// ################# WIDGET DISPLAY ###################
// ####################################################

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  // Default preview is large widget
  widget.presentLarge()
}

Script.complete()