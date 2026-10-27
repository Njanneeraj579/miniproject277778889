/**
 * Avengers Club - F.R.I.D.A.Y. Campus AI HUD Assistant
 * Interactive holographic recruiting assistant
 */

const JARVIS_KNOWLEDGE_BASE = [
  {
    keywords: ["superpower", "powers", "magic", "require", "superhero"],
    response: "No superpowers required! At Avengers Club, our definition of a superpower is practical: coding prowess, graphic design finesse, community empathy, strategic planning, or simply showing up on time with enthusiasm."
  },
  {
    keywords: ["meeting", "time", "when", "schedule", "calendar", "where"],
    response: "General Assembly meets every Thursday at 6:30 PM in Stark Hall Auditorium (Rm 404), with satellite squad sprint syncs on Tuesdays. Virtual holocalls are streamed on our campus Discord."
  },
  {
    keywords: ["due", "fee", "cost", "money", "pay", "price"],
    response: "Club dues are $0.00! Thanks to collegiate endowment grants and alumni sponsorships, all workshop materials, hackathon catering, tactical shirts, and 3D printing supplies are completely covered."
  },
  {
    keywords: ["freshman", "freshmen", "first year", "sophomore", "junior"],
    response: "Freshmen and all academic years are warmly welcome! We run a dedicated Cadet Onboarding Guild to provide one-on-one mentorship, portfolio reviews, and campus survival strategies."
  },
  {
    keywords: ["operation", "initiative", "ignite", "assemble", "uplift", "beyond"],
    response: "We run four active operations: Operation Ignite (Hackathons & Code), Operation Assemble (Campus Festivals & Summits), Operation Uplift (Civic Tech & Mentorship), and Operation Beyond (Frontier R&D). Check out the Initiatives section above!"
  },
  {
    keywords: ["arjun", "maya", "kabir", "zoya", "isha", "ryan", "team", "leader"],
    response: "Our executive leaders include Arjun Mehta (Strategy), Maya Sharma (Tech & Dev), Kabir Nair (Creative & Motion), Zoya Khan (Community), Isha Verma (Tactics), and Ryan Thomas (Engineering). Click on their cards in the Team section to view their full dossiers!"
  },
  {
    keywords: ["interview", "selection", "apply", "form", "acceptance"],
    response: "Once you submit your application through the recruitment form below, our council reviews your profile within 48 hours. You will receive an invitation for a casual 15-minute coffee chat or lab walk with your divisional lead."
  },
  {
    keywords: ["hello", "hi", "hey", "jarvis", "friday"],
    response: "Greetings, collegiate operative. I am F.R.I.D.A.Y., campus liaison AI. All systems are nominal and recruitment channels are fully open. How may I assist your enrollment today?"
  }
];

class JarvisAssistant {
  constructor() {
    this.panel = document.getElementById('jarvis-panel');
    this.messages = document.getElementById('jarvis-messages');
    this.input = document.getElementById('jarvis-input');
    this.sendBtn = document.getElementById('jarvis-send-btn');
    this.toggleBtn = document.getElementById('jarvis-toggle-btn');
    this.chips = document.querySelectorAll('.jarvis-chip');

    this.init();
  }

  init() {
    if (!this.toggleBtn || !this.panel) return;

    this.toggleBtn.addEventListener('click', () => this.togglePanel());
    
    const closeBtn = document.getElementById('jarvis-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.togglePanel(false));

    this.sendBtn?.addEventListener('click', () => this.handleSend());
    this.input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });

    this.chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          this.postUserMessage(query);
          this.respondTo(query);
        }
      });
    });
  }

  togglePanel(forceState = null) {
    const isOpen = forceState !== null ? forceState : !this.panel.classList.contains('active');
    if (isOpen) {
      this.panel.classList.add('active');
      if (window.soundSystem) window.soundSystem.playArcReactor();
      this.input?.focus();
    } else {
      this.panel.classList.remove('active');
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  handleSend() {
    if (!this.input) return;
    const text = this.input.value.trim();
    if (!text) return;

    this.postUserMessage(text);
    this.input.value = '';
    this.respondTo(text);
  }

  postUserMessage(text) {
    if (!this.messages) return;
    const div = document.createElement('div');
    div.className = 'jarvis-msg user';
    div.textContent = text;
    this.messages.appendChild(div);
    this.messages.scrollTop = this.messages.scrollHeight;
    if (window.soundSystem) window.soundSystem.playClick();
  }

  respondTo(query) {
    if (!this.messages) return;

    const lower = query.toLowerCase();
    let reply = "Transmission received. While my neural index does not have a precise match for that phrase, our Executive Council meets Thursdays at 6:30 PM in Stark Hall. Feel free to submit your recruitment form or ask about meetings, leadership, or operations!";

    for (const item of JARVIS_KNOWLEDGE_BASE) {
      if (item.keywords.some(k => lower.includes(k))) {
        reply = item.response;
        break;
      }
    }

    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'jarvis-msg bot';
      botDiv.innerHTML = `<strong>F.R.I.D.A.Y. //</strong> ${reply}`;
      this.messages.appendChild(botDiv);
      this.messages.scrollTop = this.messages.scrollHeight;
      if (window.soundSystem) window.soundSystem.playHologramScan();
    }, 450);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new JarvisAssistant();
});
