/* ============================================
   Facilo 宅建講座LP — main.js
   ============================================ */

(function () {
  'use strict';

  // --- Sticky header shadow ---
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  // --- Scroll reveal (IntersectionObserver) ---
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');

  if (!prefersReduced && reveals.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // If reduced motion or no observer support, show everything
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- FAQ accordion animation ---
  document.querySelectorAll('.faq-item').forEach(function (details) {
    var summary = details.querySelector('summary');
    var answer = details.querySelector('.faq-item__answer');

    if (!summary || !answer) return;

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (details.open) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        requestAnimationFrame(function () {
          answer.style.maxHeight = '0';
          answer.style.opacity = '0';
        });
        setTimeout(function () {
          details.open = false;
          answer.style.maxHeight = '';
          answer.style.opacity = '';
        }, 250);
      } else {
        details.open = true;
        var h = answer.scrollHeight;
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        requestAnimationFrame(function () {
          answer.style.maxHeight = h + 'px';
          answer.style.opacity = '1';
        });
        setTimeout(function () {
          answer.style.maxHeight = '';
        }, 250);
      }
    });
  });

  // Style for FAQ answer transition
  var style = document.createElement('style');
  style.textContent = '.faq-item__answer{overflow:hidden;transition:max-height .25s ease,opacity .25s ease;}';
  document.head.appendChild(style);
})();
