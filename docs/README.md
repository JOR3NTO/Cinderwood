# Docs

Coloca aquí los archivos para descargas públicas del EPK:

- Rider técnico: `Rider_Tecnico_Cinderwood.pdf`
- EPK (dossier de prensa): `epk-cinderwood.pdf`

## Press kits por canción

Para cada canción, agrega su propio press kit en PDF dentro de `docs/songs/` siguiendo esta convención de nombres:

- `pure-in-deep-press-kit.pdf`
- `until-the-last-one-goes-press-kit.pdf`
- `...`

Luego enlázalos desde la sección Música usando el atributo `data-pdf` en el botón con clase `presskit-download`. Ejemplo ya implementado para “Pure in Deep”. Si el archivo no existe, el botón se deshabilita automáticamente.

Recomendaciones para ambos:
- Dimensiones: A4 (vertical), tipografías legibles y alto contraste.
- Contenidos sugeridos en el EPK: bio corta y larga, press quotes, fotos en alta, links a streaming y redes, contactos de booking/management.
- Exporta el PDF con texto seleccionable (no solo imagen) para accesibilidad y SEO.

Notas:
- Si un archivo no está presente, el botón de descarga se deshabilitará automáticamente en la web.