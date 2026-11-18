/*
  assets/js/modules/animations.js — animasi masuk yang tenang.
  Hanya berjalan bila GSAP tersedia dan pengguna tidak meminta gerak dikurangi.
*/
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !window.gsap || !window.ScrollTrigger) return;

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  var groups = [
    { selector: '.layer__heading', y: 26 },
    { selector: '.layer__panel', y: 34 },
    { selector: '.materi__head', y: 20 },
    { selector: '.materi__item', y: 18, stagger: 0.04 },
    { selector: '.section-head', y: 22 }
  ];

  groups.forEach(function (group) {
    var elements = gsap.utils.toArray(group.selector);
    if (elements.length === 0) return;

    elements.forEach(function (element) {
      gsap.from(element, {
        opacity: 0,
        y: group.y,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          once: true
        },
        delay: group.stagger ? 0 : 0.05
      });
    });
  });
})();
