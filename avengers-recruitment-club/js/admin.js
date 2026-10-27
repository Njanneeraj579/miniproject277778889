/**
 * Avengers Club - S.H.I.E.L.D. Cadet Transmissions Log & Admin Roster
 * Secure Local Persistence Viewer for Judges & Recruitment Council
 */

const SEED_CADETS = [
  {
    id: "CADET-782910",
    name: "Kamala Khan",
    email: "kkhan@mit.student.edu",
    major: "Political Science & Interactive Storytelling",
    year: "Sophomore",
    interests: ["Community Outreach", "Creative & Design"],
    skills: "Embiggening morale, fanfiction zines, community organizing",
    statement: "I want to make sure every weird, creative kid on campus finds a place where they feel unstoppable.",
    timestamp: "2026-10-25T14:20:00Z",
    clearance: "LEVEL 03 // FIELD CADET",
    status: "APPROVED FOR INTAKE"
  },
  {
    id: "CADET-910442",
    name: "Miles Morales",
    email: "mmorales@mit.student.edu",
    major: "Graphic Communication & Electrical Engineering",
    year: "Junior",
    interests: ["Technology & Development", "Creative & Design"],
    skills: "Campus mural visualizer, bio-electric prototyping, sound design",
    statement: "Anyone can wear the mask. I'm here to build the next generation of campus tech and art.",
    timestamp: "2026-10-26T09:12:00Z",
    clearance: "LEVEL 04 // SQUAD LEAD",
    status: "INTERVIEW SCHEDULED"
  },
  {
    id: "CADET-443901",
    name: "Riri Williams",
    email: "rwilliams@mit.student.edu",
    major: "Robotics & Computational AI",
    year: "Junior",
    interests: ["Technology & Development", "Research & Innovation"],
    skills: "Assembled an exo-suit prototype from spare dorm appliances",
    statement: "Mr. Stark said to challenge the parameters. I'm here to build the quad's first magnetic transit drone.",
    timestamp: "2026-10-27T11:45:00Z",
    clearance: "LEVEL 05 // LAB FELLOW",
    status: "APPROVED FOR INTAKE"
  }
];

class AdminRoster {
  constructor() {
    this.modal = document.getElementById('roster-modal');
    this.tableBody = document.getElementById('roster-table-body');
    this.openBtn = document.getElementById('btn-open-roster');
    this.closeBtn = document.getElementById('btn-close-roster');
    this.exportBtn = document.getElementById('btn-export-roster');
    this.clearBtn = document.getElementById('btn-clear-roster');
    this.countBadge = document.getElementById('roster-total-count');

    this.init();
  }

  init() {
    this.ensureSeedData();
    this.bindEvents();
    this.loadTransmissions();
  }

  ensureSeedData() {
    const existing = localStorage.getItem('avengers_transmissions');
    if (!existing) {
      localStorage.setItem('avengers_transmissions', JSON.stringify(SEED_CADETS));
    }
  }

  bindEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('open')) {
        this.closeModal();
      }
    });

    if (this.exportBtn) {
      this.exportBtn.addEventListener('click', () => this.exportJSON());
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        if (confirm('Reset cadet database to default test records?')) {
          localStorage.setItem('avengers_transmissions', JSON.stringify(SEED_CADETS));
          this.loadTransmissions();
          if (window.soundSystem) window.soundSystem.playWarning();
        }
      });
    }
  }

  openModal() {
    if (!this.modal) return;
    this.loadTransmissions();
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.soundSystem) window.soundSystem.playArcReactor();
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
    if (window.soundSystem) window.soundSystem.playClick();
  }

  loadTransmissions() {
    if (!this.tableBody) return;
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem('avengers_transmissions') || '[]');
    } catch(e) {
      list = SEED_CADETS;
    }

    if (this.countBadge) {
      this.countBadge.textContent = `${list.length} OPERATIVES`;
    }

    if (list.length === 0) {
      this.tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem; color: #98A5B8;">
            No transmissions recorded in local database. Submit a recruitment form to generate records.
          </td>
        </tr>
      `;
      return;
    }

    this.tableBody.innerHTML = list.map(item => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
        <td style="padding: 0.85rem 1rem; font-family: monospace; font-size: 0.78rem; color: #00D9FF;">
          ${item.id}
        </td>
        <td style="padding: 0.85rem 1rem; font-weight: 600; color: #FFFFFF;">
          ${item.name}
          <div style="font-size: 0.75rem; color: #98A5B8; font-weight: normal;">${item.email}</div>
        </td>
        <td style="padding: 0.85rem 1rem; font-size: 0.82rem; color: #98A5B8;">
          ${item.major} (${item.year})
        </td>
        <td style="padding: 0.85rem 1rem; font-size: 0.78rem;">
          ${(item.interests || []).slice(0, 2).map(int => `
            <span style="display: inline-block; background: rgba(0,217,255,0.1); color: #00D9FF; padding: 0.15rem 0.45rem; border-radius: 3px; margin: 1px;">
              ${int}
            </span>
          `).join('')}
        </td>
        <td style="padding: 0.85rem 1rem; font-family: monospace; font-size: 0.72rem; color: #10B981;">
          ${item.status || 'TRANSMITTED'}
        </td>
        <td style="padding: 0.85rem 1rem; font-family: monospace; font-size: 0.72rem; color: #5A6678;">
          ${new Date(item.timestamp).toLocaleDateString()}
        </td>
      </tr>
    `).join('');
  }

  exportJSON() {
    const list = localStorage.getItem('avengers_transmissions') || '[]';
    const blob = new Blob([list], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avengers-cadet-transmissions-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (window.soundSystem) window.soundSystem.playSuccess();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.adminRoster = new AdminRoster();
});
