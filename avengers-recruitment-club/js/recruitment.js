/**
 * Avengers Club - Secure Recruitment Transmission Portal
 * Section 08 // SECURE TRANSMISSION PROTOCOL
 */

class RecruitmentPortal {
  constructor() {
    this.form = document.getElementById('recruitment-form');
    this.successView = document.getElementById('transmission-success-view');
    this.formCard = document.getElementById('recruitment-form-card');
    this.submitBtn = document.getElementById('recruitment-submit-btn');
    this.resetBtn = document.getElementById('btn-reset-application');
    this.printBadgeBtn = document.getElementById('btn-print-badge');
    this.selectedInterests = new Set();
    this.isSubmitting = false;

    this.init();
  }

  init() {
    if (!this.form) return;
    this.bindInterestChips();
    this.bindFormEvents();
    this.bindValidationListeners();
    this.loadDraft();
  }

  bindInterestChips() {
    const chips = document.querySelectorAll('.interest-chip-btn');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const value = chip.getAttribute('data-value');
        if (this.selectedInterests.has(value)) {
          this.selectedInterests.delete(value);
          chip.classList.remove('selected');
        } else {
          this.selectedInterests.add(value);
          chip.classList.add('selected');
        }
        if (window.soundSystem) window.soundSystem.playClick();
        this.validateInterests();
      });
    });
  }

  selectInterest(interestName) {
    const chip = document.querySelector(`.interest-chip-btn[data-value="${interestName}"]`);
    if (chip) {
      this.selectedInterests.add(interestName);
      chip.classList.add('selected');
      this.validateInterests();
    }
  }

  validateInterests() {
    const errorEl = document.getElementById('error-interests');
    if (this.selectedInterests.size === 0) {
      if (errorEl) {
        errorEl.textContent = 'Please select at least one area of interest.';
        errorEl.classList.add('visible');
      }
      return false;
    } else {
      if (errorEl) errorEl.classList.remove('visible');
      return true;
    }
  }

  bindValidationListeners() {
    const fields = [
      { id: 'full-name', errorId: 'error-name', validator: (v) => v.trim().length >= 2, msg: 'Please provide your full legal or preferred name.' },
      { id: 'college-email', errorId: 'error-email', validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid academic or personal email address.' },
      { id: 'major-department', errorId: 'error-major', validator: (v) => v.trim().length >= 2, msg: 'Please enter your field of study or major.' },
      { id: 'academic-year', errorId: 'error-year', validator: (v) => v !== '', msg: 'Please select your current academic year.' },
      { id: 'skills-talents', errorId: 'error-skills', validator: (v) => v.trim().length >= 3, msg: 'List at least one skill or superpower you bring to the team.' },
      { id: 'join-statement', errorId: 'error-statement', validator: (v) => v.trim().length >= 20, msg: 'Please share your vision in at least 20 characters.' }
    ];

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const err = document.getElementById(f.errorId);
      if (!el) return;

      const check = () => {
        if (!f.validator(el.value)) {
          el.classList.add('input-error');
          if (err) {
            err.textContent = f.msg;
            err.classList.add('visible');
          }
          return false;
        } else {
          el.classList.remove('input-error');
          if (err) err.classList.remove('visible');
          return true;
        }
      };

      el.addEventListener('input', check);
      el.addEventListener('blur', check);
    });
  }

  bindFormEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.resetForm();
      });
    }

    if (this.printBadgeBtn) {
      this.printBadgeBtn.addEventListener('click', () => {
        if (window.soundSystem) window.soundSystem.playClick();
        window.print();
      });
    }
  }

  validateAll() {
    let isValid = true;
    const nameEl = document.getElementById('full-name');
    const emailEl = document.getElementById('college-email');
    const majorEl = document.getElementById('major-department');
    const yearEl = document.getElementById('academic-year');
    const skillsEl = document.getElementById('skills-talents');
    const statementEl = document.getElementById('join-statement');
    const consentEl = document.getElementById('consent-checkbox');
    const consentErr = document.getElementById('error-consent');

    if (!nameEl || nameEl.value.trim().length < 2) {
      nameEl?.classList.add('input-error');
      document.getElementById('error-name')?.classList.add('visible');
      isValid = false;
    }

    if (!emailEl || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
      emailEl?.classList.add('input-error');
      document.getElementById('error-email')?.classList.add('visible');
      isValid = false;
    }

    if (!majorEl || majorEl.value.trim().length < 2) {
      majorEl?.classList.add('input-error');
      document.getElementById('error-major')?.classList.add('visible');
      isValid = false;
    }

    if (!yearEl || yearEl.value === '') {
      yearEl?.classList.add('input-error');
      document.getElementById('error-year')?.classList.add('visible');
      isValid = false;
    }

    if (!this.validateInterests()) {
      isValid = false;
    }

    if (!skillsEl || skillsEl.value.trim().length < 3) {
      skillsEl?.classList.add('input-error');
      document.getElementById('error-skills')?.classList.add('visible');
      isValid = false;
    }

    if (!statementEl || statementEl.value.trim().length < 20) {
      statementEl?.classList.add('input-error');
      document.getElementById('error-statement')?.classList.add('visible');
      isValid = false;
    }

    if (!consentEl || !consentEl.checked) {
      if (consentErr) {
        consentErr.textContent = 'Please authorize the Avengers recruitment council contact consent.';
        consentErr.classList.add('visible');
      }
      isValid = false;
    } else {
      consentErr?.classList.remove('visible');
    }

    return isValid;
  }

  async handleSubmit() {
    if (this.isSubmitting) return;

    if (!this.validateAll()) {
      if (window.soundSystem) window.soundSystem.playWarning();
      // Scroll to first invalid field
      const firstError = document.querySelector('.input-error, .field-error-message.visible');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    this.isSubmitting = true;
    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `
        <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2 A 10 10 0 0 1 22 12"/>
        </svg>
        <span>TRANSMITTING TO S.H.I.E.L.D. RECRUITMENT NETWORK...</span>
      `;
    }

    if (window.soundSystem) window.soundSystem.playArcReactor();

    // Collect data
    const recruitData = {
      id: `CADET-${Math.floor(100000 + Math.random() * 900000)}`,
      name: document.getElementById('full-name').value.trim(),
      email: document.getElementById('college-email').value.trim(),
      major: document.getElementById('major-department').value.trim(),
      year: document.getElementById('academic-year').value,
      interests: Array.from(this.selectedInterests),
      skills: document.getElementById('skills-talents').value.trim(),
      statement: document.getElementById('join-statement').value.trim(),
      portfolio: document.getElementById('portfolio-url')?.value.trim() || 'N/A',
      timestamp: new Date().toISOString(),
      clearance: 'LEVEL 01 // CADET CANDIDATE',
      status: 'TRANSMITTED // REVIEW PENDING'
    };

    // Simulate authentic network transmission latency (1.2 seconds)
    await new Promise(r => setTimeout(r, 1200));

    // Save to local storage database for live persistence
    this.saveTransmission(recruitData);

    this.isSubmitting = false;
    if (this.submitBtn) {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = `<span>SUBMIT APPLICATION ↗</span>`;
    }

    if (window.soundSystem) window.soundSystem.playSuccess();

    this.showConfirmation(recruitData);
  }

  saveTransmission(record) {
    try {
      const existing = JSON.parse(localStorage.getItem('avengers_transmissions') || '[]');
      existing.unshift(record);
      localStorage.setItem('avengers_transmissions', JSON.stringify(existing));
      // Notify Admin Roster if open
      if (window.adminRoster) window.adminRoster.loadTransmissions();
    } catch (e) {
      console.warn('Storage quota or error', e);
    }
  }

  showConfirmation(data) {
    // Populate Cadet Badge details
    const nameEl = document.getElementById('badge-cadet-name');
    const idEl = document.getElementById('badge-cadet-id');
    const divEl = document.getElementById('badge-cadet-division');
    const clearanceEl = document.getElementById('badge-clearance-code');
    const dateEl = document.getElementById('badge-timestamp');

    if (nameEl) nameEl.textContent = data.name;
    if (idEl) idEl.textContent = data.id;
    if (divEl) divEl.textContent = `PRIMARY INTEREST: ${data.interests[0] || 'General Operative'}`;
    if (clearanceEl) clearanceEl.textContent = data.clearance;
    if (dateEl) dateEl.textContent = `TRANSMITTED: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

    // Swap views
    if (this.form) this.form.style.display = 'none';
    if (this.successView) {
      this.successView.classList.add('active');
      this.successView.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  resetForm() {
    this.form.reset();
    this.selectedInterests.clear();
    document.querySelectorAll('.interest-chip-btn').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.input-error').forEach(i => i.classList.remove('input-error'));
    document.querySelectorAll('.field-error-message').forEach(m => m.classList.remove('visible'));

    if (this.successView) this.successView.classList.remove('active');
    if (this.form) this.form.style.display = 'block';

    const formSection = document.getElementById('recruitment-form-section');
    formSection?.scrollIntoView({ behavior: 'smooth' });
    if (window.soundSystem) window.soundSystem.playClick();
  }

  loadDraft() {
    // Optional persistence of draft form state
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.recruitmentPortal = new RecruitmentPortal();
});
