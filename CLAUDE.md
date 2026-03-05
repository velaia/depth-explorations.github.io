# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static website showcasing AI-generated depth maps from travel photos (Malaysia, Thailand, Bangkok). Published at [tfc.ai](https://www.tfc.ai). No build system, no dependencies — pure HTML/CSS/JS served from a simple HTTP server.

## Development

To preview the site locally, serve it with any static HTTP server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

The site must be served over HTTP (not opened as `file://`) because `script4.js` and `script5.js` use `fetch()` to load the image-map JSON files.

## Architecture

### Pages
- `index.html` — Landing page with four section cards (inline styles only, no external CSS)
- `depth_slideshow.html` — Depth Anything v1 image slideshow, uses `script4.js` + `styles4.css`
- `depth_slideshow_v2.html` — Depth Anything v2 image slideshow, uses `script5.js` + `styles4.css`
- `depth_videos.html` — YouTube video embeds page
- `observations.html` — Text observations page

### Slideshow Logic
Both slideshows work identically: they load an image-map JSON on startup, display depth maps by default, and toggle to the original photo on click/spacebar. Navigation is via arrow keys or prev/next buttons.

- `script4.js` fetches `image-map.json` — pairs of `[depth_webp, original_webp]` stored flat in `images/`
- `script5.js` fetches `image-map-v2.json` — pairs of `[v2/depth/filename.webp, v2/img/filename.webp]` stored in `images/v2/`
- `styles4.css` — shared CSS for the slideshow pages

### Image Maps
`image-map.json` and `image-map-v2.json` are flat JSON arrays of `[depthImageFilename, originalImageFilename]` pairs. Paths in the JSON are relative to the `images/` directory.

### Image Preparation
- Depth maps generated with [Depth Anything v2](https://github.com/DepthAnything/Depth-Anything-V2) using `run.py` / `run_video.py`
- Images converted to WebP: `for file in *.jpg; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done`
- Video audio transfer: `ffmpeg -y -i input_with_sound.mp4 -i depthmaps_video.mp4 -map 0:a -map 1:v:0 -c:v copy output.mp4`

## License

CC BY-NC 4.0 — content is not for commercial use.
