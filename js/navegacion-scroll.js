(function () {
  var navbar = document.querySelector(".navbar");
  if (!navbar) return;

  var secciones = document.querySelectorAll("header[id], section[id]");
  var enlaces = document.querySelectorAll(".navbar .nav-link");

  function actualizarAlturaNavbar() {
    document.documentElement.style.setProperty(
      "--navbar-height",
      navbar.offsetHeight + "px"
    );
  }

  function actualizarEstadoScroll() {
    navbar.classList.toggle("scroll", window.scrollY > 20);
  }

  function actualizarEnlaceActivo() {
    if (!secciones.length || !enlaces.length) return;

    var margen = navbar.offsetHeight + 40;
    var seccionActual = secciones[0];

    secciones.forEach(function (seccion) {
      if (seccion.getBoundingClientRect().top <= margen) {
        seccionActual = seccion;
      }
    });

    enlaces.forEach(function (enlace) {
      var activo = enlace.getAttribute("href") === "#" + seccionActual.id;
      enlace.classList.toggle("active", activo);

      if (activo) {
        enlace.setAttribute("aria-current", "location");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });
  }

  function alScrollear() {
    actualizarEstadoScroll();
    actualizarEnlaceActivo();
  }

  actualizarAlturaNavbar();
  actualizarEstadoScroll();
  actualizarEnlaceActivo();

  window.addEventListener("scroll", alScrollear, { passive: true });
  window.addEventListener("resize", function () {
    actualizarAlturaNavbar();
    actualizarEnlaceActivo();
  });
})();
