# Myotus Wiki

Versioned documentation site for Myotus built with Astro Starlight.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

For a project Pages site, you can still build against an explicit repository path locally:

```bash
SITE_URL=https://your-user.github.io BASE_PATH=/your-repo npm run build
```

In GitHub Actions, `astro.config.mjs` automatically infers:

- `site` from `GITHUB_REPOSITORY_OWNER`
- `base` from `GITHUB_REPOSITORY`

That means a repository like `myogoo/MyoWiki` builds to `https://myogoo.github.io/MyoWiki/` without extra workflow-specific config.

Local development uses `/` by default, so the site opens directly at the dev server root unless you explicitly set `BASE_PATH`.

## GitHub Pages

The repository already includes a deployment workflow at `.github/workflows/deploy.yml`.

To publish on GitHub Pages:

1. Push this project to GitHub on the `main` branch.
2. In GitHub, open `Settings > Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` again, or run the workflow manually from the `Actions` tab.

If you later move to a custom domain, set `SITE_URL=https://your-domain.example` and remove `BASE_PATH`. Add `public/CNAME` if you want GitHub Pages to publish that domain automatically.

## Source references

- `1.20.1`: `/mnt/f/IntelliJ/Minecraft/Myotus/Myotus_1_20_1`
- `1.21.1`: `/mnt/f/IntelliJ/Minecraft/Myotus/Myotus_1_21_1`
