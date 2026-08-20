<!-- TAGNET README HEADER — Catppuccin Mocha — do not edit by hand -->
<div align="center">

[![License](https://img.shields.io/github/license/e404-tagnet/IOS-Widgets?color=313244&labelColor=11111b&label=License&style=flat-square)](https://github.com/e404-tagnet/IOS-Widgets/blob/PHASE-1/LICENSE)
[![Status](https://img.shields.io/badge/Status-stable-a6e3a1?labelColor=11111b&style=flat-square)](https://github.com/e404-tagnet/IOS-Widgets/pulse)
[![Version](https://img.shields.io/github/v/release/e404-tagnet/IOS-Widgets?color=313244&labelColor=11111b&label=Version&style=flat-square)](https://github.com/e404-tagnet/IOS-Widgets/releases)
[![Framework](https://img.shields.io/badge/Framework-Scriptable-89dceb?labelColor=11111b&style=flat-square&logo=apple&logoColor=89dceb)](https://apps.apple.com/app/scriptable/id1405459188)
[![Language](https://img.shields.io/badge/Language-JavaScript-f9e2af?labelColor=11111b&style=flat-square&logo=javascript&logoColor=f9e2af)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Widgets](https://img.shields.io/badge/Widgets-13-a6adc8?labelColor=11111b&style=flat-square)](https://github.com/e404-tagnet/IOS-Widgets#widget-overview)
[![Repo](https://img.shields.io/badge/Repo-IOS-Widgets-94e2d5?labelColor=11111b&style=flat-square&logo=github&logoColor=94e2d5)](https://github.com/e404-tagnet/IOS-Widgets)
[![Tagnet](https://img.shields.io/badge/By-Tagnet-89dceb?labelColor=11111b&style=flat-square&logo=tag&logoColor=89dceb)](https://tagnet.dev)

</div>
<!-- TAGNET README HEADER — end -->

# IOS SCRIPTABLE WIDGETS

> *Eclectic, somewhat functional, and occasionally user-friendly widgets designed for Scriptable on iOS.*

--- 

## PREVIEWS

<img width="1301" height="940" alt="IMG_0356" src="https://github.com/user-attachments/assets/16064287-512e-43d1-86ab-849a377519c9" />

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

> *if it doesn't exist, make it yourself.*

---

## WIDGET OVERVIEW

This repository includes **13 unique widgets**, each crafted for specific use cases:
- Nearly all the widget scripts are customisable and in most cases, have
built in dynamic theme changing between IOS dark and light modes. 
- Like one? download it and change the colors to your own themes and make it your own! a

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
| `PRIVACY STATUS.js`.    | Privacy audit, monitor and checklist.             | Small           | ✅ / ✅             |  

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

Crafted with caffeine, curiosity, and the occasional washing-machine insight by [e404-tagnet](https://github.com/e404-tagnet).

<!-- TAGNET README FOOTER — start -->
---

<div align="center">

**Like this work? Fuel the next widget / experiment / scaffold.**

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%23FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/e404.tagnet)
[![Patreon](https://img.shields.io/badge/Support-Patreon-ff424d?logo=patreon&logoColor=white&style=for-the-badge)](https://www.patreon.com/VeritasExMachina?utm_campaign=creatorshare_creator)

<small>Crafted with caffeine, curiosity, and a Catppuccin palette · © e404-tagnet</small>

</div>
<!-- TAGNET README FOOTER — end -->
