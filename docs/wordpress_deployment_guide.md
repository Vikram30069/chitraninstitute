# WordPress & Elementor Deployment Guide for Chitran Institute

This actionable guide walks you through deploying the new SEO architecture, importing Elementor landing page templates, activating essential SEO/SMTP plugins, and configuring structured data on `chitraninstitute.com`.

---

## 1. Plugin Management & Recommendations

Based on your current WordPress plugin inventory:

### A. Recommended Plugin Activations (Already Installed)
1. **All in One SEO (AIOSEO)** (Currently Inactive)
   - **Action**: Click `Activate` on the Plugins screen.
   - **Why**: Handles XML sitemaps, automated `<title>` and `<meta description>` templates, Google Search Console verification, and Schema graph output.
2. **WP Mail SMTP** (Currently Inactive)
   - **Action**: Click `Activate` and configure Gmail / SendGrid / SMTP.
   - **Why**: Ensures that inquiry emails from **Ninja Forms** or **Elementor Forms** never land in spam or get lost.

### B. Safe Plugin Updates (UpdraftPlus Backup is Complete! 🎉)
Since you completed your backup today using **UpdraftPlus**, you can safely bulk-update the outdated plugins:
- **Elementor & PRO Elements** (Update PRO Elements to 4.2.2 and Essential Addons)
- **LiteSpeed Cache** (Update to v7.9 for maximum performance and caching speed)
- **BetterDocs, SchedulePress, MaxUploader, Joinchat**

---

## 2. Importing the Elementor Landing Page Template

We have created an importable Elementor template in [`templates/elementor_service_landing_template.json`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/templates/elementor_service_landing_template.json).

### Step-by-Step Import Instructions:
1. Log in to WordPress Admin (`/wp-admin/`).
2. Navigate to **Templates** > **Saved Templates** > Click **Import Templates** at the top.
3. Choose the file `elementor_service_landing_template.json` from `c:\Users\Lenovo\OneDrive\Desktop\chitraninstitute\templates\`.
4. Click **Import Now**.
5. Once imported, you can reuse this high-converting layout for:
   - `/art-classes-hyderabad/`
   - `/drawing-classes-hyderabad/`
   - `/music-classes-hyderabad/`
   - `/keyboard-classes-hyderabad/`
   - `/handwriting-classes-hyderabad/`
   - `/online-classes/`

---

## 3. Creating the New Pages in WordPress

Follow the Master SEO Matrix in [`seo-blueprint/master_seo_matrix.csv`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/seo-blueprint/master_seo_matrix.csv):

### Recommended Phase 1 Page Creation (Top 5 Priority Pages):
1. **Drawing & Painting Hub** (`/art-classes-hyderabad/`)
   - Parent: None (Top level)
   - Content: Copy from [`content/drawing_painting_landing_page.md`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/content/drawing_painting_landing_page.md)
2. **Drawing Classes in Hyderabad** (`/drawing-classes-hyderabad/`)
   - Parent: `/art-classes-hyderabad/`
3. **Music Classes Hub** (`/music-classes-hyderabad/`)
   - Content: Copy from [`content/keyboard_music_landing_page.md`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/content/keyboard_music_landing_page.md)
4. **Keyboard & Piano Classes** (`/keyboard-classes-hyderabad/`)
   - Parent: `/music-classes-hyderabad/`
5. **Handwriting Improvement Classes** (`/handwriting-classes-hyderabad/`)
   - Content: Copy from [`content/handwriting_improvement_landing_page.md`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/content/handwriting_improvement_landing_page.md)

---

## 4. Cleaning Up the Contact Page (`/contact/`)

1. Go to **Pages** > **All Pages** > Click **Edit with Elementor** on the **Contact** page.
2. Locate the FAQ section containing the dummy text (*"Breakfast procuring nay end happiness allowance..."*).
3. Replace the entire section with the verified Q&As from [`content/contact_and_local_seo_cleanup.md`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/content/contact_and_local_seo_cleanup.md).
4. Update the contact details to match the certified NAP:
   - **Street Number 10, P & T Colony, Ashok Nagar, Himayatnagar, Hyderabad, Telangana 500020**
   - **+91 9866150378 / +91 9291565318**
   - **chitrandsp@gmail.com**

---

## 5. Adding Schema.org Structured Data (JSON-LD)

To get Google Rich Snippets, add the JSON-LD schemas we prepared:
1. **LocalBusiness Schema**: Open [`schema/local_business_schema.json`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/schema/local_business_schema.json).
2. Go to **All in One SEO** > **Search Appearance** > **Advanced** > or paste into the site header via Elementor Header/Footer Builder (Ultimate Addons for Elementor / UAE).
3. For individual course pages, paste the corresponding course snippet from [`schema/course_schemas.json`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/schema/course_schemas.json) into the Custom Code or Header script section.

---

## 6. Configuring 301 Redirects

To prevent broken links and retain traffic from older indexed pages:
1. Go to **AIOSEO** > **Redirects** (or install the free *Redirection* plugin if preferred).
2. Add the redirects defined in [`seo-blueprint/url_redirect_map.csv`](file:///c:/Users/Lenovo/OneDrive/Desktop/chitraninstitute/seo-blueprint/url_redirect_map.csv):
   - `/courses-offered/` ➔ `/art-classes-hyderabad/` (301)
   - `/recent-achievements/` ➔ `/student-achievements/` (301)
   - `/events/` ➔ `/summer-camp-workshops/` (301)

---

## 7. Performance & Cache Optimization (LiteSpeed Cache)

With **LiteSpeed Cache** and **Elementor Image Optimizer** active on your Hostinger server:
1. Go to **LiteSpeed Cache** > **Page Optimization**:
   - Enable CSS Minify & Combine (test in incognito).
   - Enable JS Minify.
   - Enable Lazy Load Images.
2. Go to **Image Optimizer**:
   - Run bulk optimization to convert heavy JPG/PNG files to next-gen **WebP** formats.
3. Purge all cache via LiteSpeed top admin bar icon.
