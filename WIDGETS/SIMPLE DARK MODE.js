// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: circle;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ################## SIMPLE ###################
// #############################################

WIDGET NAME   : SIMPLE
COLOUR        : DARK GREY
ICON          : 
WIDGET SIZE   : LARGE
THEMES        : DARK MODE 
VERSION       : V121125
DEVELOPER     : MICHAEL MATLEY
CREDIT        :

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################

SIMPLE WIDGET TO ACT AS YOUR ONLY PHONE SCREEN AND REMOVE ALL DISTRACTIONS
SETUP NEW FOCUS MODE ON IOS AND SET A DARK FFFFFF AS BACKGROUND
SET PAGE WITH THIS WIDGET ON AS HOMEPAGE (AND ONLY PAGE) 
LARGE WIDGET WITH UPDATABLE TEXT BUTTONS
 
// #############################################
// ############## COLOR SCHEMES ################
// #############################################

### BLACKS ###       #000000 #1F2327 #263137 #333333

// #############################################
// ################## CONTENTS #################
// #############################################
    
READ ME 
    USER CONFIGURATION 
    TEXT BUTTONS CONFIG
    WIDGET LAYOUT
    WIDGET BUILD
    END OF SCRIPT
*/

// #############################################
// ############# USER CONFIGURATION ############
// #############################################

const CONFIG = {
  backgroundColor: "#1C1C1E",
  textColor: "#FFFFFF",
// ultralight thin light regular medium semibold bold heavy black
  fontWeight: "semibold",  
  fontSize: 20,
  spacing: 14,
  leftPadding: 20,
  
// #############################################
// ############ TEXT BUTTONS CONFIG ############
// #############################################

  apps: [
    { name: "PHONE", url: "tel://" },
    { name: "MESSAGES", url: "sms://" },
    { name: "WHATSAPP", url: "whatsapp://" },
    { name: "CALENDER", url: "calshow://" },
    { name: "MAIL", url: "message://" },
    { name: "CONTACTS", url: "contacts://" },
    { name: "PHOTOS", url: "photos-redirect://" },
    { name: "REMINDERS", url: "x-apple-reminderkit://" },
    { name: "SETTINGS", url: "App-prefs://" }
  ]};

// #############################################
// ############# WIDGET LAYOUT ############
// #############################################

const LabelHeight = 16
const LabelWidth = 100

let widget = new ListWidget();
widget.backgroundColor = new Color(CONFIG.backgroundColor);
widget.setPadding(16, CONFIG.leftPadding, 16, 16);

// #############################################
// ################ WIDGET BUILD ###############
// #############################################

for (let app of CONFIG.apps) {
  let appText = widget.addText(app.name);
  appText.font = Font[CONFIG.fontWeight + "SystemFont"](CONFIG.fontSize);
  appText.textColor = new Color(CONFIG.textColor);
  appText.url = app.url;
  widget.addSpacer(CONFIG.spacing);}
widget.addSpacer();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentLarge();
}

Script.complete();

// #############################################
// ############# USER CONFIGURATION ############
// #############################################