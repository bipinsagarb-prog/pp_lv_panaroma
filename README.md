# Low Voltage Portfolio Panorama — Interactive Web Presentation

A single-page interactive presentation built with **pure HTML, CSS and vanilla JavaScript** (no frameworks), based on the Schneider Electric Low Voltage Portfolio deck.

## Structure
```
index.html   — slide shell: Title → Market Segments → PrismaSeT P 3200A dashboard
style.css    — design tokens, slide transitions, switchboard schematics, drawer
app.js       — slide navigation, Figma-style click-to-zoom, product data, breadcrumb
```

## Flow
1. **Title** — "Explore Portfolio" button → smooth transition to Segments.
2. **Segments** — ≤63A / ≤125A / ≤400A / ≤630A–≤3200A grid. The **PrismaSeT P** card is interactive → opens the dashboard.
3. **Dashboard** — three switchboard panels (Easy Non-connected · Optimum connected wireless · Optimum connected wired). Click any green hotspot → the stage zooms/translates to that component (CSS 3D transform), then a detail drawer slides in with the technical text and a breadcrumb trail (Segments › PrismaSeT P › Wired › MasterPacT MTZ). "Zoom Out / Back to Panels" or `Esc` resets the transform matrix.

All paths are **relative**, so the site works under `https://<username>.github.io/<repo-name>/` without changes. Below ~860px the three panels become a swipable, scroll-snap horizontal carousel.

## Deploy to GitHub Pages

```bash
# 1. From the project folder
cd lv-panorama

# 2. Initialize a local repository
git init
git add index.html style.css app.js README.md
git commit -m "Initial commit: interactive LV portfolio panorama"

# 3. Create the production branch GitHub Pages will serve
git branch -M main

# 4. Create the public repo on GitHub first (e.g. lv-panorama), then:
git remote add origin https://github.com/<your-username>/lv-panorama.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / root → Save.**
The site goes live within a minute at:

```
https://<your-username>.github.io/lv-panorama/
```

To update later:
```bash
git add -A
git commit -m "Describe your change"
git push
```
