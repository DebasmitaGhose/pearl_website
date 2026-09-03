# PEARL website — Windows setup, editing, and preview

This guide is for running the site on **Windows**, editing content in the **browser UI (Keystatic)** or **by hand in files**, and **previewing every change** before you publish.

---

## Part 1 — Get the code on your Windows machine

### Option A: Clone with Git (recommended)

1. Install [Git for Windows](https://git-scm.com/download/win).
2. Open **PowerShell** or **Command Prompt**.
3. Go to where you keep projects:

```powershell
cd C:\Users\YourName\Documents
```

4. Clone your repository (replace with your actual repo URL from Cursor/GitHub):

```powershell
git clone https://origin.cursor.com/git/debasmita-ghose/tmp-7f18226098c751c8.git pearl-website
cd pearl-website
```

5. Open the folder in **Cursor** or **VS Code**: `File → Open Folder → pearl-website`.

### Option B: Download from Cursor

If this project was built in Cursor’s cloud agent view, create or connect a Git repository in the UI, then clone that repo on Windows as in Option A.

---

## Part 2 — Install Node.js (one time)

1. Download **Node.js 20 LTS** from [https://nodejs.org](https://nodejs.org).
2. Run the installer (keep “Add to PATH” enabled).
3. Verify in a **new** PowerShell window:

```powershell
node -v
npm -v
```

You should see version numbers (e.g. `v20.x` and `10.x`).

---

## Part 3 — Run the site locally (preview server)

Every time you want to edit or preview:

```powershell
cd C:\Users\YourName\Documents\pearl-website
npm install
npm run dev
```

Leave that terminal window **open**. When it says the app is ready, open in your browser:

| What | URL |
|------|-----|
| **Home** | http://127.0.0.1:3000/ |
| **Research** | http://127.0.0.1:3000/research |
| **Team** | http://127.0.0.1:3000/team |
| **Publications** | http://127.0.0.1:3000/publications |
| **News** | http://127.0.0.1:3000/news |
| **Join the Lab** | http://127.0.0.1:3000/join |
| **Content admin (Keystatic)** | http://127.0.0.1:3000/keystatic |

**Preview workflow:** edit something → save → refresh the browser tab (or click another nav link). The dev server hot-reloads most changes automatically.

To stop the server: `Ctrl+C` in the terminal.

### Production-style preview (optional)

To see exactly what a deployed build looks like:

```powershell
npm run build
npm run start
```

Then use the same URLs above. Stop with `Ctrl+C`.

---

## Part 4 — Codebase map (what lives where)

```
pearl-website/
├── app/                          # Pages and routes
│   ├── (site)/page.tsx           # Home page
│   ├── (site)/research/page.tsx
│   ├── (site)/team/page.tsx
│   ├── (site)/publications/page.tsx
│   ├── (site)/news/page.tsx
│   ├── (site)/join/page.tsx
│   └── keystatic/                # Admin UI route
├── components/                   # Layout, news, publications, team cards
├── content/                      # ★ ALL EDITABLE CONTENT (Keystatic reads this)
│   ├── site.yaml                 # Lab name, tagline, email, address
│   ├── home.yaml                 # Home carousel images
│   ├── about.mdoc                # Home “About the lab” section
│   ├── research.mdoc             # Research page body
│   ├── join.mdoc                 # Join page body
│   ├── members/*.yaml            # Team members
│   ├── publications.yaml         # All papers in one file
│   └── news/*.mdoc               # One file per news item
├── public/
│   ├── pearl-logo.svg            # Logo in header/footer
│   └── images/                   # Uploaded images (home, members, pages, news)
├── lib/
│   ├── site.config.ts            # Navigation menu items
│   └── content.ts                # How content is loaded
├── keystatic.config.ts           # Keystatic schemas (what fields exist in admin)
├── package.json
├── README.md
└── CONTENT_EDITING.md            # Shorter editing reference
```

**Rule:** If you edit a file under `content/` or `public/images/`, refresh the browser to preview. If you edit `app/`, `components/`, or `lib/`, the dev server usually reloads automatically.

---

## Part 5 — Edit in the browser UI (Keystatic)

Best for: text, images, new news posts, publications, team members — without touching YAML/Markdown syntax.

1. Run `npm run dev` (see Part 3).
2. Open **http://127.0.0.1:3000/keystatic**.
3. Use the left sidebar:

| Sidebar item | What it controls | Preview at |
|--------------|------------------|------------|
| **Site Settings** | Lab name, tagline, email, address, footer | Every page (header/footer) |
| **Home page** | Hero carousel slides | http://127.0.0.1:3000/ |
| **About the Lab (Home page)** | About section on home | http://127.0.0.1:3000/ |
| **Research page** | Research text + hero image | http://127.0.0.1:3000/research |
| **Join the Lab page** | Join text + hero image | http://127.0.0.1:3000/join |
| **News** | News posts (create / edit) | http://127.0.0.1:3000/news and home |
| **Members** | Team photos, website, Scholar links | http://127.0.0.1:3000/team |
| **Publications** | Papers, venue tags, link buttons | http://127.0.0.1:3000/publications |

4. Click **Save** in Keystatic.
5. Refresh the matching preview URL in another browser tab.

### Keystatic tips

- **Markdown pages** (About, Research, Join): use `##` for section headings; toolbar for images.
- **Publications**: set **Venue tag** (short, e.g. `HRI 2026`), **Links** (Paper, Code, Video, etc.), **Sort order within year** (higher = listed first in that year).
- **Members**: photo upload, **Website**, **Google Scholar URL**. Bio is stored but not shown on the public Team page.
- **News**: title, date, summary, body. On the site, click a title to expand in place.

Keystatic only works while `npm run dev` is running (unless you configure GitHub mode — see `.env.example`).

---

## Part 6 — Edit files directly (code / Git)

Best for: bulk edits, copy-paste from another doc, or when you prefer Cursor/VS Code.

### Site settings — `content/site.yaml`

```yaml
labName: PEARL
labSubtitle: PEople Aligned Robots Lab
institution: University of Illinois Chicago
tagline: Your tagline here.
contactEmail: debasmita.ghose@uic.edu
address: Department of Computer Science, University of Illinois Chicago, Chicago, IL
footerText: PEARL — University of Illinois Chicago
```

Preview: refresh **http://127.0.0.1:3000/** (header, footer, home intro).

### Home carousel — `content/home.yaml`

```yaml
carouselImages:
  - image: /images/home/your-photo.jpg
    caption: Optional caption
```

Put image files in `public/images/home/`. Preview: **http://127.0.0.1:3000/**.

### Markdown pages — `content/about.mdoc`, `content/research.mdoc`, `content/join.mdoc`

```markdown
---
title: optional
heroImage: /images/pages/research/hero.jpg
---

## Section heading

Paragraph with **bold** and [links](/publications).

![Description](/images/pages/research/photo.jpg)
```

Preview:

- `about.mdoc` → http://127.0.0.1:3000/ (scroll to About)
- `research.mdoc` → http://127.0.0.1:3000/research
- `join.mdoc` → http://127.0.0.1:3000/join

**Note:** Keystatic reads `content/about.mdoc`, `content/research.mdoc`, and `content/join.mdoc` (not the older `content/about/index.mdoc` copies).

### News — `content/news/your-slug.mdoc`

Filename becomes the URL hash: `content/news/my-update.mdoc` → expand on `/news` (link: `/news#my-update`).

```markdown
---
title: "Short headline for the list"
date: 2026-03-15
summary: "One line shown only if needed."
---

Full text shown when the item is expanded. Supports **markdown**.
```

Preview: **http://127.0.0.1:3000/news** — click the title to expand.

### Team member — `content/members/jane-doe.yaml`

```yaml
name: Jane Doe
role: graduate_student
website: https://example.com
scholarUrl: https://scholar.google.com/citations?user=XXXX
photo: jane-doe.jpg
order: 2
active: true
```

Put photo in `public/images/members/jane-doe.jpg`.

`role` options: `pi`, `graduate_student`, `masters_student`, `undergraduate`, `postdoc`, `alumni`.

Preview: **http://127.0.0.1:3000/team**.

### Publications — `content/publications.yaml`

All papers are listed in one file. Add a new entry under `publications:`:

```yaml
publications:
  - title: "Full paper title"
    authors: "A. Author, B. Author"
    venue: "HRI 2026"
    journal: "Full venue name, location, and presentation type"
    year: 2026
    sortOrder: 10
    links:
      - label: paper
        url: https://doi.org/10.xxxx/xxxxx
      - label: video
        url: https://youtube.com/watch?v=...
```

`label` values: `paper`, `code`, `video`, `poster`, `project`, `pdf`.

Preview: **http://127.0.0.1:3000/publications**.

---

## Part 7 — Add images manually

1. Copy image into the correct folder under `public/images/`:

| Use | Folder |
|-----|--------|
| Home carousel | `public/images/home/` |
| Team photos | `public/images/members/` |
| Research / Join / About heroes & inline | `public/images/pages/research/`, `join/`, `about/` |
| News cover images | `public/images/news/` |

2. Reference in content with a path starting with `/images/...` (not `public/`).

Example: file `public/images/members/photo.jpg` → use `/images/members/photo.jpg` or `photo.jpg` in member YAML.

3. Refresh the preview page.

---

## Part 8 — Change navigation or layout (code)

### Rename or reorder menu items

Edit `lib/site.config.ts`:

```typescript
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Team", href: "/team" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
  { label: "Join the Lab", href: "/join" },
];
```

Hide a link temporarily: add `hidden: true` to that entry.

Preview: any page — check the header links.

### Logo

Replace or edit `public/pearl-logo.svg`. Preview: any page (header and footer).

### Styling (colors, fonts)

- Global colors: `app/globals.css`
- Fonts: `app/layout.tsx`

---

## Part 9 — Save and share your changes

### If you use Git

```powershell
git add .
git commit -m "Update publications and news"
git push
```

### If you only edit via Keystatic locally

Changes are saved to files under `content/` and `public/images/`. Commit and push those paths so the live site can be updated.

---

## Part 10 — Troubleshooting (Windows)

| Problem | Fix |
|---------|-----|
| `npm` not recognized | Reinstall Node.js; restart terminal; check PATH |
| Port 3000 in use | Close other dev servers or run `npx next dev -p 43125` and use that port |
| `/keystatic` 404 | Run `npm run dev`, not `npm run start` (unless `KEYSTATIC_SHOW_ADMIN=true`) |
| Edited file, no change on site | Save file; hard refresh browser (`Ctrl+F5`); check you edited the file Keystatic uses (e.g. `content/research.mdoc`) |
| Image broken | Path must be `/images/...` and file must exist under `public/images/` |
| YAML error on build | Quote strings with special characters: `title: "My title: with colon"` |
| PowerShell execution policy | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` if npm scripts fail |

---

## Quick reference — preview checklist

After any edit, check the page you care about:

- [ ] http://127.0.0.1:3000/ — carousel, about, latest news
- [ ] http://127.0.0.1:3000/research
- [ ] http://127.0.0.1:3000/team
- [ ] http://127.0.0.1:3000/publications
- [ ] http://127.0.0.1:3000/news (click titles to expand)
- [ ] http://127.0.0.1:3000/join

Admin UI: http://127.0.0.1:3000/keystatic

For more detail on content fields, see [CONTENT_EDITING.md](CONTENT_EDITING.md).
