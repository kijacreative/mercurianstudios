/* Mercurian Studios — shared behaviour */
(function () {
  'use strict';

  /* ---------- video lightbox ---------- */
  var lb = document.getElementById('lb');
  if (lb) {
    var slot = document.getElementById('lbslot');
    var lastFocus = null;
    var closeLb = function () {
      lb.removeAttribute('open');
      slot.innerHTML = '';
      document.body.style.overflow = '';
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    document.querySelectorAll('[data-video]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        lastFocus = a;
        slot.innerHTML =
          '<iframe src="https://www.youtube-nocookie.com/embed/' + a.dataset.video +
          '?autoplay=1&rel=0' + (a.dataset.start ? '&start=' + a.dataset.start : '') +
          '" title="' + (a.dataset.title || 'Video') + '" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
        lb.setAttribute('open', '');
        document.body.style.overflow = 'hidden';
        var x = lb.querySelector('.x');
        if (x) x.focus();
      });
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('x')) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.hasAttribute('open')) closeLb();
    });
  }

  /* ---------- scroll reveals ---------- */
  var rv = document.querySelectorAll('.rv');
  if (rv.length) {
    if (!('IntersectionObserver' in window)) {
      rv.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      rv.forEach(function (el, i) {
        el.style.transitionDelay = (i % 3 * 60) + 'ms';
        el.classList.add('armed');
        io.observe(el);
      });
      /* safety net: never leave content hidden */
      setTimeout(function () { rv.forEach(function (el) { el.classList.add('in'); }); }, 1200);
    }
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.navtoggle');
  var nav = document.querySelector('header nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
