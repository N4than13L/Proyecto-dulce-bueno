(function () {
  "use strict";

  // Respeta la preferencia del sistema: sin animaciones si el usuario las
  // ha desactivado. El contenido queda visible por defecto.
  var prefiereMenosMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefiereMenosMovimiento || typeof window.gsap === "undefined") return;

  var gsap = window.gsap;
  var tieneScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (tieneScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  var esEscritorio = window.matchMedia("(min-width: 768px)").matches;

  /* =========================================================
     Fondo animado
     ========================================================= */
  var fondo = document.querySelector(".fondo-decor");
  var blobs = gsap.utils.toArray(".fondo-decor__blob");

  if (fondo) {
    gsap.fromTo(
      fondo,
      { opacity: 0 },
      { opacity: 1, duration: 1.6, ease: "power2.out" }
    );
  }

  blobs.forEach(function (blob, indice) {
    gsap.to(blob, {
      xPercent: gsap.utils.random(-14, 14),
      yPercent: gsap.utils.random(-12, 12),
      duration: gsap.utils.random(16, 26),
      delay: indice * 1.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });

  // Parallax muy suave del fondo al hacer scroll (solo escritorio).
  if (fondo && tieneScrollTrigger && esEscritorio) {
    gsap.to(fondo, {
      yPercent: 7,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }

  /* =========================================================
     Entrada del hero
     ========================================================= */
  var hero = document.querySelector(".hero");

  if (hero) {
    var lineaHero = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Solo transformaciones: el texto ya es visible al primer pintado,
    // así no se retrasa el FCP. La imagen del hero (elemento LCP) se deja
    // estática para no retrasar el LCP.
    lineaHero
      .from(".hero__content > *", {
        y: 28,
        duration: 0.8,
        stagger: 0.1,
      })
      .from(
        ".hero__badge",
        { y: 18, autoAlpha: 0, duration: 0.7 },
        "-=0.55"
      );
  }

  /* =========================================================
     Revelado al hacer scroll
     ========================================================= */
  function revelar(elementos, opciones) {
    var lista = gsap.utils.toArray(elementos);
    if (!lista.length) return;

    var config = Object.assign(
      {
        y: 32,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        // Devuelve el control al CSS al terminar (por ejemplo, para que
        // vuelva a funcionar el hover de las tarjetas).
        clearProps: "transform,opacity,visibility,transition",
      },
      opciones || {}
    );

    if (tieneScrollTrigger) {
      config.scrollTrigger = {
        trigger: config.trigger || lista[0],
        start: "top 88%",
        once: true,
      };
      delete config.trigger;
    }

    gsap.from(lista, config);
  }

  // Evita que la transición CSS de las tarjetas interfiera con GSAP.
  gsap.set(".product-card", { transition: "none" });

  gsap.utils.toArray(".section__header").forEach(function (header) {
    revelar(header, { y: 26, duration: 0.75 });
  });

  revelar(".about__content", { trigger: "#about" });
  revelar(".about__media", {
    trigger: "#about",
    x: 42,
    y: 0,
    scale: 0.98,
  });

  gsap.utils.toArray(".category").forEach(function (categoria) {
    revelar(categoria.querySelectorAll(".category__header"), {
      trigger: categoria,
      y: 22,
    });

    revelar(categoria.querySelectorAll(".product-card"), {
      trigger: categoria.querySelector(".product-grid") || categoria,
      y: 34,
      duration: 0.7,
      stagger: 0.08,
    });
  });

  revelar(".testimonial", {
    trigger: ".testimonial-grid",
    y: 34,
    stagger: 0.12,
  });

  revelar(".contact__info", { trigger: "#contacto" });
  revelar(".contact__form", {
    trigger: "#contacto",
    y: 42,
    scale: 0.98,
  });

  revelar(".footer__inner", {
    trigger: ".footer",
    y: 24,
    duration: 0.7,
  });

  /* =========================================================
     Parallax de la imagen de "Sobre nosotros"
     ========================================================= */
  var imagenAbout = document.querySelector(".about__media img");

  if (imagenAbout && tieneScrollTrigger && esEscritorio) {
    gsap.set(imagenAbout, { scale: 1.1 });
    gsap.fromTo(
      imagenAbout,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".about__media",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );
  }

  // Recalcula posiciones cuando terminan de cargar las imágenes.
  window.addEventListener("load", function () {
    if (tieneScrollTrigger) window.ScrollTrigger.refresh();
  });
})();
