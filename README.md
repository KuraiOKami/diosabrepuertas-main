# Mami, abrázame — Preventa

Sitio de preventa de libro para **Jennifer Robles**.

## Stack

- **Hosting:** Netlify (free tier)
- **Forms:** Netlify Forms (submissions stored in Netlify dashboard)
- **Payments:** PayPal
- **Domain:** Custom domain (configure in Netlify)

## Setup rápido

1. Conecta este repo a Netlify (New site from Git → select this repo → branch: main)
2. Netlify detecta automáticamente el `netlify.toml`
3. Sube la imagen de promo a `assets/promo.jpg`
4. Reemplaza `TUUSUARIO` en `index.html` con el link de PayPal real
5. Cambia la contraseña del admin en `admin.html` (variable `ADMIN_PASSWORD`)
6. Conecta tu dominio en Netlify → Domain settings

## URLs

| URL | Descripción |
|-----|-------------|
| `/` | Landing page de preventa |
| `/admin` | Panel de pedidos (protegido con contraseña) |

## Netlify Forms

Las reservas del formulario se almacenan automáticamente en el **dashboard de Netlify** bajo Forms → preventa.
El panel de admin en `/admin` muestra actualmente datos de demo — para conectarlo a las reservas reales usa la [Netlify Forms API](https://docs.netlify.com/api/get-started/#form-submissions) con un access token.

## Imagen de promo

Sube el archivo de imagen de la preventa como `assets/promo.jpg`. Si usas otro nombre, actualiza el `src` del `<img>` en `index.html`.
