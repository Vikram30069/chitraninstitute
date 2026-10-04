/**
 * ============================================================================
 * CHITRAN INSTITUTE — DYNAMIC TYPING ANIMATIONS ENGINE
 * Provides silky-smooth, hardware-accelerated typewriter effects across:
 * 1. Global Header Search Input Placeholder
 * 2. Hero Section Dynamic Discipline Strip
 * 3. Course Discovery Filter
 * 4. Why Wait / Direct Enrollment Section
 * 5. Free Trial Booking Kicker
 * 6. Subpage Hero Headings
 * ============================================================================
 */

(function () {
  'use strict';

  // Core Typewriter Class
  class Typewriter {
    constructor(element, phrases, options = {}) {
      this.element = element;
      this.phrases = phrases || [];
      this.typeSpeed = options.typeSpeed || 70;
      this.deleteSpeed = options.deleteSpeed || 40;
      this.pauseBeforeDelete = options.pauseBeforeDelete || 2000;
      this.pauseBeforeNext = options.pauseBeforeNext || 500;
      this.isInput = options.isInput || (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA');

      this.currentPhraseIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      this.isPaused = false;
      this.timeoutId = null;

      if (this.phrases.length > 0) {
        this.start();
      }
    }

    start() {
      this.tick();
    }

    pause() {
      this.isPaused = true;
      if (this.timeoutId) clearTimeout(this.timeoutId);
    }

    resume() {
      if (this.isPaused) {
        this.isPaused = false;
        this.tick();
      }
    }

    tick() {
      if (this.isPaused) return;

      const currentPhrase = this.phrases[this.currentPhraseIndex];

      if (this.isDeleting) {
        this.currentCharIndex--;
      } else {
        this.currentCharIndex++;
      }

      const displayedText = currentPhrase.substring(0, this.currentCharIndex);

      if (this.isInput) {
        this.element.setAttribute('placeholder', displayedText);
      } else {
        this.element.textContent = displayedText;
      }

      let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

      // When phrase is completely typed
      if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
        speed = this.pauseBeforeDelete;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        speed = this.pauseBeforeNext;
      }

      this.timeoutId = setTimeout(() => this.tick(), speed);
    }
  }

  function initAllTypewriters() {
    // 1. Global Header Search Input Placeholder
    const searchInput = document.getElementById('navSearchInput') || document.querySelector('.nav-search-input');
    if (searchInput) {
      const searchPhrases = [
        'Search "Keyboard & Piano classes"...',
        'Search "Guru Rajkumar Banerjee Drawing"...',
        'Search "1-Month Handwriting Speed"...',
        'Search "Tanjore 22K Gold Painting"...',
        'Search "Western Hip-Hop for Kids"...',
        'Search "Guitar classes in Ashok Nagar"...',
        'Search "Summer Camp 2026 Workshops"...'
      ];

      const searchTypewriter = new Typewriter(searchInput, searchPhrases, {
        typeSpeed: 60,
        deleteSpeed: 30,
        pauseBeforeDelete: 2400,
        isInput: true
      });

      // Pause when user focuses or types; resume if left empty
      searchInput.addEventListener('focus', () => searchTypewriter.pause());
      searchInput.addEventListener('blur', () => {
        if (!searchInput.value.trim()) {
          searchTypewriter.resume();
        }
      });
      searchInput.addEventListener('input', () => {
        if (searchInput.value.trim()) {
          searchTypewriter.pause();
        }
      });
    }

    // 2. Hero Section Dynamic Typed Strip
    const heroTyped = document.getElementById('heroLiveTypewriter');
    if (heroTyped) {
      new Typewriter(heroTyped, [
        'European Oil on Canvas Realism',
        'Trinity College Western Keyboard & Piano',
        '1-Month Handwriting Speed Revolution',
        'Traditional 22K Gold Tanjore Masterpieces',
        'Acoustic Fingerstyle & Classical Guitar',
        'High-Energy Western Hip-Hop & Freestyle',
        'IFAA Govt Recognized Diploma Certifications'
      ], {
        typeSpeed: 70,
        deleteSpeed: 35,
        pauseBeforeDelete: 2200
      });
    }

    // 3. Course Filter Section Typewriter
    const filterTyped = document.getElementById('filterTypewriterText');
    if (filterTyped) {
      new Typewriter(filterTyped, [
        'Fine Arts from basic sketching to oil realism',
        'Western staff notation & Trinity grade exams',
        '2x exam writing speed & Devanagari precision',
        'Stage choreography & high-energy hip-hop'
      ], {
        typeSpeed: 65,
        deleteSpeed: 35,
        pauseBeforeDelete: 2400
      });
    }

    // 4. Why Wait Section Typewriter
    const whyWaitTyped = document.getElementById('whyWaitTypewriterText');
    if (whyWaitTyped) {
      new Typewriter(whyWaitTyped, [
        'Master Drawing & Canvas Oil Realism',
        'Keyboard, Piano & Classical Vocals',
        'Scientific 1-Month Handwriting Speed',
        'Live Stage Recitals & Dance Festivals'
      ], {
        typeSpeed: 65,
        deleteSpeed: 35,
        pauseBeforeDelete: 2200
      });
    }

    // 5. Booking Form Live Kicker Typewriter
    const bookingTyped = document.getElementById('bookingTypewriterText');
    if (bookingTyped) {
      new Typewriter(bookingTyped, [
        'Pencil Sketching & Fine Arts Evaluation',
        'Keyboard Finger Placement & Rhythm Check',
        'Handwriting Speed & Legibility Diagnosis',
        'Acoustic Guitar Chords & Ear Training',
        'Western Dance Movement & Flexibility Test'
      ], {
        typeSpeed: 60,
        deleteSpeed: 30,
        pauseBeforeDelete: 2200
      });
    }

    // 6. Generic Declarative Typewriters [data-typewriter]
    document.querySelectorAll('[data-typewriter]').forEach((el) => {
      try {
        const phrases = JSON.parse(el.getAttribute('data-typewriter'));
        if (Array.isArray(phrases) && phrases.length > 0) {
          new Typewriter(el, phrases, {
            typeSpeed: 70,
            deleteSpeed: 35,
            pauseBeforeDelete: 2200
          });
        }
      } catch (e) {
        console.warn('Invalid data-typewriter JSON on', el, e);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTypewriters);
  } else {
    initAllTypewriters();
  }
})();
