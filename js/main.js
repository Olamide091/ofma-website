/* ==========================================================================
   OFMA v2 — main.js
   Requires: GSAP + ScrollTrigger, Swiper (loaded via CDN in each page)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Page-load curtain / preloader ---------- */
  const curtain = document.querySelector('.curtain');
  if (curtain) {
    const minTime = 500;
    const maxTime = 3500;
    const start = performance.now();
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minTime - elapsed);
      setTimeout(() => {
        if (window.gsap) {
          gsap.to(curtain, {
            yPercent: -100, duration: 0.9, ease: 'power3.inOut',
            onComplete: () => curtain.remove()
          });
        } else {
          curtain.style.transition = 'transform .6s ease';
          curtain.style.transform = 'translateY(-100%)';
          setTimeout(() => curtain.remove(), 650);
        }
      }, wait);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss);
    }
    setTimeout(dismiss, maxTime);
  }

  // fade-out on internal nav clicks before navigating
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      if (link.target === '_blank' || url.startsWith('http')) return;
      e.preventDefault();
      const exit = document.createElement('div');
      exit.className = 'curtain';
      exit.style.transform = 'translateY(100%)';
      document.body.appendChild(exit);
      if (window.gsap) {
        gsap.to(exit, {
          yPercent: -100, duration: 0.55, ease: 'power2.in',
          onComplete: () => { window.location.href = url; }
        });
      } else {
        window.location.href = url;
      }
    });
  });

  /* ---------- Sticky nav shrink ---------- */
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Progress bar ---------- */
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = (isFinite(pct) ? pct : 0) + '%';
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- Custom cursor (desktop only) ---------- */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    let rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .card, .frame').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      if (window.gsap) gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => {
      if (window.gsap) gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
    });
  });

  /* ---------- Marquee duplication (seamless loop) ---------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- GSAP ScrollTrigger reveals ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    gsap.utils.toArray('[data-reveal-group]').forEach(group => {
      const items = group.querySelectorAll('[data-reveal-item]');
      gsap.fromTo(items, { y: 34, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: group, start: 'top 85%' }
      });
    });

    // hero headline line reveal
    gsap.utils.toArray('.hero h1 .line span').forEach((span, i) => {
      gsap.fromTo(span, { yPercent: 120 }, {
        yPercent: 0, duration: 1, ease: 'power4.out', delay: 0.3 + i * 0.12
      });
    });
    gsap.fromTo('.hero-tag, .hero p.lede, .hero .hero-cta', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, delay: 0.8, stagger: 0.1, ease: 'power3.out'
    });

    // count-up numbers
    document.querySelectorAll('.num[data-count]').forEach(el => {
      const raw = el.getAttribute('data-count');
      const suffix = raw.replace(/[0-9]/g, '');
      const num = parseInt(raw.replace(/[^0-9]/g, ''), 10) || 0;
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: () => gsap.to(obj, {
          val: num, duration: 1.4, ease: 'power2.out',
          onUpdate: () => el.textContent = Math.round(obj.val) + suffix
        })
      });
    });

    // parallax hero star
    gsap.utils.toArray('.hero-star').forEach(star => {
      gsap.to(star, {
        y: 100, ease: 'none',
        scrollTrigger: { trigger: star.closest('section'), start: 'top top', end: 'bottom top', scrub: true }
      });
    });

  } else {
    // fallback: simple IntersectionObserver reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal],[data-reveal-item]').forEach(el => io.observe(el));
  }

  /* ---------- Swiper carousels ---------- */
  if (window.Swiper) {
    document.querySelectorAll('.swiper').forEach(el => {
      new Swiper(el, {
        slidesPerView: 1.1,
        spaceBetween: 24,
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 28 },
          1000: { slidesPerView: el.dataset.slides ? parseInt(el.dataset.slides) : 3, spaceBetween: 32 }
        },
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev')
        }
      });
    });
  }

});
