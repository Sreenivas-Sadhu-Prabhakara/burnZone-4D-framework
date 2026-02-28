/* ========================================
   BURNZONE.IN — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll animations (Intersection Observer) ---
  const animateElements = document.querySelectorAll(
    '.proof-card, .pillar-card, .culture-block, .vision-content, .vision-card, ' +
    '.manifesto-text p, .hero-badge, .hero-title, .hero-subtitle, .hero-actions, .hero-stats, ' +
    '.future-item, .section-header'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach((el, index) => {
    el.classList.add('animate-in');
    // Stagger items within grids
    const parent = el.parentElement;
    if (parent) {
      const siblings = parent.querySelectorAll('.animate-in');
      const siblingIndex = Array.from(siblings).indexOf(el);
      el.dataset.delay = siblingIndex * 80;
    }
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // nav height
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // --- Active nav link highlight ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#fff';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
});
