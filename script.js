/* =============================================
   MOKSHI SHAH — PORTFOLIO SCRIPTS
   ============================================= */

/* ── Custom Cursor ── */
(function () {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = 'a, button, .project-item, .stag, .extra-card, .stat, .channel-hint';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%, -50%) scale(2.5)';
      dot.style.background = 'var(--green)';
      ring.style.opacity   = '0.9';
      ring.style.width     = '44px';
      ring.style.height    = '44px';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%, -50%) scale(1)';
      dot.style.background = 'var(--green)';
      ring.style.opacity   = '0.5';
      ring.style.width     = '28px';
      ring.style.height    = '28px';
    });
  });
})();

/* ── Nav Scroll Effect ── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Hero Highlight Cycle ── */
(function () {
  const el = document.getElementById('highlightCycle');
  if (!el) return;

  const phrases = [
    'language & intelligence',
    'interpreters & parsers',
    'AI & genomics',
    'full-stack & open-source',
  ];

  let index = 0;

  function cycle() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    setTimeout(() => {
      index = (index + 1) % phrases.length;
      el.textContent = phrases[index];
      el.style.transition = 'opacity 0.5s, transform 0.5s';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400);
  }

  el.style.transition = 'opacity 0.5s, transform 0.5s';
  setInterval(cycle, 2800);
})();

/* ── Skill Bars Animation ── */
(function () {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fills.forEach(fill => observer.observe(fill));
})();

/* ── Counter Animation for stat numbers ── */
(function () {
  const stats = document.querySelectorAll('.stat-n[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseFloat(el.getAttribute('data-target'));
      const decimals = parseInt(el.getAttribute('data-dec') || '0', 10);
      const duration = 1400;
      const start    = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toFixed(decimals);
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();

/* ── Scroll Reveal ── */
(function () {
  const targets = document.querySelectorAll(
    '.section, .project-item, .extra-card, .stat, .about-edu, .hero-badges'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

/* ── Staggered card reveals ── */
(function () {
  function staggerGroup(selector, delay) {
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    const groupObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * delay);
          groupObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    cards.forEach(el => {
      el.classList.add('reveal');
      groupObserver.observe(el);
    });
  }

  staggerGroup('.project-item', 100);
  staggerGroup('.extra-card', 90);
  staggerGroup('.stat', 70);
})();

/* ── Active nav link highlighting ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
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
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
})();

/* ── Project item subtle tilt ── */
(function () {
  const items = document.querySelectorAll('.project-item');

  items.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      item.style.transform = `perspective(1200px) rotateY(${x * 2}deg) rotateX(${-y * 1.5}deg)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
})();

/* ── Hero scroll parallax ── */
(function () {
  const grid = document.querySelector('.hero-bg-grid');
  if (!grid) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      grid.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }
  }, { passive: true });
})();

/* ── Skill tag ripple on click ── */
(function () {
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple-out { to { transform: translate(-50%,-50%) scale(40); opacity: 0; } }`;
  document.head.appendChild(style);

  document.querySelectorAll('.stag').forEach(tag => {
    tag.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        width:4px; height:4px;
        background:var(--green);
        pointer-events:none;
        transform:translate(-50%,-50%) scale(0);
        animation:ripple-out 0.5s ease-out forwards;
        left:${e.offsetX}px; top:${e.offsetY}px;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
})();

/* ── Contact terminal input handler ── */
(function () {
  const input    = document.getElementById('termInput');
  const response = document.getElementById('ctResponse');
  if (!input || !response) return;

  const channels = {
    whatsapp : 'https://wa.me/917506176003',
    gmail    : 'mailto:mokshishah0501@gmail.com',
    github   : 'https://github.com/Mokshii46',
    linkedin : 'https://linkedin.com/in/mokshee46',
    phone    : 'tel:+917506176003',
  };

  const responses = {
    whatsapp : '→ opening WhatsApp…',
    gmail    : '→ opening Gmail…',
    github   : '→ opening GitHub…',
    linkedin : '→ opening LinkedIn…',
    phone    : '→ initiating call…',
  };

  /* Highlight channel hints from buttons */
  document.querySelectorAll('.channel-hint').forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = btn.getAttribute('data-channel');
      highlightChannel(ch);
      input.value = ch;
      input.focus();
    });
  });

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const val = input.value.trim().toLowerCase();
    if (!val) return;

    if (channels[val]) {
      showResponse(responses[val]);
      highlightChannel(val);
      setTimeout(() => window.open(channels[val], '_blank'), 600);
    } else {
      showResponse(`→ unknown channel "${val}". Try: whatsapp, gmail, github, linkedin, phone`);
    }

    input.value = '';
  });

  function highlightChannel(ch) {
    document.querySelectorAll('.ct-channel').forEach(row => {
      row.classList.toggle('active', row.getAttribute('data-ch') === ch);
    });
  }

  function showResponse(msg) {
    response.textContent = msg;
    response.style.display = 'flex';
    setTimeout(() => { response.style.display = 'none'; }, 3500);
  }
})();