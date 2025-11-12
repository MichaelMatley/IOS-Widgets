/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ############## GRIDCUTS DUO #################
// #############################################

WIDGET NAME   : GRIDCUTS DUO
COLOUR        : TEAL
ICON          : GRID 9
WIDGET SIZE   : DYNAMIC
VERSION       : V051125
DEVELOPER     : MICAEL MATLEY
CREDIT        :

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################

1. UPDATE THE 4 FIELDS IN EACH SHORTCUT LINE
INSERTNAMETOP - label for top of widget
INSERTNAMEBOT - label for bottom of widget
SFSYMBOL - name of sf symbol (details pro app handy)
SHORTCUTNAME - name of your shortcut in iOS Shortcuts

{ topName: "INSERTNAMETOP", name: "INSERTNAMEBOT", symbol: "SFSYMBOL", url: "shortcuts://run-shortcut?name=SHORTCUTNAME" },

2. WIDGET WILL AUTOMATICALLY RESIZE DEPENDING ON WHICH OF THE THREE SIDES YOU PICK. THE SMALL WIDGET WILL SHOW THE FIRST FLOOR ON THE SHORTCUT LIST BELOW MEDIUM WILL SHOW THE FIRST DATE AND LARGE WILL SHOW ALL 16. 
3. USER CONFIG SECTION YOU CAN UPDATE COLOURING OF THE LABELS AND ICONS.
4. CURRENTLY HAS DYNAMIC COLOUR CHANGING FOR DARK LIGHT MODE.

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
    BUTTON CONFIGURATION 
    DETECT WIDGET SIZE
    WIDGET LAUOUT
    BUTTON GRID
    WIDGET BUILD
    END OF SCRIPT
*/
// #############################################
// ############## USER CONFIGURATION ###########
// #############################################

const colours = {
  light: {
    background: ["#EAEAEA", "#D8D8D8"],
    button: "#D8D8D8",
    icon: "#008794",
    text: "#111111"
  },
  dark: {
    background: ["#444444", "#424242"],
    button: "#333333",
    icon: "#40E0D0",
    text: "#FFFFFF"
  }
}

// #############################################
// ############ BUTTON CONFIGURATION ###########
// #############################################

const shortcuts = [
  { topName: "BTTN1", name: "B1", symbol: "app", url: "shortcuts://run-shortcut?name=M E S S A G I N G" },
  { topName: "BTTN2", name: "B2", symbol: "app", url: "shortcuts://run-shortcut?name=E M A I L" },
  { topName: "BTTN3", name: "B3", symbol: "app", url: "shortcuts://run-shortcut?name=D O C U M E N T S" },
  { topName: "BTTN4", name: "B4", symbol: "app", url: "shortcuts://run-shortcut?name=B R O W S E R" },
  { topName: "BTTN5", name: "B5", symbol: "app", url: "shortcuts://run-shortcut?name=N O T E S" },
  { topName: "BTTN6", name: "B6", symbol: "app", url: "shortcuts://run-shortcut?name=P H O T O S" },
  { topName: "BTTN7", name: "B7", symbol: "app", url: "shortcuts://run-shortcut?name=C A L E N D A R" },
  { topName: "BTTN8", name: "B8", symbol: "app", url: "shortcuts://run-shortcut?name=C A M E R A" },
  { topName: "BTTN9", name: "B9", symbol: "app", url: "shortcuts://run-shortcut?name=W E A T H E R" },
  { topName: "BTTN10", name: "B10", symbol: "app", url: "shortcuts://run-shortcut?name=M A P S" },
  { topName: "BTTN11", name: "B11", symbol: "app", url: "shortcuts://run-shortcut?name=M U S I C" },
  { topName: "BTTN12", name: "B12", symbol: "app", url: "shortcuts://run-shortcut?name=T I M E R" },
  { topName: "BTTN13", name: "B13", symbol: "app", url: "shortcuts://run-shortcut?name=F I L E S" },
  { topName: "BTTN14", name: "B14", symbol: "app", url: "shortcuts://run-shortcut?name=S E T T I N G S" },
  { topName: "BTTN15", name: "B15", symbol: "app", url: "shortcuts://run-shortcut?name=H O M E" },
  { topName: "BTTN16", name: "B16", symbol: "app", url: "shortcuts://run-shortcut?name=S H O P S" }
]
// #############################################
// ########### END OF USER CONFIG ##############
// #############################################

// #############################################
// ########### DETECT WIDGET SIZE ##############
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
  default:
    rows = 2
    cols = 2
}

const totalButtons = rows * cols

// Layout constants
const buttonSize = 80
const buttonHeight = 76
const iconSize = 40
const textSize = 12

// #############################################
// ############## WIDGET LAYOUT ################
// #############################################

const widget = new ListWidget()
widget.setPadding(6, 6, 6, 6)

// Background gradient with dynamic colours
const bgGradient = new LinearGradient()
bgGradient.colors = [
  Color.dynamic(new Color(colours.light.background[0]), new Color(colours.dark.background[0])),
  Color.dynamic(new Color(colours.light.background[1]), new Color(colours.dark.background[1]))
]
bgGradient.locations = [0, 1]
widget.backgroundGradient = bgGradient

// #############################################
// ############## BUTTON GRID  #################
// #############################################

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
    button.backgroundColor = Color.dynamic(new Color(colours.light.button), new Color(colours.dark.button))
    button.cornerRadius = 12
    button.url = shortcut.url
    button.addSpacer(4)
    
    // Top Label
    const topLabelStack = button.addStack()
    topLabelStack.layoutHorizontally()
    topLabelStack.addSpacer()
    const topLabel = topLabelStack.addText(shortcut.topName || "")
    topLabel.font = Font.systemFont(textSize)
    topLabel.textColor = Color.dynamic(new Color(colours.light.text), new Color(colours.dark.text))
    topLabel.lineLimit = 1
    topLabelStack.addSpacer()

    button.addSpacer(2)
    
    // Icon
    const iconStack = button.addStack()
    iconStack.layoutHorizontally()
    iconStack.addSpacer()
    const sym = SFSymbol.named(shortcut.symbol)
    const img = iconStack.addImage(sym.image)
    img.imageSize = new Size(iconSize, iconSize)
    img.tintColor = Color.dynamic(new Color(colours.light.icon), new Color(colours.dark.icon))
    iconStack.addSpacer()
    button.addSpacer(4)

    // Bottom Label
    const labelStack = button.addStack()
    labelStack.layoutHorizontally()
    labelStack.addSpacer()
    const label = labelStack.addText(shortcut.name)
    label.font = Font.systemFont(textSize)
    label.textColor = Color.dynamic(new Color(colours.light.text), new Color(colours.dark.text))
    label.lineLimit = 1
    labelStack.addSpacer()
    button.addSpacer(4)

    if (c < cols - 1) row.addSpacer(12)
  }

  row.addSpacer()
  if (r < rows - 1) widget.addSpacer(12)
}

// #############################################
// ############## WIDGET BUILD #################
// #############################################

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentLarge()
}

Script.complete()

// #############################################
// ############## END OF SCRIPT ################
// #############################################


    
