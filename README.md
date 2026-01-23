# MirrorFlow Landing Page

Landing page oficial de MirrorFlow - Replicador de Trades para NinjaTrader 8, cTrader y MetaTrader 5.

## 🌐 URL de Producción

- **Español:** https://mirrorflow.app/
- **English:** https://mirrorflow.app/en/

## 🛠️ Tecnologías

- **Framework:** Astro con Starlight
- **Estilos:** Tailwind CSS
- **Hosting:** Vercel (con deploy automático desde GitHub)
- **Dominio:** mirrorflow.app

## 📁 Estructura del Proyecto

```
mirrorflow-deploy/
├── public/              # Assets estáticos (favicon, og-image, etc.)
├── src/
│   ├── assets/          # Imágenes del sitio
│   ├── components/      # Componentes Astro
│   │   ├── override-components/  # Componentes principales (Head, Hero, Footer)
│   │   └── user-components/      # Componentes reutilizables (Cards, Grid)
│   ├── config/          # Configuración del sitio
│   │   ├── config.json  # Configuración general
│   │   ├── locals.json  # Idiomas (ES/EN)
│   │   ├── social.json  # Redes sociales
│   │   └── theme.json   # Colores y tipografía
│   ├── content/
│   │   ├── docs/        # Páginas principales (index.mdx, privacy, terms)
│   │   └── sections/    # Secciones (call-to-action)
│   └── styles/          # CSS global
├── astro.config.mjs     # Configuración de Astro
└── package.json
```

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo local (http://localhost:4321)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🔄 Deployment

El deployment es **automático** al hacer push a la rama `master`:

1. Push a GitHub → `git push origin master`
2. Vercel detecta cambios
3. Build automático
4. Deploy a producción (~30 segundos)

## 📊 SEO

- **Sitemap:** https://mirrorflow.app/sitemap-index.xml
- **Rich Results:** Schema.org para SoftwareApplication, FAQPage, HowTo, VideoObject
- **Open Graph:** Imagen 1200x630 para compartir en redes sociales
- **Idiomas:** hreflang configurado para ES (default) y EN

## 📞 Contacto

- **WhatsApp:** +57 314 743 8447
- **Email:** contacto@mirrorflow.app
