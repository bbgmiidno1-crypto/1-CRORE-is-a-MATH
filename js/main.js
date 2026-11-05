/* ==========================================================
   1 CRORE is a SIMPLE MATH — Landing Page Script
   Vanilla JS. No dependencies.
   ========================================================== */

/* ==========================================================
   SITE SETTINGS — edit these values before launch.
   Leave a value as '' and that item stays hidden or generic.
   ========================================================== */
var SITE = {
  price: '',            // e.g. '₹499'  (shown in the purchase card and mobile bar)
  email: 'sjtunivers@gmail.com',            // e.g. 'support@yourdomain.com'
  whatsapp: '918926283700',         // digits with country code, e.g. '919876543210'
  deliveryNote: ''      // verified text about how buyers get the PDF after purchase
};

(function () {
  'use strict';

  var GETVIK_CHECKOUT_URL =
    'https://getvik.com/checkout?productId=6aeb3442b8b6e679919b977d&productSlug=1-crore-clothing-business&theme=light';


  // 0. Apply SITE settings.
  if (SITE.price) {
    document.querySelectorAll('[data-price], [data-price-short]').forEach(function (el) { el.textContent = SITE.price; });
  }
  var hasContact = false;
  if (SITE.email) {
    hasContact = true;
    var e = document.querySelector('[data-contact="email"]');
    e.textContent = SITE.email; e.href = 'mailto:' + SITE.email;
    document.querySelector('[data-contact-row="email"]').hidden = false;
  }
  if (SITE.whatsapp) {
    hasContact = true;
    var w = document.querySelector('[data-contact="whatsapp"]');
    w.textContent = '+' + SITE.whatsapp.replace(/\D/g, ''); w.href = 'tel:+' + SITE.whatsapp.replace(/\D/g, '');
    document.querySelector('[data-contact-row="whatsapp"]').hidden = false;
  }
  if (hasContact) { document.querySelector('[data-contact-empty]').hidden = true; }
  if (SITE.deliveryNote) {
    var d = document.querySelector('[data-delivery-note]');
    d.textContent = SITE.deliveryNote; d.hidden = false;
  }

  // 1. Make sure every purchase button points to the exact checkout URL.
  document.querySelectorAll('[data-buy]').forEach(function (el) {
    el.setAttribute('href', GETVIK_CHECKOUT_URL);
    if (el.tagName === 'A') {
      el.setAttribute('rel', 'noopener');
    }
  });

  // 2. Navbar shadow after scrolling.
  var nav = document.getElementById('nav');
  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  // 3. Scroll-reveal animations.
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // 4. Sticky mobile buy bar: show after the hero, hide while the purchase section is in view.
  var sticky = document.getElementById('stickyBuy');
  var hero = document.getElementById('top');
  var purchase = document.getElementById('buy');
  if (sticky && hero && purchase && 'IntersectionObserver' in window) {
    var heroVisible = true;
    var purchaseVisible = false;
    function updateSticky() {
      var show = !heroVisible && !purchaseVisible;
      sticky.classList.toggle('is-visible', show);
      sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
    }
    var heroIO = new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      updateSticky();
    }, { threshold: 0.2 });
    var purchaseIO = new IntersectionObserver(function (entries) {
      purchaseVisible = entries[0].isIntersecting;
      updateSticky();
    }, { threshold: 0.2 });
    heroIO.observe(hero);
    purchaseIO.observe(purchase);
  }

  // 5. Smooth scroll for in-page anchors that also respects the fixed nav height.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });
})();
