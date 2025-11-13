![License](https://img.shields.io/github/license/MichaelMatley/IOS-Widgets?color=444444&label=License)
![Framework](https://img.shields.io/badge/Framework-Scriptable-2f72da?logo=apple&logoColor=white)
![Language](https://img.shields.io/badge/Language-JavaScript-181818?logo=javascript&logoColor=f7df1e)  
![Status](https://img.shields.io/badge/Status-Stable-brightgreen)
![Widgets](https://img.shields.io/badge/Widgets-12-555555)
![Version](https://img.shields.io/github/v/release/MichaelMatley/IOS-Widgets?color=444444&label=Version)  
[![Patreon](https://img.shields.io/badge/Support-Patreon-ff424d?logo=patreon&logoColor=white)](https://www.patreon.com/VeritasExMachina?utm_campaign=creatorshare_creator)

--- 

# IOS SCRIPTABLE WIDGETS

> *Eclectic, somewhat functional, and occasionally user-friendly widgets designed for Scriptable on iOS.*

--- 

## UPDATES

### V1.0: 


[Appendix: Previous Updates](#appendix-previous-updates)

--- 

## PREVIEWS

<img width="649" height="635" alt="IMG_0324" src="https://github.com/user-attachments/assets/c4854ff1-c4d6-4189-8849-832b2fda262f" />

<img width="1500" height="694" alt="image" src="https://github.com/user-attachments/assets/82b51371-a0d6-4581-84e8-a50cdb6e2198" />

<img width="1096" height="542" alt="image" src="https://github.com/user-attachments/assets/397a6728-56c6-4077-a2d5-da42a9617a54" />

---

## CONTENTS

1. [Preview](#preview)
2. [Introduction](#hello-there...)
3. [Why Scriptable](#why-scriptable) 
4. [Widget Overview](#widget-overview)
5. [Coming Soon](#coming-soon)
6. [Script Structure](#scripts-layout)  
7. [Installation Guide](#installation-guide)  
8. [Customization Tips](#customization-&-themes)   
9. [Appendix: Troubleshooting](#appendix-troubleshooting)
10. [Appendix: Previous Updates](#appendix-previous-updates)
11. [Credits & License](#credits--license)

---

## HELLO THERE... 

Welcome to my growing set of Scriptable widgets for iOS. 
This repository exists because a few weeks ago i was looking for a specific widget for my iPhone and couldn’t find one, and not willing to pay for a widget designer app, I figured there must be a way to build your own. 

These widgets are built on IPHONE 16 PRO MAX and i know there are some misalignments on other devices (i.e. My IPad 10th Gen). 

Temporarily, i run with two sets of scripts with their layouts, as this evolves i will look to add auto sizing in where needed. All scripts contained here within are iPhone 16 pro max ones, so adjust the padding as needed. 

These widgets were designed with *fun* & are for entertainment purposes only. Well not all of them, some of them were designed for me and have purpose (and in the case of the energy monitor ; my Mum, so she knows when to put the washing on). 

--- 

## WHY SCRIPTABLE 

- Scriptable provides a JS (JavaScript) automation app that allows any user to throw together a script and create an executable function on iOS and or a truly customisable widget that can be created to their needs and wants, within the iOS framework. 
- With thanks to **Simon Støvring** for the scriptable app and creating the framework to make true IPhone customisation possible. 
  
---

###> *if it doesn't exist, make it yourself.*

---

## WIDGET OVERVIEW

This repository includes **12 unique widgets**, each crafted for specific use cases:

| Widget Name             | Purpose                                           | Size(s)         | Dark / Light Mode^^ |
|-------------------------|---------------------------------------------------|-----------------|---------------------|
| `NETWORK STATUS.js`     | Connection monitor. Ping (ms) & battery power     | Small / Medium  | ✅ / ✅             |
| `UNTITLED QUOTES.js`    | Philosophical quotes 50 (Cycles)                  | Medium          | ✅ / ✅             |
| `GRIDCUTS MONO.js`      | Shortcuts Template w/ 1 Label (lower)             | Dynamic^        | ✅ / ✅             |
| `GRIDCUTS DUO.js`       | Shortcuts Template w 2 Labels (upper & lower)     | Medium          | ✅ / ✅             |
| `DIGITAL COUNTDOWN.js`. | Countdown to preset date & time                   | Small / Medium  | ✅ / ✅             |
| `EXISTENTIAL.js`        | Cycling through Existential Facts                 | Small / Medium  | ✅ / ✅             |
| `ALGORITHM OF DAY.js`.  | ML Algorithms (40) Daily Change               b   | Medium          | ✅ / ✅             |
| `UK ENERGY MONITOR.js`. | When should i do my Laundry?                      | Dynamic^        |                     |
| `IOS ICONS.js`          | Template (SFicons) make own app icons             | Dynamic^        | ✅ / ✅             |
| `PROGRESS TRACKER.js`.  | Track the day, week etc and your life progress    | Medium          | ✅ / ✅             |  
| `BLACK OPS.js`.         | Simple icon UI for IOS.                           | Large           | ✅ / 🚫             |  
| `SIMPLE.js`.            | Simple Text UI for IOS.                           | Large           | ✅ / 🚫             |  

- ^^ Dark Mode = Light and Dark themes dynamic shifting and customisable
- ^ Dynamic size auto-adjusts as you change widget size
  
---

## COMING SOON

| Widget Name             | Purpose                                          | 
|-------------------------|--------------------------------------------------|
| `BAYESIAN INFERENCE.js` | COMING SOON: FORTUNETELLER                       |     
| `MODEL CARDS.js`        | COMING SOON: MODEL DATA CARDS.                   |         
| `PROBABILITY CALC.js`.  | COMING SOON: WHAT ARE THE ODDS?                  |       

---

## SCRIPTS LAYOUT

*Each widget follows a modular structure for clarity and ease of customization*

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

DESCRIPTION & FUNCTION

// #############################################
// ############## COLOR SCHEMES ################
// #############################################

### B/G ACNTS ###    #1A1F2A #3C494F #2C3444 #3E4A5C  
### TEAL ACNTS ###   #00637C #008794 #40E0DO 

// #############################################
// ################## CONTENTS #################
// #############################################
    READ ME 
    USER CONFIGURATION 
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

## INSTALLATION GUIDE 
(If you cant handle this then why are you on GITHUB)

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
