/**
 * Avengers Club - Central Application Coordinator
 * Command Bar, Audio FX, Scrollspy, Mobile Drawer & Global Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio System Setup
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStatusLabel = document.getElementById('sound-status-label');

  if (window.soundSystem) {
    const isEnabled = window.soundSystem.loadState();
    updateSoundUI(isEnabled);

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const state = window.soundSystem.toggle();
        updateSoundUI(state);
      });
    }
  }

  function updateSoundUI(enabled) {
    if (soundToggleBtn) {
      soundToggleBtn.classList.toggle('muted', !enabled);
      soundToggleBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
    if (soundStatusLabel) {
      soundStatusLabel.textContent = enabled ? 'SFX: ON' : 'SFX: MUTED';
    }
  }

  // 2. Sticky Navbar Blur & Shadow on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Hamburger Menu Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (window.soundSystem) window.soundSystem.playClick();
    });

    mobileDrawer.querySelectorAll('.mobile-nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Smooth Anchor Scrolling & Active Section Highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // 5. Experience Hub Tabs Switching (Aptitude Protocol vs Mjolnir Chamber)
  const expTabs = document.querySelectorAll('.experience-tab-btn');
  const expPanels = document.querySelectorAll('.experience-panel');

  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      expTabs.forEach(t => t.classList.remove('active'));
      expPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(targetId)?.classList.add('active');
      if (window.soundSystem) window.soundSystem.playClick();
    });
  });

  // 6. Global Sound Feedback on Hover for Interactive Elements
  document.querySelectorAll('.btn, .nav-link, .team-card, .operation-card, .mission-panel').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.soundSystem) window.soundSystem.playHover();
    });
  });

  // 7. Dynamic Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 8. Avengers Assemble Secret Easter Egg
  let typedBuffer = '';
  window.addEventListener('keydown', (e) => {
    // Ignore when typing inside input or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    typedBuffer += e.key.toLowerCase();
    if (typedBuffer.length > 8) typedBuffer = typedBuffer.slice(-8);

    if (typedBuffer === 'assemble') {
      if (window.soundSystem) {
        window.soundSystem.playShieldClang();
        window.soundSystem.playArcReactor();
      }
      document.body.classList.add('avengers-assemble-surge');
      alert('⚡ S.H.I.E.L.D. PROTOCOL OVERRIDE: AVENGERS ASSEMBLE! All campus divisions summoned to active status.');
      setTimeout(() => {
        document.body.classList.remove('avengers-assemble-surge');
      }, 3000);
      typedBuffer = '';
    }
  });
});
