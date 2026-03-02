/* ===================================================
   Profile Page - Phùng Tiến Đạt
   Interactive JS: Particles, Typing, Scroll, AOS,
   Skill Bars, Counter, Navbar, Form
   =================================================== */

// ─── DOM Ready ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initTyping();
  initNavbar();
  initScrollSpy();
  initAOS();
  initSkillBars();
  initCounters();
  initContactForm();
  initHamburger();
});

/* ===== 1. PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('particles');
  const count = 35;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 20;
    const colors = [
      'rgba(108,99,255,0.4)',
      'rgba(0,210,255,0.3)',
      'rgba(253,121,168,0.3)',
      'rgba(162,155,254,0.3)',
    ];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(p);
  }
}

/* ===== 2. TYPING EFFECT ===== */
function initTyping() {
  const el = document.getElementById('typingName');
  if (!el) return;

  const text = 'Phùng Tiến Đạt';
  let index = 0;
  let isDeleting = false;
  let pause = false;

  function type() {
    if (pause) return;

    if (!isDeleting) {
      el.textContent = text.slice(0, index + 1);
      index++;
      if (index === text.length) {
        pause = true;
        setTimeout(() => { pause = false; isDeleting = true; type(); }, 3000);
        return;
      }
    } else {
      el.textContent = text.slice(0, index - 1);
      index--;
      if (index === 0) {
        isDeleting = false;
        setTimeout(type, 500);
        return;
      }
    }

    setTimeout(type, isDeleting ? 60 : 100);
  }

  // Start after hero greeting animation (0.4s delay)
  setTimeout(type, 600);
}

/* ===== 3. NAVBAR - Scroll Effect ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction (optional smooth feel)
    if (current > lastScroll && current > 300) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = current;
  });
}

/* ===== 4. SCROLL SPY (Active Nav Link) ===== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ===== 5. SCROLL ANIMATIONS (AOS replacement) ===== */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children inside grids/rows
          const delay = Array.from(
            entry.target.parentElement?.children || []
          ).indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay * 100);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ===== 6. SKILL BARS ===== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ===== 7. COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el, target) {
  const duration = 1800;
  const start = performance.now();
  const suffix = target === 100 ? '%' : '+';

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current + (progress < 1 ? '' : suffix);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ===== 8. HAMBURGER MENU ===== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

/* ===== 9. CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang gửi...';
    btn.disabled = true;

    // Simulate async send
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();

      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    }, 1500);
  });
}

/* ===== 10. SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== 11. CURSOR / HOVER GLOW on Cards ===== */
document.querySelectorAll('.about-card, .stat-card, .timeline-card, .skills-group').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  });
});

/* ===== 12. AVATAR IMAGE UPLOAD ===== */
function initAvatarUpload() {
  const ring     = document.getElementById('avatarRing');
  const input    = document.getElementById('avatarInput');
  const img      = document.getElementById('avatarImg');
  const initials = document.getElementById('avatarInitials');
  const overlay  = document.getElementById('avatarOverlay');

  if (!ring || !input || !img) return;

  // Add remove button dynamically
  const removeBtn = document.createElement('button');
  removeBtn.className = 'avatar-remove';
  removeBtn.innerHTML = '<i class="fas fa-times"></i>';
  removeBtn.title = 'Xoá ảnh';
  ring.appendChild(removeBtn);

  // Click avatar → open file picker
  document.getElementById('avatarInner').addEventListener('click', () => {
    input.click();
  });

  // File selected
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.style.display = 'block';
      initials.style.display = 'none';
      // Store in localStorage so it persists on reload
      try { localStorage.setItem('ptd_avatar', ev.target.result); } catch (_) {}
    };
    reader.readAsDataURL(file);
    input.value = ''; // reset so same file can be re-selected
  });

  // Remove button
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    img.src = '';
    img.style.display = 'none';
    initials.style.display = 'block';
    try { localStorage.removeItem('ptd_avatar'); } catch (_) {}
  });

  // Restore from localStorage on load
  try {
    const saved = localStorage.getItem('ptd_avatar');
    if (saved) {
      img.src = saved;
      img.style.display = 'block';
      initials.style.display = 'none';
    }
  } catch (_) {}

  // Drag & Drop onto avatar
  const inner = document.getElementById('avatarInner');
  inner.addEventListener('dragover', (e) => { e.preventDefault(); overlay.style.opacity = '1'; });
  inner.addEventListener('dragleave', () => { overlay.style.opacity = ''; });
  inner.addEventListener('drop', (e) => {
    e.preventDefault();
    overlay.style.opacity = '';
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.style.display = 'block';
      initials.style.display = 'none';
      try { localStorage.setItem('ptd_avatar', ev.target.result); } catch (_) {}
    };
    reader.readAsDataURL(file);
  });
}

initAvatarUpload();

/* ===== 12. YEAR in footer (auto update) ===== */
const yearEls = document.querySelectorAll('.footer-year');
yearEls.forEach((el) => (el.textContent = new Date().getFullYear()));
