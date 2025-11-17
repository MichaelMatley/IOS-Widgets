// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: shield-alt;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ############ PRIVACY STATUS #################
// #############################################

WIDGET NAME   : PRIVACY STATUS
COLOUR        : DARK GREY
ICON          : SHIELD
WIDGET SIZE   : SMALL
THEMES.       : DYNAMIC LIGHT & DARK MODES 
VERSION       : V1.0
DEVELOPER     : MICHAEL MATLEY
CREDIT        : 

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################

# Privacy Dashboard & Audit - With Countdown Timer
# Dynamic theming + configurable security checks + audit countdow
# 10 main checks with 5 additional soft options
# Customisable on checklist / colors and themes 

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
    CORE LOGIC
    WIDGET LAYOUT
    WIDGET EXECUTIONS
    END OF SCRIPT
*/

// #############################################
// ############# USER CONFIGURATION ############
// #############################################

const USER_CONFIG = {
  theme: {
    dark: {
      // Store gradient config as an object instead
      background: {
        type: "linear",
        colors: ["#424242", "#3E3E3E"],
        locations: [0.0, 1.0]
        },
      text: "#909090",
      textSecondary: "#999999",
      progressBackground: "#333333",
      EXCELLENT: "#00ff00",
      GOOD: "#4CAF50",
      WARNING: "#ff9800",
      DANGER: "#f44336"
    },
    light: {
      background: {
        type: "linear", 
        colors: ["#EAEAEA", "#D8D8D8"],
        locations: [0, 1.0]
        }, 
      text: "#5A6A7C",
      textSecondary: "#666666",
      progressBackground: "#dddddd",
      EXCELLENT: "#00aa00",
      GOOD: "#2E7D32",
      WARNING: "#f57c00",
      DANGER: "#c62828"
    }
  },
  
  // Optional security checks (enable/disable as needed)
  optionalChecks: {
    vpn: true,              // Show VPN status reminder
    emailAlias: true,       // iCloud+ email alias check
    privateRelay: true,     // iCloud Private Relay
    lockdownMode: false,    // Lockdown Mode (extreme security)
    hideEmail: true,        // Hide My Email usage
    passwordManager: true   // Password manager audit
  },
  
  // Audit reminder interval (days)
  auditReminderDays: 30,
  
  // Widget transparency (0.0 - 1.0)
  backgroundOpacity: 1.0,
  
  // Show countdown on widget
  showCountdown: true
};

// #############################################
// ############## END OF USER CONFIG ###########
// #############################################

// #############################################
// ################ CORE LOGIC #################
// #############################################

const STORAGE_KEY = "privacy_dashboard_data";

// Base audit steps (always included)
const BASE_AUDIT_STEPS = [
  {
    id: "tracking",
    title: "App Tracking",
    question: "Have you disabled 'Allow Apps to Request to Track'?",
    guidance: "Settings → Privacy & Security → Tracking\nDisable the main toggle.",
    url: "App-prefs:root=Privacy&path=TRACKING"
  },
  {
    id: "location",
    title: "Location Permissions",
    question: "Have you reviewed which apps have location access?",
    guidance: "Settings → Privacy & Security → Location Services\nCheck each app - prefer 'While Using' over 'Always'.",
    url: "App-prefs:root=Privacy&path=LOCATION"
  },
  {
    id: "photos",
    title: "Photo Access",
    question: "Have you reviewed photo library permissions?",
    guidance: "Settings → Privacy & Security → Photos\nUse 'Selected Photos' where possible.",
    url: "App-prefs:root=Privacy&path=PHOTOS"
  },
  {
    id: "contacts",
    title: "Contacts Access",
    question: "Do you know which apps can read your contacts?",
    guidance: "Settings → Privacy & Security → Contacts\nMinimise apps with access.",
    url: "App-prefs:root=Privacy&path=CONTACTS"
  },
  {
    id: "microphone",
    title: "Microphone Access",
    question: "Have you limited microphone permissions?",
    guidance: "Settings → Privacy & Security → Microphone\nOnly essential apps should have access.",
    url: "App-prefs:root=Privacy&path=MICROPHONE"
  },
  {
    id: "camera",
    title: "Camera Access",
    question: "Have you reviewed camera permissions?",
    guidance: "Settings → Privacy & Security → Camera\nRemove access from unused apps.",
    url: "App-prefs:root=Privacy&path=CAMERA"
  },
  {
    id: "analytics",
    title: "Analytics Sharing",
    question: "Have you disabled analytics & data sharing?",
    guidance: "Settings → Privacy & Security → Analytics & Improvements\nDisable all toggles.",
    url: "App-prefs:root=Privacy&path=ANALYTICS"
  },
  {
    id: "safari_tracking",
    title: "Safari Tracking",
    question: "Have you enabled 'Prevent Cross-Site Tracking'?",
    guidance: "Settings → Safari → Privacy & Security\nEnable tracking prevention and fraudulent website warnings.",
    url: "App-prefs:root=SAFARI"
  },
  {
    id: "safari_data",
    title: "Safari Data Clearing",
    question: "When did you last clear Safari history & website data?",
    guidance: "Settings → Safari → Clear History and Website Data\nDo this regularly.",
    url: "App-prefs:root=SAFARI"
  },
  {
    id: "notifications",
    title: "Notification Privacy",
    question: "Have you disabled lock screen previews for sensitive apps?",
    guidance: "Settings → Notifications → [App] → Show Previews: When Unlocked/Never\nProtects data from shoulder surfing.",
    url: "App-prefs:root=NOTIFICATIONS_ID"
  }
];

// Optional audit steps
const OPTIONAL_AUDIT_STEPS = {
  vpn: {
    id: "vpn",
    title: "VPN Configuration",
    question: "Do you have a VPN configured and active?",
    guidance: "Settings → General → VPN & Device Management\nConsider a reputable VPN for public WiFi.",
    url: "App-prefs:root=General&path=VPN"
  },
  emailAlias: {
    id: "email_alias",
    title: "Email Aliases",
    question: "Are you using iCloud+ email aliases for online accounts?",
    guidance: "Settings → [Your Name] → iCloud → Hide My Email\nCreate unique email addresses for each service.",
    url: "App-prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE"
  },
  privateRelay: {
    id: "private_relay",
    title: "Private Relay",
    question: "Is iCloud Private Relay enabled?",
    guidance: "Settings → [Your Name] → iCloud → Private Relay\nMasks your IP address and browsing.",
    url: "App-prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE"
  },
  lockdownMode: {
    id: "lockdown_mode",
    title: "Lockdown Mode",
    question: "Have you considered if Lockdown Mode is appropriate?",
    guidance: "Settings → Privacy & Security → Lockdown Mode\nExtreme protection for high-risk individuals.",
    url: "App-prefs:root=Privacy"
  },
  hideEmail: {
    id: "hide_email",
    title: "Hide My Email Usage",
    question: "Are you using Hide My Email for sign-ups?",
    guidance: "Use Safari's built-in Hide My Email feature when creating accounts.\nProtects your real email address.",
    url: "App-prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE"
  },
  passwordManager: {
    id: "password_manager",
    title: "Password Security",
    question: "Have you audited saved passwords for weak/reused credentials?",
    guidance: "Settings → Passwords → Security Recommendations\nReview and update weak passwords.",
    url: "App-prefs:root=PASSWORDS"
  }
};

// Build complete audit steps based on config
function getAuditSteps() {
  let steps = [...BASE_AUDIT_STEPS];
  
  for (const [key, enabled] of Object.entries(USER_CONFIG.optionalChecks)) {
    if (enabled && OPTIONAL_AUDIT_STEPS[key]) {
      steps.push(OPTIONAL_AUDIT_STEPS[key]);
    }
  }
  
  return steps;
}

// Get theme colours based on system appearance
function getTheme() {
  const isDark = Device.isUsingDarkAppearance();
  return isDark ? USER_CONFIG.theme.dark : USER_CONFIG.theme.light;
}

// Load audit progress
function loadAuditData() {
  try {
    const fm = FileManager.local();
    const path = fm.joinPath(fm.documentsDirectory(), STORAGE_KEY);
    
    if (fm.fileExists(path)) {
      const data = fm.readString(path);
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Load error: " + e);
  }
  
  return {
    lastAudit: null,
    completedSteps: {},
    currentStep: 0
  };
}

// Save audit progress
function saveAuditData(data) {
  try {
    const fm = FileManager.local();
    const path = fm.joinPath(fm.documentsDirectory(), STORAGE_KEY);
    fm.writeString(path, JSON.stringify(data));
  } catch (e) {
    console.error("Save error: " + e);
  }
}

// Check location services
async function checkLocationStatus() {
  try {
    Location.setAccuracyToThreeKilometers();
    await Location.current();
    return "ON";
  } catch {
    return "OFF";
  }
}

// Check clipboard
function checkClipboardActivity() {
  try {
    const clipboard = Pasteboard.paste();
    return clipboard && clipboard.length > 0 ? "DATA" : "CLEAR";
  } catch {
    return "N/A";
  }
}

// Calculate audit progress
function calculateProgress(auditData) {
  const steps = getAuditSteps();
  const completed = Object.keys(auditData.completedSteps).length;
  const total = steps.length;
  return Math.floor((completed / total) * 100);
}

// Days since last audit
function daysSinceAudit(auditData) {
  if (!auditData.lastAudit) return null;
  const lastDate = new Date(auditData.lastAudit);
  const today = new Date();
  const diff = today - lastDate;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Days until next audit
function daysUntilNextAudit(auditData) {
  if (!auditData.lastAudit) return null;
  const daysSince = daysSinceAudit(auditData);
  const daysRemaining = USER_CONFIG.auditReminderDays - daysSince;
  return daysRemaining;
}

// Get status colour based on progress
function getStatusColour(progress, theme) {
  if (progress === 100) return new Color(theme.EXCELLENT);
  if (progress >= 70) return new Color(theme.GOOD);
  if (progress >= 40) return new Color(theme.WARNING);
  return new Color(theme.DANGER);
}

// Get countdown colour based on days remaining
function getCountdownColour(daysRemaining, theme) {
  if (daysRemaining === null) return new Color(theme.textSecondary);
  if (daysRemaining < 0) return new Color(theme.DANGER);
  if (daysRemaining <= 7) return new Color(theme.WARNING);
  if (daysRemaining <= 14) return new Color(theme.GOOD);
  return new Color(theme.EXCELLENT);
}

// #############################################
// ############## WIDGET LAYOUT ################
// #############################################

async function createWidget() {
  const theme = getTheme();
  const widget = new ListWidget();
  
  // Apply gradient or solid background
  if (typeof theme.background === "object" && theme.background.type === "linear") {
    let gradient = new LinearGradient();
    gradient.colors = theme.background.colors.map(c => new Color(c));
    gradient.locations = theme.background.locations;
    widget.backgroundGradient = gradient;
  } else {
    // Fallback for solid colours
    const bgColor = new Color(theme.background);
    if (USER_CONFIG.backgroundOpacity < 1.0) {
      widget.backgroundColor = new Color(theme.background, USER_CONFIG.backgroundOpacity);
    } else {
      widget.backgroundColor = bgColor;
    }
  }

  widget.setPadding(2, 12, 12, 12);
  
  const auditData = loadAuditData();
  const progress = calculateProgress(auditData);
  const daysSince = daysSinceAudit(auditData);
  const daysUntil = daysUntilNextAudit(auditData);
  const steps = getAuditSteps();
  
  // Header
  const header = widget.addText("  PRIVACY STATUS");
  header.font = Font.boldSystemFont(12);
  header.textColor = new Color(theme.text);
  
  widget.addSpacer(10);
  
  // Real-time checks
  const locationStatus = await checkLocationStatus();
  const clipboardStatus = checkClipboardActivity();
  
  // Location indicator
  const locStack = widget.addStack();
  locStack.layoutHorizontally();
  const locDot = locStack.addText("●");
  locDot.textColor = locationStatus === "ON" ? new Color(theme.WARNING) : new Color(theme.GOOD);
  locDot.font = Font.systemFont(12);
  locStack.addSpacer(6);
  const locText = locStack.addText("LOCATION " + locationStatus);
  locText.font = Font.boldMonospacedSystemFont(10);
  locText.textColor = new Color(theme.text);
  
  widget.addSpacer(6);
  
  // Clipboard indicator
  const clipStack = widget.addStack();
  clipStack.layoutHorizontally();
  const clipDot = clipStack.addText("●");
  clipDot.textColor = clipboardStatus === "DATA" ? new Color(theme.WARNING) : new Color(theme.GOOD);
  clipDot.font = Font.systemFont(12);
  clipStack.addSpacer(6);
  const clipText = clipStack.addText("CLIPBOARD " + clipboardStatus);
  clipText.font = Font.boldMonospacedSystemFont(10);
  clipText.textColor = new Color(theme.text);
  
  widget.addSpacer(10);
  
  // Audit progress
  const statusColour = getStatusColour(progress, theme);
  const progressText = widget.addText("AUDIT: " + progress + "%");
  progressText.font = Font.boldSystemFont(12);
  progressText.textColor = statusColour;
  
  widget.addSpacer(6);
  
  // Progress bar
  const barStack = widget.addStack();
  barStack.size = new Size(0, 4);
  barStack.cornerRadius = 2;
  barStack.backgroundColor = new Color(theme.progressBackground);
  
  const bar = barStack.addStack();
  bar.size = new Size(Math.max(4, (progress / 100) * 160), 4);
  bar.backgroundColor = statusColour;
  bar.cornerRadius = 2;
  
  widget.addSpacer(6);
  
  // Countdown to next audit (if enabled and audit completed)
  if (USER_CONFIG.showCountdown && progress === 100 && daysUntil !== null) {
    const countdownStack = widget.addStack();
    countdownStack.layoutHorizontally();
    countdownStack.centerAlignContent();
    
    const countdownColour = getCountdownColour(daysUntil, theme);
    
    let countdownText;
    if (daysUntil < 0) {
      countdownText = "⏰ " + Math.abs(daysUntil) + "D OVERDUE";
    } else if (daysUntil === 0) {
      countdownText = "⏰ RE-AUDIT TODAY";
    } else if (daysUntil === 1) {
      countdownText = "⏰ RE-AUDIT TOMORROW";
    } else {
      countdownText = "NEXT AUDIT IN " + daysUntil + " D";
    }
    
    const countdown = countdownStack.addText(countdownText);
    countdown.font = Font.boldSystemFont(10);
    countdown.textColor = countdownColour;
    
    widget.addSpacer(10);
  }
  
// Status message
let statusMsg;
if (progress === 100 && daysSince !== null) {
  if (daysSince === 0) {
    statusMsg = "✓ COMPLETE";
  } else if (daysUntil !== null && daysUntil < 0) {
    statusMsg = "⚠️ RE-AUDIT NEEDED";
  } else {
    statusMsg = "✓ COMPLETED " + daysSince + "D AGO";
  }
  
  // Add completion date
  const lastAuditDate = new Date(auditData.lastAudit);
  const dateStr = lastAuditDate.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
  statusMsg += "\n" + dateStr;
  
} else {
  const remaining = steps.length - Object.keys(auditData.completedSteps).length;
  statusMsg = remaining + " STEP" + (remaining === 1 ? "" : "S") + " REMAINING";
}

const status = widget.addText(statusMsg);
status.font = Font.systemFont(10);
status.textColor = new Color(theme.textSecondary)
  
  
  widget.url = "scriptable:///run/" + encodeURIComponent(Script.name());
  
  return widget;
}

// #############################################
// ############ WALKTHROUGH GUIDED #############
// #############################################

async function runGuidedAudit() {
  const auditData = loadAuditData();
  const steps = getAuditSteps();
  
  // Main menu
  const menu = new Alert();
  menu.title = "PRIVACY CHECKLIST";
  
  const completed = Object.keys(auditData.completedSteps).length;
  const total = steps.length;
  const daysUntil = daysUntilNextAudit(auditData);
  
  let message = completed + " OF " + total + " STEPS COMPLETED";
  if (daysUntil !== null) {
    if (daysUntil < 0) {
      message += "\ RE-AUDIT OVERDUE BY " + Math.abs(daysUntil) + " DAYS";
    } else if (daysUntil === 0) {
      message += "\ RE-AUDIT DUE TODAY";
    } else {
      message += "\ NEXT AUDIT IN " + daysUntil + " DAYS";
    }
  }
  menu.message = message;
  
  menu.addAction("START/RESUME AUDIT");
  menu.addAction("REVIEW COMPLETED STEPS");
  menu.addAction("JUMP TO STEP...");
  menu.addDestructiveAction("RESET PROGRESS");
  menu.addCancelAction("CANCEL");
  
  const choice = await menu.present();
  
  if (choice === 0) {
    await walkthrough(auditData, steps);
  } else if (choice === 1) {
    await reviewCompleted(auditData, steps);
  } else if (choice === 2) {
    await jumpToStep(auditData, steps);
  } else if (choice === 3) {
    const confirm = new Alert();
    confirm.title = "RESET PROGRESS?";
    confirm.message = "THIS CLEAR ALL COMPLETED STEPS";
    confirm.addDestructiveAction("RESET");
    confirm.addCancelAction("CANCEL");
    
    if (await confirm.present() === 0) {
      saveAuditData({
        lastAudit: null,
        completedSteps: {},
        currentStep: 0
      });
      
      const done = new Alert();
      done.title = "PROGRESS RESET";
      done.message = "ALL AUDIT DATA EXPUNGED";
      done.addAction("OK");
      await done.present();
    }
  }
}

// #############################################
// ########## WALKTHROUGH STEPBYSTEP ###########
// #############################################

async function walkthrough(auditData, steps) {
  let startIndex = 0;
  for (let i = 0; i < steps.length; i++) {
    if (!auditData.completedSteps[steps[i].id]) {
      startIndex = i;
      break;
    }
  }
  
  for (let i = startIndex; i < steps.length; i++) {
    const step = steps[i];
    const isCompleted = auditData.completedSteps[step.id];
    
    const alert = new Alert();
    alert.title = "STEP " + (i + 1) + " OF " + steps.length;
    alert.message = step.question + "\N\N📋 " + step.guidance;
    
    if (isCompleted) {
      alert.addAction("✓ COMPLETED");
    } else {
      alert.addAction("MARK COMPLETE");
    }
    
    alert.addAction("OPEN SETTINGS");
    alert.addAction("SKIP");
    alert.addCancelAction("EXIT AUDIT");
    
    const response = await alert.present();
    
    if (response === 0) {
      auditData.completedSteps[step.id] = new Date().toISOString();
      auditData.currentStep = i + 1;
      
      if (i === steps.length - 1) {
        auditData.lastAudit = new Date().toISOString();
      }
      
      saveAuditData(auditData);
    } else if (response === 1) {
      Safari.open(step.url);
      
      const followup = new Alert();
      followup.title = "DID YOU COMPLETE THIS STEP?";
      followup.addAction("YES, MARK COMPLETED");
      followup.addAction("NO, ILL DO IT LATER");
      
      if (await followup.present() === 0) {
        auditData.completedSteps[step.id] = new Date().toISOString();
        auditData.currentStep = i + 1;
        
        if (i === steps.length - 1) {
          auditData.lastAudit = new Date().toISOString();
        }
        
        saveAuditData(auditData);
      }
    } else if (response === 2) {
      continue;
    } else {
      break;
    }
  }
  
  const progress = calculateProgress(auditData);
  if (progress === 100) {
    const complete = new Alert();
    complete.title = "AUDIT COMPLETE! ✅";
    complete.message = "All " + steps.length + " PRIVACY STEPS REVIEWED. NEXT AUDIT IN " + USER_CONFIG.auditReminderDays + " DAYS.";
    complete.addAction("FANTABOLOUS");
    await complete.present();
  }
}

// Review completed steps
async function reviewCompleted(auditData, steps) {
  const alert = new Alert();
  alert.title = "COMPLETED STEPS";
  
  let hasCompleted = false;
  for (const step of steps) {
    if (auditData.completedSteps[step.id]) {
      hasCompleted = true;
      const completedDate = new Date(auditData.completedSteps[step.id]);
      const daysAgo = Math.floor((new Date() - completedDate) / (1000 * 60 * 60 * 24));
      alert.addAction("✓ " + step.title + " (" + daysAgo + "D)");
    }
  }
  
  if (!hasCompleted) {
    alert.message = "NO STEPS COMPLETED YET";
  }
  
  alert.addCancelAction("BACK");
  await alert.presentSheet();
}

// Jump to specific step
async function jumpToStep(auditData, steps) {
  const alert = new Alert();
  alert.title = "JUMP TO STEP";
  alert.message = "SELECT STEP TO REVIEW";
  
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const isCompleted = auditData.completedSteps[step.id];
    const prefix = isCompleted ? "✓ " : (i + 1) + ". ";
    alert.addAction(prefix + step.title);
  }
  
  alert.addCancelAction("CANCEL");
  
  const choice = await alert.present();
  if (choice >= 0 && choice < steps.length) {
    const step = steps[choice];
    Safari.open(step.url);
  }
}

// #############################################
// ############## WIDGET EXECUTION #############
// #############################################

if (config.runsInWidget) {
  const widget = await createWidget();
  Script.setWidget(widget);
  Script.complete();
} else {
  // Running in app - give user a choice
  const alert = new Alert();
  alert.title = "PRIVACY MONITOR";
  alert.addAction("WIDGET PREVIEW");
  alert.addAction("AUDIT MENU");
  alert.addCancelAction("CANCEL");
  
  const choice = await alert.present();
  if (choice === 0) {
    const widget = await createWidget();
    await widget.presentSmall();
  } else if (choice === 1) {
    await runGuidedAudit();
  }
}

// #############################################
// ############## END OF SCRIPT ################
// #############################################