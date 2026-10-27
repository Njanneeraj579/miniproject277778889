/**
 * Avengers Club - Holographic Particle System
 * Interactive constellation & atmospheric cosmic grid
 */

class ParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, radius: 150 };
    // Exact Prompt Theme Colors
    this.colors = ['#00D9FF', '#FF3547', '#65F6FF', '#F4F7FB', '#8B5CF6'];
    this.animationFrame = null;

    this.resize();
    this.initParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    const count = Math.min(Math.floor((this.width * this.height) / 14000), 75);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 0.8,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        pulse: Math.random() * Math.PI
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw connection lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.18;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }

      // Connect to mouse
      const mdx = this.particles[i].x - this.mouse.x;
      const mdy = this.particles[i].y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < this.mouse.radius) {
        const alpha = (1 - mdist / this.mouse.radius) * 0.4;
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(255, 53, 71, ${alpha})`;
        this.ctx.lineWidth = 1.1;
        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }
    }

    // Draw & update particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      p.pulse += 0.025;
      const currentRadius = p.radius + Math.sin(p.pulse) * 0.5;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas') || document.getElementById('hero-canvas');
  if (canvas) {
    new ParticleCanvas(canvas.id);
  }
});
