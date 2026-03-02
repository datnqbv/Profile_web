/* ============================================
   CYBERPUNK TECH PROFILE – Script
   Phùng Tiến Đạt
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initNavbar();
  initHamburger();
  initTyping();
  initScrollSpy();
  initAOS();
  initSkillBars();
  initCounters();
  initContactForm();
  initAvatarUpload();
});

/* ─── MATRIX RAIN ───────────────────────────── */
function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, cols, drops;

  function setup() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const fontSize = 14;
    cols = Math.floor(W / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -100);
  }

  setup();
  window.addEventListener('resize', setup);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]=/\\|#@$%^&*';

  function draw() {
    ctx.fillStyle = 'rgba(5,5,16,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00fff0';
    ctx.font = '14px "Share Tech Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 14, drops[i] * 14);
      if (drops[i] * 14 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

/* ─── NAVBAR ────────────────────────────────── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ─── HAMBURGER ─────────────────────────────── */
function initHamburger() {
  const btn   = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    links.classList.toggle('open');
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      links.classList.remove('open');
    });
  });
}

/* ─── TYPING EFFECT ─────────────────────────── */
function initTyping() {
  const el = document.getElementById('typingRole');
  if (!el) return;

  const roles = [
    'Frontend Developer',
    'IT Student',
    'AI Enthusiast',
    'Problem Solver',
    'Web Developer'
  ];

  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }

  setTimeout(type, 800);
}

/* ─── SCROLL SPY ────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}

/* ─── AOS ───────────────────────────────────── */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.aosDelay || 0;
        setTimeout(() => e.target.classList.add('aos-animate'), parseInt(delay));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

/* ─── SKILL BARS ────────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill[data-width]');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ─── COUNTERS ──────────────────────────────── */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const target = parseInt(e.target.dataset.count);
      const suffix = e.target.dataset.suffix || '';
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        e.target.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

/* ─── CONTACT FORM ──────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'SENDING...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'SEND_MESSAGE';
      btn.disabled = false;
      if (success) success.classList.add('show');
      setTimeout(() => success?.classList.remove('show'), 5000);
    }, 1500);
  });
}

/* ─── AVATAR UPLOAD ─────────────────────────── */
function initAvatarUpload() {
  const ring    = document.getElementById('avatarRing');
  const inner   = document.getElementById('avatarInner');
  const input   = document.getElementById('avatarInput');
  const img     = document.getElementById('avatarImg');
  const initials= document.getElementById('avatarInitials');
  const rmBtn   = document.getElementById('avatarRemove');

  if (!ring || !inner || !input || !img) return;

  // Load saved avatar
  const saved = localStorage.getItem('avatarSrc');
  if (saved) {
    img.src = saved;
    img.style.display = 'block';
    if (initials) initials.style.display = 'none';
    if (rmBtn) rmBtn.style.display = 'flex';
  }

  // Click to upload
  inner.addEventListener('click', () => input.click());

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) loadFile(file);
  });

  // Drag and drop
  ring.addEventListener('dragover', e => { e.preventDefault(); ring.style.opacity = '0.7'; });
  ring.addEventListener('dragleave', () => { ring.style.opacity = '1'; });
  ring.addEventListener('drop', e => {
    e.preventDefault();
    ring.style.opacity = '1';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) loadFile(file);
  });

  // Remove button
  if (rmBtn) {
    rmBtn.addEventListener('click', e => {
      e.stopPropagation();
      img.src = '';
      img.style.display = 'none';
      if (initials) initials.style.display = 'block';
      rmBtn.style.display = 'none';
      localStorage.removeItem('avatarSrc');
      input.value = '';
    });
  }

  function loadFile(file) {
    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target.result;
      img.src = src;
      img.style.display = 'block';
      if (initials) initials.style.display = 'none';
      if (rmBtn) rmBtn.style.display = 'flex';
      try { localStorage.setItem('avatarSrc', src); } catch(e) {}
    };
    reader.readAsDataURL(file);
  }
}
