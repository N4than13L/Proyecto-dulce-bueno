(function () {
  var navbar = document.querySelector(".navbar");
  if (!navbar) return;

  var secciones = document.querySelectorAll("header[id], section[id]");
  var enlaces = document.querySelectorAll(".navbar .nav-link");
  var margenActivo = 0;
  var actualizacionPendiente = false;

  function actualizarAlturaNavbar() {
    var altura = navbar.offsetHeight;
    document.documentElement.style.setProperty(
      "--navbar-height",
      altura + "px"
    );
    margenActivo = altura + 40;
  }

  function actualizarEstadoScroll() {
    navbar.classList.toggle("scroll", window.scrollY > 20);
  }

  function actualizarEnlaceActivo() {
    if (!secciones.length || !enlaces.length) return;

    var margen = margenActivo;
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
    if (actualizacionPendiente) return;

    actualizacionPendiente = true;
    window.requestAnimationFrame(function () {
      actualizarEstadoScroll();
      actualizarEnlaceActivo();
      actualizacionPendiente = false;
    });
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
