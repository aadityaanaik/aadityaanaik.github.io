/* ─── Nav Scroll ────────────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── Mobile Menu ───────────────────────────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileLinks.forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ─── Reveal on Scroll ──────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Counter Animation ─────────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
  const isFloat = target % 1 !== 0;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = isFloat ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(1) : target;
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const num = e.target.querySelector('.stat__num');
      if (num) animateCounter(num, parseFloat(num.dataset.target));
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(s => statObserver.observe(s));

/* ─── Hero Quote Canvas ──────────────────────────────────────────────────────── */
(function initHeroQuotes() {
  const hero = document.querySelector('.hero');
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  hero.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let W, H, mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    // Re-measure text widths on resize
    particles.forEach(p => { p.tw = 0; });
  }
  window.addEventListener('resize', resize, { passive: true });

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  hero.addEventListener('touchmove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - r.left;
    mouse.y = e.touches[0].clientY - r.top;
  }, { passive: true });
  hero.addEventListener('touchend', () => { mouse.x = -9999; mouse.y = -9999; });

  const PHRASES = [
    // Recommendations — LinkedIn
    'received a callback from Meta ★★★★★',
    'passionate and proactive',
    'zeal & willingness to take on challenges',
    'great maturity & dedication',
    'seeker mentality',
    'owns his responsibilities',
    'delivers value everyday',
    'fast learner',
    'made his presence felt',
    'keep learning, stay agile',
    'faster, reliable deployments',
    'unique DevOps dashboards',
    'active on all fronts',
    'quick on solving problems',
    // Recommendations — Topmate
    'highly recommend ★★★★★',
    'sharp, insightful feedback',
    'walked me through specific changes',
    'patiently walked through my resume',
    'clarity without rushing',
    'friendly and motivating',
    'understands your situation first',
    'broader, more realistic understanding',
    'helped me improve on my weaknesses',
    '★★★★★',
    // Impact numbers
    '1.5B records · zero discrepancies',
    '$150K saved annually',
    '$2.5M fraud mitigated',
    '$1M on-call cost reduction',
    '$140K licensing eliminated',
    '100TB+ migrated to cloud',
    '150+ global teams',
    '80% processing reduction',
    '30% fewer SLA breaches',
    '$6M+ measurable impact',
    '5+ years of impact',
    // Tech stack
    'PySpark · Hive · Airflow',
    'Kafka · Flink · AWS',
    'Redshift · S3 · Spark',
    'GDPR · CCPA · KMS encrypted',
    'self-healing pipelines',
    'real-time analytics at scale',
    'idempotent data pipelines',
    'Airflow-orchestrated automation',
    'hybrid-cloud migration',
    'step-function alerting',
    // Identity
    'Senior Data Engineer · Seattle',
    'AWS Certified Developer',
    'TikTok · HSBC',
    'Texas A&M · 2024',
    'Professional Scrum Master',
  ];

  const REPEL    = 160;
  const MAX_SPD  = 7;
  const PAD      = 20;

  function measureAll() {
    particles.forEach(p => {
      ctx.font = `${p.weight} ${p.size}px -apple-system, BlinkMacSystemFont, sans-serif`;
      p.tw = ctx.measureText(p.text).width;
    });
  }

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    measureAll();
    // Clamp any out-of-bounds positions after resize
    particles.forEach(p => {
      p.x = Math.min(Math.max(p.x, PAD), W - p.tw - PAD);
      p.y = Math.min(Math.max(p.y, p.size + PAD), H - PAD);
    });
  }
  window.addEventListener('resize', resize, { passive: true });

  // Build particles
  const particles = PHRASES.map(text => {
    const big    = /\$|records|teams|★|%|TB/.test(text);
    const size   = big ? Math.random() * 3 + 14 : Math.random() * 4 + 11;
    const weight = big ? '600' : '400';
    const angle  = Math.random() * Math.PI * 2;
    const spd    = 0.35 + Math.random() * 0.4;
    return {
      text, size, weight,
      alpha: Math.random() * 0.18 + 0.13,
      x: 0, y: 0, tw: 0,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      cvx: Math.cos(angle) * spd,
      cvy: Math.sin(angle) * spd,
    };
  });

  // Set canvas size, measure widths, then place particles within valid bounds
  W = canvas.width  = hero.offsetWidth;
  H = canvas.height = hero.offsetHeight;
  measureAll();
  particles.forEach(p => {
    p.x = PAD + Math.random() * Math.max(1, W - p.tw - PAD * 2);
    p.y = p.size + PAD + Math.random() * Math.max(1, H - p.size - PAD * 2);
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      // Mouse repel
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL && dist > 0) {
        const force = ((REPEL - dist) / REPEL) * 3.5;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      // Steer back toward cruise velocity so motion never dies
      p.vx += (p.cvx - p.vx) * 0.03;
      p.vy += (p.cvy - p.vy) * 0.03;

      // Speed cap
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > MAX_SPD) { p.vx = (p.vx / spd) * MAX_SPD; p.vy = (p.vy / spd) * MAX_SPD; }

      p.x += p.vx;
      p.y += p.vy;

      // Bounce — left/right use text width, top/bottom use font size as margin
      const rWall = W - p.tw - PAD;
      const bWall = H - PAD;
      const tWall = p.size + PAD;

      if (p.x < PAD)    { p.x = PAD;    p.vx = Math.abs(p.vx);  p.cvx = Math.abs(p.cvx);  }
      if (p.x > rWall)  { p.x = rWall;  p.vx = -Math.abs(p.vx); p.cvx = -Math.abs(p.cvx); }
      if (p.y < tWall)  { p.y = tWall;  p.vy = Math.abs(p.vy);  p.cvy = Math.abs(p.cvy);  }
      if (p.y > bWall)  { p.y = bWall;  p.vy = -Math.abs(p.vy); p.cvy = -Math.abs(p.cvy); }

      ctx.font = `${p.weight} ${p.size}px -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fillText(p.text, p.x, p.y);
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── Antigravity Canvas ────────────────────────────────────────────────────── */
(function initAntigravity() {
  const section = document.querySelector('.antigravity');
  if (!section) return;

  // Inject section HTML before skills
  const skillsSection = document.getElementById('skills');
  const antigravityHTML = `
  <section class="antigravity" id="antigravity">
    <p class="antigravity__label">Interactive</p>
    <h2 class="antigravity__title">My tech, in <span class="grad-text">orbit.</span></h2>
    <p class="antigravity__sub">Click and drag to interact</p>
    <canvas id="antigravity-canvas"></canvas>
    <p class="antigravity__hint">← hover or click to push elements around →</p>
  </section>`;
  skillsSection.insertAdjacentHTML('beforebegin', antigravityHTML);

  const canvas = document.getElementById('antigravity-canvas');
  const ctx    = canvas.getContext('2d');

  const TECHS = [
    'Spark','Flink','Kafka','Airflow','Hadoop','HDFS',
    'Python','SQL','Scala','Java','Bash',
    'AWS','GCP','Redshift','EMR','Glue','BigQuery',
    'Postgres','DynamoDB','MongoDB','Cassandra','Snowflake','ClickHouse',
    'Tableau','Grafana','Power BI','Looker','Databricks',
    'Docker','Kubernetes','Terraform','Jenkins','Git','Linux',
    'Spark Streaming','PySpark','Redis','S3','Hive',
  ];

  const COLORS_AG = [
    '#2997ff','#bf5af2','#30d158','#ff9f0a','#ff6961',
    '#5ac8fa','#ff2d55','#a2845e','#64d2ff','#ffd60a',
  ];

  let W, H;
  const balls = [];
  let mouse = { x: -9999, y: -9999, down: false, vx: 0, vy: 0, px: 0, py: 0 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = 480;
    canvas.style.height = '480px';
  }

  function createBalls() {
    balls.length = 0;
    TECHS.forEach((label, i) => {
      const color = COLORS_AG[i % COLORS_AG.length];
      const fontSize = 13;
      const padding = 20;
      const textW = label.length * fontSize * 0.6;
      const r = textW / 2 + padding;
      balls.push({
        x: Math.random() * (W - r * 2) + r,
        y: Math.random() * (H - r * 2) + r,
        r,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        color,
        label,
        fontSize,
        mass: r * 0.04,
        alpha: 0,
        targetAlpha: 1,
      });
    });
  }

  resize();
  createBalls();
  window.addEventListener('resize', () => { resize(); }, { passive: true });

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.vx = e.clientX - r.left - mouse.x;
    mouse.vy = e.clientY - r.top  - mouse.y;
    mouse.x  = e.clientX - r.left;
    mouse.y  = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  canvas.addEventListener('mousedown', () => { mouse.down = true; canvas.style.cursor = 'grabbing'; });
  window.addEventListener('mouseup',   () => { mouse.down = false; canvas.style.cursor = 'grab'; });

  // Touch
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - r.left;
    mouse.y = e.touches[0].clientY - r.top;
  }, { passive: false });
  canvas.addEventListener('touchend', () => { mouse.x = -9999; mouse.y = -9999; });

  const GRAVITY = 0.12;
  const DAMPING = 0.985;
  const BOUNCE  = 0.55;
  const PUSH_R  = 90;

  function update() {
    balls.forEach(b => {
      // Gravity
      b.vy += GRAVITY;
      // Damping
      b.vx *= DAMPING;
      b.vy *= DAMPING;
      // Mouse push
      const dx = b.x - mouse.x;
      const dy = b.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < PUSH_R + b.r) {
        const force = ((PUSH_R + b.r - dist) / PUSH_R) * 3;
        const angle = Math.atan2(dy, dx);
        b.vx += Math.cos(angle) * force;
        b.vy += Math.sin(angle) * force;
        if (mouse.down) {
          b.vx += mouse.vx * 0.3;
          b.vy += mouse.vy * 0.3;
        }
      }
      // Move
      b.x += b.vx;
      b.y += b.vy;
      // Walls
      if (b.x - b.r < 0)  { b.x = b.r;      b.vx *= -BOUNCE; }
      if (b.x + b.r > W)  { b.x = W - b.r;  b.vx *= -BOUNCE; }
      if (b.y - b.r < 0)  { b.y = b.r;      b.vy *= -BOUNCE; }
      if (b.y + b.r > H)  { b.y = H - b.r;  b.vy *= -BOUNCE; }
      // Fade in
      b.alpha += (b.targetAlpha - b.alpha) * 0.05;
    });

    // Ball–ball collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], bv = balls[j];
        const dx = bv.x - a.x;
        const dy = bv.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minD = a.r + bv.r;
        if (dist < minD && dist > 0) {
          const overlap = (minD - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          bv.x += nx * overlap;
          bv.y += ny * overlap;
          const relVx = a.vx - bv.vx;
          const relVy = a.vy - bv.vy;
          const impulse = (relVx * nx + relVy * ny) * BOUNCE;
          a.vx -= impulse * nx;
          a.vy -= impulse * ny;
          bv.vx += impulse * nx;
          bv.vy += impulse * ny;
        }
      }
    }
  }

  function drawBall(b) {
    ctx.save();
    ctx.globalAlpha = b.alpha;

    // Pill background
    const rx = b.r;
    const ry = b.r * 0.55;
    ctx.beginPath();
    ctx.ellipse(b.x, b.y, rx, ry, 0, 0, Math.PI * 2);

    // Glass fill
    const grd = ctx.createRadialGradient(b.x - rx * 0.2, b.y - ry * 0.3, 0, b.x, b.y, rx);
    grd.addColorStop(0, b.color + 'cc');
    grd.addColorStop(1, b.color + '66');
    ctx.fillStyle = grd;
    ctx.fill();

    // Border
    ctx.strokeStyle = b.color + 'aa';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Shine
    ctx.beginPath();
    ctx.ellipse(b.x - rx * 0.1, b.y - ry * 0.35, rx * 0.55, ry * 0.3, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fill();

    // Label
    ctx.fillStyle = '#fff';
    ctx.font = `600 ${b.fontSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur  = 4;
    ctx.fillText(b.label, b.x, b.y);
    ctx.restore();
  }

  // Antigravity orbit: periodic upward kick
  let kickTimer = 0;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    update();
    kickTimer++;
    if (kickTimer % 180 === 0) {
      balls.forEach(b => { b.vy -= Math.random() * 4 + 1; });
    }
    balls.forEach(drawBall);
    requestAnimationFrame(loop);
  }

  // Only start when section is visible
  const agObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loop();
      agObserver.disconnect();
    }
  }, { threshold: 0.2 });

  // Observe section after it's injected
  setTimeout(() => {
    const ag = document.getElementById('antigravity');
    if (ag) agObserver.observe(ag);
  }, 100);
})();

/* ─── Parallax Hero Orbs on Scroll ─────────────────────────────────────────── */
const orb1 = document.querySelector('.hero__orb--1');
const orb2 = document.querySelector('.hero__orb--2');
const orb3 = document.querySelector('.hero__orb--3');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (orb1) orb1.style.transform = `translate(${y * 0.06}px, ${y * 0.1}px) scale(1)`;
  if (orb2) orb2.style.transform = `translate(${-y * 0.06}px, ${-y * 0.08}px) scale(1)`;
  if (orb3) orb3.style.transform = `translate(-50%, calc(-50% + ${y * 0.04}px)) scale(1)`;
}, { passive: true });

/* ─── Testimonials: tabs + mobile carousel ──────────────────────────────────── */
(function initTestimonials() {
  const allCards   = Array.from(document.querySelectorAll('.tcard'));
  const dotsEl     = document.getElementById('testimDots');
  const prevBtn    = document.getElementById('testimPrev');
  const nextBtn    = document.getElementById('testimNext');
  const controlsEl = document.getElementById('testimControls');
  const tabs       = document.querySelectorAll('.testimonials__tab');
  if (!allCards.length || !dotsEl) return;

  let activeFilter = 'linkedin';
  let current = 0;
  let autoTimer;

  function filteredCards() {
    return allCards.filter(c => activeFilter === 'all' || c.dataset.source === activeFilter);
  }

  function buildDots(cards) {
    dotsEl.innerHTML = '';
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'testimonials__dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Testimonial ${i + 1}`);
      d.addEventListener('click', () => go(i));
      dotsEl.appendChild(d);
    });
  }

  function go(idx) {
    const cards = filteredCards();
    if (!cards.length) return;
    current = (idx + cards.length) % cards.length;
    allCards.forEach(c => c.classList.remove('carousel-active'));
    cards[current].classList.add('carousel-active');
    Array.from(dotsEl.children).forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function applyFilter() {
    current = 0;
    const cards = filteredCards();
    const isMobile = window.innerWidth <= 960;

    allCards.forEach(c => {
      const inFilter = activeFilter === 'all' || c.dataset.source === activeFilter;
      c.style.display = inFilter ? '' : 'none';
      c.classList.remove('carousel-active');
    });

    if (isMobile && cards.length) cards[0].classList.add('carousel-active');
    buildDots(cards);

    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (window.innerWidth <= 960) go(current + 1);
    }, 4500);
  }

  function syncMobile() {
    const isMobile = window.innerWidth <= 960;
    if (controlsEl) controlsEl.style.display = isMobile ? 'flex' : 'none';
    if (!isMobile) allCards.forEach(c => c.classList.remove('carousel-active'));
    else {
      const cards = filteredCards();
      allCards.forEach(c => c.classList.remove('carousel-active'));
      if (cards[current]) cards[current].classList.add('carousel-active');
    }
  }

  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeFilter = tab.dataset.tab;
    applyFilter();
    syncMobile();
  }));

  if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(current + 1));

  applyFilter();
  syncMobile();
  window.addEventListener('resize', syncMobile, { passive: true });
})();

/* ─── Sliding nav pill ──────────────────────────────────────────────────────── */
(function initNavPill() {
  const pill     = document.getElementById('navPill');
  const navLinks = document.querySelectorAll('.nav__links a[data-section]');
  const linksUl  = document.querySelector('.nav__links');
  if (!pill || !navLinks.length) return;

  let pillReady = false;

  function movePill(link) {
    if (!link) { pill.style.opacity = '0'; return; }
    const trackRect = pill.parentElement.getBoundingClientRect();
    const linkRect  = link.getBoundingClientRect();
    const left  = (linkRect.left - trackRect.left) + 'px';
    const width = linkRect.width + 'px';
    if (!pillReady) {
      // Place without transition on first show so it doesn't slide from left: 0
      pill.style.transition = 'none';
      pill.style.left  = left;
      pill.style.width = width;
      pill.style.opacity = '1';
      pill.offsetWidth; // force reflow before re-enabling transition
      pill.style.transition = '';
      pillReady = true;
    } else {
      pill.style.left  = left;
      pill.style.width = width;
      pill.style.opacity = '1';
    }
  }

  function setActive(id) {
    navLinks.forEach(l => l.classList.remove('nav-active'));
    const active = document.querySelector(`.nav__links a[data-section="${id}"]`);
    if (active) { active.classList.add('nav-active'); movePill(active); }
    else pill.style.opacity = '0';
  }

  // Scroll spy
  const sections = Array.from(document.querySelectorAll('section[id]'))
    .filter(s => document.querySelector(`.nav__links a[data-section="${s.id}"]`));

  function onScroll() {
    const scrollY = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    sections.forEach(s => { if (s.offsetTop <= scrollY) current = s.id; });
    setActive(current);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav__links a.nav-active');
    movePill(active || null);
  }, { passive: true });

  onScroll();
})();
