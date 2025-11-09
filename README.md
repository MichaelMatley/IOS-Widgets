# IOS SCRIPTABLE WIDGETS

> *Ecleptic, somewhat functional, and occasionally user-friendly widgets designed for Scriptable on iOS.*
<img width="1500" height="694" alt="image" src="https://github.com/user-attachments/assets/82b51371-a0d6-4581-84e8-a50cdb6e2198" />
<img width="1096" height="542" alt="image" src="https://github.com/user-attachments/assets/397a6728-56c6-4077-a2d5-da42a9617a54" />

---

## CONTENTS

1. [Introduction](#introduction)  
2. [Widget Overview](#widget-overview)  
3. [Script Structure](#script-structure)  
4. [Installation Guide](#installation-guide)  
5. [Customization Tips](#customization-tips)  
6. [Widget Index](#widget-index)  
7. [Appendix: Troubleshooting](#appendix-c-troubleshooting)  
8. [Credits & License](#credits--license)

---

## HELLO THERE... 

Welcome to my growing set of Scriptable widgets for iOS. 
This repository exists because a few weeks ago i was looking for a specific widget for my iPhone and couldn’t find one, and not willing to pay for a widget designer app, I figured there must be a way to build your own. 

These widgets are built on IPHONE 16 PRO MAX and i know there are some misalignments on other devices (i.e. My IPad 10th Gen). 

Temporarily, i have a two sets of scripts with their layouts, as this evolves i will look to add auto sizing in where needed. All scripts contained here within are iPhone 16 pro max ones, so just adjust the padding as needed. 

These widgets were designed with fun & are for entertainment purposes only. Well not all of them, some of them were designed for me and have purpose (and in the case of the energy monitor ; my Mum, so she knows when to put the washing on). 

> *if it doesn't exist, make it yourself.*

---

## WIDGET OVERVIEW

This repository includes **10 unique widgets**, each crafted for specific use cases:

| Widget Name           | Purpose                                          | Size(s)           | Dark Mode^^ |
|-----------------------|--------------------------------------------------|-------------------|-------------|
| `NETWORK STATUS.js`   | Connection monitor. Ping (ms) & battery power    | Small / Medium    | ✅          |
| `UNTITLED QUOTES.js`  | Philosophical quotes 50 (Cycles)                 | Medium.           | ✅          |
| `GRIDCUTS MONO.js`      | Shortcuts Template w/ 1 Label (lower)            | Dynamic^        | ✅          |
| `GRIDCUTS DUO.js`       | Shortcuts Template w 2 Labels (upper & lower)    | Medium          | ✅          |
| `DIGITAL COUNTDOWN.js`. | Countdown to preset date & time                  | Small / Medium  | ✅          |
| `EXISTENTIAL.js`        | Cycling Existential Facts                        | Small / Medium  | ✅          |
| `ALGORITHM OF DAY.js`.  | ML Algorithms (40) Daily Change                  | Medium          | ✅          |
| `UK ENERGY MONITOR.js`. | When should i do my Laundry?                     | Dynamic^        |             |
| `IOS ICONS.js`          | Template (SFicons) make own app icons            | Dynamic^        | ✅          |
| `PROGRESS TRACKER.js`.  | Track the day, week etc and your life progress   | Medium          | ✅          |
| `                     ` |                                                  |                 |             |
| `BAYESIAN INFERENCE.js` | COMING SOON: FORTUNETELLER                       | Large           | ✅          |
| `MODEL CARDS.js`        | COMING SOON: MODEL DATA CARDS.                   | Large           | ✅          |
| `PROBABILITY CALC.js`.  | COMING SOON: WHAT ARE THE ODDS?                  | Medium          | ✅          |
| `SIMPLE.js`.            | COMING SOON: SIMPLE IOS UI                       | Large           |             |     

- ^^ Dark Mode = Light and Dark themes dynamic shifting and custimsable
- ^ Dynamic size autuadjusts as you change widget size
- 
---

## SCRIPTS LAYOUT

Each widget follows a modular structure for clarity and ease of customization:

DISCLAIMER: Whilst i'd love to tell you that every script doesnt have any redundant code and strictly follows the layout below and works in the most efficient way......

.... they do , they don't and they're not! 

One day (maybe) but until then... get over it. 

(And YES, there's that many colors on my palatte, i'm picky and indecisive) 

*Each widget has a user config and i have tried to move / keep all variables ( font, size, colors etc) up there for user ease.*

```js
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ############## WIDGET NAME ##################
// #############################################

WIDGET NAME   :
COLOUR        :
ICON          :
WIDGET SIZE   : 
THEMES.       : DYNAMIC LIGHT & DARK MODES 
VERSION       : V
DEVELOPER     : 
CREDIT        : 

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################
1. instruction one.
2. Instruction two.
3. Instruction three.
4. Instruction four.

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
    CONSTANTS
    CORE LOGIC
    WIDGET LAYOUT
    WIDGET EXECUTION
    END OF SCRIPT
*/

// #############################################
// ############# USER CONFIGURATION ############
// #############################################
const settings = {
  theme: 'tealGlass',
  showLabels: true,
  cornerRadius: 12,
};

// #############################################
// ############## END OF USER CONFIG ###########
// #############################################

// #############################################
// ################ CORE LOGIC #################
// #############################################
async function fetchData() {
  // API calls or local data
}
// #############################################
// ############## WIDGET LAYOUT ################
// #############################################
function createWidget(data) {
  const widget = new ListWidget();
  // Layout logic here
  return widget;
}
// #############################################
// ############## WIDGET EXECUTION #############
// #############################################
let data = await fetchData();
let widget = createWidget(data);
Script.setWidget(widget);
Script.complete();
}
// #############################################
// ############## END OF SCRIPT ################
// #############################################

```


## INSTALLATION GUIDE (If you cant handle this then why are you on GITHUB)

1. Install [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) from the App Store.  
2. Clone or download this repository.  
3. Copy the desired `.js` file into Scriptable.  
4. Add the widget to your home screen and select the script.

---

## CUSTOMISATION & THEMES

- **Themes**: Most widgets support dark & light mode through dynamic functions and the colors / fonts / sizes are contained within a user configuration section usually at the top of the script 
- **Labels**: Toggle label visibility via `showLabels` in the config.  
- **Spacing**: Adjust padding and alignment for different screen sizes.

---

## APPENDIX: TROUBLESHOOTING

- **Widget not updating?** Ensure Background App Refresh is enabled for Scriptable.  
- **Layout misaligned?** Try adjusting `cornerRadius` or `padding` values.  
- **Data not loading?** Check API keys or permissions (e.g., Energy Monitor, Network Status).

---

## CREDITS

- **Automater** Everyone on there for their posts, i learnt a lot (even for being 7 years behind)
- **Simon Støvring** Thank you for Scriptable 

Crafted by [Michael](https://github.com/michaelmatley) 
