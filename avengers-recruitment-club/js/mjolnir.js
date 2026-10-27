/**
 * Avengers Collegiate Initiative - Mjolnir Worthiness Chamber
 * Interactive physics / hold mini-experience
 */

const MJOLNIR_OUTCOMES = [
  "UNWORTHY: JARVIS detected 14 unwashed coffee mugs and an overdue library book.",
  "SLIGHT WIGGLE DETECTED! (Cap style). You have the heart, but you skipped 8:00 AM lectures twice this month.",
  "ELEVATOR DETECTED: Elevators can lift Mjolnir, but undergrads must earn it through campus service.",
  "STARK OVERHEAT: Trying to lift it with boot thrusters and automated repulsors has failed again.",
  "WORTHY CANDIDATE: The Odinforce senses your leadership potential! Complete your recruitment form below to seal your clearance.",
  "UNWORTHY: You left your roommate to clean the microwave. Thor does not approve of this conduct."
];

class MjolnirChamber {
  constructor() {
    this.liftBtn = document.getElementById('mjolnir-lift-btn');
    this.hammer = document.getElementById('mjolnir-hammer');
    this.meter = document.getElementById('worthiness-meter-fill');
    this.statusText = document.getElementById('worthiness-status');
    this.charge = 0;
    this.isHolding = false;
    this.interval = null;

    this.init();
  }

  init() {
    if (!this.liftBtn) return;

    const startHold = (e) => {
      e.preventDefault();
      this.isHolding = true;
      if (window.soundSystem) window.soundSystem.playArcReactor();
      this.hammer?.classList.add('vibrating');
      this.interval = setInterval(() => this.tick(), 30);
    };

    const stopHold = (e) => {
      if (!this.isHolding) return;
      this.isHolding = false;
      clearInterval(this.interval);
      this.hammer?.classList.remove('vibrating');
      this.evaluate();
    };

    this.liftBtn.addEventListener('mousedown', startHold);
    this.liftBtn.addEventListener('touchstart', startHold, { passive: false });

    window.addEventListener('mouseup', stopHold);
    window.addEventListener('touchend', stopHold);
  }

  tick() {
    if (this.charge < 100) {
      this.charge += 1.8;
      if (this.meter) this.meter.style.width = `${Math.min(100, this.charge)}%`;
      
      if (this.statusText) {
        if (this.charge < 30) this.statusText.textContent = "Calibrating biometric grip...";
        else if (this.charge < 60) this.statusText.textContent = "Scanning GPA & campus honor code...";
        else if (this.charge < 85) this.statusText.textContent = "Channeling Asgardian lightning surge...";
        else this.statusText.textContent = "SURGE AT MAXIMUM: WILL IT BUDGE?!";
      }

      if (this.charge > 75 && this.hammer) {
        this.hammer.classList.add('glowing-lightning');
      }
    }
  }

  evaluate() {
    this.hammer?.classList.remove('glowing-lightning');
    const outcome = MJOLNIR_OUTCOMES[Math.floor(Math.random() * MJOLNIR_OUTCOMES.length)];

    if (this.statusText) {
      if (this.charge >= 95) {
        this.statusText.innerHTML = `<span class="worthy-result">${outcome}</span>`;
        if (window.soundSystem) window.soundSystem.playShieldClang();
      } else {
        this.statusText.textContent = `Effort released at ${Math.floor(this.charge)}% surge. Hold until max power!`;
      }
    }

    // Reset meter gradually
    const resetInterval = setInterval(() => {
      this.charge = Math.max(0, this.charge - 6);
      if (this.meter) this.meter.style.width = `${this.charge}%`;
      if (this.charge <= 0) clearInterval(resetInterval);
    }, 20);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MjolnirChamber();
});
