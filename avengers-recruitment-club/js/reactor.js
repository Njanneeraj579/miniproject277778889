/**
 * Avengers Club - 3D Holographic Arc-Reactor Engine
 * Interactive mouse-responsive parallax & kinetic energy pulses
 */

class ArcReactorEngine {
  constructor() {
    this.stage = document.getElementById('hero-reactor-stage');
    this.wrap = document.querySelector('.hero-visual-wrap');
    this.init();
  }

  init() {
    if (!this.stage || !this.wrap) return;

    // Desktop Mouse Parallax Tilt
    this.wrap.addEventListener('mousemove', (e) => {
      const rect = this.wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / (rect.height / 2)) * -14;
      const tiltY = (x / (rect.width / 2)) * 14;

      this.stage.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    this.wrap.addEventListener('mouseleave', () => {
      this.stage.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    // Kinetic Click Energy Burst
    this.stage.addEventListener('click', () => {
      if (window.soundSystem) window.soundSystem.playArcReactor();
      this.stage.classList.add('reactor-pulse-burst');
      setTimeout(() => {
        this.stage.classList.remove('reactor-pulse-burst');
      }, 600);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ArcReactorEngine();
});
