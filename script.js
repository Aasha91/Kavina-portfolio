// ===========================
// NAVBAR — scroll effect + mobile menu
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNavLink();
  handleBackToTop();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 6px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -6px)' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// Active nav link on scroll
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===========================
// HERO TYPEWRITER EFFECT
// ===========================
const roles = [
  'Information Technology Student',
  'Internship Candidate',
  'Web Developer',
  'Android App Developer',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('role-text');

function typeRole() {
  if (!roleEl) return;
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    roleEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    roleEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, isDeleting ? 60 : 90);
}

// Start typewriter after page load
window.addEventListener('load', () => {
  setTimeout(typeRole, 800);
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
function setupReveal() {
  const elements = document.querySelectorAll(
    '.about-card, .stat-card, .about-extra, .timeline-item, .project-card, .skill-category, .contact-item, .contact-form-wrapper'
  );

  elements.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

setupReveal();

// ===========================
// BACK TO TOP BUTTON
// ===========================
const backToTopBtn = document.getElementById('back-to-top');

function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// EMAILJS SETUP
// ===========================
emailjs.init('qp0MvxmtWLA6GDBok');

// ===========================
// CONTACT FORM — EmailJS
// ===========================
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.style.color = '#ff6584';
      formNote.textContent = 'Please fill in all required fields.';
      return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    formNote.textContent = '';

    const templateParams = {
      from_name: name,
      name: name,
      email: email,
      title: document.getElementById('subject').value.trim() || 'Portfolio Contact',
      message: message
    };

    emailjs.send('service_jaj550h', 'template_pplz1i4', templateParams)
      .then(() => {
        formNote.style.color = '#43e97b';
        formNote.textContent = '✓ Message sent! I will get back to you soon.';
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        setTimeout(() => { formNote.textContent = ''; }, 6000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        formNote.style.color = '#ff6584';
        formNote.textContent = '✗ Something went wrong. Please try again or email directly.';
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
  });
}

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

// ===========================
// SKILL TAG HOVER RIPPLE EFFECT
// ===========================
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.08)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});
