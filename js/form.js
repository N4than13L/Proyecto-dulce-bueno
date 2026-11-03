(function () {
  var form = document.getElementById("form");
  var status = document.getElementById("form-status");
  if (!form || !status) return;

  // Paso 3: definir aquí la URL del backend o servicio de envío (Formspree, etc.).
  var FORM_ENDPOINT = "";

  var campos = {
    name: {
      input: document.getElementById("name"),
      error: document.getElementById("name-error"),
      validar: function (valor) {
        if (!valor) return "Escribe tu nombre.";
        if (valor.length < 2) {
          return "El nombre debe tener al menos 2 caracteres.";
        }
        return "";
      },
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("email-error"),
      validar: function (valor) {
        if (!valor) return "Escribe tu correo electrónico.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          return "Escribe un correo válido, por ejemplo nombre@correo.com.";
        }
        return "";
      },
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("message-error"),
      validar: function (valor) {
        if (!valor) return "Escribe tu mensaje.";
        if (valor.length < 10) {
          return "Cuéntanos un poco más (mínimo 10 caracteres).";
        }
        return "";
      },
    },
  };

  function mostrarError(campo, mensaje) {
    if (!campo.input || !campo.error) return;

    campo.input.setAttribute("aria-invalid", "true");
    campo.input.closest(".form-field").classList.add("has-error");
    campo.error.textContent = mensaje;
    campo.error.classList.add("is-visible");
  }

  function limpiarError(campo) {
    if (!campo.input || !campo.error) return;

    campo.input.removeAttribute("aria-invalid");
    campo.input.closest(".form-field").classList.remove("has-error");
    campo.error.textContent = "";
    campo.error.classList.remove("is-visible");
  }

  function validarCampo(campo) {
    if (!campo.input) return true;

    var mensaje = campo.validar(campo.input.value.trim());

    if (mensaje) {
      mostrarError(campo, mensaje);
      return false;
    }

    limpiarError(campo);
    return true;
  }

  function limpiarTodosLosErrores() {
    Object.keys(campos).forEach(function (clave) {
      limpiarError(campos[clave]);
    });
  }

  function mostrarEstado(mensaje, tipo) {
    status.textContent = mensaje;
    status.classList.remove("is-success", "is-error");
    status.classList.add("is-visible", tipo);
  }

  function limpiarEstado() {
    status.textContent = "";
    status.classList.remove("is-visible", "is-success", "is-error");
  }

  function avisarEnvio() {
    document.dispatchEvent(
      new CustomEvent("dulcebueno:lead", { detail: { form: "contacto" } })
    );
  }

  Object.keys(campos).forEach(function (clave) {
    var campo = campos[clave];
    if (!campo.input) return;

    // Limpia el error en cuanto el usuario corrige el valor.
    campo.input.addEventListener("input", function () {
      if (campo.input.getAttribute("aria-invalid") === "true") {
        validarCampo(campo);
      }
    });

    // Valida al salir del campo para dar feedback temprano.
    campo.input.addEventListener("blur", function () {
      validarCampo(campo);
    });
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    limpiarEstado();

    var primerInvalido = null;

    Object.keys(campos).forEach(function (clave) {
      var campo = campos[clave];
      if (!validarCampo(campo) && !primerInvalido) {
        primerInvalido = campo.input;
      }
    });

    if (primerInvalido) {
      primerInvalido.focus();
      return;
    }

    var nombre = campos.name.input.value.trim();
    var boton = form.querySelector('button[type="submit"]');

    if (!FORM_ENDPOINT) {
      mostrarEstado(
        "¡Gracias, " +
          nombre +
          "! Tu mensaje se ha registrado correctamente. Te contactaremos pronto.",
        "is-success"
      );
      form.reset();
      limpiarTodosLosErrores();
      avisarEnvio();
      return;
    }

    try {
      if (boton) boton.disabled = true;
      form.setAttribute("aria-busy", "true");

      var respuesta = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo enviar el formulario");
      }

      mostrarEstado(
        "¡Gracias, " + nombre + "! Hemos recibido tu mensaje.",
        "is-success"
      );
      form.reset();
      limpiarTodosLosErrores();
      avisarEnvio();
    } catch (error) {
      mostrarEstado(
        "No pudimos enviar tu mensaje. Inténtalo de nuevo o contáctanos por teléfono.",
        "is-error"
      );
    } finally {
      if (boton) boton.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
})();
