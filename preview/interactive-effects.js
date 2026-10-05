/**
 * ============================================================================
 * CHITRAN INSTITUTE — CREATIVE TECH LAYER
 * Integrations:
 * 1. Lenis (Awwwards-Tier Desktop Inertia Smooth Scroll)
 * 2. GSAP + ScrollTrigger (Scroll-driven reveals, milestone countups & parallax)
 * 3. Three.js (Luminous 3D Gold Dust / Art Pigment Constellation in Hero)
 * 
 * Safe by design: Zero layout shift, 100% native mobile touch preservation,
 * and automatic 0% GPU pause when hero is scrolled out of view.
 * ============================================================================
 */

(function () {
  'use strict';

  // Device & capabilities detection
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isDesktop = window.innerWidth >= 1024 && !isTouchDevice;

  /* --------------------------------------------------------------------------
     1. LENIS SMOOTH INERTIAL SCROLL (Desktop Only)
     -------------------------------------------------------------------------- */
  function initLenis() {
    if (!isDesktop || typeof Lenis === 'undefined') return;

    try {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        smoothTouch: false, // Strictly false: native momentum on touch screens
        touchMultiplier: 1.0,
        infinite: false
      });

      // Synchronize Lenis with GSAP ScrollTrigger if present
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      window.chitranLenis = lenis;

      // Smooth anchor scrolling (#hero, #booking, etc.)
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href && href.length > 1 && !this.getAttribute('onclick')) {
            const targetEl = document.querySelector(href);
            if (targetEl) {
              e.preventDefault();
              lenis.scrollTo(targetEl, { offset: -70, duration: 1.3 });
            }
          }
        });
      });
    } catch (err) {
      console.warn('Lenis init failed, fallback to native scrolling', err);
    }
  }

  /* --------------------------------------------------------------------------
     2. THREE.JS 3D GOLD DUST & CELESTIAL PARTICLES (Hero Section)
     -------------------------------------------------------------------------- */
  function initThreeHero() {
    const heroSection = document.getElementById('hero') || document.querySelector('.aarabhi-hero-slider');
    if (!heroSection || typeof THREE === 'undefined') return;

    try {
      // Create dedicated overlay canvas
      let canvas = document.getElementById('heroThreeCanvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'heroThreeCanvas';
        canvas.className = 'hero-three-canvas';
        heroSection.insertBefore(canvas, heroSection.firstChild);
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, heroSection.offsetWidth / heroSection.offsetHeight, 0.1, 1000);
      camera.position.z = 180;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      });
      renderer.setSize(heroSection.offsetWidth, heroSection.offsetHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Generate a soft radial gold particle texture programmatically
      function createGoldGlowTexture() {
        const size = 64;
        const pCanvas = document.createElement('canvas');
        pCanvas.width = size;
        pCanvas.height = size;
        const ctx = pCanvas.getContext('2d');

        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, 'rgba(255, 235, 175, 1)');
        gradient.addColorStop(0.25, 'rgba(245, 192, 98, 0.85)');
        gradient.addColorStop(0.55, 'rgba(217, 119, 6, 0.35)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        const texture = new THREE.CanvasTexture(pCanvas);
        texture.needsUpdate = true;
        return texture;
      }

      // Particle Geometry & Attributes
      const particleCount = isDesktop ? 140 : 60;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        // Spread particles across a wide 3D prism
        positions[i * 3] = (Math.random() - 0.5) * 450;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 280;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 250;

        scales[i] = Math.random() * 0.8 + 0.4;

        velocities.push({
          x: (Math.random() - 0.5) * 0.08,
          y: Math.random() * 0.12 + 0.04, // subtle upward floating drift like art dust
          z: (Math.random() - 0.5) * 0.06
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      const material = new THREE.PointsMaterial({
        size: isDesktop ? 12 : 9,
        map: createGoldGlowTexture(),
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      // Interactive mouse parallax on desktop
      let mouseX = 0;
      let mouseY = 0;
      let targetMouseX = 0;
      let targetMouseY = 0;

      if (isDesktop) {
        window.addEventListener('mousemove', (e) => {
          targetMouseX = (e.clientX / window.innerWidth - 0.5) * 24;
          targetMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        }, { passive: true });
      }

      // Resize handler
      function onWindowResize() {
        if (!heroSection) return;
        const width = heroSection.offsetWidth;
        const height = heroSection.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
      window.addEventListener('resize', onWindowResize, { passive: true });

      // Viewport Optimization: PAUSE rendering when hero is scrolled out of view!
      let isHeroVisible = true;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);

      // Render Loop
      let animId = null;
      function animate() {
        animId = requestAnimationFrame(animate);

        // Skip calculations if hero is scrolled away (0% GPU footprint)
        if (!isHeroVisible) return;

        // Smooth camera drift toward mouse position
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;
        camera.position.x = mouseX;
        camera.position.y = -mouseY;
        camera.lookAt(scene.position);

        // Gently animate each particle position
        const posAttr = geometry.attributes.position;
        const posArr = posAttr.array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          posArr[idx] += velocities[i].x;
          posArr[idx + 1] += velocities[i].y;
          posArr[idx + 2] += velocities[i].z;

          // Wrap around top boundary
          if (posArr[idx + 1] > 150) {
            posArr[idx + 1] = -150;
            posArr[idx] = (Math.random() - 0.5) * 450;
          }
        }
        posAttr.needsUpdate = true;

        particleSystem.rotation.y += 0.0006;

        renderer.render(scene, camera);
      }

      animate();
    } catch (e) {
      console.warn('Three.js hero background init skipped:', e);
    }
  }

  /* --------------------------------------------------------------------------
     3. GSAP & SCROLLTRIGGER ENHANCEMENTS
     -------------------------------------------------------------------------- */
  function initGSAP() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // A. Animated Milestone Counters in Trust Strip (0 to 20+, 5,000+, 4.9★, 100%)
    const statItems = document.querySelectorAll('.trust-strip .stat-item, .stats-grid .stat-item');
    statItems.forEach((item) => {
      const numEl = item.querySelector('.stat-number');
      if (!numEl) return;

      const rawText = numEl.textContent.trim();
      let targetNum = 0;
      let suffix = '';
      let isFloat = false;

      if (rawText.includes('20+')) {
        targetNum = 20;
        suffix = '+';
      } else if (rawText.includes('5,000') || rawText.includes('5000')) {
        targetNum = 5000;
        suffix = '+';
      } else if (rawText.includes('4.9')) {
        targetNum = 4.9;
        suffix = '★';
        isFloat = true;
      } else if (rawText.includes('100%')) {
        targetNum = 100;
        suffix = '%';
      } else {
        const match = rawText.match(/([0-9.,]+)(.*)/);
        if (match) {
          targetNum = parseFloat(match[1].replace(/,/g, '')) || 0;
          suffix = match[2] || '';
          isFloat = rawText.includes('.');
        }
      }

      if (targetNum > 0 && typeof ScrollTrigger !== 'undefined') {
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: targetNum,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          onUpdate: function () {
            if (isFloat) {
              numEl.textContent = counterObj.val.toFixed(1) + suffix;
            } else if (targetNum >= 1000) {
              numEl.textContent = Math.floor(counterObj.val).toLocaleString() + suffix;
            } else {
              numEl.textContent = Math.floor(counterObj.val) + suffix;
            }
          }
        });
      }
    });

    if (typeof ScrollTrigger === 'undefined') return;

    // Refresh ScrollTrigger to ensure accurate layout tracking
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    // E. Kala Chakra Visual Subtle Scroll Parallax on Desktop
    const chakraWheel = document.querySelector('.kala-chakra-wheel, .chakra-disc-svg');
    if (chakraWheel && isDesktop) {
      gsap.to(chakraWheel, {
        rotation: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: chakraWheel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // F. Magnetic Cursor Feedback on Primary CTAs (Desktop Only)
    if (isDesktop) {
      const magneticButtons = document.querySelectorAll('.btn-primary, .slide-cta-group .btn-aarabhi-crimson');
      magneticButtons.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.22,
            y: y * 0.22,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)'
          });
        });
      });
    }
  /* --------------------------------------------------------------------------
     4. ATELIER SOFT-FOCUS BLUR REVEAL & SHADOW MERGE (FULL PACKAGE)
     -------------------------------------------------------------------------- */
  function initScrollBlurAndShadowMerge() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Respect user's accessibility reduced motion setting
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth < 768;
    const isMobileMode = isTouch || isMobileWidth;

    // A. STAGGERED SOFT-FOCUS BLUR-TO-SHARP CARD REVEALS
    const gridContainers = [
      '.achievements-grid',
      '.medium-cards-grid',
      '.camp-zones-grid',
      '.drawing-types-grid',
      '.testimonials-grid',
      '.syllabus-path-grid',
      '.stats-grid',
      '.faculty-grid',
      '.features-grid'
    ];

    gridContainers.forEach((selector) => {
      const container = document.querySelector(selector);
      if (!container) return;

      const cards = container.children;
      if (!cards || cards.length === 0) return;

      const cardArray = Array.from(cards).filter((c) => c.nodeType === 1);
      if (cardArray.length === 0) return;

      // On desktop: rich optical 8px blur + 32px slide
      // On mobile: light 2px blur + 18px slide for 60/120fps buttery smoothness
      const initialBlur = isMobileMode ? 'blur(2px)' : 'blur(8px)';
      const initialY = isMobileMode ? 18 : 32;
      const staggerTime = isMobileMode ? 0.05 : 0.09;
      const durationTime = isMobileMode ? 0.65 : 0.9;

      gsap.fromTo(cardArray,
        {
          opacity: 0,
          y: initialY,
          filter: initialBlur
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: durationTime,
          stagger: staggerTime,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: isMobileMode ? 'top 92%' : 'top 86%',
            toggleActions: 'play none none none',
            once: true
          },
          clearProps: 'filter,will-change'
        }
      );
    });

    // B. STANDALONE CARDS (Not inside matched parent grids)
    const standaloneCards = document.querySelectorAll(
      '.achievement-card:not(.achievements-grid *), .medium-card:not(.medium-cards-grid *), .step-card:not(.syllabus-path-grid *)'
    );
    standaloneCards.forEach((card) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: isMobileMode ? 18 : 30,
          filter: isMobileMode ? 'blur(2px)' : 'blur(7px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: isMobileMode ? 0.65 : 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          },
          clearProps: 'filter,will-change'
        }
      );
    });

    // C. ROYAL AMBIENT SHADOW MERGE & GLOW BLOOM (Feature Banners & Key Conversion Cards)
    const shadowMergeTargets = document.querySelectorAll(
      '.visual-banner-card, .why-wait-card, .camp-flagship-card, .booking-form-card, .aarabhi-card'
    );

    shadowMergeTargets.forEach((card) => {
      const targetShadow = isMobileMode
        ? '0 12px 36px -6px rgba(245, 192, 98, 0.22), 0 0 20px rgba(245, 192, 98, 0.08)'
        : '0 24px 60px -12px rgba(245, 192, 98, 0.28), 0 0 35px rgba(245, 192, 98, 0.12), 0 1px 0 rgba(253, 230, 138, 0.35) inset';

      gsap.fromTo(card,
        {
          opacity: 0,
          y: isMobileMode ? 20 : 36,
          filter: isMobileMode ? 'none' : 'blur(6px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          boxShadow: targetShadow,
          duration: isMobileMode ? 0.75 : 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          },
          clearProps: 'filter,will-change'
        }
      );
    });

    // D. CINEMATIC VIGNETTE IMAGE FOCUS & SUBTLE SCALE SETTLING
    const mediaImages = document.querySelectorAll(
      '.visual-banner-media img, .card-photo-wrap img, .cta-booking-img, .pointing-student-img'
    );
    mediaImages.forEach((img) => {
      gsap.fromTo(img,
        {
          scale: 1.05,
          filter: 'brightness(0.92)'
        },
        {
          scale: 1.0,
          filter: 'brightness(1.0)',
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img.parentElement || img,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          },
          clearProps: 'will-change'
        }
      );
    });

    // E. SECTION HEADERS & ACCENT BADGES
    const sectionHeaders = document.querySelectorAll('.section-header, .visual-banner-content');
    sectionHeaders.forEach((header) => {
      const heading = header.querySelector('h2, h3, .visual-banner-title');
      const text = header.querySelector('p, .visual-banner-desc');
      const badge = header.querySelector('.section-tag, .camp-annual-badge, .filter-badge');

      const elements = [badge, heading, text].filter(Boolean);
      if (elements.length > 0) {
        gsap.fromTo(elements,
          {
            opacity: 0,
            y: isMobileMode ? 14 : 22,
            filter: isMobileMode ? 'none' : 'blur(4px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            },
            clearProps: 'filter,will-change'
          }
        );
      }
    });

    // F. HEADER NAVBAR SHADOW MERGE ON SCROLL
    const header = document.querySelector('.main-header, .site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 35) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  /* --------------------------------------------------------------------------
     5. BOOTSTRAP WHEN DOM IS READY
     -------------------------------------------------------------------------- */
  function boot() {
    initLenis();
    initThreeHero();
    initGSAP();
    initScrollBlurAndShadowMerge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
