# Dulce Bueno — Landing page de repostería artesanal

Landing page estática, responsive y accesible para **Dulce Bueno**, una repostería artesanal. Presenta el catálogo de productos, la historia del negocio, testimonios, un formulario de contacto, datos estructurados para buscadores, analítica con consentimiento y animaciones con GSAP.

> **Estado:** sitio funcional, pendiente de sustituir los datos de ejemplo (contacto, precios, testimonios, dominio y analítica) antes de publicarse.

---

## Índice

1. [Características](#1-características)
2. [Tecnologías](#2-tecnologías)
3. [Estructura del proyecto](#3-estructura-del-proyecto)
4. [Secciones de la página](#4-secciones-de-la-página)
5. [Puesta en marcha](#5-puesta-en-marcha)
6. [Configuración](#6-configuración)
7. [Personalización](#7-personalización)
8. [Despliegue](#8-despliegue)
9. [Rendimiento y calidad](#9-rendimiento-y-calidad)
10. [Accesibilidad](#10-accesibilidad)
11. [SEO](#11-seo)
12. [Analítica y privacidad](#12-analítica-y-privacidad)
13. [PWA](#13-pwa)
14. [Pruebas realizadas](#14-pruebas-realizadas)
15. [Mantenimiento y pendientes](#15-mantenimiento-y-pendientes)
16. [Solución de problemas](#16-solución-de-problemas)
17. [Créditos y licencias](#17-créditos-y-licencias)

---

## 1. Características

- **Diseño responsive** con CSS Grid, Flexbox y tipografía fluida (`clamp()`).
- **Catálogo de 11 productos** organizados en 3 categorías: pasteles, jugos naturales y café.
- **Navegación fija** con scrollspy, menú colapsable en móvil y enlace de salto al contenido.
- **Formulario de contacto accesible**: validación en tiempo real, mensajes con `role="alert"`, estado con `aria-live` y foco automático en el primer campo inválido.
- **Animaciones con GSAP + ScrollTrigger**: entrada del hero, revelado de secciones y tarjetas, parallax y fondo animado.
- **Fondo decorativo animado** con degradados suaves y movimiento continuo.
- **Respeto por `prefers-reduced-motion`**: si el usuario desactiva las animaciones, el contenido se muestra estático y visible.
- **SEO técnico**: metadatos, Open Graph, Twitter Cards, `robots.txt`, manifest y datos estructurados JSON-LD (`Bakery` + `Menu`).
- **Analítica opcional con consentimiento**: Google Analytics 4 solo se carga si hay un ID configurado y el usuario acepta. Consent Mode v2 y anonimización de IP.
- **Rendimiento**: imágenes locales con `srcset`/`sizes`, precarga del hero, compresión y caché vía Apache.
- **PWA básica**: manifest, iconos normales/maskable, `apple-touch-icon` y atajos.
- **Cabeceras de seguridad** en `.htaccess` (CSP preparada pero comentada).

---

## 2. Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura, metadatos y datos estructurados |
| CSS3 | Variables, Grid, Flexbox, `clamp()`, media queries |
| JavaScript (vanilla) | Navegación, formulario, analítica y animaciones |
| [Bootstrap 5.2.3](https://getbootstrap.com/) | Navbar, contenedor y colapso del menú (CSS + JS por CDN) |
| [GSAP 3.13.0](https://gsap.com/) | Animaciones y ScrollTrigger (servidos localmente) |
| Apache `.htaccess` | Compresión, caché y cabeceras de seguridad |
| Google Analytics 4 | Analítica opcional, desactivada por defecto |

No hay proceso de build ni dependencias de Node para ejecutar el sitio: es HTML, CSS y JavaScript estáticos.

---

## 3. Estructura del proyecto

```text
Proyecto-dulce-bueno/
├── index.html                  # Página única con todas las secciones
├── README.md                   # Este documento
├── .htaccess                   # Compresión, caché y seguridad (Apache)
├── robots.txt                  # Reglas para rastreadores
├── site.webmanifest            # Manifest de la aplicación web
├── favicon.svg                 # Icono vectorial de marca
├── favicon-32.png              # Favicon 32×32
├── favicon-192.png             # Icono 192×192
├── favicon-512.png             # Icono 512×512
├── favicon-maskable-512.png    # Icono maskable 512×512
├── apple-touch-icon.png        # Icono para iOS (180×180)
├── css/
│   ├── site.css                # Sistema de diseño, secciones, formulario, footer, fondo
│   ├── navegacion-scroll.css   # Navbar y navegación
│   └── card.css                # Catálogo y tarjetas de producto
├── js/
│   ├── navegacion-scroll.js    # Scrollspy y altura del navbar
│   ├── scroll.js               # Botón "volver arriba"
│   ├── animaciones.js          # Animaciones GSAP y fondo animado
│   ├── analytics.js            # GA4 con consentimiento
│   ├── form.js                 # Validación y envío del formulario
│   ├── swiper.js               # Legado sin uso (no se carga)
│   └── vendor/
│       ├── gsap.min.js         # GSAP 3.13.0 (local)
│       └── ScrollTrigger.min.js # ScrollTrigger 3.13.0 (local)
└── images/
    ├── hero-pastel-800.jpg
    ├── hero-pastel-1200.jpg
    ├── postres-artesanales-800.jpg
    ├── postres-artesanales-1200.jpg
    ├── pastel-*-400.jpg / *-800.jpg
    ├── jugo-*-400.jpg / *-800.jpg
    └── cafe-*-400.jpg / *-800.jpg
```

> `js/swiper.js` y las imágenes `img2.jpg`, `pexels-trammese-2155968833-34438212.jpg` y `reposteria_banner1.jpg` no se usan actualmente. Se pueden eliminar.

---

## 4. Secciones de la página

| Sección | ID | Contenido |
|---|---|---|
| Inicio / Hero | `#inicio` | Titular, descripción, CTA, ventajas e imagen principal |
| Sobre nosotros | `#about` | Historia, valores y lista de ventajas |
| Productos | `#productos` | Pasteles (4), jugos naturales (4) y café (3) |
| Testimonios | `#testimonios` | 3 reseñas de ejemplo |
| Contacto | `#contacto` | Información general y formulario |
| Footer | — | Marca, navegación, copyright y configuración de cookies |

Los precios (`$18`, `$22`, `$25`, `$19`) y los testimonios son **datos de ejemplo**. Deben sustituirse por los reales.

---

## 5. Puesta en marcha

### Opción A: WAMP (recomendada en Windows)

1. Copia la carpeta del proyecto en `C:\wamp64\www\Proyecto-dulce-bueno`.
2. Inicia el servicio **Apache** (`wampapache64`).
3. Abre `http://localhost/Proyecto-dulce-bueno/`.

### Opción B: servidor estático

```bash
# Node.js
npx --yes serve .

# Python
python -m http.server 8080
```

Luego abre `http://localhost:8080/`.

### Opción C: abrir `index.html` directamente

No se recomienda. Bajo `file://` el navegador bloquea la carga del manifest por CORS y algunas funciones pueden comportarse distinto. Usa siempre un servidor HTTP.

---

## 6. Configuración

### 6.1 Datos de contacto y NAP

La sección `#contacto` y el JSON-LD **no incluyen todavía** dirección, teléfono, correo, horario ni redes sociales reales. Para completarlos:

1. Añade los datos visibles en `#contacto` dentro de `index.html`.
2. Completa el objeto `Bakery` del JSON-LD con:

```json
{
  "@type": "Bakery",
  "name": "Dulce Bueno",
  "url": "https://tu-dominio.com/",
  "telephone": "+00 000 000 000",
  "email": "correo@tu-dominio.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle y número",
    "addressLocality": "Ciudad",
    "postalCode": "00000",
    "addressCountry": "ES"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/...",
    "https://www.facebook.com/..."
  ]
}
```

> No publiques datos inventados: el SEO local (Google Business Profile, JSON-LD y NAP) debe coincidir exactamente con la información real del negocio.

### 6.2 Dominio y SEO

Cuando el sitio tenga dominio público:

1. Descomenta y completa en `<head>` de `index.html`:

```html
<link rel="canonical" href="https://tu-dominio.com/" />
<meta property="og:url" content="https://tu-dominio.com/" />
```

2. Crea `sitemap.xml` en la raíz con la URL pública.
3. Añade la línea del sitemap en `robots.txt`:

```text
Sitemap: https://tu-dominio.com/sitemap.xml
```

4. Sustituye la imagen de Open Graph, Twitter y JSON-LD (hoy apunta a Pexels) por una URL absoluta a una imagen local, por ejemplo:

```html
<meta property="og:image" content="https://tu-dominio.com/images/hero-pastel-1200.jpg" />
```

La imagen social recomendada es de **1200×630 px**.

### 6.3 Analítica GA4

Archivo: `js/analytics.js`.

```js
var GA_MEASUREMENT_ID = ""; // ← pon aquí tu ID, por ejemplo "G-XXXXXXXXXX"
```

Comportamiento:

- **Sin ID:** no se carga analítica, no se muestra el banner y no se registra ningún evento.
- **Con ID:** se muestra el banner de consentimiento, se guarda la elección en `localStorage` y solo se carga GA4 si el usuario acepta.

Clave de almacenamiento:

```text
dulcebueno-analytics-consent
```

Para volver a probar el banner desde la consola del navegador:

```js
localStorage.removeItem("dulcebueno-analytics-consent");
location.reload();
```

Eventos enviados:

| Evento | Cuándo se envía |
|---|---|
| `generate_lead` | Al completar un envío válido del formulario |
| `select_content` | Al hacer clic en un CTA de producto o de contacto |

También se emite el evento de DOM `dulcebueno:lead` desde `js/form.js`; puedes escucharlo para integrar otro sistema:

```js
document.addEventListener("dulcebueno:lead", function (event) {
  console.log(event.detail); // { form: "contacto" }
});
```

### 6.4 Formulario

Archivo: `js/form.js`.

```js
var FORM_ENDPOINT = ""; // ← URL de Formspree, backend propio, etc.
```

- **Vacío:** el envío es simulado. Muestra un mensaje de éxito, limpia el formulario y emite `dulcebueno:lead`.
- **Configurado:** hace `POST` con `FormData` al endpoint y muestra éxito o error según la respuesta.

Campos y validación:

| Campo | Regla |
|---|---|
| `name` | Obligatorio, mínimo 2 caracteres |
| `email` | Obligatorio, formato de correo válido |
| `message` | Obligatorio, mínimo 10 caracteres |

Si usas un servicio externo, revisa que acepte `multipart/form-data` y que su CORS permita tu dominio.

### 6.5 Content Security Policy (CSP)

La CSP está **comentada** en `.htaccess` para no bloquear recursos hasta definir dominio, endpoint y analítica. Al activarla, ajusta:

- `script-src`: `'self'`, `'unsafe-inline'` (script inline del año), `https://cdn.jsdelivr.net`, `https://www.googletagmanager.com`.
- `connect-src`: `'self'`, `https://www.google-analytics.com`, `https://region1.google-analytics.com` y el dominio del endpoint del formulario.
- `img-src`: `'self'` y `data:` (elimina Pexels cuando la imagen OG sea local).
- `form-action`: `'self'` y el dominio del endpoint.

Mejora opcional: mover el script inline que escribe el año a un archivo JS permitiría quitar `'unsafe-inline'` de `script-src`.

### 6.6 Imágenes y contenido

- Las imágenes de producto están en `images/` en dos tamaños: **400w** y **800w**.
- Hero y "Sobre nosotros" tienen versiones de **800w** y **1200w**.
- Mantén `width`, `height`, `srcset` y `sizes` para evitar saltos de layout (CLS).
- Las fotos actuales son **de ejemplo (Pexels)**. Sustitúyelas por fotos reales de los productos y conserva los nombres o actualiza las rutas en `index.html`.

---

## 7. Personalización

### 7.1 Colores y tipografía

Los tokens están en `css/site.css`, dentro de `:root`:

| Variable | Valor | Uso |
|---|---|---|
| `--color-bg` | `#fdf8f2` | Fondo base |
| `--color-bg-alt` | `#fffaf4` | Fondo alterno |
| `--color-surface` | `#ffffff` | Tarjetas y superficies |
| `--color-primary` | `#7a3f1d` | Color de marca |
| `--color-primary-dark` | `#5a2c12` | Títulos y footer |
| `--color-primary-light` | `#9a5529` | Hover |
| `--color-accent` | `#c97b3d` | Acentos |
| `--color-accent-soft` | `#f6e3cf` | Fondos suaves |
| `--color-text` | `#2d211b` | Texto principal |
| `--color-muted` | `#6b574a` | Texto secundario |
| `--color-border` | `#ecd9c5` | Bordes |
| `--font-display` | Georgia, serif | Títulos |
| `--font-body` | Segoe UI, system-ui | Texto |

Cambiar estos valores actualiza todo el sitio de forma coherente.

### 7.2 Animaciones

Archivo: `js/animaciones.js`.

- **Entrada del hero:** timeline sobre `.hero__content > *` y `.hero__badge`.
- **Revelado al scroll:** función `revelar()` aplicada a encabezados, secciones, tarjetas, testimonios y footer.
- **Fondo animado:** los `.fondo-decor__blob` se mueven con `xPercent`/`yPercent` en bucle.
- **Parallax:** imagen de `.about__media` y desplazamiento del fondo.
- **Modo reducido:** si `prefers-reduced-motion: reduce`, el script no se ejecuta.

Para ajustar la intensidad del fondo, modifica en `js/animaciones.js`:

```js
xPercent: gsap.utils.random(-14, 14),
yPercent: gsap.utils.random(-12, 12),
duration: gsap.utils.random(16, 26),
```

Para cambiar colores o tamaños de los blobs, edita `.fondo-decor__blob--1`, `--2` y `--3` en `css/site.css`.

Para desactivar todas las animaciones, elimina o comenta los tres scripts de animación al final de `index.html`:

```html
<script src="js/vendor/gsap.min.js" defer fetchpriority="low"></script>
<script src="js/vendor/ScrollTrigger.min.js" defer fetchpriority="low"></script>
<script src="js/animaciones.js" defer></script>
```

### 7.3 Añadir un producto

1. Copia un bloque `<article class="product-card">` dentro de la categoría correspondiente en `#productos`.
2. Actualiza título, descripción, precio, `alt`, `src`, `srcset` y `sizes`.
3. Añade las imágenes en `images/` en 400w y 800w.
4. Actualiza el contador `.category__count`.
5. Añade el ítem al `Menu` del JSON-LD en `<head>`.

### 7.4 Testimonios reales

Sustituye las tres `<figure class="testimonial">` de `#testimonios` y elimina el comentario:

```html
<!-- NOTA: reseñas de ejemplo. Reemplazar por opiniones reales de clientes. -->
```

Usa reseñas reales y, preferiblemente, con permiso de las personas.

---

## 8. Despliegue

### 8.1 Rutas relativas

El sitio está preparado para desplegarse en una **subcarpeta** (por ejemplo, `https://dominio.com/dulce-bueno/`). Todas las rutas de CSS, JS e imágenes son relativas. No las cambies por rutas absolutas.

### 8.2 Apache

Sube **todos** los archivos, incluido `.htaccess` (es un archivo oculto). El servidor debe tener activos estos módulos:

- `mod_deflate` → compresión
- `mod_expires` → caché
- `mod_headers` → cabeceras de seguridad
- `mod_autoindex` → bloqueo de listados

### 8.3 Caché y actualizaciones

`.htaccess` configura caché de **1 mes** para CSS/JS y **6 meses** para imágenes. Si actualizas un archivo y no ves los cambios:

- Fuerza la recarga con `Ctrl + F5`.
- O cambia el nombre del archivo / añade un parámetro de versión, por ejemplo `css/site.css?v=2`.

### 8.4 Checklist de publicación

- [ ] Dominio y HTTPS configurados.
- [ ] `canonical` y `og:url` añadidos.
- [ ] `sitemap.xml` creado y enlazado en `robots.txt`.
- [ ] Imagen OG local absoluta (1200×630).
- [ ] Datos NAP reales en la sección de contacto y en el JSON-LD.
- [ ] Precios, testimonios y fotos reales.
- [ ] `GA_MEASUREMENT_ID` configurado (si se usa analítica).
- [ ] `FORM_ENDPOINT` configurado y probado.
- [ ] CSP activada y ajustada.
- [ ] Archivos sin uso eliminados (`js/swiper.js` e imágenes legado).
- [ ] Revisión final en móvil, tablet y escritorio.

---

## 9. Rendimiento y calidad

Última medición con Lighthouse (móvil simulado, servidor local):

| Categoría | Puntuación |
|---|---|
| Performance | 92 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Métricas principales:

| Métrica | Valor |
|---|---|
| FCP | ~2.0 s |
| LCP | ~3.0 s (simulado) |
| CLS | 0 |
| TBT | 0 ms |
| Speed Index | ~3.0 s |

> El LCP real medido en escritorio sin throttling fue de **~556 ms**. Los valores de Lighthouse varían entre ejecuciones por la simulación de red y CPU.

Optimizaciones aplicadas:

- Imágenes locales (sin peticiones a Pexels en la página).
- `srcset`/`sizes` y dimensiones explícitas.
- Precarga del hero con `fetchpriority="high"`.
- GSAP y ScrollTrigger con `defer` y `fetchpriority="low"`.
- Scrollspy con `requestAnimationFrame` y margen cacheado.
- Compresión y caché con `.htaccess`.
- La imagen del hero (elemento LCP) no se anima para no retrasar la carga.

---

## 10. Accesibilidad

- Enlace **"Saltar al contenido principal"**.
- Landmarks semánticos: `header`, `nav`, `main`, `section`, `footer`.
- Navegación con `aria-current="location"` en el enlace activo.
- Formulario con `<label>`, `aria-describedby`, `aria-invalid`, `role="alert"` y `aria-live`.
- Foco visible en enlaces, botones y campos.
- Contraste de color revisado (Lighthouse Accessibility 100).
- Textos `alt` descriptivos en las imágenes.
- Respeto por `prefers-reduced-motion`.
- Menú y formulario operables con teclado.

---

## 11. SEO

Implementado:

- `<title>` y `meta description`.
- `meta robots`, `author`, `application-name`.
- Open Graph y Twitter Cards con dimensiones y texto alternativo.
- JSON-LD en formato `@graph`:
  - `Bakery` (negocio).
  - `Menu` con 3 secciones y 11 ítems.
- `robots.txt`.
- Manifest e iconos.
- Jerarquía de encabezados (`h1` → `h2` → `h3` → `h4`).
- URLs relativas y contenido indexable.

Pendiente:

- `canonical` y `og:url`.
- `sitemap.xml`.
- NAP local (`address`, `telephone`, `openingHours`, `sameAs`, `url`).
- Imagen OG absoluta local.

---

## 12. Analítica y privacidad

- GA4 **desactivado por defecto** (`GA_MEASUREMENT_ID = ""`).
- Sin ID no se muestra banner ni se carga ningún script de Google.
- Con ID:
  - Banner con opciones **Aceptar** y **Rechazar**.
  - La elección se guarda en `localStorage`.
  - Botón **"Configuración de cookies"** en el footer para cambiar la decisión.
  - Consent Mode v2: publicidad denegada, solo analítica agregada.
  - `anonymize_ip: true`.
- No se usan cookies de terceros para imágenes (las fotos son locales).
- En la carga normal, el único recurso de terceros es Bootstrap (`cdn.jsdelivr.net`). Si se activa GA4, también se carga Google Analytics tras el consentimiento.

---

## 13. PWA

Incluido:

- `site.webmanifest` con nombre, colores, `start_url`, `scope` y `display: standalone`.
- Iconos 192, 512, maskable y SVG.
- `apple-touch-icon`.
- Atajos a `#productos` y `#contacto`.
- Metadatos `apple-mobile-web-app-*`.

Pendiente para una PWA completa:

- **Service worker** con estrategia de caché para funcionamiento offline.
- Página de fallback offline (opcional).

Sin service worker, el sitio no debe considerarse una PWA offline completa.

---

## 14. Pruebas realizadas

- Lighthouse: Performance 92 / Accessibility 100 / Best Practices 100 / SEO 100.
- 13/13 imágenes cargan correctamente en local.
- 0 peticiones a `images.pexels.com` durante la carga de la página.
- Flujo de consentimiento probado: rechazar → recargar → reabrir ajustes → aceptar.
- Eventos `generate_lead` y `select_content` verificados.
- Formulario: validación, foco en el primer error, mensaje de éxito y evento `dulcebueno:lead`.
- Scrollspy y `aria-current` verificados.
- Sin errores de consola ni excepciones.
- Sin overflow horizontal a 1280 px ni 390 px.
- Animaciones verificadas y desactivadas correctamente con `prefers-reduced-motion`.

Para repetir la auditoría:

```bash
npx --yes lighthouse http://localhost/Proyecto-dulce-bueno/ --view
```

---

## 15. Mantenimiento y pendientes

### Datos que debes proporcionar

- [ ] Dirección del negocio.
- [ ] Teléfono y/o WhatsApp.
- [ ] Correo electrónico de contacto.
- [ ] Horario de atención.
- [ ] Redes sociales.
- [ ] Dominio público.
- [ ] ID de GA4 (si se usará analítica).
- [ ] Endpoint del formulario.
- [ ] Testimonios reales.
- [ ] Fotos y precios definitivos.

### Tareas técnicas pendientes

- [ ] Añadir `canonical`, `og:url` y `sitemap.xml`.
- [ ] Completar el JSON-LD con datos NAP.
- [ ] Activar y ajustar la CSP.
- [ ] Configurar GA4 y el endpoint del formulario.
- [ ] Eliminar `js/swiper.js` y las imágenes sin uso.
- [ ] Añadir un `.gitignore` para `.DS_Store` y archivos temporales.
- [ ] Valorar un service worker si se quiere PWA offline.

---

## 16. Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| El manifest da error | Se abrió con `file://` | Usa un servidor HTTP local |
| No aparecen las animaciones | GSAP no cargó o `prefers-reduced-motion` activo | Revisa `js/vendor/` y la preferencia del sistema |
| No aparece el banner de cookies | `GA_MEASUREMENT_ID` vacío | Configura el ID en `js/analytics.js` |
| El formulario no envía de verdad | `FORM_ENDPOINT` vacío | Configura el endpoint en `js/form.js` |
| Los cambios no se ven | Caché del navegador o de Apache | `Ctrl + F5` o versiona el archivo |
| Las imágenes no cargan en la subcarpeta | Rutas absolutas | Usa rutas relativas |
| Apache no responde en WAMP | Servicio detenido | Inicia `wampapache64` |

---

## 17. Créditos y licencias

- **Bootstrap 5.2.3** — licencia MIT.
- **GSAP 3.13.0 y ScrollTrigger** — según la licencia de GSAP.
- **Fotografías actuales** — de ejemplo, procedentes de Pexels; deben sustituirse por fotos reales del negocio.
- **Iconos y favicons** — generados para este proyecto.
- **Marca y contenido** — propiedad de Dulce Bueno.

Repositorio: [github.com/N4than13L/Proyecto-dulce-bueno](https://github.com/N4than13L/Proyecto-dulce-bueno)

---

Si vas a publicar el sitio, revisa primero la sección [Mantenimiento y pendientes](#15-mantenimiento-y-pendientes): la web está preparada técnicamente, pero necesita los datos reales del negocio para considerarse terminada.
