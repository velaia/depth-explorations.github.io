# In Depth View of the World

Published on the [tfc.ai website](https://www.tfc.ai/depth-explorations.github.io/).

## Creating web-optimized images

[WebP Codec](https://developers.google.com/speed/webp/docs/using) used to prepare the images for the web.

`for file in *.jpg; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done`

# TODO
* [x] Depth Anything V2
* [ ] Document usage, e.g. image-map generation, webp image creation (squoosh?)
* [ ] link back to main page from videos + images
* [x] ~~Prepare so anyone can fork the repository or from a template with their own dependencies~~
* [x] ~~write down dependencies~~
* [x] Make sure it runs in simple HTTP server before publishing
* [x] link YouTube video


