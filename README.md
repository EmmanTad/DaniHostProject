# Dani Dingcong — TV & Event Host (portfolio website)

A static, no-build website. Open `index.html` in a browser, or upload the whole folder to any web host (Netlify, GitHub Pages, Wix-free hosting, cPanel, etc.).

## Structure

```
index.html              page content (all sections)
css/style.css           all styling, theme colors, animations
js/tailwind-config.js   Tailwind CDN config + custom animations
js/main.js              interactions (scroll effects, typewriter, filters, 3D scene)
assets/images/
  portrait.jpg          hero portrait
  stage-host.jpg        About section photo
```

An internet connection is needed for the Google Fonts and the Tailwind CDN script.

## Common edits

| What | Where |
|------|-------|
| Colors / theme | top of `css/style.css` (`:root` variables). Add `data-theme="light"` on `<html>` for the light variant |
| Hero text, bio, services, FAQ | `index.html` (search the section name, e.g. `id="about"`) |
| Stats (10+, 500+ ...) | `index.html`, `.stat b` with `data-count` |
| Replace portraits | overwrite the files in `assets/images/` (keep the names) |
| Experience timeline | `index.html`, section `id="experience"` |
| Client logos | `index.html`, six `.pc` cards inside `.stage` (replace the "Logo" text with `<img>` tags) |
| Scene backdrop photo | `.p-bg` in `css/style.css`, add `background-image:url(...)` |
| Portfolio photos | each `.tile` in `index.html`: add `style="background-image:url(assets/images/your.jpg)"` to its `.kb` div. Change `data-cat` for the category, `--kb` for the camera move (`kb-in`, `kb-out`, `kb-panl`, `kb-panr`, `kb-up`) and `--dur` for the speed |
| Contact email | `index.html`, the `mailto:` form action and the email link (currently `hello@example.com`) |
| Typewriter speed | `js/main.js`, the `sleep(120)` (typing) and `sleep(55)` (erasing) values |

Placeholder text (testimonials, FAQ answers, stats, email, client logos, portfolio titles) is meant to be replaced.
