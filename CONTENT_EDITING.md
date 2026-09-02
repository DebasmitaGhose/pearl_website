# How to edit PEARL website content

This site uses **Keystatic**: content is stored as Markdown (Markdoc) files in the `content/` folder. You can edit through a **browser UI** or by editing files directly in the repo.

---

## Quick start: edit in the browser (recommended)

### 1. Start the site locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123/keystatic](http://127.0.0.1:43123/keystatic)

The admin UI is only available while `npm run dev` is running (or when `KEYSTATIC_SHOW_ADMIN=true` in production).

### 2. Open the page you want to edit

In the left sidebar of Keystatic:

| What you want to change | Keystatic section |
|-------------------------|-------------------|
| Home hero image carousel | **Home page** → Hero carousel images (`content/home.yaml`) |
| Home “About the lab” section | **About the Lab (Home page)** (`content/about.mdoc`) |
| Research page (`/research`) | **Research page** (`content/research.mdoc`) |
| Join the Lab page (`/join`) | **Join the Lab page** (`content/join.mdoc`) |
| News posts | **News** → pick a post or **Create** |
| Team | **Members** |
| Publications | **Publications** |
| Lab name, email, UIC info | **Site Settings** |

### 3. Write text in Markdown

The editor supports standard Markdown:

```markdown
## Section heading

Regular paragraph with **bold** and *italic*.

- Bullet list item
- Another item

[Link text](https://example.com)
[Internal link to publications](/publications)
```

Use `##` and `###` for section headings (especially on the Join page: one section per role).

### 4. Add images

**Hero image (top banner)**

1. In Keystatic, open the page singleton (Research, Join, or About).
2. Use the **Hero image** field → upload an image.
3. Save. It appears as a wide banner above the page body.

**Home page carousel**

1. Open **Home page** in Keystatic.
2. Under **Hero carousel images**, add one or more slides (image + optional caption).
3. Images are stored in `public/images/home/` (content file: `content/home.yaml`). With multiple slides, the home page shows a carousel with dots and prev/next controls.
4. Replace the placeholder slides with your own lab photos anytime.

**Images inside the text**

1. In the Markdown editor, use the **image** button in the toolbar (or paste/upload).
2. Images are saved under `public/images/pages/...` automatically.
3. You can also write Markdown manually:

```markdown
![Alt text describing the image](/images/pages/research/your-file.jpg)
```

| Page | Images stored in |
|------|------------------|
| Home carousel | `public/images/home/` |
| Research | `public/images/pages/research/` |
| Join the Lab | `public/images/pages/join/` |
| About (home) | `public/images/pages/about/` |
| News posts | `public/images/news/` |
| Member photos | `public/images/members/` |

### 5. Save

Click **Save** in Keystatic. Refresh the public site to see changes.

---

## Edit by editing files (Git / code)

If you prefer editing in Cursor, GitHub, or VS Code:

### Markdown page files

| Page | File to edit |
|------|----------------|
| Home about section | `content/about.mdoc` |
| Research | `content/research.mdoc` |
| Join the Lab | `content/join.mdoc` |
| News post | `content/news/your-slug.mdoc` |

**Windows walkthrough:** see [WINDOWS_GUIDE.md](WINDOWS_GUIDE.md).

**Example** (`content/research.mdoc`):

```markdown
---
heroImage: /images/pages/research/lab-photo.jpg
---

# Research at PEARL

Your introduction paragraph here.

## A research theme

More text. Embed an image in the body:

![Robot experiment setup](/images/pages/research/setup.jpg)
```

- Content **below** the `---` frontmatter is Markdown body.
- `heroImage` in frontmatter is optional; remove the line if you don’t want a banner.

### Site settings (YAML)

Edit `content/site.yaml` for lab name, tagline, contact email, and address.

### Members (YAML)

Edit files in `content/members/*.yaml` or use Keystatic **Members**.

Each person on the Team page shows: photo, **Website**, and **Google Scholar** links (no bio on the public site).

### Publications (YAML)

Edit files in `content/publications/*.yaml` or use Keystatic **Publications**.

Each entry uses a short **Venue tag** (e.g. `HRI 2026`) shown on the list. Add optional **Links** (Paper, Code, Video, Poster, Project, PDF) — these appear as small buttons beside each paper. Use **Sort order within year** (higher numbers appear first under that year). The full venue name can stay in **Full venue** for your records.

---

## Navigation: Research and Join the Lab

Both pages are already on the main site sidebar:

- **Research** → `/research`
- **Join the Lab** → `/join`

Navigation order is defined in code:

**File:** `lib/site.config.ts`

```ts
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Team", href: "/team" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
  { label: "Join the Lab", href: "/join" },
];
```

To rename a nav label, change `label`. To hide a page temporarily:

```ts
{ label: "Join the Lab", href: "/join", hidden: true },
```

---

## Add a completely new page (developers)

Example: a **Teaching** page at `/teaching`.

### Step 1 — Keystatic schema

In `keystatic.config.ts`, add a singleton (copy the `research` block):

```ts
teaching: singleton({
  label: "Teaching page",
  path: "content/teaching",
  format: { contentField: "content" },
  schema: {
    heroImage: fields.image({
      label: "Hero image (optional)",
      directory: "public/images/pages/teaching",
      publicPath: "/images/pages/teaching",
    }),
    content: fields.markdoc({
      label: "Teaching page (Markdown)",
      options: {
        image: {
          directory: "public/images/pages/teaching",
          publicPath: "/images/pages/teaching",
        },
      },
    }),
  },
}),
```

### Step 2 — Content file

Create `content/teaching/index.mdoc` with your Markdown.

### Step 3 — Reader helper

In `lib/content.ts`:

```ts
export async function getTeachingContent() {
  return reader.singletons.teaching.read();
}
```

### Step 4 — Route

Create `app/(site)/teaching/page.tsx` (copy `app/(site)/research/page.tsx` and adjust names).

### Step 5 — Navigation

Add to `lib/site.config.ts`:

```ts
{ label: "Teaching", href: "/teaching" },
```

---

## Markdown cheat sheet

| Syntax | Result |
|--------|--------|
| `# Heading` | Large heading |
| `## Subheading` | Section heading |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `- item` | Bullet list |
| `[text](url)` | Link |
| `![alt](url)` | Image |

---

## Production editing (GitHub mode)

To edit the live site without running `npm run dev` locally, configure GitHub mode (see `.env.example`):

- `NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=github`
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER`
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`
- `KEYSTATIC_GITHUB_TOKEN`
- `KEYSTATIC_SHOW_ADMIN=true`

Then open `https://your-domain.com/keystatic` to edit and commit content to the repo.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `/keystatic` shows 404 | Run `npm run dev` or set `KEYSTATIC_SHOW_ADMIN=true` |
| Image doesn’t show | Check path starts with `/images/...` and file exists under `public/` |
| Page not in nav | Add entry in `lib/site.config.ts` |
| YAML build error | Quote strings with `:` or `'` using `"double quotes"` in YAML frontmatter |

For layout or design changes (not content), edit React components under `app/` and `components/`.
