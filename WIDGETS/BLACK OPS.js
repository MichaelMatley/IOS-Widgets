// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: lock;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ################# BLACK OPS #################
// #############################################

WIDGET NAME   : BLACK OPS
COLOUR        : DARK GREY
ICON          : 
WIDGET SIZE   : lARGE
THEMES.       : DARK MODE 
VERSION       : V121125
DEVELOPER     : MICHAEL MATLEY
CREDIT        :

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################
1. Large widget with configurable buttons for url shortcuts for IOS 
2. UPDATE THE 3 FIELDS IN EACH SHORTCUT LINE
      "" - label as you wanted to appear on widget (OPTIONAL) 
      SFSYMBOL - name of sf symbol (details pro app handy)
      SHORTCUTNAME - name of your shortcut in iOS Shortcuts or URL direct
{ name: "", symbol: "SFSYMBOL", url: "shortcuts://run-shortcut?name=SHORTCUTNAME" },
3. Can update color to match ios wallpaper color 

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
### GREEN #4ADE80 ORANGE #F59E0B RED #EF4444 ###

// #############################################
// ################## CONTENTS #################
// #############################################
    READ ME 
    USER CONFIGURATION 
    BUTTON CONFIGURATION
    WIDGET LAYOUT
    WIDGET BUILD
    WIDGET EXECUTE
    END OF SCRIPT
*/

// #############################################
// ############# USER CONFIGURATION ############
// #############################################

const BackgroundColor = new Color('#000000')
const IconsColor = new Color('#FFFFFF')
const TextColor = new Color('#1F2327')

const labelFont = Font.boldMonospacedSystemFont(12)

// #############################################
// ############ BUTTON CONFIGURATION ###########
// #############################################

const shortcuts = [
{name: "",symbol: "message",url: "sms://"},
{name: "",symbol: "ellipsis.message",url: "whatsapp://"},
{name: "",symbol: "photo.fill",url: "photos-redirect://"},
{name: "",symbol: "compass.drawing",url: "itms-apps://"},
{name: "",symbol: "phone.fill",url: "tel://" },
{name: "",symbol: "safari",url: "x-web-search://"},
{name: "",symbol: "envelope",url: "message://"},
{name: "",symbol: "gearshape.fill",url: "App-prefs:" },
{name: "",symbol: "calendar",url: "shortcuts://run-shortcut?name=SHORTCUT9" },
{name: "",symbol: "wrench.and.screwdriver",url: "shortcuts://run-shortcut?name=SHORTCUT10" },
{name: "",symbol: "app.fill",url: "shortcuts://run-shortcut?name=SHORTCUT11" },
{name: "",symbol: "apple.terminal",url: "shortcuts://run-shortcut?name=SHORTCUT12" }, 
{name: "",symbol: "apple.intelligence",url: "shortcuts://run-shortcut?name=SHORTCUT13" },
{name: "",symbol: "clipboard.fill",url: "shortcuts://run-shortcut?name=SHORTCUT14" },
{name: "",symbol: "square.stack.3d.up.fill",url: "shortcuts://run-shortcut?name=SHORTCUT15" },
{name: "",symbol: "lock.fill",url: "shortcuts://run-shortcut?name=SHORTCUT16" },]

// #############################################
// ############## END OF USER CONFIG ###########
// #############################################

// #############################################
// ############## WIDGET LAYOUT ################
// #############################################

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
  default: // small or in-app preview
    rows = 4
    cols = 4}
const totalIcons = rows * cols

const widget = new ListWidget()
widget.setPadding(6, 6, 6, 6) 

const iconSize = 60
const iconHeight = 60
const textSize = 12

widget.backgroundColor = BackgroundColor;

// #############################################
// ############## WIDGET BUILD #################
// #############################################

for (let r = 0; r < rows; r++) {
  const row = widget.addStack()
  row.layoutHorizontally()
  row.addSpacer()

  for (let c = 0; c < cols; c++) {
    const i = r * cols + c
    if (i >= totalIcons || i >= shortcuts.length) break
    const shortcut = shortcuts[i]

    // Create a vertical container for icon + label
    const itemStack = row.addStack()
    itemStack.layoutVertically()
    itemStack.url = shortcut.url  // Make the whole thing tappable
    
    // === ICON ===
    const iconStack = itemStack.addStack()
    iconStack.layoutHorizontally()
    iconStack.addSpacer()
    const sym = SFSymbol.named(shortcut.symbol)
    const img = iconStack.addImage(sym.image)
    img.imageSize = new Size(iconSize, iconHeight)
    img.tintColor = IconsColor
    iconStack.addSpacer()
    
    itemStack.addSpacer(4)
    
    // === BOTTOM LABEL ===
    const bottomLabelStack = itemStack.addStack()
    bottomLabelStack.layoutHorizontally()
    bottomLabelStack.addSpacer()
    const label = bottomLabelStack.addText(shortcut.name)
    label.font = labelFont
    label.textColor = TextColor
    label.lineLimit = 1
    bottomLabelStack.addSpacer()

    if (c < cols - 1) row.addSpacer(12)
  }

  row.addSpacer()
  
  if (r < rows - 1) widget.addSpacer(12)
}

// #############################################
// ############ WIDGET EXECUTE #################
// #############################################

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  // Default preview is small widget
  widget.presentLarge()}

Script.complete()

// #############################################
// ############## END OF SCRIPT ################
// #############################################