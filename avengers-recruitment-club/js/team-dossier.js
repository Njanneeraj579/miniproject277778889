/**
 * Avengers Club - Personnel Database & Interactive Dossier
 * Section 02 // PERSONNEL DATABASE
 */

const AVENGERS_ROSTER = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    callsign: "THE STRATEGIST",
    specialty: "Leadership & Operations",
    category: "leadership",
    quote: "Turns impossible plans into executable missions.",
    division: "Command & Strategic Operations",
    clearance: "LEVEL 08 // TOP SECRET",
    avatarIcon: "🛡️",
    accentColor: "#00D9FF",
    bio: "Computer Science & Systems Engineering senior, President of Avengers Club. Known across campus for orchestrating inter-departmental coalitions, emergency scenario drills, and keeping the squad unified under high pressure. Believes true leadership means empowering every member to surpass their own expectations.",
    stats: [
      { label: "Strategic Planning", value: "98%" },
      { label: "Operations Agility", value: "95%" },
      { label: "Crisis Management", value: "92%" }
    ],
    badges: ["AGILE ARCHITECT", "SQUAD CHIEF", "CAMPUS COALITION"],
    social: {
      github: "https://github.com/arjun-strategist",
      linkedin: "https://linkedin.com/in/arjun-mehta",
      terminal: "CONSOLE://ARJUN.COMMAND"
    }
  },
  {
    id: "maya-sharma",
    name: "Maya Sharma",
    callsign: "THE INNOVATOR",
    specialty: "Technology & Development",
    category: "technology",
    quote: "Builds the ideas everyone else calls impossible.",
    division: "Stark Tech & Computational Systems",
    clearance: "LEVEL 07 // CLASSIFIED",
    avatarIcon: "⚡",
    accentColor: "#65F6FF",
    bio: "Electrical Engineering & Quantum Computing junior, Chief Technology Officer. Architect of the club's autonomous drone telemetry network and winner of three consecutive national hackathons. Passionate about machine learning, distributed computing, and open-source civic technologies.",
    stats: [
      { label: "Full-Stack Dev", value: "97%" },
      { label: "Hardware & IoT", value: "94%" },
      { label: "AI & Neural Nets", value: "91%" }
    ],
    badges: ["NEURAL SYS", "QUANTUM HACKER", "OPEN SOURCE LEAD"],
    social: {
      github: "https://github.com/maya-innovator",
      linkedin: "https://linkedin.com/in/maya-sharma",
      terminal: "CONSOLE://MAYA.KERNEL"
    }
  },
  {
    id: "kabir-nair",
    name: "Kabir Nair",
    callsign: "THE CREATIVE",
    specialty: "Design & Storytelling",
    category: "creative",
    quote: "Makes bold ideas impossible to ignore.",
    division: "Creative Direction & Holographic Media",
    clearance: "LEVEL 07 // CLASSIFIED",
    avatarIcon: "🎨",
    accentColor: "#FFB800",
    bio: "Interactive Media & Visual Communication junior, Creative Director. Merges cinematic 3D motion design, speculative interface design, and storytelling to give the club an unmistakable aura. Ensures that every mission feels like an Apple-level launch experience.",
    stats: [
      { label: "UI/UX Architecture", value: "98%" },
      { label: "Motion & 3D Render", value: "95%" },
      { label: "Visual Identity", value: "94%" }
    ],
    badges: ["MOTION MASTER", "STORY CRAFTER", "3D HOLOGRAPHY"],
    social: {
      github: "https://github.com/kabir-creative",
      linkedin: "https://linkedin.com/in/kabir-nair",
      terminal: "CONSOLE://KABIR.RENDER"
    }
  },
  {
    id: "zoya-khan",
    name: "Zoya Khan",
    callsign: "THE CONNECTOR",
    specialty: "Community & Outreach",
    category: "outreach",
    quote: "Brings talented people together to do extraordinary things.",
    division: "Alliance Networks & Campus Relations",
    clearance: "LEVEL 07 // CLASSIFIED",
    avatarIcon: "🌐",
    accentColor: "#8B5CF6",
    bio: "Public Policy & Cognitive Science senior, Head of Partnerships. Bridges diverse campus groups, high schools, industry mentors, and alumni networks. Believes the greatest technology is human connection and works tirelessly to make sure every incoming recruit finds their rightful squadron.",
    stats: [
      { label: "Alliance Building", value: "96%" },
      { label: "Public Speaking", value: "95%" },
      { label: "Mentorship Systems", value: "92%" }
    ],
    badges: ["NEXUS FOUNDER", "INCLUSION LEAD", "CAMPUS VOICE"],
    social: {
      github: "https://github.com/zoya-connector",
      linkedin: "https://linkedin.com/in/zoya-khan",
      terminal: "CONSOLE://ZOYA.NEXUS"
    }
  },
  {
    id: "isha-verma",
    name: "Isha Verma",
    callsign: "THE TACTICIAN",
    specialty: "Events & Strategy",
    category: "leadership",
    quote: "Transforms chaotic brainstorms into memorable experiences.",
    division: "Tactical Logistics & Production",
    clearance: "LEVEL 07 // CLASSIFIED",
    avatarIcon: "🎯",
    accentColor: "#FF3547",
    bio: "Industrial Engineering & Operations Research sophomore, Director of Events. Coordinates high-velocity hackathons, intercollegiate competitions, and nocturnal crisis simulations. Masters every minute detail from stage lighting to contingency power protocols.",
    stats: [
      { label: "Logistics Agility", value: "96%" },
      { label: "Event Architecture", value: "94%" },
      { label: "Risk Mitigation", value: "91%" }
    ],
    badges: ["OPERATIONS TITAN", "CHAOS CONTROLLER", "EVENT STRATEGIST"],
    social: {
      github: "https://github.com/isha-tactician",
      linkedin: "https://linkedin.com/in/isha-verma",
      terminal: "CONSOLE://ISHA.TACTICS"
    }
  },
  {
    id: "ryan-thomas",
    name: "Ryan Thomas",
    callsign: "THE BUILDER",
    specialty: "Research & Engineering",
    category: "technology",
    quote: "Believes every great innovation begins with a prototype.",
    division: "Advanced Research & Rapid Prototyping",
    clearance: "LEVEL 07 // CLASSIFIED",
    avatarIcon: "🔬",
    accentColor: "#10B981",
    bio: "Mechanical Engineering & Materials Science junior, Lab Supervisor. Spends endless hours in the campus machine shop turning CAD designs into kinetic sculptures, drone prototypes, and eco-friendly battery systems. Thrives at the intersection of bits and atoms.",
    stats: [
      { label: "Rapid Prototyping", value: "97%" },
      { label: "CAD & Fabrication", value: "95%" },
      { label: "Material R&D", value: "90%" }
    ],
    badges: ["PROTO PIONEER", "HARDWARE WIZARD", "MAKER LEAD"],
    social: {
      github: "https://github.com/ryan-builder",
      linkedin: "https://linkedin.com/in/ryan-thomas",
      terminal: "CONSOLE://RYAN.MAKER"
    }
  }
];

class TeamManager {
  constructor() {
    this.container = document.getElementById('team-grid-container');
    this.filterContainer = document.getElementById('team-filter-container');
    this.modal = document.getElementById('dossier-modal');
    this.activeFilter = 'all';
    this.init();
  }

  init() {
    this.renderFilters();
    this.renderTeam();
    this.bindModalEvents();
  }

  renderFilters() {
    if (!this.filterContainer) return;
    const categories = [
      { key: 'all', label: 'All Operatives' },
      { key: 'leadership', label: 'Leadership' },
      { key: 'technology', label: 'Technology' },
      { key: 'creative', label: 'Creative' },
      { key: 'outreach', label: 'Outreach' }
    ];

    this.filterContainer.innerHTML = categories.map(cat => `
      <button type="button" class="filter-btn ${cat.key === this.activeFilter ? 'active' : ''}" data-filter="${cat.key}">
        ${cat.label}
      </button>
    `).join('');

    this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        if (window.soundSystem) window.soundSystem.playClick();
        this.renderTeam();
      });
    });
  }

  renderTeam() {
    if (!this.container) return;
    const filtered = this.activeFilter === 'all' 
      ? AVENGERS_ROSTER 
      : AVENGERS_ROSTER.filter(m => m.category === this.activeFilter);

    this.container.innerHTML = filtered.map(member => `
      <div class="team-card hud-corner-box animate-fade-in" data-id="${member.id}" tabindex="0" role="button" aria-label="View dossier for ${member.name}">
        <div class="team-card-visual" style="border-color: ${member.accentColor}33">
          <!-- Holographic Cybernetic Character Canvas/Badge -->
          <svg class="team-avatar-art" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-${member.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${member.accentColor}" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#07090F" stop-opacity="0.95"/>
              </linearGradient>
            </defs>
            <rect width="320" height="220" fill="url(#grad-${member.id})"/>
            <!-- Cybernetic HUD Grid -->
            <path d="M0 55 H320 M0 110 H320 M0 165 H320" stroke="${member.accentColor}" stroke-opacity="0.15" stroke-dasharray="4 6"/>
            <path d="M80 0 V220 M160 0 V220 M240 0 V220" stroke="${member.accentColor}" stroke-opacity="0.15" stroke-dasharray="4 6"/>
            <!-- Concentric Tech Target Rings -->
            <circle cx="160" cy="110" r="75" stroke="${member.accentColor}" stroke-opacity="0.25" stroke-width="1.5"/>
            <circle cx="160" cy="110" r="50" stroke="${member.accentColor}" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="8 6"/>
            <circle cx="160" cy="110" r="28" fill="${member.accentColor}" fill-opacity="0.15" stroke="${member.accentColor}" stroke-width="2"/>
            <!-- Avatar Central Insignia Text -->
            <text x="160" y="118" font-size="28" text-anchor="middle" dominant-baseline="middle" fill="#FFFFFF">${member.avatarIcon}</text>
            <!-- Biometric Scan Line -->
            <line x1="30" y1="190" x2="290" y2="190" stroke="${member.accentColor}" stroke-opacity="0.4" stroke-width="2"/>
            <text x="35" y="180" font-family="monospace" font-size="10" fill="${member.accentColor}" letter-spacing="2">CALLSIGN // ${member.callsign}</text>
            <text x="285" y="180" font-family="monospace" font-size="10" fill="#98A5B8" text-anchor="end">${member.clearance.split('//')[0].trim()}</text>
          </svg>
          <span class="team-card-badge" style="color: ${member.accentColor}; border-color: ${member.accentColor}55;">
            ${member.clearance.split('//')[0].trim()}
          </span>
        </div>

        <h3 class="team-card-name">${member.name}</h3>
        <div class="team-card-role" style="color: ${member.accentColor}">${member.callsign}</div>
        <div>
          <span class="team-card-specialty">SPEC // ${member.specialty}</span>
        </div>
        <p class="team-card-quote">“${member.quote}”</p>
        
        <div class="team-card-footer">
          <span class="dossier-trigger-text">
            <span>ACCESS DOSSIER</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </span>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    this.container.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.openDossier(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          this.openDossier(id);
        }
      });
    });
  }

  openDossier(memberId) {
    const member = AVENGERS_ROSTER.find(m => m.id === memberId);
    if (!member || !this.modal) return;

    if (window.soundSystem) window.soundSystem.playArcReactor();

    const titleEl = document.getElementById('dossier-name');
    const callsignEl = document.getElementById('dossier-callsign');
    const divisionEl = document.getElementById('dossier-division');
    const clearanceEl = document.getElementById('dossier-clearance');
    const bioEl = document.getElementById('dossier-bio');
    const statsContainer = document.getElementById('dossier-stats-list');
    const badgesContainer = document.getElementById('dossier-badges-list');
    const iconEl = document.getElementById('dossier-avatar-icon');

    if (titleEl) titleEl.textContent = member.name;
    if (callsignEl) {
      callsignEl.textContent = member.callsign;
      callsignEl.style.color = member.accentColor;
    }
    if (divisionEl) divisionEl.textContent = member.division;
    if (clearanceEl) clearanceEl.textContent = member.clearance;
    if (bioEl) bioEl.textContent = member.bio;
    if (iconEl) iconEl.textContent = member.avatarIcon;

    if (statsContainer) {
      statsContainer.innerHTML = member.stats.map(s => `
        <div class="dossier-spec-item">
          <span class="dossier-spec-label">${s.label}</span>
          <span class="dossier-spec-val" style="color: ${member.accentColor}">${s.value}</span>
        </div>
        <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 0.6rem; overflow: hidden;">
          <div style="width: ${s.value}; height: 100%; background: ${member.accentColor}; box-shadow: 0 0 8px ${member.accentColor};"></div>
        </div>
      `).join('');
    }

    if (badgesContainer) {
      badgesContainer.innerHTML = member.badges.map(b => `
        <span class="mission-tag" style="color: ${member.accentColor}; border-color: ${member.accentColor}44; background: ${member.accentColor}11;">
          ${b}
        </span>
      `).join('');
    }

    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = this.modal.querySelector('.modal-close-btn');
    closeBtn?.focus();
  }

  closeDossier() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
    if (window.soundSystem) window.soundSystem.playClick();
  }

  bindModalEvents() {
    if (!this.modal) return;
    const closeBtn = this.modal.querySelector('.modal-close-btn');
    closeBtn?.addEventListener('click', () => this.closeDossier());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeDossier();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('open')) {
        this.closeDossier();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.teamManager = new TeamManager();
});
