# Murdock Legacy — Family Reunion Website

This is a **no-monthly-fee** static website you can host on **GitHub Pages** and connect to your **Bluehost domain**.

## Pages
- `index.html` — Home with **next reunion details** (driven by `data/reunion.json`).
- `photos.html` — **Last reunion photos** (driven by `data/photos.json`).
- `history.html` — **History page** with embedded **YouTube** videos (`data/videos.json`) and space for records/links.

## Quick start
1. Upload this folder to your GitHub repo (e.g., `andremurdock/MurdockLegacy`), then enable **GitHub Pages** in **Settings → Pages** (deploy from `main`, root).
2. Edit `data/reunion.json` with the real date/time/location, RSVP link, and optional ISO timestamps to auto-generate the `.ics` calendar file on the Home page.
3. Add your **photos** into `images/last-reunion/` and update `data/photos.json` with filenames + captions.
4. Add **YouTube IDs** to `data/videos.json` for the History page. (ID = the part after `v=` in a YouTube URL.)

## Structure
```
/
├─ index.html
├─ photos.html
├─ history.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ app.js
├─ data/
│  ├─ reunion.json     # Home page details; controls RSVP button & ICS download
│  ├─ photos.json      # Last reunion gallery (list of images with captions)
│  └─ videos.json      # YouTube embeds for History page
└─ images/
   ├─ favicon.svg
   ├─ logo.svg
   └─ last-reunion/    # Put your JPG/PNG images here
```

## Connect your **Bluehost domain** to GitHub Pages (least cost)
1) In GitHub → **Settings → Pages** → set **Custom domain** to your domain (e.g., `www.murdocklegacy.com`) and save.  
2) In **Bluehost DNS**:
   - Apex (`murdocklegacy.com`) → add **A** records to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` → **CNAME** to `andremurdock.github.io` (replace with your GitHub username).
3) Return to GitHub Pages and **Enforce HTTPS** once DNS is detected.

> When you save the custom domain, GitHub creates a `CNAME` file automatically. If not, create a plain text file named `CNAME` at the repo root with just your domain inside (e.g., `www.murdocklegacy.com`).

## Tips
- **Photos**: Keep images under ~2–3 MB each for fast loads (1200–2000px wide is usually enough).  
- **Accessibility**: Update each photo’s `"alt"` text in `photos.json`.  
- **Branding**: Replace `images/logo.svg` and `images/favicon.svg` with your own artwork.  
- **Staging**: Use a `staging` branch or a `docs/` folder if you want to preview changes separately.

Have fun! 🎉
