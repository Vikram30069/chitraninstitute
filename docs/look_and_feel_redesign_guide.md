# Chitran Institute – Website Look & Feel Redesign Guide
## Transforming `chitraninstitute.com` into a World-Class Fine Arts & Performing Arts Academy

This guide outlines the complete visual redesign for Chitran Institute, referencing **[Aarabhi](https://www.aarabhi.in/)** and **[Talent Hub India](https://talenthubindia.com/)**, along with clear instructions to deploy the changes in WordPress & Elementor.

---

## 1. Visual Comparison: Before vs. After

| Element | Old Website (Current Look) | New Redesigned Look (Aarabhi + TalentHub) |
| :--- | :--- | :--- |
| **Color Scheme** | Acidic fluorescent yellow (`#FFFF00`) covering header & hero, harsh red & purple text | **Warm Canvas Pearl (`#FDFBF7`)**, **Deep Ink Slate (`#0F172A`)**, and **Heritage Saffron Gold (`#D97706`)** |
| **Header** | Stretched, pixelated raster banner image; plain red links | **Clean Glassmorphic Sticky Header** with crisp vector emblem, phone, email, WhatsApp, and "Book Free Trial" CTA |
| **Hero Section** | Plain unformatted text on yellow background, low contrast | **Prestige Split Hero** with H1 serif typography, trust checklist, floating badges, and high-res art studio imagery |
| **Course Discovery** | Plain lists or buried text | **4 Discipline Hubs (TalentHub style)** with category pills, curriculum tags, age badges, and direct links |
| **Achievements** | Dark photos with heavy 2px solid red and blue outlines; illegible text | **Elegant Wall of Fame** with gold laurel badges, clean white cards, soft shadows, and interactive category tabs |
| **Heritage & Story** | Scattered mentions | **Guru-Shishya Ethos & 20+ Years Legacy (Aarabhi style)** with founder's quote and IFAA affiliation proof |
| **Mobile UX** | Stretched images, overflowing tables | **Fully responsive design** optimized for smartphones, tablets, and desktops |

---

## 2. Design System Tokens & Brand Palette

### A. Color Palette
- **Base Canvas**: `#FDFBF7` (Warm Fine Arts Ivory — reduces eye fatigue by 100% compared to `#FFFF00`)
- **Card Surfaces**: `#FFFFFF` (Pure White with subtle border `#E2E8F0`)
- **Muted Section Fill**: `#F6F3EB` (Soft Warm Gray for alternate sections)
- **Dark Premium Sections**: `#0F172A` / `#1E293B` (For CTAs and Footer)
- **Primary Brand Accent**: `#D97706` / `#B45309` (Warm Saffron & Indian Fine Arts Ochre)
- **Discipline Badges**:
  - 🎨 **Fine Arts**: `#EA580C` (Terracotta)
  - 🎹 **Music**: `#4F46E5` (Royal Indigo)
  - 💃 **Dance**: `#E11D48` (Vibrant Rose)
  - ✍️ **Handwriting & Abacus**: `#0D9488` (Emerald Teal)

### B. Typography
- **Headings (H1, H2, H3)**: `'Playfair Display'`, serif, 700 weight (Prestige, cultural elegance like Aarabhi)
- **Subheadings, UI & Body**: `'Plus Jakarta Sans'`, sans-serif, 400–600 weight (Clean, modern readability like TalentHub)

---

## 3. Step-by-Step Deployment in WordPress & Elementor

### Step 1: Set Global Colors & Fonts in Elementor
1. Log in to your WordPress Admin (`/wp-admin/`).
2. Go to **Pages** > **All Pages** > Click **Edit with Elementor** on any page (or the Home page).
3. Click the **Hamburger Menu (≡)** in the top-left of the Elementor panel > Click **Site Settings**.
4. Under **Global Colors**, update:
   - **Primary**: `#0F172A` (Deep Slate)
   - **Secondary**: `#D97706` (Saffron Gold)
   - **Text**: `#475569` (Slate Gray)
   - **Accent**: `#EA580C` (Warm Terracotta)
5. Under **Global Fonts**, update:
   - **Primary (Headings)**: `Playfair Display`, 700 weight
   - **Secondary & Body**: `Plus Jakarta Sans`, 400/500 weight
6. Click **Update** to save.

---

### Step 2: Import the New Homepage Template
We have created the full Elementor JSON template in your workspace:
[`templates/elementor_homepage_redesign_template.json`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/templates/elementor_homepage_redesign_template.json)

1. In WordPress Admin, go to **Templates** > **Saved Templates**.
2. Click **Import Templates** at the top.
3. Select `c:\Users\Lenovo\OneDrive\Desktop\chitraninstitute\templates\elementor_homepage_redesign_template.json`.
4. Click **Import Now**.
5. Once imported, go to **Pages** > Edit **Home** with Elementor.
6. Click the **Folder Icon (Add Template)** > Go to **My Templates** > Find **Chitran Institute - Modern Homepage Redesign** > Click **Insert**.
7. Adjust images or text as desired, then click **Update / Publish**!

---

### Step 3: Clean Up the Header (Remove Old Banner)
1. Go to **Appearance** > **Customize** (or **Elementor Header & Footer Builder** depending on your theme).
2. Remove the stretched yellow banner bitmap (`CHITRAN INSTITUTE OF DRAWING & PAINTING...`).
3. Replace with a clean white or ivory navbar:
   - Left: Circular Chitran logo emblem + text.
   - Center: Menu links (*Home, Courses, Our Heritage, Achievements, Reviews, Contact*).
   - Right: Phone (`+91 9866150378`) + WhatsApp button + "Book Free Trial" CTA.

---

### Step 4: Remove the Harsh Red/Blue Borders in Achievements
1. In Elementor, locate the current **Achievements and Events** section with the red and blue borders (`border: 2px solid red`).
2. Replace them with the clean **Award Icon Cards** included in the new template (white card background, soft shadow `0 10px 25px rgba(0,0,0,0.06)`, and warm gold badges).

---

## 4. Live Prototype Preview
You can preview the live, interactive design locally anytime:
- Open [`preview/index.html`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/preview/index.html) in your browser.
- Or visit `http://localhost:8099` while the local server is running.
