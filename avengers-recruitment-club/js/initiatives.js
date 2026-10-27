/**
 * Avengers Club - Active Operations & Tactical Mission Briefing
 * Section 03 // ACTIVE OPERATIONS
 */

const OPERATIONS_DATA = [
  {
    id: "op-ignite",
    code: "OPERATION: IGNITE",
    codename: "IGNITE // BUILDATHON PROTOCOL",
    title: "Continuous Rapid Prototyping & Hackathons",
    badge: "CLASSIFIED // LEVEL 07",
    status: "ACTIVE RECRUITMENT",
    accentColor: "#FF3547",
    description: "48-hour continuous campus build marathons where multidisciplinary teams construct functional web apps, hardware rigs, autonomous rovers, and generative AI agents to solve real campus and global problems.",
    tags: ["RAPID CODE", "HARDWARE LAB", "AI AGENTS", "HACKATHON"],
    parameters: {
      leadOperative: "Maya Sharma (The Innovator)",
      targetTimeline: "Fall 2026 Invitational",
      squadRolesNeeded: ["Full-Stack Developers", "Hardware/IoT Engineers", "UI/UX Designers", "Pitch Strategists"],
      briefing: "Operation Ignite is our flagship technological proving ground. Unlike standard collegiate hackathons where student projects gather dust, Ignite projects receive micro-grant funding, cloud credits, and direct mentorship to transition prototypes into deployed campus solutions. Recruits will work in 4-person strike squads to architect, code, and deploy within high-intensity weekend sprints."
    }
  },
  {
    id: "op-assemble",
    code: "OPERATION: ASSEMBLE",
    codename: "ASSEMBLE // CAMPUS FESTIVAL & SUMMIT",
    title: "Campus-Wide Challenges & Collaborative Festivals",
    badge: "TACTICAL INITIATIVE",
    status: "OPERATIONAL",
    accentColor: "#00D9FF",
    description: "Massive collaborative events, intercollegiate engineering showdowns, tech showcase pavilions, and community rallies that bring together over 1,000 students across disciplines.",
    tags: ["COMMUNITY", "CAMPUS SUMMIT", "STAGE PRODUCTION", "LEADERSHIP"],
    parameters: {
      leadOperative: "Isha Verma (The Tactician)",
      targetTimeline: "Bi-Monthly & Spring Grand Assembly",
      squadRolesNeeded: ["Event Logistics Leads", "Live AV Engineers", "Partnership Liaisons", "Community Hosts"],
      briefing: "Operation Assemble turns the campus into an interactive playground. We design immersive scavenger hunts, interactive tech installations in the campus quad, keynote speaker sessions with visionary alumni, and collaborative squad competitions. If you love creating unforgettable shared memories at scale, Assemble is your headquarters."
    }
  },
  {
    id: "op-uplift",
    code: "OPERATION: UPLIFT",
    codename: "UPLIFT // SOCIAL IMPACT & MENTORSHIP",
    title: "Civic Tech, High School Mentoring & Campus Outreach",
    badge: "MISSION CRITICAL",
    status: "ENROLLING OPERATIVES",
    accentColor: "#65F6FF",
    description: "Applying technology and organizational leadership to solve community challenges: building accessible navigation for disabled students, running free robotics bootcamps for local youth, and campus sustainability.",
    tags: ["SOCIAL IMPACT", "CIVIC TECH", "YOUTH MENTORSHIP", "ACCESSIBILITY"],
    parameters: {
      leadOperative: "Zoya Khan (The Connector)",
      targetTimeline: "Year-Round Active Deployment",
      squadRolesNeeded: ["Youth Mentors", "Accessible Design Specialists", "Civic Data Analysts", "Grant Writers"],
      briefing: "True heroes use their gifts to lift others up. Operation Uplift partners with municipal schools, campus accessibility offices, and local charities. We build practical digital tools—like our dining hall food-waste reduction platform and peer-to-peer tutoring networks—ensuring our talents yield lasting tangible good."
    }
  },
  {
    id: "op-beyond",
    code: "OPERATION: BEYOND",
    codename: "BEYOND // DEEP TECH & EXPERIMENTAL R&D",
    title: "Frontier R&D, Emerging Tech & Passion Inventions",
    badge: "CLASSIFIED // LEVEL 07",
    status: "ALPHA PROTOCOL",
    accentColor: "#8B5CF6",
    description: "Research and open experimentation into edge computing, neuro-interfaces, kinetic robotics, and speculative product design, backed by our dedicated innovation incubator fund.",
    tags: ["R&D LAB", "QUANTUM & NEURAL", "SPECULATIVE UI", "PATENTS"],
    parameters: {
      leadOperative: "Ryan Thomas (The Builder)",
      targetTimeline: "Semester Research Cycles",
      squadRolesNeeded: ["Applied Researchers", "Mechanical Fabricators", "Systems Architects", "Speculative Designers"],
      briefing: "Operation Beyond is where we chase high-risk, high-reward curiosity. Want to build a neural-controlled prosthetic gripper? Design an encrypted mesh communication node for disaster zones? Or develop futuristic holographic navigation interfaces? Beyond provides the lab equipment, parts budget, and advisory board to turn ambitious science into reality."
    }
  }
];

class InitiativesManager {
  constructor() {
    this.container = document.getElementById('operations-grid-container');
    this.modal = document.getElementById('mission-modal');
    this.init();
  }

  init() {
    this.renderOperations();
    this.bindModalEvents();
  }

  renderOperations() {
    if (!this.container) return;

    this.container.innerHTML = OPERATIONS_DATA.map(op => `
      <div class="operation-card hud-corner-box animate-fade-in" data-id="${op.id}" tabindex="0" role="button" aria-label="View mission briefing for ${op.code}">
        <div class="op-banner-wrap">
          <!-- Procedural Holographic HUD Canvas for Operation -->
          <svg class="op-banner-art" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="op-grad-${op.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${op.accentColor}" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#07090F" stop-opacity="0.95"/>
              </linearGradient>
            </defs>
            <rect width="600" height="240" fill="url(#op-grad-${op.id})"/>
            <!-- Grid Lines -->
            <path d="M0 60 H600 M0 120 H600 M0 180 H600" stroke="${op.accentColor}" stroke-opacity="0.12" stroke-dasharray="6 8"/>
            <path d="M100 0 V240 M200 0 V240 M300 0 V240 M400 0 V240 M500 0 V240" stroke="${op.accentColor}" stroke-opacity="0.12" stroke-dasharray="6 8"/>
            <!-- Tactical Crosshair & Telemetry -->
            <circle cx="300" cy="120" r="80" stroke="${op.accentColor}" stroke-opacity="0.25" stroke-width="1.5"/>
            <circle cx="300" cy="120" r="50" stroke="${op.accentColor}" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="10 6"/>
            <line x1="280" y1="120" x2="320" y2="120" stroke="${op.accentColor}" stroke-width="2"/>
            <line x1="300" y1="100" x2="300" y2="140" stroke="${op.accentColor}" stroke-width="2"/>
            <text x="300" y="210" font-family="monospace" font-size="12" fill="${op.accentColor}" font-weight="bold" letter-spacing="4" text-anchor="middle">${op.code}</text>
          </svg>
          <div class="op-banner-overlay"></div>
          
          <!-- Classified Badge (Prompt Specification) -->
          <span class="classified-badge" style="color: ${op.accentColor}; border-color: ${op.accentColor}; box-shadow: 0 0 10px ${op.accentColor}55;">
            ${op.badge}
          </span>
          <span class="op-status-badge">${op.status}</span>
        </div>

        <div class="op-body">
          <div class="op-code">${op.codename}</div>
          <h3 class="op-title">${op.title}</h3>
          <p class="op-description">${op.description}</p>
          
          <div class="op-tags-list">
            ${op.tags.map(t => `<span class="op-tag">${t}</span>`).join('')}
          </div>

          <div class="op-action-row">
            <span class="op-action-link" style="color: ${op.accentColor}">
              <span>VIEW MISSION BRIEFING</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </span>
            <span style="font-family: monospace; font-size: 0.72rem; color: #98A5B8;">CLEARANCE // OK</span>
          </div>
        </div>
      </div>
    `).join('');

    this.container.querySelectorAll('.operation-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.openMission(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          this.openMission(id);
        }
      });
    });
  }

  openMission(opId) {
    const op = OPERATIONS_DATA.find(o => o.id === opId);
    if (!op || !this.modal) return;

    if (window.soundSystem) window.soundSystem.playArcReactor();

    const codeEl = document.getElementById('mission-modal-code');
    const titleEl = document.getElementById('mission-modal-title');
    const badgeEl = document.getElementById('mission-modal-badge');
    const briefEl = document.getElementById('mission-modal-briefing');
    const leadEl = document.getElementById('mission-modal-lead');
    const timelineEl = document.getElementById('mission-modal-timeline');
    const rolesEl = document.getElementById('mission-modal-roles');
    const enlistBtn = document.getElementById('mission-enlist-cta-btn');

    if (codeEl) codeEl.textContent = op.code;
    if (titleEl) titleEl.textContent = op.title;
    if (badgeEl) {
      badgeEl.textContent = op.badge;
      badgeEl.style.color = op.accentColor;
      badgeEl.style.borderColor = op.accentColor;
    }
    if (briefEl) briefEl.textContent = op.parameters.briefing;
    if (leadEl) leadEl.textContent = op.parameters.leadOperative;
    if (timelineEl) timelineEl.textContent = op.parameters.targetTimeline;

    if (rolesEl) {
      rolesEl.innerHTML = op.parameters.squadRolesNeeded.map(r => `
        <span class="mission-tag" style="color: ${op.accentColor}; border-color: ${op.accentColor}44; background: ${op.accentColor}11;">
          ${r}
        </span>
      `).join('');
    }

    if (enlistBtn) {
      enlistBtn.onclick = () => {
        this.closeMission();
        const formSection = document.getElementById('recruitment-form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
          // Highlight or pre-check the relevant interest chip
          const chipMap = {
            'op-ignite': 'Technology & Development',
            'op-assemble': 'Events & Logistics',
            'op-uplift': 'Community Outreach',
            'op-beyond': 'Research & Innovation'
          };
          const targetInterest = chipMap[op.id];
          if (targetInterest && window.recruitmentPortal) {
            window.recruitmentPortal.selectInterest(targetInterest);
          }
        }
      };
    }

    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.modal.querySelector('.modal-close-btn')?.focus();
  }

  closeMission() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
    if (window.soundSystem) window.soundSystem.playClick();
  }

  bindModalEvents() {
    if (!this.modal) return;
    const closeBtn = this.modal.querySelector('.modal-close-btn');
    closeBtn?.addEventListener('click', () => this.closeMission());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeMission();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('open')) {
        this.closeMission();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.initiativesManager = new InitiativesManager();
});
