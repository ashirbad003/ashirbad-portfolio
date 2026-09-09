/**
 * ==========================================================================
 * ASHIRBAD PATTNAIK - PORTFOLIO INTERACTION ENGINE
 * Modern, Dark, Futuristic, Pure Vanilla JavaScript (Live Server Compatible)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initParticleCanvas();
  initTypewriter();
  initNavigation();
  initScrollSpy();
  initScrollReveal();
  init3DTilt();
  initSkillsFilter();
  initContactForm();
  initCopyEmail();
  initModalNotice();
  initBackToTop();
  initCurrentYear();
});

/* --------------------------------------------------------------------------
   1. Mouse-Following Light Effect (Spotlight Glow)
   -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-glow');
  if (!spotlight || window.matchMedia('(pointer: coarse)').matches) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* --------------------------------------------------------------------------
   2. Interactive Cyber Constellation Canvas
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 16000);
    const particleCount = Math.min(Math.max(count, 35), 85);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.45 ? 'rgba(0, 210, 255, ' : 'rgba(157, 78, 221, ',
        alpha: Math.random() * 0.45 + 0.25
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      // Connect neighbor particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 105) {
          const linkAlpha = (1 - dist / 105) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 210, 255, ${linkAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  animate();
}

/* --------------------------------------------------------------------------
   3. Animated Typing Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const roles = [
    'Full Stack Developer',
    'AI/ML Enthusiast',
    'Backend Developer',
    'Software Engineer',
    'Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 75;
  const deleteSpeed = 35;
  const holdDelay = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; type(); }, holdDelay);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
      return;
    }

    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(type, currentSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progressPercent}%`;
    }

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Active Navigation ScrollSpy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. 3D Tilt Effect (Profile Card & Projects)
   -------------------------------------------------------------------------- */
function init3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Profile Card 3D tilt
  const profileCard = document.getElementById('profile-card-3d');
  if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileCard.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // Project Cards 3D subtle tilt
  const projectCards = document.querySelectorAll('.project-3d-card');
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   8. Skills Category Filter
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.skill-category-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. Contact Form Validation & Mailto Fallback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusBox = document.getElementById('form-notification');
  if (!form || !submitBtn) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(input, hasError) {
    const parent = input.closest('.form-group-field');
    if (parent) {
      if (hasError) {
        parent.classList.add('has-error');
      } else {
        parent.classList.remove('has-error');
      }
    }
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => setFieldError(input, false));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, true);
      isValid = false;
    } else {
      setFieldError(nameInput, false);
    }

    if (!validateEmail(emailInput.value.trim())) {
      setFieldError(emailInput, true);
      isValid = false;
    } else {
      setFieldError(emailInput, false);
    }

    if (!subjectInput.value.trim()) {
      setFieldError(subjectInput, true);
      isValid = false;
    } else {
      setFieldError(subjectInput, false);
    }

    if (messageInput.value.trim().length < 10) {
      setFieldError(messageInput, true);
      isValid = false;
    } else {
      setFieldError(messageInput, false);
    }

    if (!isValid) return;

    submitBtn.classList.add('is-submitting');
    submitBtn.disabled = true;

    // Simulate clean transmission & construct mailto trigger
    setTimeout(() => {
      submitBtn.classList.remove('is-submitting');
      submitBtn.disabled = false;

      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(subjectInput.value.trim());
      const body = encodeURIComponent(`Hello Ashirbad,\n\nMy name is ${decodeURIComponent(name)} (${decodeURIComponent(email)}).\n\n${decodeURIComponent(messageInput.value.trim())}\n\nSent from Portfolio Website`);

      // Open email client
      window.location.href = `mailto:Pattnaikashirbad4@gmail.com?subject=${subject}&body=${body}`;

      if (statusBox) {
        statusBox.className = 'form-notification-box success';
        statusBox.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          <strong>Email Client Launched!</strong> Preparing transmission for <em>Pattnaikashirbad4@gmail.com</em>. You can also chat directly on WhatsApp.
        `;
        statusBox.style.display = 'block';
      }

      form.reset();

      setTimeout(() => {
        if (statusBox) statusBox.style.display = 'none';
      }, 9000);
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   10. Copy Email Utility
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'Pattnaikashirbad4@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const icon = copyBtn.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-check';
        copyBtn.style.color = 'var(--neon-emerald)';
        copyBtn.style.borderColor = 'var(--neon-emerald)';

        setTimeout(() => {
          icon.className = 'fa-regular fa-copy';
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2200);
      }
    }).catch(() => {
      prompt('Copy Ashirbad\'s Email:', email);
    });
  });
}

/* --------------------------------------------------------------------------
   11. Project Notice Modal
   -------------------------------------------------------------------------- */
function initModalNotice() {
  const modal = document.getElementById('project-notice-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const okBtn = document.getElementById('modal-ok-btn');
  const contactLink = document.getElementById('modal-contact-link');

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);
  if (contactLink) contactLink.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

// Global hook called by project buttons
window.showProjectNotice = function(projectName) {
  const modal = document.getElementById('project-notice-modal');
  const title = document.getElementById('modal-project-title');
  const msg = document.getElementById('modal-project-msg');

  if (modal && title && msg) {
    title.textContent = `${projectName} — Repository Status`;
    msg.innerHTML = `
      The source code and deployment deliverables for <strong>${projectName}</strong> are held in private repositories or enterprise systems. 
      For technical reviews, demonstrations, or code walk-throughs, please connect via email or WhatsApp.
    `;
    modal.classList.add('active');
  }
};

/* --------------------------------------------------------------------------
   12. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   13. Current Year In Footer
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  // Static 2026 maintained in HTML
}
