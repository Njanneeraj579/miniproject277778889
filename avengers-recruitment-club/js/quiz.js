/**
 * Avengers Club - Hero Aptitude Protocol Scanner
 * Interactive 4-step diagnostic matching candidates to their optimal operation
 */

const APTITUDE_QUESTIONS = [
  {
    id: 1,
    question: "It's 11:30 PM the night before a major project submission and a core module crashes. Your instinct:",
    options: [
      { text: "Open terminal debugger, write a rapid patch script, and overclock the build until 3 AM with energy drinks.", operation: "OPERATION: IGNITE", interest: "Technology & Development" },
      { text: "Rally the entire squad, reassign priority deliverables, and ensure everyone stays calm, motivated, and aligned.", operation: "OPERATION: ASSEMBLE", interest: "Leadership & Operations" },
      { text: "Step back, analyze how this failure affects end-users, and design an accessible alternative flow for students.", operation: "OPERATION: UPLIFT", interest: "Community Outreach" },
      { text: "Hypothesize a radically new architecture, test speculative edge algorithms, and turn the glitch into a feature.", operation: "OPERATION: BEYOND", interest: "Research & Innovation" }
    ]
  },
  {
    id: 2,
    question: "Choose your ideal collegiate high-tech workspace or loadout:",
    options: [
      { text: "Triple-monitor development rig with dual GPUs, custom mechanical keyboard, and hot beverage warmer.", operation: "OPERATION: IGNITE", interest: "Technology & Development" },
      { text: "Interactive glass whiteboard room filled with sticky notes, floor plan blueprints, and quad megaphones.", operation: "OPERATION: ASSEMBLE", interest: "Events & Logistics" },
      { text: "Inclusive community lounge surrounded by peer tutors, student feedback boards, and collaborative maker tables.", operation: "OPERATION: UPLIFT", interest: "Community Outreach" },
      { text: "Specialized cleanroom makerspace packed with 3D printers, CNC mills, micro-controllers, and laser cutters.", operation: "OPERATION: BEYOND", interest: "Research & Innovation" }
    ]
  },
  {
    id: 3,
    question: "What kind of campus impact drives you most?",
    options: [
      { text: "Shipping an app or web platform that hundreds of students rely on every single day.", operation: "OPERATION: IGNITE", interest: "Technology & Development" },
      { text: "Creating a monumental campus festival or hackathon that students talk about for semesters to come.", operation: "OPERATION: ASSEMBLE", interest: "Events & Logistics" },
      { text: "Helping an intimidated freshman find their passion and mentoring the next wave of leaders.", operation: "OPERATION: UPLIFT", interest: "Community Outreach" },
      { text: "Inventing an experimental technology or filing an open-source patent that pushes human boundaries.", operation: "OPERATION: BEYOND", interest: "Research & Innovation" }
    ]
  },
  {
    id: 4,
    question: "Which motto echoes closest to your personal philosophy?",
    options: [
      { text: "“If we can dream it, we can code and prototype it into reality.”", operation: "OPERATION: IGNITE", interest: "Technology & Development" },
      { text: "“Individually we are strong, but assembled we are truly unstoppable.”", operation: "OPERATION: ASSEMBLE", interest: "Leadership & Operations" },
      { text: "“True superpowers exist to uplift and protect our fellow humans.”", operation: "OPERATION: UPLIFT", interest: "Community Outreach" },
      { text: "“The frontier is not something to observe; it is something to build.”", operation: "OPERATION: BEYOND", interest: "Research & Innovation" }
    ]
  }
];

class HeroAptitudeScanner {
  constructor() {
    this.container = document.getElementById('aptitude-quiz-container');
    this.currentStep = 0;
    this.scores = {
      "OPERATION: IGNITE": 0,
      "OPERATION: ASSEMBLE": 0,
      "OPERATION: UPLIFT": 0,
      "OPERATION: BEYOND": 0
    };
    this.interestScores = {};
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderQuestion();
  }

  renderQuestion() {
    if (this.currentStep >= APTITUDE_QUESTIONS.length) {
      this.renderResults();
      return;
    }

    const q = APTITUDE_QUESTIONS[this.currentStep];
    this.container.innerHTML = `
      <div class="animate-fade-in">
        <div class="quiz-question-number">DIAGNOSTIC QUERY 0${this.currentStep + 1} // 0${APTITUDE_QUESTIONS.length}</div>
        <h4 class="quiz-question-text">${q.question}</h4>
        <div class="quiz-options-list">
          ${q.options.map((opt, idx) => `
            <button type="button" class="quiz-option-btn hud-corner-box" data-op="${opt.operation}" data-int="${opt.interest}">
              ${opt.text}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    this.container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const op = btn.getAttribute('data-op');
        const interest = btn.getAttribute('data-int');
        this.scores[op] = (this.scores[op] || 0) + 1;
        this.interestScores[interest] = (this.interestScores[interest] || 0) + 1;

        if (window.soundSystem) window.soundSystem.playClick();
        this.currentStep++;
        this.renderQuestion();
      });
    });
  }

  renderResults() {
    let topOp = "OPERATION: IGNITE";
    let maxScore = -1;
    for (const [op, score] of Object.entries(this.scores)) {
      if (score > maxScore) {
        maxScore = score;
        topOp = op;
      }
    }

    let topInterest = "Technology & Development";
    let maxIntScore = -1;
    for (const [int, score] of Object.entries(this.interestScores)) {
      if (score > maxIntScore) {
        maxIntScore = score;
        topInterest = int;
      }
    }

    if (window.soundSystem) window.soundSystem.playSuccess();

    this.container.innerHTML = `
      <div class="quiz-result-box animate-fade-in">
        <div class="section-label" style="margin-bottom: 0.8rem;">
          <span class="status-dot"></span>
          BIOMETRIC SCAN COMPLETE
        </div>
        <h3 class="quiz-result-wing text-gradient-cyan">${topOp}</h3>
        <p style="max-width: 580px; margin: 0 auto 1.8rem auto; line-height: 1.6; color: #98A5B8;">
          Your aptitude aligns with high-velocity problem solving and creative mission execution. We recommend enlisting under the <strong>${topInterest}</strong> squad.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" id="btn-quiz-apply">
            APPLY FOR THIS MISSION ↗
          </button>
          <button type="button" class="btn btn-outline" id="btn-quiz-restart">
            RE-SCAN APTITUDE ↺
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-quiz-apply')?.addEventListener('click', () => {
      const formSection = document.getElementById('recruitment-form-section');
      formSection?.scrollIntoView({ behavior: 'smooth' });
      if (window.recruitmentPortal) {
        window.recruitmentPortal.selectInterest(topInterest);
      }
    });

    document.getElementById('btn-quiz-restart')?.addEventListener('click', () => {
      this.currentStep = 0;
      this.scores = { "OPERATION: IGNITE": 0, "OPERATION: ASSEMBLE": 0, "OPERATION: UPLIFT": 0, "OPERATION: BEYOND": 0 };
      this.interestScores = {};
      this.renderQuestion();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroAptitudeScanner();
});
