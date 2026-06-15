# Abhishek Singh — Portfolio

A single-page portfolio site for Abhishek Singh (QA Engineer — Manual &amp; Automation Testing),
styled as a "test execution report": sections are framed as test suites, work history as
test cases, and contact details as API endpoints.

## Structure

```
.
├── index.html          # All content/sections
├── assets/
│   ├── style.css       # Theme (greyish-dark) + layout + responsive rules
│   ├── script.js        # Terminal animation, nav, scroll reveals
│   └── Abhishek_Singh_Resume.pdf  # Downloadable resume
└── README.md
```

No build step — it's plain HTML/CSS/JS.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio` or `yourusername.github.io`).
2. Push these files to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then **Save**.
6. Your site will be live at:
   - `https://<your-username>.github.io/<repo-name>/` (for a regular repo), or
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`).

## Customize

- Update colors in the `:root` block at the top of `assets/style.css`.
- Edit copy and section content directly in `index.html`.
- Swap `assets/Abhishek_Singh_Resume.pdf` for an updated resume (keep the same filename, or update the link in `index.html`).
