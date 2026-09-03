# PEARL Lab Website

Website for the **PEople Aligned Robots Lab (PEARL)** at the **University of Illinois Chicago**, led by Dr. Debasmita Ghose.

Built with Next.js, Tailwind CSS, and Keystatic for content management.

## Windows setup (start here)

**Full step-by-step guide:** [WINDOWS_GUIDE.md](WINDOWS_GUIDE.md)

Covers installing Node on Windows, running the preview server, editing in Keystatic vs files, and previewing every page.

## Preview locally (any OS)

```bash
npm install
npm run dev
```

Open http://127.0.0.1:3000

| Page | Route |
|------|-------|
| Home | `/` |
| Research | `/research` |
| Team | `/team` |
| Publications | `/publications` |
| News | `/news` |
| Join the Lab | `/join` |
| Content admin (Keystatic) | `/keystatic` |

## Content editing

**Reference:** [CONTENT_EDITING.md](CONTENT_EDITING.md)

Quick path: `npm run dev` → http://127.0.0.1:3000/keystatic

| Content | Keystatic section | Main file(s) |
|---------|-------------------|--------------|
| Site name, email, tagline | Site Settings | `content/site.yaml` |
| Home carousel | Home page | `content/home.yaml` |
| Home about section | About the Lab | `content/about.mdoc` |
| Research page | Research page | `content/research.mdoc` |
| Join page | Join the Lab page | `content/join.mdoc` |
| News | News | `content/news/*.mdoc` |
| Team | Members | `content/members/*.yaml` |
| Publications | Publications | `content/publications.yaml` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3000 (use for editing + preview) |
| `npm run build` | Production build |
| `npm run start` | Production server on port 3000 |

## Deploy

**Empty private GitHub repo:** see [PUSH_TO_GITHUB.md](PUSH_TO_GITHUB.md) — push code first, then clone on Windows.

**GitHub Pages (static):** see [DEPLOY_GITHUB_PAGES.md](DEPLOY_GITHUB_PAGES.md)

**Vercel / other Node hosts:** use `npm run build` (not `build:static`). See `.env.example` for optional Keystatic GitHub mode.
