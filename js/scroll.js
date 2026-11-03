(function () {
  var btnArriba = document.querySelector(".arriba");
  if (!btnArriba) return;

  function actualizarBoton() {
    btnArriba.classList.toggle("visible", window.scrollY > 500);
  }

  actualizarBoton();
  window.addEventListener("scroll", actualizarBoton, { passive: true });

  btnArriba.addEventListener("click", function () {
    var prefiereMenosMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefiereMenosMovimiento ? "auto" : "smooth",
    });
  });
})();
