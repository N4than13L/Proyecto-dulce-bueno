(function () {
  // Configura aquí el ID de medición de GA4 (por ejemplo "G-XXXXXXXXXX").
  // Si se deja vacío, no se carga analítica ni se muestra el banner de cookies.
  var GA_MEASUREMENT_ID = "";

  var banner = document.getElementById("cookie-banner");
  var acceptButton = document.getElementById("cookie-accept");
  var rejectButton = document.getElementById("cookie-reject");
  var settingsButton = document.getElementById("cookie-settings");

  var CONSENT_KEY = "dulcebueno-analytics-consent";
  var analyticsLoaded = false;

  function leerConsentimiento() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function guardarConsentimiento(valor) {
    try {
      window.localStorage.setItem(CONSENT_KEY, valor);
    } catch (error) {
      // Si el almacenamiento no está disponible, se mantiene la elección
      // únicamente durante esta visita.
    }
  }

  function mostrarBanner() {
    if (banner) banner.hidden = false;
  }

  function ocultarBanner() {
    if (banner) banner.hidden = true;
  }

  function cargarAnalitica() {
    if (analyticsLoaded || !GA_MEASUREMENT_ID) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Consent Mode v2: sin publicidad; solo analítica agregada.
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function track(evento, parametros) {
    if (!analyticsLoaded || typeof window.gtag !== "function") return;
    window.gtag("event", evento, parametros || {});
  }

  function aceptar() {
    guardarConsentimiento("granted");
    ocultarBanner();
    cargarAnalitica();
  }

  function rechazar() {
    guardarConsentimiento("denied");
    ocultarBanner();
  }

  // Sin ID configurado no se muestra nada ni se registra ningún evento.
  if (!GA_MEASUREMENT_ID) return;

  if (settingsButton) settingsButton.hidden = false;
  if (acceptButton) acceptButton.addEventListener("click", aceptar);
  if (rejectButton) rejectButton.addEventListener("click", rechazar);
  if (settingsButton) settingsButton.addEventListener("click", mostrarBanner);

  var consentimiento = leerConsentimiento();

  if (consentimiento === "granted") {
    cargarAnalitica();
  } else if (consentimiento !== "denied") {
    mostrarBanner();
  }

  // Evento enviado por form.js al completar un envío válido.
  document.addEventListener("dulcebueno:lead", function () {
    track("generate_lead", { form: "contacto" });
  });

  // Clics en los CTA de producto y en los CTA generales de contacto.
  document.addEventListener("click", function (event) {
    var enlace =
      event.target && event.target.closest
        ? event.target.closest('a[href="#contacto"]')
        : null;

    if (!enlace) return;

    var tarjeta = enlace.closest(".product-card");

    if (tarjeta) {
      var titulo = tarjeta.querySelector(".product-card__title");
      track("select_content", {
        content_type: "producto",
        item_id: titulo ? titulo.textContent.trim() : "producto",
      });
    } else {
      track("select_content", { content_type: "cta_contacto" });
    }
  });
})();
