# 📱 iOS Scriptable Widgets Collection

> *Elegant, functional, and user-friendly widgets designed for Scriptable on iOS.*

---

## 📖 Table of Contents

1. [Introduction](#introduction)  
2. [Widget Overview](#widget-overview)  
3. [Script Structure](#script-structure)  
4. [Installation Guide](#installation-guide)  
5. [Customization Tips](#customization-tips)  
6. [Widget Index](#widget-index)  
7. [Appendix A: Script Anatomy](#appendix-a-script-anatomy)  
8. [Appendix B: Visual Layouts](#appendix-b-visual-layouts)  
9. [Appendix C: Troubleshooting](#appendix-c-troubleshooting)  
10. [Credits & License](#credits--license)

---

## 🧭 Introduction

Welcome to this curated set of Scriptable widgets for iOS. Each widget is designed with clarity, modularity, and accessibility in mind — whether you're a seasoned scripter or just starting out.

> *Placeholder for your personal note or design philosophy.*

---

## 🧩 Widget Overview

This repository includes **10 unique widgets**, each crafted for specific use cases:

| Widget Name        | Purpose                        | Size(s) Supported | Status |
|--------------------|--------------------------------|-------------------|--------|
| `WeatherGlass.js`  | Minimal weather with glass UI  | Small, Medium     | ✅     |
| `AgendaFlow.js`    | Daily calendar overview        | Medium, Large     | ✅     |
| `BatteryRing.js`   | Circular battery indicator     | Small             | ✅     |
| `FocusTimer.js`    | Pomodoro-style timer           | Medium            | ✅     |
| `ProbabilityCalc.js` | Dual-circle probability tool | Medium            | 🧪     |
| `QuotePulse.js`    | Ambient quote display          | Small, Medium     | ✅     |
| `StepsTracker.js`  | HealthKit step count           | Medium            | ✅     |
| `SunsetArc.js`     | Visual sunset countdown        | Small             | ✅     |
| `AppGrid.js`       | Launchable app icons grid      | Medium, Large     | ✅     |
| `MoodMeter.js`     | Emoji-based mood tracker       | Small             | ✅     |

---

## 🛠️ Script Structure

Each widget follows a modular structure for clarity and ease of customization:

```js
// === CONFIGURATION ===
const settings = {
  theme: 'tealGlass',
  showLabels: true,
  cornerRadius: 12,
};

// === DATA FETCHING ===
async function fetchData() {
  // API calls or local data
}

// === RENDERING ===
function createWidget(data) {
  const widget = new ListWidget();
  // Layout logic here
  return widget;
}

// === EXECUTION ===
let data = await fetchData();
let widget = createWidget(data);
Script.setWidget(widget);
Script.complete();
}
```


## 📥 Installation Guide

1. Install [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) from the App Store.  
2. Clone or download this repository.  
3. Copy the desired `.js` file into Scriptable.  
4. Add the widget to your home screen and select the script.

---

## 🎨 Customization Tips

- **Themes**: Most widgets support multiple color palettes (e.g., `tealGlass`, `sunsetFade`, `grayscaleCity`).  
- **Labels**: Toggle label visibility via `showLabels` in the config.  
- **Spacing**: Adjust padding and alignment for different screen sizes.

---

## 🗂️ Widget Index

Each widget has its own subfolder or script file with:

- `README-widgetname.md` *(optional)* for widget-specific notes  
- `widgetname.js` — the main script  
- `preview.png` — optional visual preview

---

## 📎 Appendix A: Script Anatomy

> *Placeholder for deeper breakdown of reusable functions, DrawContext tricks, or layout modules.*

---

## 🧮 Appendix B: Visual Layouts

> *Placeholder for diagrams or notes on pixel spacing, circle placement, or percentage label alignment.*

---

## 🧯 Appendix C: Troubleshooting

- **Widget not updating?** Ensure Background App Refresh is enabled for Scriptable.  
- **Layout misaligned?** Try adjusting `cornerRadius` or `padding` values.  
- **Data not loading?** Check API keys or permissions (e.g., HealthKit, Calendar).

---

## 🙌 Credits & License

Crafted by [Michael](https://github.com/yourusername) with ❤️ and a designer’s eye.  
Licensed under the MIT License. See [LICENSE](LICENSE) for details.
