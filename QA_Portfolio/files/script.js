/* =========================================================
   Abhishek Singh — Portfolio interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer date ---------- */
  const yearEl = document.getElementById('year');
  const lastRunEl = document.getElementById('lastRun');
  const now = new Date();
  if (yearEl) yearEl.textContent = now.getFullYear();
  if (lastRunEl) {
    lastRunEl.textContent = now.toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[data-nav]');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Terminal typing animation ---------- */
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const lines = [
    { type: 'cmd', text: 'run-suite "abhishek-singh.spec.js"' },
    { type: 'blank' },
    { type: 'check', text: '3+ years in manual & automation testing' },
    { type: 'check', text: 'Cut production defects by 20% through better test design' },
    { type: 'check', text: 'Java \u00B7 Selenium WebDriver \u00B7 TestNG frameworks' },
    { type: 'check', text: 'API testing \u2014 Postman & RestAssured' },
    { type: 'check', text: 'SQL validation \u00B7 Jira \u00B7 Agile/Scrum' },
    { type: 'blank' },
    { type: 'summary', text: '1 suite passed, 5 tests passed, 0 failed' },
    { type: 'dim', text: 'Done in 0.42s' }
  ];

  if (reduceMotion) {
    renderAllLines();
    return;
  }

  let lineIndex = 0;
  let cursor = createCursor();

  function renderAllLines() {
    terminalBody.innerHTML = '';
    lines.forEach((line) => terminalBody.appendChild(buildLine(line, true)));
  }

  function createCursor() {
    const span = document.createElement('span');
    span.className = 'term-cursor';
    return span;
  }

  function buildLine(line, full) {
    if (line.type === 'blank') {
      const div = document.createElement('span');
      div.className = 'term-line';
      div.innerHTML = '&nbsp;';
      return div;
    }

    const div = document.createElement('span');
    div.className = `term-line term-line--${line.type}`;

    if (line.type === 'check') {
      const mark = document.createElement('span');
      mark.className = 'term-check-mark';
      mark.textContent = '\u2713';
      div.appendChild(mark);
      div.appendChild(document.createTextNode(full ? line.text : ''));
    } else {
      div.textContent = full ? line.text : '';
    }

    return div;
  }

  function typeNextLine() {
    if (lineIndex >= lines.length) {
      cursor.remove();
      return;
    }

    const lineData = lines[lineIndex];
    const lineEl = buildLine(lineData, false);
    terminalBody.appendChild(lineEl);

    if (lineData.type === 'blank') {
      lineIndex += 1;
      setTimeout(typeNextLine, 120);
      return;
    }

    const target = lineData.type === 'check'
      ? lineEl.lastChild
      : lineEl;

    terminalBody.appendChild(cursor);

    if (lineData.type === 'cmd') {
      typeText(target, lineData.text, 32, () => {
        lineIndex += 1;
        setTimeout(typeNextLine, 250);
      });
    } else if (lineData.type === 'check') {
      // Checks appear with a quick fade rather than character typing
      target.textContent = lineData.text;
      lineEl.style.opacity = '0';
      requestAnimationFrame(() => {
        lineEl.style.transition = 'opacity 0.25s ease';
        lineEl.style.opacity = '1';
      });
      lineIndex += 1;
      setTimeout(typeNextLine, 220);
    } else {
      target.textContent = lineData.text;
      lineIndex += 1;
      setTimeout(typeNextLine, 200);
    }
  }

  function typeText(target, text, speed, done) {
    let i = 0;
    (function step() {
      if (i <= text.length) {
        target.textContent = text.slice(0, i);
        i += 1;
        setTimeout(step, speed);
      } else if (done) {
        done();
      }
    })();
  }

  // Kick off after a short delay so the page settles first
  setTimeout(typeNextLine, 350);
});
