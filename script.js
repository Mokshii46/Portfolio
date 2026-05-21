/* =============================================
   MOKSHI SHAH — PORTFOLIO SCRIPTS
   ============================================= */

/* ── Custom Cursor ── */
(function () {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  /* Grow cursor on hoverable elements */
  const hoverables = 'a, button, .project-card, .skill-pill, .extra-card, .stat-card, .contact-item';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.background = 'var(--amber-bright)';
      follower.style.opacity = '0.2';
      follower.style.transform = 'translate(-50%, -50%) scale(1.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--amber)';
      follower.style.opacity = '0.5';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
})();

/* ── Nav Scroll Effect ── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Hero Descriptor Ticker ── */
(function () {
  const items = document.querySelectorAll('.ticker-item');
  if (!items.length) return;
  let current = 0;

  function tick() {
    items[current].classList.remove('active');
    current = (current + 1) % items.length;
    items[current].classList.add('active');
  }

  setInterval(tick, 2200);
})();

/* ── Scroll Reveal ── */
(function () {
  const sections = document.querySelectorAll('.section, .project-card, .extra-card, .stat-card, .about-edu, .hero-stats');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

/* ── Staggered card reveals ── */
(function () {
  function staggerGroup(selector, delay) {
    const cards = document.querySelectorAll(selector);
    const groupObserver = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * delay);
            groupObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    cards.forEach(el => {
      el.classList.add('reveal');
      groupObserver.observe(el);
    });
  }

  staggerGroup('.project-card', 120);
  staggerGroup('.extra-card', 100);
  staggerGroup('.stat-card', 80);
  staggerGroup('.skill-group', 90);
})();

/* ── Smooth active nav link highlighting ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === '#' + id
              ? 'var(--white)'
              : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(sec => observer.observe(sec));
})();

/* ── Project card tilt effect ── */
(function () {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── Typing effect on hero bio ── */
(function () {
  const bio = document.querySelector('.hero-bio');
  if (!bio) return;

  // Mark hero section visible immediately (no reveal delay for hero)
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('visible');
})();

/* ── Parallax on hero grid lines ── */
(function () {
  const grid = document.querySelector('.hero-grid-lines');
  if (!grid) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      grid.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
})();

/* ── Skills pill hover ripple ── */
(function () {
  document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        width:4px; height:4px;
        background:var(--amber);
        pointer-events:none;
        transform:translate(-50%,-50%) scale(0);
        animation:ripple-out 0.5s ease-out forwards;
        left:${e.offsetX}px; top:${e.offsetY}px;
      `;
      pill.style.position = 'relative';
      pill.style.overflow = 'hidden';
      pill.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes ripple-out { to { transform: translate(-50%,-50%) scale(40); opacity: 0; } }`;
  document.head.appendChild(style);
})();

/* ── Counter animation for stat numbers ── */
(function () {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.textContent);
      const isDecimal = el.textContent.includes('.');
      const decimals = isDecimal ? el.textContent.split('.')[1].length : 0;
      const duration = 1200;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = isDecimal ? value.toFixed(decimals) : Math.round(value);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = isDecimal ? target.toFixed(decimals) : target;
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();