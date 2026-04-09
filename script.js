/* ============================================================
   GUSTAVO FUNO — PORTFOLIO SCRIPTS
   ============================================================ */

/* === NAVBAR: scroll effect === */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
}, { passive: true });

/* === HAMBURGER MENU === */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* === FADE-IN ON SCROLL (Intersection Observer) === */
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

/* === PARALLAX HERO === */
const heroBg = document.querySelector('.hero-img');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking && heroBg) {
    requestAnimationFrame(() => {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.22}px) scale(1.05)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* === ACTIVE NAV LINK === */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = navLinks.querySelector(`a[href="#${id}"]`);
    if (!link) return;

    if (scrollY >= top && scrollY < top + height) {
      link.style.color      = '#2457C5';
      link.style.background = 'rgba(36,87,197,0.08)';
    } else {
      link.style.color      = '';
      link.style.background = '';
    }
  });
}

/* === CONTACT FORM (EmailJS) === */
emailjs.init('1NFlcCmANEt_KRaS7e');

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const btn          = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  emailjs.sendForm('service_zs83lu9', 'template_w6xbxq8', contactForm)
    .then(() => {
      btn.textContent      = '✓ Message Sent!';
      btn.style.background = '#10b981';
      btn.style.boxShadow  = '0 8px 28px rgba(16,185,129,0.35)';

      setTimeout(() => {
        btn.textContent      = originalText;
        btn.style.background = '';
        btn.style.boxShadow  = '';
        btn.disabled         = false;
        contactForm.reset();
      }, 3200);
    })
    .catch((err) => {
      console.error('EmailJS error:', JSON.stringify(err));
      btn.textContent      = '✗ Failed — try again';
      btn.style.background = '#ef4444';
      btn.disabled         = false;

      setTimeout(() => {
        btn.textContent      = originalText;
        btn.style.background = '';
      }, 3000);
    });
});

/* === SKILL CARD — ripple hover effect === */
document.querySelectorAll('.skill-card, .hobby-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    card.style.transform = `translateY(-7px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* === SMOOTH SCROLL for anchor links === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* === TYPING CURSOR on hero name (subtle) === */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.style.borderRight = '3px solid rgba(255,255,255,0.7)';
  heroName.style.animation   = 'heroSlide 1.1s 0.2s cubic-bezier(0.4,0,0.2,1) both, blink 1s 1.5s step-end 4';
}

const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
  @keyframes blink {
    0%, 100% { border-color: rgba(255,255,255,0.7); }
    50%       { border-color: transparent; }
  }
`;
document.head.appendChild(blinkStyle);

// Remove cursor after animation
setTimeout(() => {
  if (heroName) heroName.style.borderRight = 'none';
}, 6500);
