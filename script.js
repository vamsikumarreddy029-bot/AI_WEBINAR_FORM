/* ══════════════════════════════════════
   GOOGLE SHEETS URL
══════════════════════════════════════ */
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbx7qheCbbxt7okHLOhpZXsnhGhqwb82vNKQ4o2oO9BJR7YfBHf9_IdEq_pytc5nSY6wXw/exec";

/* ══════════════════════════════════════
   CURSOR — Rive-style magnetic follow
══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function ringLoop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(ringLoop);
})();

/* ══════════════════════════════════════
   PARTICLE CANVAS — Lottie ambient
══════════════════════════════════════ */
const cvs = document.getElementById('ambient-canvas');
const ctx  = cvs.getContext('2d');
let W = cvs.width  = innerWidth;
let H = cvs.height = innerHeight;

window.addEventListener('resize', () => {
  W = cvs.width  = innerWidth;
  H = cvs.height = innerHeight;
});

const pts = Array.from({ length: 55 }, () => ({
  x:   Math.random() * innerWidth,
  y:   Math.random() * innerHeight,
  r:   Math.random() * 1.4 + 0.3,
  vx: (Math.random() - 0.5) * 0.28,
  vy: (Math.random() - 0.5) * 0.28,
  a:   Math.random() * 0.35 + 0.08,
  col: Math.random() > 0.6 ? '108,99,255'
     : Math.random() > 0.5 ? '245,200,66'
     : '0,229,204'
}));

(function drawParticles() {
  ctx.clearRect(0, 0, W, H);

  pts.forEach(p => {
    p.x = (p.x + p.vx + W) % W;
    p.y = (p.y + p.vy + H) % H;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.col},${p.a})`;
    ctx.fill();

    // Connect nearby particles
    pts.forEach(q => {
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(108,99,255,${0.025 * (1 - d / 110)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawParticles);
})();

/* ══════════════════════════════════════
   STEP DATA
══════════════════════════════════════ */
const steps = [
  {
    key: 'firstName', type: 'text', ph: 'Sarah', icon: '👤',
    ey: 'Step 01 — Welcome',
    q:  "What's your <em>first name?</em>",
    sub: 'Your name appears on your event badge and confirmation email.',
    L: {
      tag: 'About the Seminar',
      h:   'Where <em>AI meets</em> <strong>human ambition.</strong>',
      b: [
        'The Nexus AI Seminar 2026 is a flagship one-day event uniting the brightest minds in artificial intelligence, product strategy, and emerging technology.',
        'Held in San Francisco — where breakthroughs are announced, careers made, and the future debated openly and rigorously.'
      ],
      pills: ['March 15, 2026', 'San Francisco, CA', '400+ Attendees']
    }
  },
  {
    key: 'lastName', type: 'text', ph: 'Chen', icon: '👤',
    ey: 'Step 02 — Identity',
    q:  'And your <em>last name?</em>',
    sub: 'Together these form your full registration on our attendee list.',
    L: {
      tag: 'Why Attend',
      h:   '<em>Six sessions.</em> One <strong>transformative day.</strong>',
      b: [
        'From morning keynotes on large language models to afternoon workshops on real-world AI deployment — every session is curated for depth, not buzzwords.',
        'Past speakers include researchers from DeepMind, product leads from OpenAI, and policymakers shaping AI governance globally.'
      ],
      pills: ['6 Keynotes', 'Workshops', 'Evening Reception']
    }
  },
  {
    key: 'email', type: 'email', ph: 'sarah@company.com', icon: '📧',
    ey: 'Step 03 — Contact',
    q:  'Your <em>email address?</em>',
    sub: "Confirmation, schedule, and pre-reading materials arrive here. No spam, ever.",
    L: {
      tag: "What You'll Learn",
      h:   'Ideas <em>shaping tomorrow,</em> <strong>today.</strong>',
      b: [
        'Explore AI applied across healthcare, climate science, creative industries, and enterprise — not in theory, but in production, at scale.',
        'Walk away with a clearer mental model of where AI is headed and a community of peers building it.'
      ],
      pills: ['AI & Healthcare', 'Generative AI', 'Ethics & Policy', 'Climate AI']
    }
  },
  {
    key: 'phone', type: 'tel', ph: '+91 9876543210', icon: '📱',
    ey: 'Step 04 — Reach you',
    q:  'Best <em>phone number?</em>',
    sub: 'For urgent day-of updates only — room changes, schedule shifts.',
    L: {
      tag: 'Who Attends',
      h:   'Peers who <em>build,</em> not <strong>just talk.</strong>',
      b: [
        'Engineers, researchers, product managers, founders, and investors — all actively working at the intersection of AI and real-world impact.',
        'The average attendee brings 8+ years of experience. Hallway conversations here are often as valuable as the sessions.'
      ],
      pills: ['Engineers', 'Researchers', 'Founders', 'Investors']
    }
  },
  {
    key: 'college', type: 'text', ph: 'Your College Name', icon: '🎓',
    ey: 'Step 05 — Institution',
    q:  'Which <em>college</em> do you attend?',
    sub: 'Helps us tailor networking and session recommendations to your background.',
    L: {
      tag: 'The Venue',
      h:   'Yerba Buena Center, <em>San Francisco.</em>',
      b: [
        'A 700-seat auditorium, breakout halls, and an open-air terrace for the evening reception in the heart of SoMa.',
        'Doors open 8:30 AM. Full schedule and workshop assignments drop 72 hours before the event.'
      ],
      pills: ['Yerba Buena Center', '9 AM – 8 PM', 'Valet & Transit']
    }
  },
  {
    key: 'department', type: 'text', ph: 'CSE / EEE / ECE', icon: '🏛️',
    ey: 'Step 06 — Final step',
    q:  'Your <em>department?</em>',
    sub: 'Almost there — this connects you with the right sessions and people.',
    L: {
      tag: "What's Included",
      h:   'Everything <em>you need,</em> <strong>nothing you don\'t.</strong>',
      b: [
        'Full-day access to all keynotes and workshops, printed program, speaker compendium, lunch, refreshments, and the evening networking reception.',
        'Recording bundle and speaker slides emailed to all attendees within 5 business days of the event.'
      ],
      pills: ['All Sessions', 'Meals Included', 'Post-Event Bundle']
    }
  }
];

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let cur = 0;
let fd  = {};

/* ══════════════════════════════════════
   DOM REFS
══════════════════════════════════════ */
const leftInner    = document.getElementById('leftInner');
const stepNumEl    = document.getElementById('stepNum');
const stepLblEl    = document.getElementById('stepLbl');
const stepDotsEl   = document.getElementById('stepDots');
const chipsRow     = document.getElementById('chipsRow');
const formStep     = document.getElementById('formStep');
const formCard     = document.getElementById('formCard');
const successScreen= document.getElementById('successScreen');
const summaryRows  = document.getElementById('summaryRows');

/* ══════════════════════════════════════
   RENDER LEFT PANEL
══════════════════════════════════════ */
function renderLeft(s) {
  const L = s.L;
  leftInner.style.animation = 'none';
  void leftInner.offsetWidth;
  leftInner.style.animation = 'leftReveal .7s var(--ease-expo) forwards';

  leftInner.innerHTML = `
    <div class="left-tag">
      <span class="left-tag-dot"></span>${L.tag}
    </div>
    <h2 class="left-headline">${L.h}</h2>
    <div class="left-rule"></div>
    ${L.b.map(b => `<p class="left-body">${b}</p>`).join('')}
    <div class="pill-row">
      ${L.pills.map((p, i) => `<span class="pill${i === 0 ? ' active' : ''}">${p}</span>`).join('')}
    </div>
  `;
}

/* ══════════════════════════════════════
   RENDER STEP DOTS
══════════════════════════════════════ */
function renderDots() {
  stepDotsEl.innerHTML = steps.map((_, i) =>
    `<div class="step-dot ${i < cur ? 'done' : i === cur ? 'active' : ''}"></div>`
  ).join('');
}

/* ══════════════════════════════════════
   RENDER FORM STEP
══════════════════════════════════════ */
function renderStep() {
  const s = steps[cur];

  stepNumEl.textContent = String(cur + 1).padStart(2, '0');
  stepLblEl.textContent = s.ey.split('—')[1]?.trim() || '';
  renderDots();
  renderLeft(s);

  // Chips — collected answers
  const icons = {
    firstName: '👤', lastName: '👤', email: '📧',
    phone: '📱', college: '🎓', department: '🏛️'
  };
  chipsRow.innerHTML = Object.entries(fd).map(([k, v]) => `
    <div class="chip">
      <span class="chip-icon">${icons[k] || '•'}</span>${v}
    </div>
  `).join('');

  // Animate step
  formStep.style.animation = 'none';
  void formStep.offsetWidth;
  formStep.style.animation = 'stepReveal .5s var(--ease-expo) forwards';

  formStep.innerHTML = `
    <div class="form-eyebrow">${s.ey}</div>
    <h2 class="form-question">${s.q}</h2>
    <p class="form-sub">${s.sub}</p>
    <div class="field-wrap">
      <input
        class="field-input${fd[s.key] ? ' has-value' : ''}"
        id="fi"
        type="${s.type}"
        autocomplete="off"
        spellcheck="false"
        value="${fd[s.key] || ''}"
      />
      <label class="field-label-float" for="fi">${s.ph}</label>
      <span class="field-icon-right">${s.icon}</span>
    </div>
    <div class="error-msg" id="em"></div>
    <div class="nav-row">
      ${cur > 0 ? `
        <button class="btn-icon" id="bb" title="Go back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>` : ''}
      <button class="btn-filled" id="nb">
        <span>${cur === steps.length - 1 ? 'Complete Registration' : 'Continue'}</span>
        <span class="btn-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </button>
    </div>
    <div class="enter-hint">Press <kbd>Enter ↵</kbd> to continue</div>
  `;

  // Flutter ripple effect on button
  const nb = document.getElementById('nb');
  nb.addEventListener('mousemove', e => {
    const r = nb.getBoundingClientRect();
    nb.style.setProperty('--rx', ((e.clientX - r.left) / r.width  * 100) + '%');
    nb.style.setProperty('--ry', ((e.clientY - r.top)  / r.height * 100) + '%');
  });

  // Input events
  const inp = document.getElementById('fi');
  inp.addEventListener('input', () => {
    inp.classList.toggle('has-value', inp.value.length > 0);
    const em = document.getElementById('em');
    em.classList.remove('show');
    em.textContent = '';
    inp.classList.remove('error');
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });

  // Button events
  nb.addEventListener('click', go);
  document.getElementById('bb')?.addEventListener('click', () => {
    if (cur > 0) { cur--; renderStep(); }
  });

  // Focus
  setTimeout(() => inp.focus(), 80);
}

/* ══════════════════════════════════════
   VALIDATE
══════════════════════════════════════ */
function validate(val) {
  const s = steps[cur];
  if (!val.trim())
    return `${s.key.replace(/([A-Z])/g, ' $1')} is required.`;
  if (s.type === 'email' && !/^\S+@\S+\.\S+$/.test(val))
    return 'Please enter a valid email address.';
  if (s.key === 'phone' && !/^[0-9+\-\s]{10,15}$/.test(val))
    return 'Please enter a valid phone number.';
  return '';
}

/* ══════════════════════════════════════
   NEXT / SUBMIT
══════════════════════════════════════ */
function go() {
  const inp = document.getElementById('fi');
  const em  = document.getElementById('em');
  const msg = validate(inp.value);

  if (msg) {
    em.textContent = msg;
    em.classList.add('show');
    inp.classList.add('error');
    inp.focus();
    return;
  }

  fd[steps[cur].key] = inp.value.trim();

  if (cur < steps.length - 1) {
    cur++;
    renderStep();
  } else {
    submitForm();
  }
}

/* ══════════════════════════════════════
   SUBMIT TO GOOGLE SHEETS
══════════════════════════════════════ */
function submitForm() {
  const nb = document.getElementById('nb');
  nb.disabled = true;
  nb.querySelector('span').textContent = 'Submitting…';

  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',           // ← fixes the CORS / connection error
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fd)
  })
  .then(() => {
    // no-cors returns opaque response — treat any response as success
    showSuccess();
  })
  .catch(err => {
    console.error(err);
    const em = document.getElementById('em');
    if (em) {
      em.textContent = 'Submission failed. Check your connection.';
      em.classList.add('show');
    }
    nb.disabled = false;
    nb.querySelector('span').textContent = 'Complete Registration';
  });
}

/* ══════════════════════════════════════
   SHOW SUCCESS
══════════════════════════════════════ */
function showSuccess() {
  formCard.style.display = 'none';
  successScreen.style.display = 'flex';

  const icons  = { firstName:'👤', lastName:'👤', email:'📧', phone:'📱', college:'🎓', department:'🏛️' };
  const labels = { firstName:'First Name', lastName:'Last Name', email:'Email', phone:'Phone', college:'College', department:'Department' };

  summaryRows.innerHTML = steps.map((s, i) => `
    <div class="summary-row" style="animation-delay:${0.6 + i * 0.08}s">
      <span class="s-icon">${icons[s.key]}</span>
      <span class="s-label">${labels[s.key]}</span>
      <span class="s-val">${fd[s.key]}</span>
    </div>
  `).join('');

  // Update left panel
  stepNumEl.textContent = '✓';
  stepLblEl.textContent = 'Complete';
  stepDotsEl.innerHTML = steps.map(() => `<div class="step-dot done"></div>`).join('');

  leftInner.style.animation = 'none';
  void leftInner.offsetWidth;
  leftInner.style.animation = 'leftReveal .7s var(--ease-expo) forwards';
  leftInner.innerHTML = `
    <div class="left-tag"><span class="left-tag-dot"></span>All Done</div>
    <h2 class="left-headline">See you on <em>March 15th,</em> <strong>San Francisco.</strong></h2>
    <div class="left-rule"></div>
    <p class="left-body">Your registration is confirmed. A detailed schedule, speaker bios, and recommended pre-reading arrive one week before the event.</p>
    <p class="left-body" style="margin-top:.75rem; color:rgba(108,99,255,.8)">hello@nexusevents.ai</p>
    <div class="pill-row">
      <span class="pill active">✓ Registered</span>
      <span class="pill">March 15, 2026</span>
      <span class="pill">San Francisco</span>
    </div>
  `;
}
// PAGE LOAD ANIMATION
gsap.from(".left-headline", {
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".left-body", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

gsap.from(".form-card", {
  x: 100,
  opacity: 0,
  duration: 1,
  delay: 0.5
});

// NAVBAR ANIMATION
gsap.from(".top-nav", {
  y: -50,
  opacity: 0,
  duration: 1
});
const speakers = [
  {
    name: "Dr. Arjun Rao",
    role: "IIT Madras AI Research",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Sharma",
    role: "IIT Delhi ML Expert",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Rahul Verma",
    role: "AI Startup Founder",
    img: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const container = document.getElementById("speakerContainer");

if(container){
  speakers.forEach(s => {
    container.innerHTML += `
      <div class="speaker-card">
        <img src="${s.img}" class="speaker-photo"/>
        <h3>${s.name}</h3>
        <p>${s.role}</p>
      </div>
    `;
  });
}

/* ══════════════════════════════════════
   RESTART
══════════════════════════════════════ */
document.getElementById('restartBtn').addEventListener('click', () => {
  fd  = {};
  cur = 0;
  formCard.style.display    = '';
  successScreen.style.display = 'none';
  renderStep();
});

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
renderStep();