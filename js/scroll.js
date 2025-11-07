const btnArriba = document.querySelector(".arriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnArriba.classList.add("visible");
  } else {
    btnArriba.classList.remove("visible");
  }
});

btnArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
