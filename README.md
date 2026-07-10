# Abeen Poudel — Personal Site

A full-stack personal site: About, Resume, Portfolio, and a Blog with your own
admin panel to write posts, plus a Contact form that saves messages to a
database you can read in `/admin`.

- **Frontend + Backend:** Next.js 14 (App Router, TypeScript, Tailwind)
- **Database:** PostgreSQL via Prisma (use [Neon](https://neon.tech) — free tier)
- **Hosting:** [Vercel](https://vercel.com) — free tier
- **Domain:** free `.com.np` via Nepal's official registrar

Everything below is free. Total cost: $0/month.

---

## 1. Run it locally (optional, but recommended first)

You'll need [Node.js 20+](https://nodejs.org) installed on your computer.

```bash
cd abeen-portfolio
npm install
```

### Create a free database (Neon)

1. Go to https://neon.tech → sign up free → **Create a project**.
2. Copy the **connection string** it gives you (starts with `postgresql://...`).
3. Create a file named `.env` in the project root (copy `.env.example`):

```bash
cp .env.example .env
```

4. Paste your Neon connection string into `DATABASE_URL` in `.env`.

### Push the database schema

```bash
npm run db:push
```

This creates the `Post` and `Message` tables in your database.

### Set your admin login

Generate a password hash (never store plain passwords):

```bash
npm run hash-password -- "choose-a-strong-password"
```

Copy the printed `ADMIN_PASSWORD_HASH` line into your `.env`, and set:

```
ADMIN_USERNAME="abeen"
JWT_SECRET="any-long-random-string-you-make-up"
```

### Run it

```bash
npm run dev
```

Visit http://localhost:3000 for the site, and http://localhost:3000/admin to
log in and write your first blog post.

### Add your resume PDF (optional)

The Resume page has a "Download PDF" button pointing at `/resume.pdf`. Drop
your resume PDF into the `public/` folder as `public/resume.pdf` and it'll
work automatically.

---

## 2. Deploy it for free (Vercel)

1. Push this project to a GitHub repository (create a free GitHub account if
   you don't have one, create a new repo, then):

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to https://vercel.com → sign up free with GitHub → **Add New Project**
   → import your repo.
3. In the project's **Environment Variables** settings, add the same four
   variables from your `.env` file: `DATABASE_URL`, `ADMIN_USERNAME`,
   `ADMIN_PASSWORD_HASH`, `JWT_SECRET`.
4. Click **Deploy**. Vercel gives you a free `https://your-project.vercel.app`
   URL immediately — your site is live.

---

## 3. Connect your free `.com.np` domain

Nepal's `.np` domains are registered free through Mercantile Communications,
the official registrar — not through Vercel or any third party.

1. Go to **register.com.np** (Nepal's official `.np` registration portal).
2. Search for your desired name, e.g. `abeenpoudel.com.np`.
3. Since the domain must match your legal name, use your name as it appears
   on your citizenship certificate.
4. Before submitting, you'll be asked for **name servers**. In Vercel, go to
   your project → **Settings → Domains → Add**, enter your `.com.np` domain,
   and Vercel will show you DNS records to use (usually an **A record** and
   `CNAME` for `www`, or in some cases their own name servers — Vercel's
   domain page tells you exactly which to use for this domain).
5. Upload the required document (your citizenship certificate scan) and a
   short cover letter (the portal provides a template).
6. Approval typically takes 1–5 business days. Once approved, add the DNS
   records Vercel gave you in step 4 into the registrar's DNS settings (or
   directly in Vercel if the registrar lets you delegate name servers to
   Vercel — this is the simpler option if available).
7. Once DNS propagates (a few hours), your site is live at
   `https://yourname.com.np`.

---

## Project structure

```
src/
  app/
    page.tsx              → Home / About
    resume/page.tsx        → Resume
    portfolio/page.tsx     → Portfolio / case studies
    blog/page.tsx          → Blog list (public, published posts only)
    blog/[slug]/page.tsx   → Single blog post
    contact/page.tsx       → Contact form
    admin/                 → Password-protected admin panel
      page.tsx             → Dashboard
      posts/               → Create/edit/delete blog posts
      messages/            → Read contact form submissions
    api/                   → Backend routes (posts, messages, auth, contact)
  components/              → Shared UI (nav, footer, kanban hero, forms)
  lib/
    resume-data.ts          → All your resume/portfolio content — edit this
                              file directly any time your experience changes
    db.ts, auth.ts          → Database and auth helpers
prisma/schema.prisma        → Database schema (Post, Message)
```

To update your About/Resume/Portfolio content later, just edit
`src/lib/resume-data.ts` — no database needed for that part. Blog posts and
contact messages live in the database and are managed entirely through
`/admin`.
