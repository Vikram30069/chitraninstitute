/* ==========================================================================
   CHITRAN INSTITUTE - INTERACTIVE PROTOTYPE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu on click of nav link or dropdown item
    document.querySelectorAll('.nav-link, .drawing-type-item, .dropdown-sub-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          navMenu.classList.remove('mobile-open');
        }
      });
    });

    // On mobile, tap on dropdown trigger toggles dropdown
    document.querySelectorAll('.nav-item-dropdown .dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const parent = trigger.closest('.nav-item-dropdown');
          const isOpen = parent.classList.contains('mobile-dropdown-open');
          document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('mobile-dropdown-open'));
          if (!isOpen) {
            parent.classList.add('mobile-dropdown-open');
          }
        }
      });
    });
  }

  // 3. Achievements Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const achievementCards = document.querySelectorAll('.achievement-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      achievementCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3b. Google Reviews Category Filter Tabs
  const googleFilterBtns = document.querySelectorAll('.google-filter-btn');
  const googleReviewCards = document.querySelectorAll('.google-review-card');

  if (googleFilterBtns.length > 0 && googleReviewCards.length > 0) {
    googleFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        googleFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        googleReviewCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filter === 'all' || categories.split(' ').includes(filter)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.35s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Trial Form Handling with WhatsApp Redirection
  const trialForm = document.getElementById('trialForm');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('studentName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const course = document.getElementById('courseSelect').value;
      const batch = document.getElementById('batchType').value;

      if (!name || !phone || !course || !batch) {
        alert('Please fill in all required fields.');
        return;
      }

      // Build WhatsApp message
      const message = `*Free Trial & Assessment Request - Chitran Institute*%0A%0A` +
        `*Student Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Course:* ${encodeURIComponent(course)}%0A` +
        `*Learning Mode:* ${encodeURIComponent(batch)}%0A%0A` +
        `Please confirm availability for the trial class.`;

      const whatsappUrl = `https://wa.me/919866150378?text=${message}`;

      // Show confirmation toast
      const btn = trialForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Assessment Booked! Opening WhatsApp...';
      btn.style.background = '#059669';

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        btn.innerHTML = originalText;
        btn.style.background = '';
        trialForm.reset();
      }, 1200);
    });
  }

  // 5. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 6. Aarabhi-Style Full-Bleed Hero Slider Engine
  const slides = document.querySelectorAll('.aarabhi-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const disciplineTabs = document.querySelectorAll('.discipline-tab');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const heroSlider = document.getElementById('hero');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval = null;
  const SLIDE_DURATION = 5500; // 5.5 seconds per slide

  function updateSlider(index) {
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    disciplineTabs.forEach((tab, i) => {
      if (i === currentSlide) {
        tab.classList.add('active');
        if (window.innerWidth <= 768 && typeof tab.scrollIntoView === 'function') {
          try {
            tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } catch(e) {}
        }
      } else {
        tab.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    updateSlider(currentSlide + 1);
  }

  function prevSlide() {
    updateSlider(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateSlider(targetIndex);
      startAutoplay();
    });
  });

  disciplineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetIndex = parseInt(tab.getAttribute('data-target'), 10);
      updateSlider(targetIndex);
      startAutoplay();
    });
  });

  // Global function for header links to switch slides
  window.goToSlide = function (index) {
    updateSlider(index);
    startAutoplay();
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pause on mouse hover & resume on mouse leave
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', startAutoplay);

    // Precise Directional Touch Swipe Support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    heroSlider.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Trigger horizontal slide transition only if horizontal swipe dominates vertical gesture
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          if (diffX > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          startAutoplay();
        }
      }
    }, { passive: true });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    }
  });

  // Start initial autoplay
  startAutoplay();

  // 7. Interactive 8-Module Syllabus & Mastery Pathway Engine (TalentHub-Inspired Elevated Stepper)
  const stepsGridContainer = document.getElementById('stepsGridContainer');
  const moduleDeepDiveCard = document.getElementById('moduleDeepDiveCard');

  const SYLLABUS_DATA = {
  "drawing": {
    "disciplineKey": "drawing",
    "name": "Drawing, Sketching & Master Fine Arts",
    "faculty": "Guru Rajkumar Banerjee (Suryachandra Awardee, 20+ Yrs Exp) & Mrs. Sujata Banerjee (Principal)",
    "affiliation": "Affiliated to Indian Fine Art Association (IFAA) • Govt. MSME Certified",
    "modules": [
      {
        "moduleNum": 1,
        "stepName": "M1: Shading & Lines",
        "title": "The Awakening of the Hand: Freehand Linework & Chiaroscuro Shading",
        "duration": "6 Months",
        "level": "Foundational / Beginner",
        "certification": "IFAA Foundation Level 1 Certificate",
        "desc": "The sacred beginning where the aspiring artist learns to see the world not as rigid names, but as luminous values, negative spaces, and graceful contours. We deconstruct subconscious habits, retraining the wrist and fingers to wield graphite with breath-like sensitivity—progressing from pure geometric solids into living, breathing still-life forms imbued with depth, light, and shadow.",
        "techniques": [
          "Dynamic tripod grip calibration and fluid shoulder-pivot stroke mechanics",
          "Continuous contour sighting, cross-hatching, and micro-stippling textures",
          "2B to 8B graphite pressure graduation and 9-step tonal scale mastery",
          "Chiaroscuro lighting dynamics: core shadows, penumbra, cast shadows, and specular highlights"
        ],
        "mediums": [
          "Staedtler Mars Lumograph & Faber-Castell 9000 Pencils (2B, 4B, 6B, 8B)",
          "160 GSM Acid-Free Natural Grain Cartridge Drawing Paper",
          "Monozero Precision Erasers, Kneaded Dough Erasers & Blending Tortillons"
        ],
        "milestones": [
          "Complete 12-stage geometric volume and reflective surface study",
          "Render a multi-object still-life composition with accurate cast-shadow physics",
          "Curate the foundational student sketchbook portfolio for IFAA Level 1 review"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 1 (Foundational Linework & Chiaroscuro Shading)."
      },
      {
        "moduleNum": 2,
        "stepName": "M2: Perspective Depth",
        "title": "The Architecture of Space: Vanishing Horizons & Structural Perspective",
        "duration": "6 Months",
        "level": "Foundational / Intermediate",
        "certification": "IFAA Grade 2 Structural Perspective Award",
        "desc": "Unlocking the secret geometry behind three-dimensional reality. Students learn the mathematics of spatial depth, transforming a flat two-dimensional surface into vast architectural vistas and intimate indoor chambers. Every line converges with mathematical precision toward distant horizons, cultivating the rigorous visual sighting required for fine arts mastery and architectural competitive entrance (NATA/BFA).",
        "techniques": [
          "1-Point, 2-Point, and 3-Point worm’s-eye and bird’s-eye vanishing line geometry",
          "Foreshortening of organic cylinders, ellipses, and rotational volumes in space",
          "Atmospheric perspective: tonal diminution, edge softness, and spatial haze",
          "Architectural sighting using proportional dividers, plumb lines, and angle finders"
        ],
        "mediums": [
          "Sakura Pigma Micron Technical Fineliners (0.05mm, 0.1mm, 0.3mm, 0.5mm)",
          "Technical Drafting Pencils (2H, H, HB, 2B) & Isometric Grid Grids",
          "T-Squares, Set-Squares, Proportional Sighting Sticks & Kneaded Erasers"
        ],
        "milestones": [
          "Render 2 historic Hyderabad architectural heritage streetscapes with accurate vanishing points",
          "Complete an intricate multi-level interior perspective study with cast window illumination",
          "Attain certified NATA & BFA foundational perspective portfolio clearance"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 2 (Architectural Perspective & Spatial Depth)."
      },
      {
        "moduleNum": 3,
        "stepName": "M3: Color & Pastels",
        "title": "The Chromatic Spectrum: Pure Pigment Harmony, Soft & Oil Pastels",
        "duration": "6 - 9 Months",
        "level": "Intermediate Mastery",
        "certification": "IFAA Grade 3 Chromatic Colorist Badge",
        "desc": "Bursting out of monochrome into the intoxicating world of pure chromatic pigment. Students delve into the physics and emotion of color, mastering warm versus cool temperatures, optical color mixing, and the velvety textural richness of pastels. Fingers become brushes as pigments are worked directly into toothy archival surfaces to evoke glowing sunsets, succulent botanicals, and atmospheric portraits.",
        "techniques": [
          "Itten 12-hue color wheel, split-complementary harmonies, and chromatic saturation",
          "Optical color blending, scumbling, and delicate dry finger feathering",
          "Sgraffito pigment etching, masking, and tonal contrast balancing",
          "Color temperature orchestration: warm radiant sunlight against cool atmospheric shadows"
        ],
        "mediums": [
          "Sennelier Paris & Mungyo Gallery Extra-Soft Artist Pastels",
          "Camel Heavy Artists’ Oil Pastels & Archival Pigment Fixatives",
          "Canson Mi-Teintes 160 GSM Textured Velvet Pastel Sheets (Earth & Dark Tones)"
        ],
        "milestones": [
          "Render a luminous sunset seascape with atmospheric cloud refraction and water glare",
          "Create a hyper-realistic fruit and botanical still life capturing velvety skin blooms",
          "Submit a professionally framed pastel masterpiece for the Annual Chitran Academy Exhibition"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 3 (Color Harmony, Soft & Oil Pastels)."
      },
      {
        "moduleNum": 4,
        "stepName": "M4: Watercolors",
        "title": "The Poetry of Luminosity: Transparent Watercolor & Wet-on-Wet Flow",
        "duration": "6 - 9 Months",
        "level": "Intermediate / Luminous Arts",
        "certification": "IFAA Grade 4 Watercolor Guild Diploma",
        "desc": "The most unforgiving yet sublime of all fine art mediums. Here, the artist surrenders to the fluid alchemy of water, air, and pigment on pure cotton rag. Students master the subtle discipline of timing—knowing the exact second when wet meets damp—to paint ethereal monsoon mists, glistening water reflections, and delicate botanical petals while preserving the untouched virgin white of the paper.",
        "techniques": [
          "Wet-on-wet spontaneous pigment blooms, wet-on-dry edge definition, and glazing washes",
          "Variegated, flat, and atmospheric gradient washes across large sky surfaces",
          "Preservation of luminous negative whites using precision masking fluid and wax resist",
          "Dry-brush organic texturing for weathered wood, rugged stones, and glistening ripples"
        ],
        "mediums": [
          "Winsor & Newton Professional Artists’ Watercolor Tubes & Half-Pans",
          "Arches & Saunders Waterford 300 GSM 100% Cotton Cold-Pressed Sheets",
          "Pure Kazan Squirrel Mop Brushes, Flat Hake Brushes & Escoda Sable Riggers"
        ],
        "milestones": [
          "Paint an evocative Indian monsoon landscape capturing rain mist and shimmering reflections",
          "Render a translucent botanical orchid study revealing microscopic petal vein structures",
          "Official entry piece for the State-Level Watercolor Guild Painting Competition"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 4 (Transparent Watercolor & Wet-on-Wet)."
      },
      {
        "moduleNum": 5,
        "stepName": "M5: Canvas Acrylic",
        "title": "The Contemporary Canvas: Stretched Cotton & 3D Palette Knife Impasto",
        "duration": "9 - 12 Months",
        "level": "Upper Intermediate / Studio Artist",
        "certification": "IFAA Grade 5 Canvas Master Award",
        "desc": "Stepping up to the heavy wooden studio easel. Students experience the thrill of working on genuine stretched cotton canvases with heavy-body artist acrylics and Italian stainless steel palette knives. Moving beyond flat brushstrokes, they sculpt sculptural 3D relief, mix custom medium gels, and create tactile modern abstracts and vivid figurative masterpieces that command wall space.",
        "techniques": [
          "Palette knife buttering, knife carving, impasto relief sculpting, and edge scraping",
          "Custom canvas stretching on kiln-dried strainers, sizing, and multi-layer gesso priming",
          "Color blocking, acrylic glazing mediums, and retarder chemistry for extended blending",
          "Final archival finishing: isolation coats, UV-protective gloss, and satin varnishing"
        ],
        "mediums": [
          "Liquitex Professional Heavy-Body Acrylics & Modeling Paste Gel Mediums",
          "Custom Stretched 100% Cotton Duck & Belgian Linen Canvases (24” x 36”)",
          "RGM Italian Stainless Steel Flexible Palette Knives (Sizes 10, 44, 102)"
        ],
        "milestones": [
          "Complete 2 large stretched canvas gallery-ready contemporary paintings",
          "Create 1 sculptural palette knife floral or modern architectural impasto canvas",
          "Studio wall showcase and critique under Principal Mrs. Sujata Banerjee"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 5 (Stretched Canvas Acrylic & 3D Palette Knife)."
      },
      {
        "moduleNum": 6,
        "stepName": "M6: European Oils",
        "title": "The Renaissance Heritage: Classical European Oils, Sfumato & Portrait Realism",
        "duration": "9 - 12 Months",
        "level": "Advanced Classical Mastery",
        "certification": "IFAA Grade 6 Master of Classical Oils",
        "desc": "Mentored directly by Suryachandra Awardee Guru Rajkumar Banerjee, students embark on the timeless path of Old World masters. Mastering the chemical sanctity of fat-over-lean, building luminous grisaille underpaintings, and whispering Leonardo da Vinci’s smoky sfumato across delicate facial planes. The result is lifelike human portraiture where eyes sparkle with soul and skin breathes with living warmth.",
        "techniques": [
          "Fat-over-lean archival layering: balancing stand oil, refined turpentine, and damar varnish",
          "Grisaille monochrome and raw umber imprimatura tonal foundation mapping",
          "Leonardo da Vinci’s smoky sfumato edge transitions and Rembrandt chiaroscuro dramatics",
          "Facial anatomy, ocular iris reflections, flesh tone temperature shifts, and translucent skin glazes"
        ],
        "mediums": [
          "Old Holland & Winsor & Newton Professional Artists’ Oil Colors & Stand Oils",
          "Hand-Primed Belgian Linen Canvas Panels & Heavy Stretched Linen",
          "Chungking Hog Bristle Filberts, Kolinsky Red Sable Rounds & Soft Fan Blenders"
        ],
        "milestones": [
          "1 Master-copy classical portrait capturing psychological depth and translucent human skin",
          "1 Dutch-style vanitas still life rendering crystal glass transparency, velvet, and burnished brass",
          "Nomination for the Pondicherry Art Academy National Painting Competition under Rajkumar Sir"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 6 (Classical European Oils & Portrait Realism)."
      },
      {
        "moduleNum": 7,
        "stepName": "M7: Tanjore 22K Gold",
        "title": "The Sacred Temple Heritage: 22K Gold Foil Tanjore & Mukkoottu Relief Craft",
        "duration": "9 - 12 Months",
        "level": "Master Artisan / Sacred Arts",
        "certification": "Chitran Heritage Master Artisan Diploma",
        "desc": "A sacred journey into the 16th-century royal art of the Thanjavur court. Students craft majestic divine heirlooms upon seasoned marine teakwood boards. Through hand-poured Mukkoottu limestone gesso paste, they sculpt three-dimensional temple arches, crowns, and jewelry, embed dazzling Jaipur semi-precious stones, and hand-gild genuine 22-karat pure gold leaf that will gleam untarnished for generations.",
        "techniques": [
          "Preparation of sacred Mukkoottu paste: purified unslaked chalk powder, gum arabic & stone binder",
          "Freehand 3D squeeze-bottle cone embossing for temple pillars, prabhavalis, and crown jewelry",
          "Traditional gemstone setting: embedded Jaipur cut stones, red kundan gems, and freshwater pearls",
          "Water-gilding and agate stone burnishing of certified 22-Karat pure gold leaves over relief"
        ],
        "mediums": [
          "Seasoned Marine Plywood / Teakwood Substrates pasted with Hand-Woven Cotton Cloth",
          "Certified 22-Karat Pure Gold Leaf Booklets (Genuine Sovereign Gold Leaves)",
          "Authentic Cut Jaipur Gemstones, Faceted Kundan Stones & Seed Pearls",
          "Traditional Limestone Mukkoottu Gesso Paste & Natural Mineral Pigments"
        ],
        "milestones": [
          "Complete 1 majestic sacred Tanjore painting (Lord Balaji, Yashoda Krishna, or Devi Lakshmi)",
          "Traditional custom Chettinad antique teakwood glass frame mounting with gold bead border",
          "Creation of an authenticated family heirloom valued as an investment and sacred masterpiece"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 7 (Tanjore 22K Gold Foil Painting & Relief)."
      },
      {
        "moduleNum": 8,
        "stepName": "M8: IFAA Diploma",
        "title": "The Master’s Capstone: Solo Exhibition Curation & IFAA Master Diploma",
        "duration": "12 Months",
        "level": "Professional Maestro / Graduation",
        "certification": "IFAA Recognized Master Diploma in Fine Arts (Govt. MSME Affiliated)",
        "desc": "The crowning graduation of the Chitran pilgrimage. The student steps forward as an autonomous artistic voice. Synthesizing eight modules of discipline into an individual conceptual thesis, students produce a museum-grade 15-piece signature portfolio, curate an independent gallery solo exhibition, and undergo formal evaluation by national jurors to be awarded the prestigious IFAA Master Diploma.",
        "techniques": [
          "Thematic artistic voice development, signature conceptual thesis, and series development",
          "Museum-grade exhibition curation: spatial flow, lighting geometry, and spectator narrative",
          "Professional artist statement formulation, catalog typography, and provenance documentation",
          "Art commerce, intellectual property copyright, gallery representation, and auction valuation"
        ],
        "mediums": [
          "Comprehensive Master Mediums: Oils, Acrylics, Tanjore Gold, Watercolors & Mixed Media",
          "Museum-Grade Archival Cotton, Linen & Teakwood Substrates with Archival Framing"
        ],
        "milestones": [
          "Curate a 15-piece signature graduation portfolio spanning multiple fine art mediums",
          "Featured solo exhibition wall at the Annual Chitran Fine Art Gala & Public Exhibition",
          "Formal Convocation Ceremony and award of the IFAA Master Diploma in Fine Arts"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Drawing Module 8 (IFAA Master Diploma & Solo Exhibition Curation)."
      }
    ]
  },
  "music": {
    "disciplineKey": "music",
    "name": "Instrumental, Vocal & Percussion Music Academy",
    "faculty": "Vikram Sir (Keyboard, Piano, Guitar, Drums), Sumayukthi Ma'am (Singing) & Suresh Sir (Tabla)",
    "affiliation": "Trinity College London • RockSchool • Akhil Bharatiya Gandharva Mahavidyalaya",
    "modules": [
      {
        "moduleNum": 1,
        "stepName": "M1: Indian & Rhythms",
        "title": "Indian Music Fundamentals: Swara Geography, Thaats & Rhythmic Pulse",
        "duration": "6 Months",
        "level": "Foundational / Initial Stage",
        "certification": "Chitran Initial Music & Rhythm Foundations Certificate",
        "desc": "The structured entry into keyboard and musical harmony under Vikram Sir. Students map the 7 natural Swaras (Sa, Re, Ga, Ma, Pa, Dha, Ni) across black and white keys, master Bilawal, Kalyan, and Bhairav thaat finger patterns, and synchronize with Indian rhythmic cycles (Keherwa 8-beat, Dadra 6-beat, Teentaal 16-beat) using steady metronome cadence.",
        "techniques": [
          "Swara-to-key mapping: natural notes (Shuddha) and sharps/flats (Teevra/Komal)",
          "Indian scale fingerings for Bilawal, Kalyan, and Bhairav thaats with right-hand fluidity",
          "Metronome synchronization across 4/4, 6/8, Keherwa (8-beat) and Dadra (6-beat) rhythms",
          "Single-line melody execution, posture ergonomics, and hand-wrist curve suspension"
        ],
        "mediums": [
          "Yamaha PSR Touch-Sensitive 61-Key Keyboards & Roland Digital Pianos",
          "Indian Tala Metronomes & Digital Beat Pulse Generators",
          "Chitran Foundation Swara Manuscript Workbook"
        ],
        "milestones": [
          "Play 5 traditional Indian melodies and bhajans with unwavering metronome rhythm",
          "Demonstrate fluent right-hand scale runs across 2 octaves in Bilawal and Kalyan",
          "Record introductory studio video for faculty diagnostic review"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 1 (Indian Music Fundamentals & Rhythms on Keyboard)."
      },
      {
        "moduleNum": 2,
        "stepName": "M2: Movie Songs & Chords",
        "title": "Cinematic Repertoire: Bollywood/Tollywood Melodies, Ear Playing & Left-Hand Chords",
        "duration": "6 Months",
        "level": "Foundational / Popular",
        "certification": "Chitran Contemporary Melody & Harmony Award",
        "desc": "Bridging melody with modern harmony. Students decode popular Bollywood, Tollywood, and evergreen cinematic tracks by ear and notation. The left hand awakens to play resonant chords (Major, Minor, 7th, and suspended triads) while the right hand sings lead melodies, signature film intros, and background theme interludes (BGM).",
        "techniques": [
          "Ear training: transcribing famous cinematic melodies and vocal lines directly onto keys",
          "Left-hand triad comping: Major, Minor, Dominant 7th, and sus4 chord transitions",
          "Song anatomy: prelude intros, signature hook melodies, interlude BGM, and outro phrasing",
          "Dual-hand coordination: simultaneous lead melody playing and rhythmic harmonic comping"
        ],
        "mediums": [
          "88-Key Weighted Hammer-Action Digital Pianos (Yamaha Clavinova)",
          "Popular Indian & Western Song Lead Sheets and Chord Charts",
          "Electronic Rhythm Backing Tracks & Drum Accompaniment Loops"
        ],
        "milestones": [
          "Perform 4 complete Bollywood/Tollywood songs with live chord transitions and intros",
          "Identify and play the root chords of a popular melody on first listen",
          "Participate in the Ashok Nagar campus acoustic weekend student showcase"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 2 (Movie Songs, Ear Training & Left-Hand Chords)."
      },
      {
        "moduleNum": 3,
        "stepName": "M3: Carnatic on Keys",
        "title": "Carnatic Classical Keyboard: Varisais, Geethams, Swarajathis & Varnams",
        "duration": "6 - 9 Months",
        "level": "Intermediate / Classical",
        "certification": "Chitran Carnatic Instrumental Certificate (Affiliated)",
        "desc": "Translating ancient South Indian classical traditions onto modern keyboards. Students master Abhyasa Ganam exercises (Sarali, Janta, Dhatu Varisais) and Alankaras in Sapta Taalas (Dhruva, Matya, Roopaka, Jhampa, Triputa, Ata, Eka). Progressing through foundational Geethams (Sri Gananatha in Malahari, Vara Veena in Mohanam) and Adi Tala Varnams, adapting microtonal Gamakas using keyboard pitch-wheels and touch dynamics.",
        "techniques": [
          "Sarali, Janta, and Dhatu Varisai speed drills across multiple keys in Mayamalavagowla",
          "Alankaras in 7 fundamental talas: Dhruva, Matya, Roopaka, Jhampa, Triputa, Ata, Eka",
          "Geetham repertoire: Sri Gananatha (Malahari), Kereya Neeranu, and Vara Veena (Mohanam)",
          "Swarajathis and Adi Tala Varnams (Ninnukori in Mohanam, Jalajaksha in Hamsadhwani)",
          "Emulating microtonal Gamakas using keyboard pitch-bend wheel and touch sensitivity"
        ],
        "mediums": [
          "Roland & Yamaha Synthesizers with Pitch-Bend & Modulation Controllers",
          "Electronic Tambura Sruti Boxes & Tala Metronomes",
          "Classical Carnatic Swara Manuscript Notations"
        ],
        "milestones": [
          "Master 3 complete Geethams and 1 Adi Tala Varnam in two speeds (Prathama & Dvitiya Kala)",
          "Track tala cycles manually with left-hand pulses while playing melodies on the right hand",
          "Perform a classical Carnatic instrumental piece at the Chitran Navaratri Utsav"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 3 (Carnatic Keyboard, Geethams & Varnams)."
      },
      {
        "moduleNum": 4,
        "stepName": "M4: Western Sheet Music",
        "title": "Western Conservatory: Grand Stave Sight-Reading, Treble/Bass Clefs & Classical Pieces",
        "duration": "6 - 9 Months",
        "level": "Intermediate / Trinity Grades 1-3",
        "certification": "Trinity College London Grades 1–3 Preparation Certificate",
        "desc": "Conquering the global language of classical music. Students master simultaneous dual-clef sight-reading on the Western Grand Stave—reading Treble Clef (melody) and Bass Clef (harmony). They perform classical etudes and pieces by J.S. Bach, W.A. Mozart, Beethoven, Clementi, and Burgmüller with proper dynamics, pedal phrasing, and rhythmic counting.",
        "techniques": [
          "Dual-clef sight-reading: Grand Stave note reading, ledger lines, and key signatures (up to 3 sharps/flats)",
          "Classical repertoire pieces & sonatinas by J.S. Bach, Mozart, Beethoven, and Clementi",
          "Dynamic expression: Pianissimo (pp), Forte (ff), Crescendo, Diminuendo, and Phrasing Slurs",
          "Two-hand independence: contrary motion, Alberti bass accompaniment, and scale fingerings"
        ],
        "mediums": [
          "Yamaha Acoustic Upright Pianos & 88-Key Weighted Digital Stage Pianos",
          "Trinity College London Grade 1 to 3 Repertoire & Sight-Reading Workbooks",
          "Hanon Virtuoso Pianist Technical Exercise Anthologies"
        ],
        "milestones": [
          "Sight-read an unseen 8-bar two-hand passage within 60 seconds with accurate timing",
          "Perform 2 complete Western classical examination pieces from memory",
          "Clear internal mock practical evaluation for Trinity London Grades 1-3"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 4 (Western Classical Sheet Music & Repertoire Pieces)."
      },
      {
        "moduleNum": 5,
        "stepName": "M5: Jazz, Drums & Octapad",
        "title": "Percussion & Rhythm Lab: Jazz Drumming, Western Grooves & Roland Octapad",
        "duration": "9 - 12 Months",
        "level": "Intermediate / Percussion Specialist",
        "certification": "Chitran Drum Kit & Digital Percussion Level 2 Award",
        "desc": "The dynamic universe of pulse and percussion. Drummers master 4-limb independence across Western rock, pop, and 16-beat funk grooves, dive into the Jazz swing feel (ride cymbal triplet patterns, hi-hat on 2 & 4, and brush sweeps), explore Indian cinematic grooves (Bhangra 12/8, Garba, Tollywood beats), and master Roland Octapad (SPD-20/30) digital percussion sampling.",
        "techniques": [
          "4-limb drum kit independence: hi-hat pulse, syncopated kick, snare backbeats, and ghost notes",
          "Jazz swing drumming: ride cymbal spang-a-lang, bass drum feathering, and wire brush techniques",
          "Indian grooves: Bhangra 12/8 Dhol beats, Dandiya/Garba patterns, and cinematic rhythm fills",
          "Roland Octapad (SPD-20/30): patch editing, Tabla/Dholak/Mridangam sampling, and live stage looping"
        ],
        "mediums": [
          "Roland V-Drums TD Series Electronic Kit & Mapex Acoustic Drum Pods",
          "Roland SPD-20X & SPD-30 Total Percussion Octapad Workstations",
          "RockSchool & Trinity Drum Kit Graded Syllabi"
        ],
        "milestones": [
          "Perform a complete 4-minute Jazz/Funk track demonstrating swing ride patterns and brush work",
          "Program and perform a live multi-instrument Indian percussion loop on the Roland Octapad",
          "Featured performance as lead drummer in the Chitran Student Ensemble Jam"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 5 (Western Drums, Jazz Beats & Roland Octapad)."
      },
      {
        "moduleNum": 6,
        "stepName": "M6: Tabla Bols & Taals",
        "title": "Classical Indian Percussion: Tabla Bols, Taals (Teentaal, Keherwa, Roopak) & Sangat",
        "duration": "9 - 12 Months",
        "level": "Advanced Classical / All India Radio Graded Track",
        "certification": "Gandharva Mahavidyalaya Praveshika Certified",
        "desc": "Mentored by Suresh Sir (AIR Graded Artist). Students master pure Bols and hand techniques (nikas) on Dayan and Bayan (Ta, Tin, Te, Dha, Dhin, Ge). They explore core Indian Taals (Teentaal 16-matras, Keherwa, Dadra, Roopak 7-matras, Jhaptal 10-matras), develop Kaidas, Paltas, and Tihais, practice vocal and instrumental Sangat accompaniment, and master Layakari mathematics.",
        "techniques": [
          "Dayan & Bayan nikas: pure resonant production of Ta, Tin, Te, Dha, Dhin, and Ge with zero buzzing",
          "Taals & Thekas: Teentaal (16), Keherwa (8), Dadra (6), Roopak (7), Jhaptal (10) with Taali/Khaali",
          "Classical compositions: Delhi & Banaras gharana Kaidas, Paltas, Relas, Tukras, and Tihais",
          "Accompaniment (Sangat): supporting classical vocal, harmonium, bhajans, ghazals, and instrumentalists",
          "Layakari mathematics: Thah (1:1), Dugun (2:1), Tigun (3:1), and Chaugun (4:1) tempo modulations"
        ],
        "mediums": [
          "Authentic Handcrafted Sheesham Wood Dayan & Heavy Copper Bayan (Dagga)",
          "Brass Tuning Hammers, Velvet Bira Rings & Leather Gatta Pegs",
          "Akhil Bharatiya Gandharva Mahavidyalaya Tabla Manuscript Curricula"
        ],
        "milestones": [
          "Deliver 2 complete Kaidas in Teentaal with 4 Paltas and high-speed Rela ending in Tihai",
          "Accompany a live vocal/harmonium recital in Keherwa and Dadra for 15 minutes",
          "Clear Gandharva Mahavidyalaya Praveshika practical examination with First Class"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 6 (Classical Indian Tabla, Bols & Taals)."
      },
      {
        "moduleNum": 7,
        "stepName": "M7: Harmony & Theory",
        "title": "Comprehensive Music Theory: Scales, Circle of Fifths, Chord Progressions & Composition",
        "duration": "9 - 12 Months",
        "level": "Advanced Musicology / Grade 5-7 Theory",
        "certification": "Trinity College London Music Theory Grade 5 Award",
        "desc": "The deep intellectual foundations of sound. Students explore harmonic architecture across all 12 keys: Major, Natural/Harmonic/Melodic Minor, Pentatonic, and Blues scales. They decode the Circle of Fifths, intervals, triads, inversions, cadence resolutions (V-I, IV-I, ii-V-I), two-octave arpeggio runs, dynamic voicing, and compose original multi-part musical themes.",
        "techniques": [
          "All 12 Major & Minor scales (Natural, Harmonic, Melodic Minor) with key signatures",
          "Circle of Fifths, intervals (Major/Minor/Diminished/Augmented), and cadence resolutions",
          "Two-octave arpeggios, contrary motion scales, broken chord accompaniments, and pedal technique",
          "Original melodic composition, lead-sheet harmonization, and multi-track MIDI arrangement"
        ],
        "mediums": [
          "Grand Digital Workstations (Korg Kronos, Roland Fantom) & Yamaha Acoustic Uprights",
          "Trinity College London Grade 5 Music Theory Official Workbooks",
          "Digital Audio Workstation (DAW) Software for Composition & Sequencing"
        ],
        "milestones": [
          "Pass Trinity College London Grade 5 Western Music Theory Examination with Distinction",
          "Compose and studio-record an original 32-bar melodic composition with full chord progression",
          "Transcribe complex multi-instrument audio pieces into accurate sheet music notation"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 7 (Comprehensive Music Theory & Original Composition)."
      },
      {
        "moduleNum": 8,
        "stepName": "M8: Graded Exam Diploma",
        "title": "The Concert Maestro: Trinity College London Grade 8 & Associate Diploma (ATCL)",
        "duration": "12 Months",
        "level": "Concert Maestro / International Diploma",
        "certification": "Trinity College London Grade 8 / Associate Diploma (ATCL / Sangeet Visharad)",
        "desc": "The ultimate international accolade in performing musicianship. The student prepares and delivers an unbroken 30-minute professional concert recital spanning classical, contemporary, and fusion literature before international London examiners. This credential certifies the graduate as a concert-level performing maestro and accredited instructor of music.",
        "techniques": [
          "Concert-grade technical endurance, rapid velocity, and whisper-to-thunder dynamic range",
          "Deep, authoritative stylistic interpretation from memory across Baroque, Classical, Romantic & Modern",
          "Flawless quick-study sight-reading and immediate transposition across all 12 musical keys",
          "Professional stage charisma, program note authorship, and concert hall acoustic projection"
        ],
        "mediums": [
          "Concert Grand Pianos & Concert Hall Acoustic Auditorium Staging",
          "Trinity College London International Board of Examiners & Official ATCL Protocols",
          "High-Definition Multi-Track Audio-Visual Recording Studio Rig"
        ],
        "milestones": [
          "Deliver an unbroken 30-minute solo graduation concert recital before an invited public audience",
          "Award of the prestigious Trinity College London Grade 8 / ATCL Associate Diploma credential",
          "Accredited appointment eligibility as certified faculty instructor at Chitran Institute"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Music Module 8 (Trinity Grade 8 Concert Diploma & ATCL)."
      }
    ]
  },
  "dance": {
    "disciplineKey": "dance",
    "name": "Western & Contemporary Dance Academy",
    "faculty": "Master Rohan (Chief Choreographer • Western, Hip-Hop & Commercial)",
    "affiliation": "Annual Auditorium Productions • Recognized Performing Dance Certifications",
    "modules": [
      {
        "moduleNum": 1,
        "stepName": "M1: Body Flexibility",
        "title": "The Temple of Movement: Posture Alignment, Core Agility & 8-Count Rhythm",
        "duration": "6 Months",
        "level": "Foundational / Beginner",
        "certification": "Chitran Movement Level 1 Certificate",
        "desc": "Every magnificent dance begins with understanding the body as an instrument of divine and kinetic expression. Students open tight hamstrings, align the spine, build explosive core stamina, and internalize the universal 8-count beat. We dissolve stiffness, replace hesitation with graceful balance on high relevé, and cultivate stage walk presence.",
        "techniques": [
          "Dynamic joint mobility, spinal roll-downs, and injury-prevention conditioning drills",
          "Core stabilization, high relevé ankle balance, and kinetic weight-shift mechanics",
          "8-Count beat decoding: identifying downbeats, backbeats, syncopation, and tempo shifts",
          "Foundational body isolations: neck slides, ribcage circles, hip ticks, and stage walk styling"
        ],
        "mediums": [
          "Comfortable Mirror-Lined Rehearsal Studio with Attentive Posture Guidance",
          "High-Elasticity Resistance Bands, Yoga Blocks & Core Training Mats",
          "High-Fidelity Studio Sound System with Dynamic Bass Response"
        ],
        "milestones": [
          "Attain full front and side split flexibility with upright spinal posture",
          "Execute a razor-sharp 32-count rhythm combo to contemporary beats with zero tempo drift",
          "Capture the student’s first official studio video reel for parent progress review"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 1 (Posture Alignment & 8-Count Rhythm)."
      },
      {
        "moduleNum": 2,
        "stepName": "M2: Contemporary Flow",
        "title": "The Breath of Gravity: Lyrical Contemporary Flow, Floorwork & Release",
        "duration": "6 Months",
        "level": "Foundational / Intermediate",
        "certification": "Chitran Contemporary Level 2 Award",
        "desc": "Dancing with the fluidity of running water and the untamed grace of wind. Students master Martha Graham and Merce Cunningham release techniques, learning to melt into the floor without a sound and rise again in seamless spirals. Every jump, suspension, and lyrical reach is powered by the breath, transforming raw human emotion into poetry in motion.",
        "techniques": [
          "Contemporary floorwork: shoulder rolls, dolphin dives, sweeps, and handless recoveries",
          "Contract-and-release torso mechanics, spinal undulations, and grounded weight drops",
          "Lyrical arm phrasing, mid-air leap suspensions, and decelerated silent toe landings",
          "Momentum conservation: converting downward falls into sweeping rotational standing turns"
        ],
        "mediums": [
          "Spacious Mirrored Contemporary Dance Hall with Dimmable Ambient Mood Lighting",
          "Curated Instrumental Lyrical, Ambient & Cinematic Soundtrack Libraries"
        ],
        "milestones": [
          "Perform an emotionally evocative 90-second lyrical contemporary solo performance",
          "Demonstrate flawless seamless floor descent and recovery without breaking lyrical momentum",
          "Featured performance spot in the Chitran in-studio contemporary choreography video"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 2 (Lyrical Contemporary & Floorwork)."
      },
      {
        "moduleNum": 3,
        "stepName": "M3: Urban Hip-Hop",
        "title": "The Street Cypher: Urban Grooves, Popping, Locking & Fast Footwork",
        "duration": "6 - 9 Months",
        "level": "Intermediate / Street Style",
        "certification": "Chitran Street Culture Excellence Badge",
        "desc": "Injecting pure street vitality, swagger, and razor-sharp attitude into every muscle fiber. Students explore authentic urban street culture—mastering muscle-snapping pops, funky locking wrist points, low-bounce party grooves, and blistering footwork. Students conquer stage anxiety, learning to step fearlessly into freestyle battle cyphers.",
        "techniques": [
          "Muscle contraction popping, ticking, dimestops, and liquid body waves",
          "Locking vocabulary: wrist twirls (rolls), points, Uncle Sam walks, and crisp freeze poses",
          "Old-school bounce party grooves combined with modern new-school isolations",
          "Rapid footwork combinations: C-walk, Happy Feet, sliding, glides, and house steps"
        ],
        "mediums": [
          "High-Energy Hip-Hop, Funk, Breakbeat, and Modern Trap Soundtracks",
          "Specialized Non-Marking Pivot-Sole Urban Dance Sneakers & Streetwear Ensembles"
        ],
        "milestones": [
          "Step into the center of a live freestyle battle cypher circle with fearless energy",
          "Execute a 64-count synchronized urban hip-hop crew choreography routine",
          "Featured role in Chitran’s viral social media urban dance choreography reel"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 3 (Urban Hip-Hop, Popping & Locking)."
      },
      {
        "moduleNum": 4,
        "stepName": "M4: Bollywood Commercial",
        "title": "The Cinematic Stage: High-Voltage Bollywood Commercial & Abhinaya",
        "duration": "6 - 9 Months",
        "level": "Intermediate / Commercial Performer",
        "certification": "Chitran Commercial Performer Award",
        "desc": "The electrifying magic of Indian cinema brought to life! Students channel celebratory energy, dramatic facial expressions (Abhinaya), razor-sharp group geometry, and chartbuster choreography. From massive festival anthems to high-energy folk hooks, students learn to project boundless charisma and electrify audiences in packed auditoriums.",
        "techniques": [
          "Navarasa facial expressions adapted to commercial cinema: Hasya (Joy), Adbhuta (Wonder), and Veera (Heroic)",
          "Complex group formation staging: dynamic V-shapes, crossing diagonal lines, and rotating diamond formations",
          "Signature high-energy hook step execution, syncopated hip drops, and rhythmic folk foot percussion",
          "Auditorium stage projection: commanding front-row to balcony sightlines with magnetic charisma"
        ],
        "mediums": [
          "Bespoke Theatrical Commercial Costumes & Synchronized Performance Outfits",
          "Latest Chartbuster Bollywood, Tollywood & Fusion Remix Soundtracks"
        ],
        "milestones": [
          "Lead role in an electrifying 4-minute group Bollywood commercial stage production",
          "High-definition cinematic dance video production for the Chitran YouTube Academy Channel",
          "Live stage performance at prestigious Hyderabad college and cultural festival showcases"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 4 (Bollywood Commercial & Cinematic Stage)."
      },
      {
        "moduleNum": 5,
        "stepName": "M5: Jazz & Pirouettes",
        "title": "The Broadway Precision: Western Jazz Technique, Grand Jetés & Pirouettes",
        "duration": "9 - 12 Months",
        "level": "Upper Intermediate / Western Jazz",
        "certification": "Chitran Western Jazz Performer Diploma",
        "desc": "The razor-sharp lines, explosive elevation, and Broadway swagger of classical Western Jazz. Students master visual spotting mechanics to execute multiple dizziness-free pirouette turns, soar through the air in magnificent grand jeté split leaps, and conquer syncopated rhythms with Broadway-style cane and hat musical theatre showmanship.",
        "techniques": [
          "Visual spotting mechanics: head whip discipline for flawless single, double, and triple pirouettes on high relevé",
          "Grand jeté split leaps, stag leaps, switch leaps, and suspended mid-air extensions",
          "Classical jazz vocabulary: pas de bourrée, jazz walks, layout kicks, and sharp fan extensions",
          "Syncopated rhythm breaks, Broadway musical theatre characterization, and prop manipulation"
        ],
        "mediums": [
          "Professional Split-Sole Flexible Leather Jazz Shoes & Character Footwear",
          "Full-Length Practice Mirrors and Dedicated Rhythm Footwork Conditioning"
        ],
        "milestones": [
          "Execute a flawless double pirouette landing cleanly on relevé with pinpoint spot",
          "Perform an unbroken traveling grand jeté leap series across the 40-foot studio hall",
          "Featured ensemble member in a choreographed Broadway musical theatre stage production"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 5 (Western Jazz Technique & Pirouette Turns)."
      },
      {
        "moduleNum": 6,
        "stepName": "M6: Partnering & Lifts",
        "title": "The Physics of Trust: Duet Partnering, Counter-Balance & Aerial Lifts",
        "duration": "9 - 12 Months",
        "level": "Advanced Partnering / Contemporary Duet",
        "certification": "Chitran Advanced Partnering Certificate",
        "desc": "The sublime art of physical trust, shared gravity, and unified breath. Students explore the physics of counter-balance, momentum transfers, and breathtaking partner lifts. Moving as a single organism, duets tell gripping emotional stories where partners catch, lean away, and fly into aerial suspensions with effortless poetic grace.",
        "techniques": [
          "Shared center of gravity mechanics, lean-away counter-balance, and intuitive catch timing",
          "Shoulder mounts, fish dives, waist-wrap aerial lifts, and flying carousel suspensions",
          "Acrobatic floorwork: assisted cartwheels, partner roll-overs, and trust drops",
          "Duet emotional storytelling: breath synchronization, eye-contact tension, and dramatic stillness"
        ],
        "mediums": [
          "Heavyweight Acrobatic Safety Crash Mats & Certified Gymnastic Spotting Belts",
          "Safety-Certified Professional Choreography Mentors"
        ],
        "milestones": [
          "Choreograph and perform a gripping 3-minute 2-person contemporary partner duet",
          "Master 4 clean, seamless airborne partner lifts with zero strain or hesitation",
          "Selected highlight duet performance at the Annual Chitran Gala Showcase"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 6 (Contemporary Partnering & Aerial Lifts)."
      },
      {
        "moduleNum": 7,
        "stepName": "M7: Stage Choreography",
        "title": "Commercial Dance Mastery: Urban Cyphers, Formations & Video Portfolios",
        "duration": "9 - 12 Months",
        "level": "Advanced Commercial Performer",
        "certification": "Chitran Advanced Western Choreographer Award",
        "desc": "Advanced commercial stage dance incorporating intricate formation changes, explosive freestyle cyphers, popping & locking precision, and camera-ready video reel choreography. Students command the stage with distinct personal style, syncopated rhythm breaks, and dynamic spotlight solos.",
        "techniques": [
          "Complex multi-dancer spatial staging, formation transitions, and tempo synchronization",
          "Advanced popping, waving, tutting, and floor recovery cascades",
          "Commercial music video blocking, dynamic camera-angle awareness, and expressions",
          "Freestyle battle cypher techniques and improvisational musicality"
        ],
        "mediums": [
          "Multi-Angle 4K Studio Video Production Setup & Dynamic Lighting",
          "Professional Streetwear Dance Sneakers & Practice Sound Setup"
        ],
        "milestones": [
          "Direct and perform an original 3-minute group hip-hop/contemporary stage routine",
          "Lead a live studio freestyle cypher showcase for parent and peer review",
          "Featured dancer in Chitran's annual 4K commercial dance video production"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 7 (Stage Choreography, Cyphers & Video Reels)."
      },
      {
        "moduleNum": 8,
        "stepName": "M8: Stage Arangetram",
        "title": "The Grand Debut: Solo Auditorium Production, Choreography & Dance Diploma",
        "duration": "12 Months",
        "level": "Professional Stage Artist / Graduation",
        "certification": "Chitran Professional Dance Performer Diploma",
        "desc": "The crowning pinnacle of the performing dancer’s journey. Stepping onto the grand auditorium stage before 1,000+ spectators, the graduating student directs, choreographs, and stars in a full-scale public dance production. From theatrical DMX lighting cues and costume design to commanding the stage with unshakeable endurance, the dancer earns the Chitran Professional Dance Diploma.",
        "techniques": [
          "Full-scale choreography creation, musical edit arranging, and multi-dancer set direction",
          "Auditorium stage blocking, DMX theatrical lighting cues (washes, specials, spots, and haze)",
          "45-Minute continuous high-intensity stage endurance and character transformation",
          "Professional stage etiquette, backstage crew coordination, and captivating curtain-call presence"
        ],
        "mediums": [
          "Renowned Hyderabad Auditorium Stages (Ravindra Bharathi / Shilpakala Vedika)",
          "Theatrical DMX Moving Stage Lights, Fog FX & High-Definition Line-Array Rig"
        ],
        "milestones": [
          "Mount a grand solo and ensemble graduation production in a 1,000-seat public auditorium",
          "Formal award and convocation of the Chitran Professional Dance Performer Diploma",
          "Induction into the elite Chitran Senior Performing Dance Troupe for national tour productions"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Dance Module 8 (Grand Stage Debut & Professional Dance Diploma)."
      }
    ]
  },
    "handwriting": {
    "disciplineKey": "handwriting",
    "name": "Scientific Handwriting & Speed Penmanship for Kids & Adults",
    "faculty": "Master Ramesh (Head of Penmanship & Calligraphy)",
    "affiliation": "100% Guaranteed Transformation in 1 Month • MSME Certified",
    "modules": [
      {
        "moduleNum": 1,
        "stepName": "M1: Grip & Ergonomics",
        "title": "The Scientific Grip: Dynamic Tripod, Posture Alignment & Pressure Relief",
        "duration": "1 Month Intensive",
        "level": "Foundational / All Ages",
        "certification": "Chitran Penmanship Ergonomics Badge",
        "desc": "Permanently eradicating finger cramping, wrist fatigue, and poor posture. Students master the dynamic tripod grip using muscle isolation techniques, learning to write from the shoulder and forearm rather than white-knuckling the pen. We calibrate paper tilt angles and pen pressure gradients, ensuring hours of pain-free writing without tearing paper.",
        "techniques": [
          "Dynamic tripod grip retraining using sensory muscle isolation points",
          "Shoulder and forearm kinetic motor control vs cramped finger pinching",
          "Pressure gradient calibration drills to eliminate paper indentation and hand pain",
          "Ergonomic wrist-to-paper 20-degree tilt positioning and anti-fatigue finger stretches"
        ],
        "mediums": [
          "Ergonomic Triangular Graphite Pencils & Medical-Grade Silicone Grip Trainers",
          "Specialized 20-Degree Writing Slope Boards & Anti-Glare Paper Pads",
          "Chitran Diagnostic Baseline Graph Worksheets for Micro-Measurement"
        ],
        "milestones": [
          "Attain zero finger cramping or fatigue during 45 minutes of continuous writing",
          "Permanent muscle memory alignment of the dynamic tripod grip verified by mentor",
          "Establish the student’s baseline speed and legibility diagnostic score"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 1 (Grip Ergonomics & Pressure Relief)."
      },
      {
        "moduleNum": 2,
        "stepName": "M2: 1-Mo Revolution",
        "title": "The Geometric Stroke: 12 Universal Strokes & 30-Day Transformation",
        "duration": "1 Month Intensive",
        "level": "Foundational Revolution",
        "certification": "Chitran 1-Month Scientific Transformation Certified",
        "desc": "The celebrated Chitran breakthrough that has transformed over 5,000+ students. We decode all 26 English alphabets into 12 core geometric strokes—undercurves, overcurves, ovals, and loops. By balancing ascender, waistline, and descender zones, handwriting undergoes an astounding transformation from messy and illegible to neat, elegant, and print-like in 30 days.",
        "techniques": [
          "12 Universal geometric stroke mechanics governing all English alphabets",
          "Ascender, waistline, and descender proportional zone balancing (4-line discipline)",
          "Uniform oval curvature, stroke heights, and 90-degree baseline adherence",
          "Systematic elimination of overlapping letters, irregular sizing, and scrawls"
        ],
        "mediums": [
          "Custom Chitran 4-Line Transformation Worksheets & Red-and-Blue Ruled Pads",
          "Smooth-Flow Fine-Nib Gel Pens & Cartridge Refillable Fountain Pens"
        ],
        "milestones": [
          "100% visible transformation from illegible scrawl to immaculate neatness in 30 days",
          "Verified Before & After comparative handwriting portfolio with parent & teacher sign-off",
          "Award of the Chitran 1-Month Scientific Penmanship Certificate of Excellence"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 2 (1-Month Scientific Stroke Revolution)."
      },
      {
        "moduleNum": 3,
        "stepName": "M3: Cursive Flow",
        "title": "The Seamless Ligature: Continuous Cursive Flow & 68° Italic Slant",
        "duration": "1 - 2 Months",
        "level": "Intermediate / Cursive Arts",
        "certification": "Chitran Master Cursive Penman Credential",
        "desc": "Mastering the hypnotic beauty and speed of continuous cursive penmanship. Students learn how letters connect without ever lifting the pen from the paper. We install an unwavering 68-degree forward italic slant across whole paragraphs, calibrating rhythmic breathing and consistent word spacing so that every page looks like a printed work of art.",
        "techniques": [
          "Seamless continuous cursive ligatures without unnecessary pen-lifting",
          "Unwavering 68-degree forward italic slant uniformity across multiple paragraphs",
          "Inter-letter and inter-word optical spacing ratios for effortless readability",
          "Rhythmic breathing cadence and stroke pacing during long essay compositions"
        ],
        "mediums": [
          "French Ruled (Seyes) Archival Writing Paper for Proportion Discipline",
          "Schneider & Pilot Smooth-Glide Liquid Ink Rollerball & Calligraphy Fountain Pens"
        ],
        "milestones": [
          "Write 5 full A4 pages in flawless, flowing cursive script with unwavering slant",
          "Zero broken loops, floating words, or missing joins across diagnostic essays",
          "Formal eligibility clearance for Inter-School Penmanship Championships"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 3 (Cursive Flow Mastery & 68-Degree Slant)."
      },
      {
        "moduleNum": 4,
        "stepName": "M4: 2x Exam Speed",
        "title": "The High-Speed System: 2x Exam Speed Writing for Board & Competitive Exams",
        "duration": "2 Months",
        "level": "High Speed / Competitive Exam Aspirants",
        "certification": "Chitran Speed Penmanship & Exam Presentation Merit",
        "desc": "Write twice as fast without sacrificing a single percent of legibility. Specifically engineered for CBSE/ICSE 10th & 12th Board exams, NEET, Law, and academic examinations. Students learn abbreviated stroke mechanics, rapid bullet-point structuring, and time-saving presentation frameworks to finish 3-hour papers with 20 minutes to spare.",
        "techniques": [
          "Abbreviated aerodynamic stroke dynamics retaining 100% optical legibility",
          "High-speed line-pacing drills timed against calibrated metronome tempos",
          "Rapid paragraph indentation, clean bullet hierarchy, and boxed diagram presentation",
          "Strategic 3-hour exam time allocation: writing 35 words per minute under pressure"
        ],
        "mediums": [
          "Official Board Exam-Grade Ruled & Unruled Answer Booklets & Practice Test Papers",
          "High-Speed Low-Viscosity Quick-Dry 0.5mm Japanese Ballpoint Pens"
        ],
        "milestones": [
          "Double writing speed from baseline (18 wpm to 36+ words per minute verified on stopwatch)",
          "Complete 3 full mock 3-hour subjective examination papers within prescribed time limits",
          "Achieve examiner-certified top presentation score on answer booklet formatting"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 4 (2x Exam Speed Writing System)."
      },
      {
        "moduleNum": 5,
        "stepName": "M5: Hindi Devanagari",
        "title": "Script Precision: Hindi Devanagari Script Alignment & Shirorekha Geometry",
        "duration": "1 - 2 Months",
        "level": "Bilingual Penmanship / Hindi & Regional Script",
        "certification": "Chitran Devanagari Script Precision Award",
        "desc": "Dedicated mastery of Hindi Devanagari script. We cure tilted headlines, uneven matras, and distorted loops through mathematical baseline rules. Students master ruler-straight Shirorekha (top headline) drawing without lifting, proportionate Swar and Vyanjan letter balance, and flawless half-letter conjuncts for top marks in second-language board examinations.",
        "techniques": [
          "Straight-line Shirorekha (top headline) execution without hand wobble or break",
          "Matra placement geometry: upper (ikār, e, ai), lower (u, ū, ri), and lateral vowel signs",
          "Proportionate circular curvature for characters like 'क', 'व', 'ब', 'म', 'भ'",
          "Baseline discipline ensuring neat, aligned sentences across ruled and plain sheets"
        ],
        "mediums": [
          "Double-Ruled & Single-Ruled Devanagari Specialized Transformation Exercise Pads",
          "Smooth-Flow Chisel-Tip & Micro-Tip German Fluid Gel Pens"
        ],
        "milestones": [
          "Achieve 100% straight-line Shirorekha alignment across 2 full pages of Hindi composition",
          "Eliminate all letter-merging and misplaced matra errors in timed test writing",
          "Receive Chitran Devanagari Script Precision Merit Certification"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 5 (Hindi Devanagari Script Alignment)."
      },
      {
        "moduleNum": 6,
        "stepName": "M6: Civil Services Track",
        "title": "Professional Endurance: UPSC & TSPSC Civil Services 3-Hour Mains Writing",
        "duration": "2 - 3 Months",
        "level": "Adults, Civil Services (UPSC / State PSC) & Job Holders",
        "certification": "Chitran Civil Services Speed Penmanship Fellow",
        "desc": "Custom-engineered for UPSC Civil Services Mains, State PSC Group 1, Judiciary aspirants, and working professionals. In high-stakes descriptive exams, writing 3,000+ words per paper across consecutive days causes debilitating wrist cramps and messy scribbles that examiners struggle to read. This module builds superhuman muscular endurance, high-speed bullet formatting, diagram framing, and flawless unruled paper alignment.",
        "techniques": [
          "Ergonomic forearm-glide technique sustaining 35+ words per minute for 3 continuous hours",
          "Clean unruled A4 paper baseline consistency without drifting upward or downward",
          "Rapid boxed diagram framing, flowchart penmanship, and hierarchical header styling",
          "Examiner-first optical readability: high-contrast letter spacing ensuring instant comprehension"
        ],
        "mediums": [
          "UPSC & Civil Services Replica Blank Unruled Answer Booklets with Margins",
          "Low-Viscosity Fast-Drying 0.7mm Archival Examination Ballpoints & Rollerballs"
        ],
        "milestones": [
          "Write 3 full-length 250-mark mock GS Mains papers within 180 minutes with zero hand fatigue",
          "Maintain 98% optical legibility from Page 1 to Page 36 of the answer booklet",
          "Verified 40% speed boost from diagnostic baseline test"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 6 (UPSC & Civil Services Speed Bootcamp)."
      },
      {
        "moduleNum": 7,
        "stepName": "M7: Calligraphy Art",
        "title": "The Noble Script: Chisel-Nib Calligraphy, Gothic Blackletter & Modern Brush",
        "duration": "3 - 6 Months",
        "level": "Artistic Penmanship / Calligrapher",
        "certification": "Chitran Certified Calligraphy Artist",
        "desc": "Where writing transcends communication to become fine art. Students learn the strict 45-degree angle discipline of the chisel edge nib, mastering Foundational Hand, dramatic medieval Gothic Blackletter, and modern brush lettering. Creating handmade wedding invitations, formal award citations, and illuminated quotes with shimmering gold inks.",
        "techniques": [
          "Rigorous 45-degree pen angle discipline creating crisp hairline thins and velvet thicks",
          "Foundational Hand, Italic script, and dramatic Gothic Blackletter alphabets",
          "Flourishing, ornate ascender embellishments, and Celtic knotwork page borders",
          "Illumination gold touches: applying metallic gold inks and gouache highlights"
        ],
        "mediums": [
          "Pilot Parallel Calligraphy Pens (1.5mm, 2.4mm, 3.8mm, 6.0mm)",
          "Speedball Dip Pen Holders with Brause Bandzug Chisel Nibs & Acrylic Inks",
          "Heavyweight 250 GSM Parchment Paper, Handmade Cotton Deckle-Edge Sheets"
        ],
        "milestones": [
          "Hand-letter a formal illuminated certificate for school, institution, or family",
          "Create a framed inspirational quote calligraphy artwork with gold embellishments",
          "Produce a custom collection of handmade hand-lettered greeting envelopes"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 7 (Chisel-Nib Calligraphy & Gothic Art)."
      },
      {
        "moduleNum": 8,
        "stepName": "M8: Master Penman",
        "title": "Master Penman Graduation: Ornamental Flourishing, Spencerian Script & Convocation",
        "duration": "3 Months",
        "level": "Master Penman / Professional Instructor",
        "certification": "Chitran Master Penman Convocation Diploma",
        "desc": "The highest summit of handwriting excellence. Students master the exquisite feather-touch hairline swells of Spencerian and Copperplate script, intricate avian and botanical flourishing, and the pedagogical science of handwriting diagnosis. Graduating students are certified as Master Penmanship Ambassadors capable of evaluating and remediating script.",
        "techniques": [
          "Flexible pointed nib pressure modulation: whisper-light hairlines and velvet thick swells",
          "Spencerian ornamental flourishes: graceful birds, botanical scrolls, and decorative cartouches",
          "Comprehensive handwriting diagnostic analysis and personalized error correction blueprints",
          "Portfolio curation for national penmanship exhibitions and formal institutional convocation"
        ],
        "mediums": [
          "Hunt 101, Nikko G & Leonardt Principal Flexible Pointed Nibs with Oblique Pen Holders",
          "Higgins Eternal Black Ink & Finetec Shimmering Metallic Watercolor Pans",
          "Heavyweight 300 GSM Archival Hot-Press Cotton Watercolor Paper"
        ],
        "milestones": [
          "Craft a museum-grade ornamental flourished Spencerian parchment artwork",
          "Successfully conduct a live diagnostic assessment and correction plan on student handwriting",
          "Award of the prestigious Chitran Master Penman Convocation Diploma"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Handwriting Module 8 (Master Penman Convocation & Spencerian Art)."
      }
    ]
  },
  "abacus": {
    "disciplineKey": "abacus",
    "name": "8-Level Japanese Soroban Abacus & Vedic Speed Mathematics",
    "faculty": "Khusbu Ma'am (Head of Soroban Abacus & Vedic Mathematics)",
    "affiliation": "Whole-Brain Mental Calculation & Photographic Memory • MSME Certified",
    "modules": [
      {
        "moduleNum": 1,
        "stepName": "L1: Soroban Basics",
        "title": "The Physical Bead: 17-Rod Japanese Soroban & Direct Arithmetic",
        "duration": "3 Months",
        "level": "Junior / Beginner (Ages 5 to 12)",
        "certification": "Chitran Abacus Level 1 Certificate",
        "desc": "Introducing the authentic Japanese Soroban abacus. Students master bi-manual two-finger bead manipulation using coordinated thumb and index finger movements, understanding upper deck (Heaven bead, value 5) and lower deck (Earth beads, value 1) values to perform direct single-digit addition and subtraction sums with lightning speed.",
        "techniques": [
          "Bi-manual bead manipulation: coordinated thumb-up and index-finger-down flicking",
          "Heaven (5) and Earth (1) bead value recognition and zero-clearing technique",
          "Direct single-digit addition and subtraction without formulas",
          "Finger reflex speed drills timed against digital countdown stopwatches"
        ],
        "mediums": [
          "Authentic 17-Rod Japanese Soroban Wooden Abacus with Quick-Reset Button",
          "Level 1 Speed Drill Workbooks, Number Flashcards & Digital Timers"
        ],
        "milestones": [
          "Perform 30 single-digit addition and subtraction sums on Soroban in 60 seconds",
          "Zero-finger counting habit permanently broken with bead reflex replacement",
          "Pass Chitran Abacus Level 1 Practical Examination with distinction"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 1 (Soroban Basics & Direct Arithmetic)."
      },
      {
        "moduleNum": 2,
        "stepName": "L2: Small Friends",
        "title": "Complement of 5: 'Small Friends' Addition & Subtraction Bead Formulas",
        "duration": "3 Months",
        "level": "Level 2 Practitioner",
        "certification": "Chitran Abacus Level 2 Certificate",
        "desc": "Conquering the 8 fundamental formulas of Complement of 5 (+4 = +5 - 1, +3 = +5 - 2, -4 = -5 + 1, etc.). Students build rapid tactile muscle memory, flicking wooden beads with lightning agility to solve complex operations effortlessly.",
        "techniques": [
          "The 4 Addition formulas for Complement of 5 (+4, +3, +2, +1)",
          "The 4 Subtraction formulas for Complement of 5 (-4, -3, -2, -1)",
          "Two-digit direct operations combining tens and units rods simultaneously",
          "Auditory mental arithmetic: listening to numbers called out and calculating in real-time"
        ],
        "mediums": [
          "Standardized Level 2 Soroban Practice Sheets & Auditory Speed Track Audio Drills",
          "Two-Color Visual Flashcards for Quick-Response Formula Recognition"
        ],
        "milestones": [
          "Solve 40 two-digit sums using Complement of 5 formulas in under 90 seconds",
          "Achieve 100% accuracy in auditory dictation sums up to 10 rows",
          "Award of Chitran Abacus Level 2 Certified Practitioner Badge"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 2 (Complement of 5 Formulas)."
      },
      {
        "moduleNum": 3,
        "stepName": "L3: Big Friends",
        "title": "Complement of 10: 'Big Friends' Carry-Over Addition & Borrowing Formulas",
        "duration": "3 - 4 Months",
        "level": "Level 3 Advanced Junior",
        "certification": "Chitran Abacus Level 3 Certificate",
        "desc": "Mastering the 18 Big Friends formulas for carry-over addition across rods (+9 = +10 - 1, +8 = +10 - 2, etc.) and mixed combination formulas. Multi-digit operations become second nature as arithmetic speed outpaces school calculator speeds.",
        "techniques": [
          "The 9 Big Friends Addition formulas (+9 through +1) for cross-rod carry-overs",
          "The 9 Big Friends Subtraction formulas (-9 through -1) for borrowing operations",
          "Family combination formulas (+6 = +10 - 5 + 1, etc.) integrating 5 and 10 complements",
          "Multi-row speed calculations: 5-row to 10-row columns computed in under 30 seconds"
        ],
        "mediums": [
          "Level 3 Standardized Multi-Row Calculation Worksheets",
          "17-Rod Soroban Precision Bead Instruments with Rubber Anti-Slip Feet"
        ],
        "milestones": [
          "Accurately compute 50 multi-row 2-digit sums within 2 minutes",
          "Demonstrate rapid carry-over calculation live in front of peers and parents",
          "Pass the State Abacus Level 3 Practical Examination"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 3 (Complement of 10 & Big Friends)."
      },
      {
        "moduleNum": 4,
        "stepName": "L4: Mental Anzan",
        "title": "Bead Imagery: Mental Calculation (Anzan) & Multi-Digit Speed Addition",
        "duration": "4 Months",
        "level": "Intermediate Anzan Calculator",
        "certification": "Chitran Certified Anzan Practitioner (Level 4)",
        "desc": "The critical transformation from physical tool to the mind's eye. Students close their eyes and project a virtual Soroban abacus into their mental visual cortex. Moving imaginary beads with their fingers, they compute 3-digit multi-row addition and subtraction faster than a digital calculator.",
        "techniques": [
          "Virtual bead projection: anchoring a sharp mental image of the 17-rod Soroban in the mind",
          "Finger air-flicking (Anzan technique) translating thoughts to lightning mental calculations",
          "3-Digit and 4-digit multi-row addition and subtraction computed entirely mentally",
          "Right-brain hemisphere stimulation fostering razor-sharp concentration and photographic recall"
        ],
        "mediums": [
          "Flash Anzan Computerized Projection Drills & Blindfold Speed Challenge Tests",
          "Level 4 Mental Arithmetic Championship Question Banks"
        ],
        "milestones": [
          "Solve 30 3-digit addition and subtraction sums mentally in under 2 minutes with no abacus",
          "Perform live on stage solving sums called out at high speed before audiences",
          "Chitran Certified Anzan Practitioner (Level 4) Convocation"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 4 (Mental Anzan & Bead Imagery)."
      },
      {
        "moduleNum": 5,
        "stepName": "L5: Multiplication",
        "title": "Rapid Multi-Digit Multiplication on Soroban Rods & Mental Multiplication",
        "duration": "4 - 6 Months",
        "level": "Senior Abacus Scholar",
        "certification": "Chitran Abacus Level 5 Diploma",
        "desc": "Stepping into higher mathematics. Students conquer 2-digit by 2-digit, 3-digit by 1-digit, and 3-digit by 2-digit multiplications on Soroban rods and mentally. Enhances bilateral brain stimulation, developing intense concentration, photographic memory, and razor-sharp mathematical confidence in school.",
        "techniques": [
          "Cross-rod multiplication alignment: unit, ten, hundred rod distribution mechanics",
          "2-Digit by 2-digit mental multiplication computed in under 6 seconds",
          "Multiplication tables up to 99 mastered through abacus pattern recognition",
          "Simultaneous multi-digit memory holding while computing secondary products"
        ],
        "mediums": [
          "High-Precision 23-Rod Professional Japanese Soroban Abacus",
          "National Level Abacus Competition Multiplication Speed Drill Workbooks"
        ],
        "milestones": [
          "Solve 50 complex multiplication sums in under 3 minutes with 98% accuracy",
          "Mentally multiply 3-digit by 2-digit numbers with zero rough work",
          "Award of the Chitran Abacus Level 5 Senior Scholar Diploma"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 5 (Multi-Digit Multiplication)."
      },
      {
        "moduleNum": 6,
        "stepName": "L6: Division & Decimals",
        "title": "Long Division, Decimals & Multi-Step Mental Arithmetic",
        "duration": "4 - 6 Months",
        "level": "Advanced Abacus Scholar",
        "certification": "Chitran Abacus Level 6 Diploma",
        "desc": "Mastering long division with quotients and remainders on abacus rods, decimal arithmetic, and multi-step complex word problems. School math fear is permanently eradicated, replaced with effortless arithmetic dominance.",
        "techniques": [
          "Dividend, divisor, and quotient rod allocation rules on 23-rod Soroban",
          "Mental division of 4-digit numbers by 2-digit divisors with instant remainder identification",
          "Decimal point tracking and floating-point addition/subtraction on abacus",
          "Multi-operation order: solving mixed addition, multiplication, and division sequences"
        ],
        "mediums": [
          "Advanced Decimal & Long Division Specialized Soroban Manuals",
          "School Syllabus Mathematics Integration Worksheets (CBSE / ICSE / IB)"
        ],
        "milestones": [
          "Compute 40 long division sums mentally in under 3 minutes",
          "Attain school mathematics exam scores exceeding 95% with zero calculation errors",
          "Award of the Chitran Abacus Level 6 Advanced Scholar Diploma"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 6 (Division & Decimals)."
      },
      {
        "moduleNum": 7,
        "stepName": "L7: Flash Anzan",
        "title": "Lightning Flash Anzan: 0.4s Digital Flash Summation & Competition Drills",
        "duration": "6 Months",
        "level": "Grandmaster Track / State Competitor",
        "certification": "Chitran Grandmaster Abacus Level 7 Diploma",
        "desc": "Numbers flash on a digital screen for split-second 0.4-second intervals and vanish. Students mentally register, compute, and sum 10 consecutive flashing numbers instantaneously. Stimulates the right brain hemisphere, developing prodigy-level mental arithmetic for State and National Championships.",
        "techniques": [
          "Sub-second visual sensory processing: registering 3-digit numbers flashed at 0.4s",
          "Instantaneous mental bead sum updates without hesitation or verbal counting",
          "Negative number handling and reverse Anzan subtraction sequences",
          "High-pressure competitive championship psychology and timer conditioning"
        ],
        "mediums": [
          "Chitran Flash Anzan Specialized Digital Projection Software",
          "National & International Abacus Olympiad Championship Simulation Papers"
        ],
        "milestones": [
          "Mentally sum 15 consecutive 3-digit numbers flashed at 0.5-second speed",
          "Qualify for the All-India Abacus & Mental Arithmetic Open Championship",
          "Award of the Chitran Grandmaster Abacus Level 7 Convocation Diploma"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 7 (Flash Anzan & Competition Drills)."
      },
      {
        "moduleNum": 8,
        "stepName": "L8: Vedic Speed Maths",
        "title": "The Vedic Mind: 16 Ancient Sutras & Lightning Competitive Aptitude",
        "duration": "6 Months",
        "level": "Master of Vedic Mathematics / Olympiad Aspirant",
        "certification": "Chitran Vedic Mathematics Scholar Diploma",
        "desc": "Taught by Khusbu Ma'am: Mastering the 16 Sutras from the ancient Vedas (Urdhva Tiryagbhyam, Nikhilam, Ekadhikena). Instant one-line mental extraction of squares, square roots, cube roots, and cross-multiplications for school Olympiads, NTSE, and competitive aptitude exams.",
        "techniques": [
          "16 Vedic Sutras & 13 Sub-Sutras for one-line mental calculation shortcuts",
          "Urdhva Tiryagbhyam (Vertically and Crosswise) formula for instant multi-digit multiplication",
          "Nikhilam Navatashcaramam Dashatah (All from 9 and the last from 10) base subtraction and squaring",
          "Instant mental extraction of square roots, cube roots, and recurring decimal fractions"
        ],
        "mediums": [
          "Comprehensive Vedic Mathematics Sutra Codex Workbooks & Formula Manuals",
          "Olympiad, NTSE, Bank PO & CAT Quantitative Aptitude Speed Drill Sheets"
        ],
        "milestones": [
          "Calculate squares and square roots of 3-digit numbers mentally in 3 seconds",
          "Attain top percentile scores in School Mathematics Olympiad and competitive aptitude tests",
          "Award of the Chitran Vedic Mathematics Scholar Diploma of Honor"
        ],
        "waInquiryText": "Hello Chitran Institute! I would like to enroll in Abacus Level 8 (Ancient Vedic Speed Mathematics)."
      }
    ]
  }
};

  let currentSyllabusDiscipline = 'drawing';
  let currentModuleIndex = 0;

  function renderSyllabus(disciplineKey, activeIndex = 0) {
    const data = SYLLABUS_DATA[disciplineKey];
    if (!data) return;

    currentSyllabusDiscipline = disciplineKey;
    currentModuleIndex = activeIndex;

    // 1. Render 8 Ascending Steps
    if (stepsGridContainer) {
      stepsGridContainer.innerHTML = data.modules.map((m, idx) => {
        const isActive = idx === activeIndex;
        return `
          <div class="stair-step-col">
            <div class="stair-step ${isActive ? 'active' : ''}" 
                 onclick="selectSyllabusModule(${idx})" 
                 role="button" 
                 tabindex="0" 
                 title="Click to explore Module ${m.moduleNum}: ${m.stepName}">
              <span class="step-num-tag">MOD ${m.moduleNum}</span>
              <div class="step-title">${m.stepName}</div>
              <span class="step-duration-chip">⏱️ ${m.duration}</span>
            </div>
          </div>
        `;
      }).join('');

      // Auto-center the active card on mobile viewport
      if (window.innerWidth <= 1024 && stepsGridContainer.children[activeIndex]) {
        stepsGridContainer.children[activeIndex].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }

    // Update Mobile Counter Bar
    const mobileModCounter = document.getElementById('mobileModCounter');
    if (mobileModCounter) {
      mobileModCounter.innerHTML = `<span>Module ${activeIndex + 1} of 8</span>`;
    }

    // Update Mobile Progress Dots
    const mobileDotsIndicator = document.getElementById('mobileDotsIndicator');
    if (mobileDotsIndicator) {
      mobileDotsIndicator.innerHTML = data.modules.map((_, idx) => `
        <button type="button" class="mod-dot ${idx === activeIndex ? 'active' : ''}" 
                onclick="selectSyllabusModule(${idx})" 
                aria-label="Go to Module ${idx + 1}" 
                title="Module ${idx + 1}"></button>
      `).join('');
    }

    // 2. Render Active Module Deep Dive Card
    const m = data.modules[activeIndex];
    if (moduleDeepDiveCard && m) {
      moduleDeepDiveCard.style.opacity = '0';
      moduleDeepDiveCard.style.transform = 'translateY(8px)';

      setTimeout(() => {
        moduleDeepDiveCard.innerHTML = `
          <div class="deepdive-header-row">
            <div class="deepdive-title-group">
              <span class="deepdive-mod-badge">MODULE ${m.moduleNum} OF 8</span>
              <h4 class="deepdive-heading">${m.title}</h4>
            </div>
            <div class="deepdive-meta-chips">
              <span class="deepdive-chip">⏱️ ${m.duration}</span>
              <span class="deepdive-chip">🎯 ${m.level}</span>
              <span class="deepdive-chip">📜 ${m.certification}</span>
            </div>
          </div>

          <p style="color: #CBD5E1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">
            ${m.desc}
          </p>

          <div class="deepdive-grid">
            <div class="deepdive-col">
              <div class="col-heading"><span>🎯</span> Core Techniques & Theory</div>
              <ul class="deepdive-list">
                ${m.techniques.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
            <div class="deepdive-col">
              <div class="col-heading"><span>🎨</span> Tools & Mediums Handled</div>
              <ul class="deepdive-list">
                ${m.mediums.map(med => `<li>${med}</li>`).join('')}
              </ul>
            </div>
            <div class="deepdive-col">
              <div class="col-heading"><span>🏆</span> Practical Milestones & Artwork</div>
              <ul class="deepdive-list">
                ${m.milestones.map(mile => `<li>${mile}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="deepdive-actions-row">
            <div class="deepdive-btn-group">
              <a href="https://wa.me/919866150378?text=${encodeURIComponent(m.waInquiryText)}" target="_blank" class="card-btn-wa" style="padding: 10px 22px; font-size: 0.88rem;">
                💬 Inquire Module ${m.moduleNum} on WhatsApp
              </a>
              <a href="#booking" class="card-btn-trial" onclick="event.preventDefault(); bookTrialFor('${data.name}');" style="padding: 10px 22px; font-size: 0.88rem;">
                Book Assessment for this Level →
              </a>
              <a href="#card-${disciplineKey}" class="btn-step-nav" onclick="event.preventDefault(); const card = document.getElementById('card-${disciplineKey}'); if(card) card.scrollIntoView({behavior:'smooth'});">
                View Discipline Overview ↓
              </a>
            </div>

            <div class="deepdive-nav-controls">
              <button type="button" class="btn-step-nav" onclick="prevSyllabusModule()" ${activeIndex === 0 ? 'disabled style="opacity:0.35; cursor:not-allowed;"' : ''}>
                ← Prev Module
              </button>
              <span style="font-size: 0.82rem; color: #F5C062; font-weight: 800; padding: 0 6px;">
                ${activeIndex + 1} / 8
              </span>
              <button type="button" class="btn-step-nav" onclick="nextSyllabusModule()" ${activeIndex === 7 ? 'disabled style="opacity:0.35; cursor:not-allowed;"' : ''}>
                Next Module →
              </button>
            </div>
          </div>
        `;

        moduleDeepDiveCard.style.opacity = '1';
        moduleDeepDiveCard.style.transform = 'translateY(0)';
      }, 120);
    }
  }

  // Mobile horizontal swipe detection for syllabus carousel
  if (stepsGridContainer) {
    let scrollTimeout = null;
    stepsGridContainer.addEventListener('scroll', () => {
      if (window.innerWidth > 1024) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerRect = stepsGridContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        let closestIndex = currentModuleIndex;
        let minDiff = Infinity;

        Array.from(stepsGridContainer.children).forEach((col, idx) => {
          const colRect = col.getBoundingClientRect();
          const colCenter = colRect.left + colRect.width / 2;
          const diff = Math.abs(containerCenter - colCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        if (closestIndex !== currentModuleIndex) {
          selectSyllabusModule(closestIndex);
        }
      }, 220);
    }, { passive: true });
  }

  // 6b. Chitran Kala Chakra (Course Mandala Explorer)
  const CHAKRA_DATA = {
    drawing: {
      kicker: 'FINE ARTS & MASTER CANVAS',
      title: 'Drawing, Sketching & Master Painting',
      faculty: 'Mentored by <strong>Guru Rajkumar Banerjee</strong> (Suryachandra Awardee, 20+ Years Exp) & <strong>Mrs. Sujata Banerjee</strong> (Principal)',
      badges: ['🏆 Affiliated to IFAA', '🏛️ Govt. MSME Certified', '🌍 Global Online (USA, Germany, UK)', '⭐ 4.9 Rating (Ashok Nagar)'],
      subKicker: 'SPECIALIZED MEDIUMS OFFERED AT CHITRAN:',
      items: [
        { icon: '✏️', title: 'Pencil Sketching & Shading', desc: '2B to 8B shading, cross-hatching, still life & perspectives' },
        { icon: '🎨', title: 'Canvas Oil Painting Realism', desc: 'Classical European glazing, portraits & realistic landscapes' },
        { icon: '✨', title: 'Tanjore painting', desc: 'Traditional embossing, Jaipur stones & authentic gold leaf' },
        { icon: '🌊', title: 'Watercolor Washes', desc: 'Wet-on-wet layering, transparency, nature & botanicals' },
        { icon: '🖌️', title: 'Acrylic on Canvas', desc: 'Contemporary canvas art, knife textures & fluid acrylics' },
        { icon: '🔪', title: 'Palette Knife 3D & Batik Art', desc: 'Sculptural impasto relief painting & traditional wax-resist' },
        { icon: '🏺', title: '3D Glass, Pot & Fabric Painting', desc: 'Ceramic pots, glass relief & silk fabric techniques' },
        { icon: '🗿', title: 'Clay Modeling & Fashion Design', desc: '3D clay sculpting, anatomy & creative design concepts' }
      ],
      quote: 'Student Tripthi won 1st Prize in Nabagitika & Medal in 5th National Level Painting Competition under Guru Rajkumar Sir.',
      waText: 'Hello Chitran Institute! I would like to get Drawing & Painting class details, timings, and fee structure.',
      waLabel: '💬 Inquire Drawing Fees on WhatsApp',
      scrollLabel: '↓ View Full Drawing Syllabus Below'
    },
    music: {
      kicker: 'INSTRUMENTAL & VOCAL ACADEMY',
      title: 'Complete Music Academy — Instruments & Singing',
      faculty: 'Mentored by <strong>Vikram Sir (Music) & Sumayukthi Ma\'am (Singing)</strong>',
      badges: ['🎹 Western Staff Notation', '🎵 Trinity College Exam Coaching', '⭐ 4.9 Rating (Ashok Nagar)'],
      subKicker: 'ALL INSTRUMENTS & VOCALS OFFERED AT CHITRAN:',
      items: [
        { icon: '🎹', title: 'Keyboard & Piano', desc: 'Western staff notation, chords, classical & Bollywood melodies with Vikram Sir' },
        { icon: '🎸', title: 'Acoustic & Electric Guitar', desc: 'Fingerpicking, chord mastery, rhythm strumming & lead solos' },
        { icon: '🥁', title: 'Drums & Western Percussion', desc: 'Tempo control, four-way coordination, octapad & live stage beats' },
        { icon: '🪕', title: 'Classical Tabla & Mridangam', desc: 'Taals, rhythmic bols, accompaniment & classical precision' },
        { icon: '🎻', title: 'Violin Mastery', desc: 'Proper bowing technique, intonation, swaras and melody performance' },
        { icon: '🎤', title: 'Carnatic & Vocal Singing', desc: 'Voice culture, breath support, pitch calibration & slokas under Sumayukthi Ma\'am' }
      ],
      quote: 'Hands-on keyboard & vocal mentorship praised by parents across Hyderabad & online globally.',
      waText: 'Hello Chitran Institute! I would like to get Music & Instrumental class details, batch timings, and fee structure.',
      waLabel: '💬 Inquire Music Fees on WhatsApp',
      scrollLabel: '↓ View Full Music Syllabus Below'
    },
    dance: {
      kicker: 'WESTERN HIP-HOP, BOLLYWOOD & CONTEMPORARY',
      title: 'Western Dance & Stage Choreography Classes',
      faculty: 'Mentored by <strong>Master Rohan (Chief Choreographer • Western & Commercial)</strong>',
      badges: ['🕺 Western Stage Training', '🎧 Hip-Hop & Urban Street Cyphers', '⭐ 4.9 Rating (Ashok Nagar)'],
      subKicker: 'FEATURED DANCE STYLES (WESTERN FOCUS):',
      items: [
        { icon: '🕺', title: 'Western Hip-Hop & Urban Street', desc: 'Popping, locking, freestyle cyphers, footwork drills & energetic grooves' },
        { icon: '🌟', title: 'Bollywood Commercial Choreography', desc: 'High-voltage stage choreography, chartbuster routines & expressions' },
        { icon: '💃', title: 'Contemporary & Lyrical Flow', desc: 'Fluid floor work, expressive body isolation, emotional narrative & posture' },
        { icon: '🩰', title: 'Western Jazz & Fitness Dance', desc: 'Rhythm synchronization, leaps, pirouettes, agility & core stamina' },
        { icon: '🎥', title: 'Stage Performance & Video Reels', desc: 'Solo choreography, stage presence, 4K video showcases & annual recitals' },
        { icon: '🪷', title: 'Classical Kuchipudi (Optional Track)', desc: 'Sacred temple mudras, Tarangam rhythm footwork & classical foundation' }
      ],
      quote: 'Annual stage performances, student concerts, and competitions across Telangana & Hyderabad.',
      waText: 'Hello Chitran Institute! I would like to get Western Dance class details (Hip-Hop/Bollywood/Contemporary), batch timings, and fees.',
      waLabel: '💬 Inquire Western Dance Fees on WhatsApp',
      scrollLabel: '↓ View Full Western Dance Syllabus Below'
    },
        handwriting: {
      kicker: 'FOR ADULTS (CIVIL STUDENTS, JOB HOLDERS) & KIDS',
      title: 'Improve Handwriting Classes for Adults (Civil Students, Job Holders), Kids',
      faculty: 'Mentored by <strong>Master Ramesh (Head of Penmanship & Calligraphy)</strong>',
      badges: ['✍️ 1-Month Guaranteed Transformation', '⚡ 2x Exam Speed Writing', '⚖️ Civil Services / UPSC Track', '⭐ 4.9 Rating (Ashok Nagar)'],
      subKicker: '1-MONTH SCIENTIFIC PENMANSHIP IMPROVEMENT:',
      items: [
        { icon: '✍️', title: '1-Month Scientific Stroke Revolution', desc: '12 core geometric strokes, grip ergonomics & proportion balance under Master Ramesh' },
        { icon: '⚡', title: 'Exam Speed Writing System', desc: 'Write 2x faster in competitive & board exams with 98% legibility retained' },
        { icon: '🖋️', title: 'Cursive Flow & 68° Italic Slant', desc: 'Flawless ligature connections, baseline adherence & elegant presentation' },
        { icon: '⚖️', title: 'Civil Services & UPSC Mains Bootcamp', desc: '3-Hour continuous writing endurance, unruled paper alignment & formatting' },
        { icon: '📜', title: 'Hindi Devanagari Script Precision', desc: 'Straight-line Shirorekha discipline, matra placement & proportional curves' },
        { icon: '✒️', title: 'Artistic Calligraphy & Lettering', desc: 'Chisel-nib pens, Gothic Blackletter, copperplate cursive & gold illumination' }
      ],
      quote: '100% transformation guaranteed in 1 month for school students, competitive aspirants & adults.',
      waText: 'Hello Chitran Institute! I would like to get details and fee structure for the 1-Month Scientific Handwriting course.',
      waLabel: '💬 Inquire Handwriting Fees on WhatsApp',
      scrollLabel: '↓ View Full Handwriting Syllabus Below'
    },
    abacus: {
      kicker: 'WHOLE-BRAIN MENTAL ARITHMETIC & VEDIC MATHS',
      title: '8-Level Japanese Soroban Abacus & Vedic Speed Mathematics',
      faculty: "Mentored by <strong>Khusbu Ma'am (Head of Soroban Abacus & Vedic Maths)</strong>",
      badges: ['🧮 8-Level Soroban Abacus', '⚡ Flash Anzan Mental Calculation', '📐 16 Ancient Vedic Sutras', '⭐ 4.9 Rating (Ashok Nagar)'],
      subKicker: 'WHOLE-BRAIN MENTAL CALCULATION PROGRAMS:',
      items: [
        { icon: '🧮', title: '17-Rod Japanese Soroban Basics', desc: 'Two-finger tactile bead manipulation, complementary formula mastery & number sense' },
        { icon: '🧠', title: 'Mental Anzan (Bead Projection)', desc: 'Projecting virtual beads in the visual cortex to compute sums faster than a calculator' },
        { icon: '⚡', title: 'Flash Anzan Speed Drills', desc: 'Sub-second 0.4s digital flashing sums building photographic memory & supreme focus' },
        { icon: '✖️', title: 'Rapid Multi-Digit Multiplication', desc: '3-Digit by 2-digit mental multiplication and long division on Soroban rods' },
        { icon: '📐', title: 'Vedic Speed Mathematics (16 Sutras)', desc: 'Ancient cross-multiplication, square roots, cube roots & Olympiad shortcuts' }
      ],
      quote: 'Children aged 5 to 13 develop photographic memory, extreme concentration, and solve complex arithmetic sums faster than a calculator.',
      waText: 'Hello Chitran Institute! I would like to get details and fee structure for the 8-Level Soroban Abacus & Vedic Maths courses.',
      waLabel: '💬 Inquire Abacus Fees on WhatsApp',
      scrollLabel: '↓ View Full Abacus Syllabus Below'
    }
  };

  const chakraDetailsPanel = document.getElementById('chakraDetailsPanel');

  function renderChakraDetails(disciplineKey) {
    const data = CHAKRA_DATA[disciplineKey];
    if (!data) return;

    // 1. Highlight active SVG petal
    document.querySelectorAll('.petal-svg-group').forEach(p => {
      if (p.getAttribute('data-discipline') === disciplineKey) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    // 2. Render dynamic preview panel
    if (chakraDetailsPanel) {
      chakraDetailsPanel.style.opacity = '0';
      chakraDetailsPanel.style.transform = 'translateY(6px)';

      setTimeout(() => {
        let badgesHtml = data.badges.map(b => `<span class="p-badge">${b}</span>`).join('');
        let itemsHtml = data.items.map(item => {
          const waInquiryUrl = `https://wa.me/919866150378?text=${encodeURIComponent(`Hello Chitran Institute! I would like to inquire about ${item.title} (${data.title}), class schedules, and fees.`)}`;
          return `
            <a href="${waInquiryUrl}" target="_blank" class="subtype-item" title="Click to inquire about ${item.title} on WhatsApp">
              <span class="st-icon">${item.icon}</span>
              <div class="st-info">
                <strong>${item.title}</strong>
                <p>${item.desc}</p>
                <span class="st-action-tag">💬 Inquire on WhatsApp →</span>
              </div>
            </a>
          `;
        }).join('');

        chakraDetailsPanel.innerHTML = `
          <div class="panel-header">
            <div class="panel-kicker">${data.kicker}</div>
            <h3 class="panel-title">${data.title}</h3>
            <p class="panel-faculty">${data.faculty}</p>
            <div class="panel-badges">${badgesHtml}</div>
          </div>
          <div class="panel-content-body">
            <div class="subtypes-kicker">${data.subKicker}</div>
            <div class="subtypes-grid">${itemsHtml}</div>
            <div class="panel-proof-quote">
              <em>"${data.quote}"</em>
            </div>
          </div>
          <div class="panel-actions-row">
            <a href="https://wa.me/919866150378?text=${encodeURIComponent(data.waText)}" target="_blank" class="chakra-btn-wa">
              ${data.waLabel}
            </a>
            <button type="button" class="chakra-btn-scroll" onclick="goToDiscipline('${disciplineKey}', true)">
              ${data.scrollLabel}
            </button>
            <a href="#booking" class="chakra-btn-trial">
              Book Free Trial Class →
            </a>
          </div>
        `;

        chakraDetailsPanel.style.opacity = '1';
        chakraDetailsPanel.style.transform = 'translateY(0)';
      }, 120);
    }
  }

  // Petal click & keydown listeners
  const svgPetals = document.querySelectorAll('.petal-svg-group');
  if (svgPetals.length > 0) {
    svgPetals.forEach(petal => {
      petal.addEventListener('click', () => {
        const discipline = petal.getAttribute('data-discipline');
        if (discipline) {
          renderChakraDetails(discipline);
          switchSyllabusDiscipline(discipline);
        }
      });
      petal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const discipline = petal.getAttribute('data-discipline');
          if (discipline) {
            renderChakraDetails(discipline);
            switchSyllabusDiscipline(discipline);
          }
        }
      });
    });
  }

  // Switch discipline tab (Drawing, Music, Dance, Handwriting)
  window.switchSyllabusDiscipline = function (disciplineKey) {
    document.querySelectorAll('.syllabus-discipline-tabs .syl-tab').forEach(tab => {
      if (tab.getAttribute('data-discipline') === disciplineKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    renderSyllabus(disciplineKey, 0);
  };

  // Select a specific module step (0 to 7)
  window.selectSyllabusModule = function (index) {
    renderSyllabus(currentSyllabusDiscipline, index);
  };

  // Step navigation helpers
  window.nextSyllabusModule = function () {
    if (currentModuleIndex < 7) {
      renderSyllabus(currentSyllabusDiscipline, currentModuleIndex + 1);
    }
  };

  window.prevSyllabusModule = function () {
    if (currentModuleIndex > 0) {
      renderSyllabus(currentSyllabusDiscipline, currentModuleIndex - 1);
    }
  };

  // Global redirection function called from navbar, hero, or quick inquiry
  window.goToDiscipline = function (disciplineKey, shouldScroll = true) {
    // 1. Update Kala Chakra wheel & details panel
    renderChakraDetails(disciplineKey);

    // 2. Switch the 8-Module Syllabus to this discipline
    switchSyllabusDiscipline(disciplineKey);

    // 3. Smoothly scroll to the syllabus section with exact header offset
    if (shouldScroll) {
      const syllabusEl = document.getElementById('the-syllabus');
      if (syllabusEl) {
        const headerOffset = 96;
        const elementPosition = syllabusEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      // Also gently highlight the corresponding card below
      const targetCard = document.getElementById(`card-${disciplineKey}`);
      if (targetCard) {
        targetCard.classList.remove('card-highlight-pulse');
        void targetCard.offsetWidth; // trigger reflow
        targetCard.classList.add('card-highlight-pulse');
      }
    }
  };

  // Helper for Free Trial booking with auto course preselection
  window.bookTrialFor = function (courseKeyword) {
    const select = document.getElementById('courseSelect');
    if (select && courseKeyword) {
      const kw = courseKeyword.toLowerCase();
      for (let i = 0; i < select.options.length; i++) {
        const optText = select.options[i].text.toLowerCase();
        const optVal = select.options[i].value.toLowerCase();
        if (optText.includes(kw) || optVal.includes(kw) ||
          (kw.includes('drawing') && optVal.includes('drawing')) ||
          (kw.includes('music') && optVal.includes('keyboard')) ||
          (kw.includes('dance') && optVal.includes('dance')) ||
          (kw.includes('handwriting') && optVal.includes('handwriting'))) {
          select.selectedIndex = i;
          break;
        }
      }
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      const headerOffset = 96;
      const elementPosition = bookingEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // ==========================================================================
  // 1. HEADER QUICK SEARCH WITH PREDICTIVE AUTOCOMPLETE
  // ==========================================================================
  const COURSE_CATALOG = [
    // Fine Arts
    { name: 'Drawing & Painting Classes', category: 'Fine Arts', icon: '🎨', target: 'card-drawing', page: 'drawing.html' },
    { name: 'Pencil Sketching & Shading (2B-8B)', category: 'Fine Arts', icon: '✏️', target: 'card-drawing', page: 'drawing.html' },
    { name: 'Oil Painting on Canvas', category: 'Fine Arts', icon: '🖼️', target: 'card-drawing', page: 'drawing.html' },
    { name: 'Watercolor & Gouache Washes', category: 'Fine Arts', icon: '🌊', target: 'card-drawing', page: 'drawing.html' },
    { name: 'Tanjore 22K Gold Foil Art', category: 'Fine Arts', icon: '✨', target: 'card-drawing', page: 'drawing.html' },
    { name: 'Acrylic & Palette Knife Realism', category: 'Fine Arts', icon: '🖌️', target: 'card-drawing', page: 'drawing.html' },
    { name: 'IFAA Diploma & Certification', category: 'Fine Arts', icon: '📜', target: 'card-drawing', page: 'drawing.html' },
    { name: 'NATA & B.Arch Sketching Prep', category: 'Fine Arts', icon: '📐', target: 'card-drawing', page: 'drawing.html' },
    
    // Music Academy
    { name: 'Keyboard Classes (Yamaha & Casio)', category: 'Music Academy', icon: '🎹', target: 'card-music', page: 'music.html' },
    { name: 'Western Classical Piano', category: 'Music Academy', icon: '🎼', target: 'card-music', page: 'music.html' },
    { name: 'Acoustic & Electric Guitar', category: 'Music Academy', icon: '🎸', target: 'card-music', page: 'music.html' },
    { name: 'Western Drums & Percussion', category: 'Music Academy', icon: '🥁', target: 'card-music', page: 'music.html' },
    { name: 'Roland Octapad Live Rig', category: 'Music Academy', icon: '⚡', target: 'card-music', page: 'music.html' },
    { name: 'Classical Tabla & Bols', category: 'Music Academy', icon: '🪕', target: 'card-music', page: 'music.html' },
    { name: 'Carnatic Vocal & Devotional Slokas', category: 'Music Academy', icon: '🎤', target: 'card-music', page: 'music.html' },
    { name: 'Trinity College London Certification', category: 'Music Academy', icon: '🎓', target: 'card-music', page: 'music.html' },
    
    // Dance Academy
    { name: 'Western Dance & Choreography', category: 'Dance Academy', icon: '🕺', target: 'card-dance', page: 'dance.html' },
    { name: 'Hip-Hop, Popping & Locking', category: 'Dance Academy', icon: '👟', target: 'card-dance', page: 'dance.html' },
    { name: 'Bollywood Commercial Choreography', category: 'Dance Academy', icon: '🌟', target: 'card-dance', page: 'dance.html' },
    { name: 'Contemporary & Lyrical Flow', category: 'Dance Academy', icon: '💫', target: 'card-dance', page: 'dance.html' },
    { name: 'Western Jazz & Dance Fitness', category: 'Dance Academy', icon: '🩰', target: 'card-dance', page: 'dance.html' },
    { name: 'Classical Kuchipudi Dance', category: 'Dance Academy', icon: '💃', target: 'card-dance', page: 'dance.html' },
    
    // Skill Mastery
    { name: 'Handwriting Improvement (1-Month)', category: 'Skill Mastery', icon: '✍️', target: 'card-handwriting', page: 'handwriting.html' },
    { name: '2x Speed Writing for UPSC & Exams', category: 'Skill Mastery', icon: '⚡', target: 'card-handwriting', page: 'handwriting.html' },
    { name: 'English Cursive & Print Script', category: 'Skill Mastery', icon: '🖋️', target: 'card-handwriting', page: 'handwriting.html' },
    { name: 'Hindi Devanagari Script Precision', category: 'Skill Mastery', icon: '📜', target: 'card-handwriting', page: 'handwriting.html' },
    { name: 'Calligraphy & Lettering Mastery', category: 'Skill Mastery', icon: '✒️', target: 'card-handwriting', page: 'handwriting.html' }
  ];

  function initHeaderQuickSearch() {
    const searchInput = document.getElementById('quickCourseSearch');
    const dropdown = document.getElementById('searchSuggestionsDropdown');
    const clearBtn = document.getElementById('quickSearchClearBtn');

    if (!searchInput || !dropdown) return;

    let highlightedIndex = -1;

    function renderMatches(query) {
      const q = query.trim().toLowerCase();
      if (!q) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('active');
        if (clearBtn) clearBtn.classList.remove('visible');
        highlightedIndex = -1;
        return;
      }

      if (clearBtn) clearBtn.classList.add('visible');

      const matches = COURSE_CATALOG.filter(c => {
        return c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      }).slice(0, 6);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="suggestion-empty">
            No courses found for "<strong>${escapeHtml(query)}</strong>". Try "Keyboard", "Painting", or "Dance".
          </div>
        `;
        dropdown.classList.add('active');
        return;
      }

      dropdown.innerHTML = matches.map((course, idx) => {
        const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const highlightedName = course.name.replace(regex, '<span style="color: #F5C062; font-weight:800;">$1</span>');

        return `
          <div class="suggestion-item" data-index="${idx}" data-target="${course.target}" data-page="${course.page}" role="option">
            <div class="suggestion-title-group">
              <span class="suggestion-icon">${course.icon}</span>
              <span class="suggestion-name">${highlightedName}</span>
            </div>
            <span class="suggestion-badge">${course.category}</span>
          </div>
        `;
      }).join('');

      dropdown.classList.add('active');
      highlightedIndex = -1;

      // Click on suggestions
      dropdown.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const targetId = item.getAttribute('data-target');
          const targetPage = item.getAttribute('data-page');
          selectSuggestion(targetId, targetPage, item.querySelector('.suggestion-name')?.textContent || '');
        });
      });
    }

    function selectSuggestion(targetId, targetPage, courseName) {
      if (courseName) {
        searchInput.value = courseName.trim();
      }
      dropdown.classList.remove('active');

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Smooth scroll to card on current page
        const headerOffset = 110;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Trigger pulse highlight
        targetEl.classList.remove('filter-highlight');
        void targetEl.offsetWidth;
        targetEl.classList.add('filter-highlight');
      } else if (targetPage) {
        // Navigate to dedicated course page
        window.location.href = targetPage;
      }
    }

    function escapeHtml(str) {
      return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m]));
    }

    searchInput.addEventListener('input', (e) => {
      renderMatches(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      const items = dropdown.querySelectorAll('.suggestion-item');
      if (!dropdown.classList.contains('active') || items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedIndex = (highlightedIndex + 1) % items.length;
        updateActiveSuggestion(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
        updateActiveSuggestion(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && items[highlightedIndex]) {
          items[highlightedIndex].click();
        } else if (items[0]) {
          items[0].click();
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('active');
      }
    });

    function updateActiveSuggestion(items) {
      items.forEach((item, idx) => {
        if (idx === highlightedIndex) {
          item.classList.add('highlighted');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('highlighted');
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        renderMatches('');
        searchInput.focus();
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 2. INTERACTIVE COURSE FILTER WITH DYNAMIC RESULT COUNTER
  // ==========================================================================
  function initInteractiveCourseFilter() {
    const filterAge = document.getElementById('filterAgeGroup');
    const filterInterest = document.getElementById('filterInterest');
    const filterGoal = document.getElementById('filterGoal');
    const submitBtn = document.getElementById('courseFilterSubmitBtn');
    const resetBtn = document.getElementById('courseFilterResetBtn');
    const countText = document.getElementById('filterBtnCountText');

    const cards = document.querySelectorAll('#disciplinesGrid .discipline-card');
    if (!filterAge || !filterInterest || !filterGoal || !countText || cards.length === 0) return;

    function getMatchingCards() {
      const ageVal = filterAge.value;
      const interestVal = filterInterest.value;
      const goalVal = filterGoal.value;

      return Array.from(cards).filter(card => {
        const cardAge = (card.getAttribute('data-age') || '').toLowerCase();
        const cardInterest = (card.getAttribute('data-interest') || '').toLowerCase();
        const cardGoal = (card.getAttribute('data-goal') || '').toLowerCase();

        const matchAge = (ageVal === 'all') || cardAge.includes(ageVal);
        const matchInterest = (interestVal === 'all') || (cardInterest === interestVal);
        const matchGoal = (goalVal === 'all') || cardGoal.includes(goalVal);

        return matchAge && matchInterest && matchGoal;
      });
    }

    function updateCounter() {
      const matches = getMatchingCards();
      const count = matches.length;

      if (count === 0) {
        countText.textContent = 'No Matching Courses';
        if (submitBtn) submitBtn.style.opacity = '0.6';
      } else if (count === 1) {
        countText.textContent = 'Show 1 Course';
        if (submitBtn) submitBtn.style.opacity = '1';
      } else if (count === cards.length) {
        countText.textContent = `Show All ${count} Courses`;
        if (submitBtn) submitBtn.style.opacity = '1';
      } else {
        countText.textContent = `Show ${count} Courses`;
        if (submitBtn) submitBtn.style.opacity = '1';
      }
    }

    function applyFilter() {
      const matches = getMatchingCards();

      cards.forEach(card => {
        if (matches.includes(card)) {
          card.classList.remove('filter-hidden');
          card.classList.remove('filter-highlight');
          void card.offsetWidth;
          card.classList.add('filter-highlight');
        } else {
          card.classList.add('filter-hidden');
          card.classList.remove('filter-highlight');
        }
      });

      // Smooth scroll down to course cards
      const targetGrid = document.getElementById('disciplinesGrid');
      if (targetGrid) {
        const headerOffset = 100;
        const elementPosition = targetGrid.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    function resetFilter() {
      filterAge.value = 'all';
      filterInterest.value = 'all';
      filterGoal.value = 'all';

      cards.forEach(card => {
        card.classList.remove('filter-hidden');
        card.classList.remove('filter-highlight');
      });

      updateCounter();
    }

    [filterAge, filterInterest, filterGoal].forEach(select => {
      select.addEventListener('change', updateCounter);
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', applyFilter);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetFilter);
    }

    // Initial count
    updateCounter();
  }

  // ==========================================================================
  // 3. INTERACTIVE WHATSAPP INQUIRY MODAL (FAB CONSOLIDATION)
  // ==========================================================================
  function initWhatsAppInquiryModal() {
    const backdrop = document.getElementById('waModalBackdrop');
    const chipsContainer = document.getElementById('waInterestChips');

    if (!backdrop) return;

    window.openWhatsAppModal = function () {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const nameInput = document.getElementById('waStudentName');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 150);
      }
    };

    window.closeWhatsAppModal = function (e) {
      if (e && e.target && e.target !== backdrop && !e.target.classList.contains('wa-modal-close')) {
        return;
      }
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        window.closeWhatsAppModal();
      }
    });

    // Chip selection
    if (chipsContainer) {
      chipsContainer.querySelectorAll('.wa-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          chipsContainer.querySelectorAll('.wa-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        });
      });
    }

    window.launchWhatsAppInquiry = function () {
      const activeChip = document.querySelector('#waInterestChips .wa-chip.active');
      const topic = activeChip ? activeChip.getAttribute('data-topic') : 'Art & Music Courses';
      const nameInput = document.getElementById('waStudentName');
      const ageSelect = document.getElementById('waStudentAge');

      const name = nameInput ? nameInput.value.trim() : '';
      const age = ageSelect ? ageSelect.value : 'Child (Ages 4-12)';

      let msg = 'Hello Chitran Institute! ';
      if (name) {
        msg += `My name is ${name}. `;
      }
      msg += `I would like to inquire about ${topic} for a ${age}. Please share the syllabus, fee details, and batch timings.`;

      // Crucial: URL-encode ampersands as %26 for WhatsApp link parsing safety
      const encodedMsg = encodeURIComponent(msg).replace(/&/g, '%26');
      const waUrl = `https://wa.me/919866150378?text=${encodedMsg}`;

      window.open(waUrl, '_blank');
      window.closeWhatsAppModal();
    };
  }

  // Initialize new UI/UX features
  initHeaderQuickSearch();
  initInteractiveCourseFilter();
  initWhatsAppInquiryModal();

  // Initial renders
  renderChakraDetails('drawing');
  renderSyllabus('drawing', 0);
});
