# Cómo editar la landing de Praliné

Todo el contenido está en `script.js`. No hace falta tocar `index.html`.

| Quiero cambiar… | Dónde (en `script.js`) |
|---|---|
| Wi-Fi (red / clave), WhatsApp, Instagram, Facebook, dirección, Google Maps / reseñas | `CONFIG`, al inicio del archivo |
| Cualquier texto de la página (español e inglés) | `dict.es` y `dict.en`: cada clave existe en los dos idiomas |
| Horario | `HOURS`: un elemento por día, empezando en **domingo**. `[]` = cerrado. Cada turno es `['9:00', '13:30']` |
| Menú (platos, precios, categorías) | `MENU`. Cada plato: `[nombre, precio, descripción, favorito]` |

## El menú, en detalle

```js
[['Desayuno cazuela', 'Cazuela breakfast'], '7.50', ['Descripción ES', 'Description EN']],
['Croque madame', '7.75', ['…', '…'], 1],   // el 1 final añade el corazón de "favorito"
['Macchiato', '2.25'],                       // sin descripción
['Espresso', '2.00 · 2.50', ['Simple · doble', 'Single · double']], // dos precios
```

- Si el nombre se escribe igual en los dos idiomas, basta con un texto (`'Latte'`); si no, usa `['ES', 'EN']`.
- El precio va sin `$`; la página lo añade.
- Para una categoría nueva, copia un bloque `{ id: '…', t: ['ES', 'EN'], groups: [...] }` y ponle un `id` único sin espacios.

## Colores y tipografía

Están en las variables del principio de `styles.css` (`--rose`, `--cocoa`, `--cream`…). Si cambias uno ahí, cambia en toda la página.

## Imágenes

- Logo: `assets/logo-light.webp` (hero) y `assets/logo-dark.webp` (barra superior).
- Favicon e iconos de la app: `favicon.ico`, `apple-touch-icon.png`, `assets/favicon-32.png`, `assets/icon-192.png`, `assets/icon-512.png`.
- Imagen al compartir en WhatsApp o redes: `assets/og-image.jpg` (1200×630).
