# Deploy to GitHub Pages (static site)

This site is built as a **static export** and deployed to GitHub Pages. There is no server at runtime — content is baked in at build time.

## What you need

1. A **GitHub repository** (private is fine on GitHub Pro/Team; public repo works on free tier).
2. Push this codebase to `main`.
3. Enable GitHub Pages (see below).

**Local editing:** use `npm run dev` and http://127.0.0.1:43123/keystatic. The admin UI is **not** included in the static site GitHub Pages serves.

## One-time GitHub setup

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. (Optional) If the site URL is `https://YOUR_USERNAME.github.io/REPO_NAME/` (not a custom domain), add a repository variable:
   - **Settings → Secrets and variables → Actions → Variables**
   - Name: `NEXT_PUBLIC_BASE_PATH`
   - Value: `/REPO_NAME` (e.g. `/pearl-website`)

   Leave this **empty** if you use:
   - a repo named `YOUR_USERNAME.github.io` (site at root), or
   - a **custom domain** (e.g. `pearl.cs.uic.edu`).

5. Push to `main` (or run the **Deploy static site to GitHub Pages** workflow manually).

The workflow file is `.github/workflows/deploy-pages.yml`. It runs `npm run build:static` and publishes the `out/` folder.

## Build commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local preview + Keystatic admin |
| `npm run build:static` | Production static export → `out/` folder |
| `npx serve out` | Preview the static build locally (install `serve` if needed) |

## Content workflow

1. Edit content locally (`npm run dev` + Keystatic, or edit `content/` files).
2. Commit and push to `main`.
3. GitHub Actions rebuilds and updates the live site (usually 1–2 minutes).

## Custom domain

**Settings → Pages → Custom domain** — then add the DNS records GitHub shows you.

Set `NEXT_PUBLIC_BASE_PATH` to empty when using a custom domain.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on routes | Check `NEXT_PUBLIC_BASE_PATH` matches repo name for project sites |
| Styles/assets 404 | Same — base path must match URL path |
| Old content on site | Wait for Actions workflow to finish; check Actions tab |
| `/keystatic` on live site | Not available on GitHub Pages — edit locally only |

For local Windows setup, see [WINDOWS_GUIDE.md](WINDOWS_GUIDE.md).
