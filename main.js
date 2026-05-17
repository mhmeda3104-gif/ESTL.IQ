// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of grids
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  // Stagger grid children
  const parent = el.parentElement;
  if (parent && (parent.classList.contains('values-grid') || parent.classList.contains('stories-grid-layout') || parent.classList.contains('testimonials-grid'))) {
    const siblings = Array.from(parent.querySelectorAll('.reveal'));
    const idx = siblings.indexOf(el);
    el.dataset.delay = idx * 120;
  }
  revealObserver.observe(el);
});

// ===== SMOOTH ACTIVE NAV =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.style.color = 'var(--gold)';
  }
});

// ===== STORY CARDS DRAG SCROLL =====
const marquee = document.querySelector('.stories-marquee');
if (marquee) {
  let isDown = false, startX, scrollLeft;
  marquee.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - marquee.offsetLeft;
    scrollLeft = marquee.scrollLeft;
    marquee.style.cursor = 'grabbing';
  });
  marquee.addEventListener('mouseleave', () => { isDown = false; marquee.style.cursor = 'grab'; });
  marquee.addEventListener('mouseup', () => { isDown = false; marquee.style.cursor = 'grab'; });
  marquee.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - marquee.offsetLeft;
    marquee.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
  marquee.style.cursor = 'grab';
}

// ===== UPLOAD AREA DRAG & DROP =====
const uploadArea = document.querySelector('.upload-area');
if (uploadArea) {
  ['dragenter', 'dragover'].forEach(evt => {
    uploadArea.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--gold)';
      uploadArea.style.background = 'rgba(201,169,110,0.08)';
    });
  });
  ['dragleave', 'drop'].forEach(evt => {
    uploadArea.addEventListener(evt, () => {
      uploadArea.style.borderColor = '';
      uploadArea.style.background = '';
    });
  });
}

// ===== HAMBURGER ANIMATION =====
const style = document.createElement('style');
style.textContent = `
  .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: translateX(-10px); }
  .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  .nav-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 998;
  }
  .nav-overlay.show { display: block; }
`;
document.head.appendChild(style);

// Overlay for mobile menu
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);
if (hamburger) {
  hamburger.addEventListener('click', () => overlay.classList.toggle('show'));
  overlay.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('show');
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/[\d]/g, '').trim();
      if (num > 0) animateCounter(el, num, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.trust-num, .about-accent-num').forEach(el => {
  counterObserver.observe(el);
});
