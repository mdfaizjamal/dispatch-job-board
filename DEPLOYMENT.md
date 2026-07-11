# Deployment guide (step by step)

This walks through everything from "I have this folder" to "it's live on
Vercel and redeploys automatically from GitHub Actions." Follow it in
order — don't skip the Vercel setup steps, the pipeline needs them.

## 0. Before you start

Install, if you don't already have them:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org) 18.18+
- A free [GitHub](https://github.com) account
- A free [Vercel](https://vercel.com) account (you can sign up with GitHub)

## 1. Try it locally first

Open a terminal in this project folder and run:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Confirm the board loads, search/filter work,
you can post a role, and you can save one. Stop the server with `Ctrl+C`
when you're happy.

## 2. Push the code to GitHub

**a. Create the repository on GitHub**
1. Go to github.com → click the **+** in the top right → **New repository**.
2. Name it (e.g. `dispatch-job-board`). Leave it empty — don't add a
   README, .gitignore, or license on GitHub's side (you already have
   these locally).
3. Click **Create repository**. Keep the page open — you'll need the URL
   it shows you.

**b. Push your local code**

In your terminal, inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit: Dispatch job board"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

Refresh the GitHub page — your files should now be there, including the
`.github/workflows/ci-cd.yml` file.

> If `git push` asks for a password and rejects it: GitHub no longer
> accepts your account password over the command line. Use a
> [Personal Access Token](https://github.com/settings/tokens) as the
> password instead, or set up the
> [GitHub CLI](https://cli.github.com/) (`gh auth login`) and use that.

## 3. Create the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in.
2. Click **Import** next to your GitHub repo (authorize Vercel to access
   your GitHub account if it asks).
3. Vercel will auto-detect this as a Next.js project — leave the default
   build settings as they are.
4. Click **Deploy**.

This first deploy is triggered directly by Vercel's own GitHub
integration, and it proves the app builds correctly. Once it finishes,
you'll get a live URL like `https://dispatch-job-board.vercel.app` —
open it and confirm it works.

> Note: after you wire up the GitHub Actions pipeline in the next step,
> deployments to `main` will happen through the Actions workflow instead.
> Having Vercel's own Git integration connected is still fine to leave on
> for easy PR previews — it doesn't conflict with the workflow.

## 4. Get the three values the pipeline needs

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) deploys using
the Vercel CLI, which needs three secrets: a token, your org/team ID, and
this project's ID.

**a. Create a Vercel token**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens).
2. Click **Create Token**, give it a name like `github-actions`, and copy
   the value shown. You won't be able to see it again — paste it
   somewhere safe for a moment.

**b. Get your Org ID and Project ID**

The easiest way is to link the project locally:

```bash
npm install --global vercel
vercel login
vercel link
```

`vercel link` will ask you to select the project you just deployed — pick
it. It creates a `.vercel/project.json` file (already ignored by `.gitignore`,
so it won't get committed). Open that file:

```bash
cat .vercel/project.json
```

You'll see `"orgId"` and `"projectId"` — copy both.

## 5. Add the secrets to GitHub

1. On your repo's GitHub page, go to **Settings → Secrets and variables →
   Actions**.
2. Click **New repository secret** and add each of these three:

| Secret name       | Value                          |
|--------------------|---------------------------------|
| `VERCEL_TOKEN`     | the token from step 4a          |
| `VERCEL_ORG_ID`    | the `orgId` from step 4b        |
| `VERCEL_PROJECT_ID`| the `projectId` from step 4b    |

## 6. Trigger the pipeline

Make any small change (or just re-push), for example:

```bash
git commit --allow-empty -m "Trigger CI/CD"
git push
```

Go to your repo's **Actions** tab on GitHub. You'll see the **CI/CD**
workflow running:
1. **Lint & build** — installs dependencies, lints, and builds the app.
   This runs on every push and every pull request.
2. **Deploy to Vercel (production)** — only runs after step 1 passes, and
   only on pushes to `main`. It builds the project with the Vercel CLI and
   deploys it to production, printing the live URL in the job's log.

If a step fails, click into it — the log will tell you exactly which
command failed and why (usually a missing/mistyped secret, or a lint
error).

## 7. Confirm it's live

Open the URL Vercel gave you (from step 3, or from the workflow's log in
step 6 — they point to the same production deployment). You should see the
board, be able to post a role, search, filter, and save roles.

## What happens on future changes

From now on: every push to `main` automatically lints, builds, and
deploys. Every pull request automatically lints and builds (so you catch
breakage before merging), without deploying to production.

## Submitting your links

You'll typically want to hand over:
- **GitHub repo:** `https://github.com/<your-username>/<your-repo-name>`
- **Live site:** your Vercel production URL
- **CI/CD run:** a link to a green run on your repo's **Actions** tab
  (open the run, copy the URL from your browser)
