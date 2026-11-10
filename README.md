# Rojas & Cisneros Abogados — landing

Sitio estático (HTML/CSS/JS), sin build.

## Publicar en GitHub Pages
1. Crea un repositorio y sube todo el contenido de esta carpeta a la rama `main`.
2. En Settings > Pages elige **Source: GitHub Actions**. Cada push se publica solo.
3. Reemplaza `TU-USUARIO/TU-REPO` en `robots.txt` y `sitemap.xml`.

## Datos pendientes (`assets/js/config.js`)
Nombre comercial, razón social, RUC, correo, WhatsApp. Mientras sean `null`, el sitio lo indica y no simula nada.

## Funciones que requieren servicio externo
- **Formulario de contacto**: pon un endpoint (Formspree, Web3Forms, Apps Script) en `formEndpoint`. Sin él, no envía y lo avisa.
- **Libro de Reclamaciones**: necesita `reclamosEndpoint` con almacenamiento real y gestión interna. Hasta entonces no es un canal legal habilitado.
- **Calendario**: demostración visual; integrar Google Calendar o Calendly para citas reales.
- **Profesionales**: fichas reservadas; completar con datos verificados.
- **Textos legales**: borradores a validar por el estudio (Ley 29733, D.S. 016-2024-JUS, Ley 29571).
