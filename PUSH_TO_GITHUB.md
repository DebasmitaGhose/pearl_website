# Push this site to your empty private GitHub repo

Target repo: **https://github.com/DebasmitaGhose/pearl_website.git** (private, empty)

The full site is already committed on Cursor’s git server. A **Cloud Agent cannot push to GitHub** — it runs on a separate VM and does not receive your Cursor GitHub login. Push from **your PC** (local Cursor terminal or Source Control).

---

## Fastest path — GitHub installed in Cursor (your PC)

Use a **local** terminal on your machine (Terminal → New Terminal), **not** the Cloud Agent chat.

### Option 1 — Clone from Cursor, push to GitHub

```powershell
cd $HOME\Documents
git clone https://origin.cursor.com/git/debasmita-ghose/tmp-7f18226098c751c8.git pearl_website
cd pearl_website
git remote add github https://github.com/DebasmitaGhose/pearl_website.git
git push -u github main
```

With GitHub connected in Cursor, `git push` should prompt to sign in or use stored credentials. If it asks for a password, use a **PAT** (see Step 1 below).

### Option 2 — Source Control in Cursor

1. On your PC, open this project folder locally (or clone as in Option 1).
2. Open **Source Control** (branch icon).
3. Add remote `https://github.com/DebasmitaGhose/pearl_website.git` if needed.
4. **Publish Branch** / **Push** to `main`.

### Option 3 — Create repo from the agent view

In the Cloud Agent panel, use **Create repo** (if shown). That links GitHub using your logged-in account and can push without the agent VM handling auth.

---

## Step 1 — Create a GitHub token (one time)

1. Open https://github.com/settings/tokens
2. **Generate new token (classic)**
3. Name it e.g. `pearl-website-push`
4. Check scope: **`repo`** (full control of private repositories)
5. Generate and **copy the token** (you won’t see it again)

---

## Step 2 — Get the project files on your PC

Use **one** of these:

### A) You’re in Cursor with this project open (easiest)

1. Open the **terminal** in Cursor (your project folder).
2. Run:

```powershell
git remote add github https://github.com/DebasmitaGhose/pearl_website.git
git push -u github main
```

If `github` remote already exists:

```powershell
git push -u github main
```

When prompted:
- **Username:** `DebasmitaGhose`
- **Password:** paste your **PAT** (not your GitHub password)

### B) Fresh folder on Windows (no Cursor copy yet)

1. **Clone the empty repo:**

```powershell
cd $HOME\Documents
git clone https://github.com/DebasmitaGhose/pearl_website.git
cd pearl_website
```

2. **Copy the full site into this folder** (from Cursor export, zip, or another copy) so you see `app/`, `content/`, `package.json`, etc.

3. **Push:**

```powershell
git add -A
git commit -m "PEARL lab website"
git push -u origin main
```

Use PAT as password when prompted.

### C) New folder without cloning first

If you already have all files in `Documents\pearl_website`:

```powershell
cd $HOME\Documents\pearl_website
git init -b main
git remote add origin https://github.com/DebasmitaGhose/pearl_website.git
git add -A
git commit -m "PEARL lab website"
git push -u origin main
```

---

## Step 3 — Clone on any machine (after push)

```powershell
cd $HOME\Documents
git clone https://github.com/DebasmitaGhose/pearl_website.git
cd pearl_website
npm install
npm run dev
```

Open http://127.0.0.1:3000

---

## Step 4 — Enable GitHub Pages (optional)

See [DEPLOY_GITHUB_PAGES.md](DEPLOY_GITHUB_PAGES.md):

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Push to `main` deploys the static site automatically.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `could not read Username for 'https://github.com'` in **Cloud Agent** | Expected — push from your **local** PC terminal instead |
| `Authentication failed` | Use PAT as password, not GitHub login password |
| `remote github already exists` | Use `git push -u github main` or `git remote set-url github https://github.com/DebasmitaGhose/pearl_website.git` |
| `src refspec main does not match any` | Run `git add -A`, `git commit -m "Initial commit"` first |
| `failed to push some refs` | Empty repo should accept; if repo has commits, `git pull origin main --rebase` then push |

---

## What gets pushed

The full site: `app/`, `components/`, `content/`, `public/`, configs, GitHub Actions workflow for Pages, and docs (`WINDOWS_GUIDE.md`, etc.). **Not** `node_modules` or `.next` (ignored by `.gitignore`).
