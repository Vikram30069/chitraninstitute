# 🎨 Chitran Institute — Official Website & Course Discovery Platform

> **The Centre for Fine & Performing Arts**  
> *Affiliated to Indian Fine Art Association (IFAA) • MSME Certified (Govt. of India)*  
> Ashok Nagar, Hyderabad • Est. 2003

---

## 🌟 Overview

**Chitran Institute** is a premier fine arts, music, dance, and skill academy in Hyderabad with over 23 years of pedagogical heritage. Guided by Suryachandra Awardee Guru Rajkumar Banerjee, the institute provides personalized artistic training with small batch sizes (limited to 8 students per batch).

This repository contains the high-conversion, responsive website with interactive course discovery, predictive search, structured mega menus, and an interactive WhatsApp inquiry modal.

---

## 🚀 Key Features

### 1. 🔍 Header Quick Search with Predictive Autocomplete
- Sticky header search bar allowing instant course lookup (e.g., typing *"Key..."* suggests *"Keyboard & Piano (Trinity College London)"*).
- Keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`) and mobile-friendly suggestions.

### 2. 🏛️ Unified Multi-Discipline Mega Menus
- Structured dropdowns providing equal visual hierarchy for:
  - **Drawing & Fine Arts:** Pencil Sketching, Oil Realism, Watercolors, Acrylic, Tanjore 22K Gold Foil, Palette Knife 3D, Charcoal, Pastels & Glass.
  - **Music Academy:** Keyboard & Piano (Trinity College syllabus), Acoustic/Electric Guitar, Carnatic Vocal, Hindustani Vocal, Violin & String Ensemble, Drums & Percussion.
  - **Dance Studio:** Hip-Hop & Street Dance, Bollywood Commercial, Contemporary & Lyrical, Classical Foundations, Kids Junior Troupe, Western Freestyle.

### 3. 🎯 Interactive 3-Way Course Filter Bar
- Dynamic horizontal filter bar with 3 dropdown criteria:
  - **Age Group:** Kids (Ages 4-12), Teens (Ages 13-17), Adults (18+ / Working Professionals).
  - **Interest Area:** Drawing & Painting, Instrumental & Vocal Music, Western & Classical Dance, Handwriting Improvement.
  - **Learning Goal:** Creative Hobby / Passion, Certification / Trinity Grade Exam.
- **Real-Time Counter Button:** Previews match counts in real time (e.g., `Show 2 Courses` or `Show All 4 Courses`).

### 4. 💬 Consolidated WhatsApp Floating Action Button (FAB)
- Replaced cluttered repetitive buttons with a single, elegant floating WhatsApp FAB.
- Triggers an interactive modal allowing students/parents to pick their course, choose student age group, and initiate a pre-filled, URL-encoded chat with admissions.

### 5. 📱 Zero Horizontal Overflow Mobile Architecture
- Rigorously tested and verified across 8 viewports (320px iPhone SE, 360px Galaxy, 375px iPhone 8, 390px iPhone 14, 412px Pixel, 768px iPad Mini, 1024px iPad Pro, 1280px Desktop) with 0 clipping or scrollbar overflows.
- Persistent mobile bottom dock (< 768px) with one-touch Call, WhatsApp, and Trial booking actions.

### 6. 📈 Comprehensive SEO & Schema.org Blueprint
- Full JSON-LD structured schemas (`schema/`):
  - `LocalBusiness` schema with geo-coordinates, operating hours, and accreditation.
  - `Course` schemas for each artistic discipline.
  - `FAQPage` schema targeting high-intent local voice searches.

---

## 📂 Repository Structure

```text
chitraninstitute/
├── preview/                     # Complete multi-page website
│   ├── index.html               # Homepage with Slider, Filter, and Course Showcase
│   ├── drawing.html             # Fine Arts & Canvas Painting discipline page
│   ├── music.html               # Keyboard, Guitar & Vocal discipline page
│   ├── dance.html               # Western & Classical Dance discipline page
│   ├── handwriting.html         # 1-Month Handwriting Improvement page
│   ├── achievements.html        # Student awards, gallery & press honors
│   ├── summercamp.html          # Annual summer workshop & camp page
│   ├── events.html              # Stage performances & art exhibitions
│   ├── location.html            # Google Maps embed, directions & contact
│   ├── styles.css               # Aarabhi cinematic theme design system
│   ├── app.js                   # Search autocomplete, filter & modal logic
│   └── assets/images/           # High-resolution optimized visual assets
├── content/                     # Conversion-focused landing page copy
├── docs/                        # Deployment and styling guides
├── schema/                      # Schema.org JSON-LD microdata
├── seo-blueprint/               # Master SEO keyword matrices & 301 redirect map
├── templates/                   # Elementor / WordPress JSON templates
├── .gitignore                   # Standard clean gitignore
└── README.md                    # Project documentation
```

---

## 💻 Local Development Setup

To preview and run the website locally:

```bash
# Clone the repository
git clone https://github.com/Vikram30069/chitraninstitute.git

# Navigate into the preview directory
cd chitraninstitute/preview

# Start a local web server (Python 3)
python -m http.server 8085
```

Open [http://localhost:8085/index.html](http://localhost:8085/index.html) in any modern browser.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic architecture, accessible ARIA roles, structured schema microdata.
- **CSS3:** Custom properties (CSS variables), Flexbox, CSS Grid, Aarabhi gold/crimson color palette, responsive glassmorphism.
- **JavaScript (ES6+):** Pure vanilla JavaScript for zero-dependency speed, instant autocomplete index, DOM filtering, and modal interaction.
