# Myotus Wiki

An Astro + Starlight documentation site with a JRip-derived light/dark theme.

**Site:** https://wiki.myogoo.me/

**Deployment repository:** https://github.com/myogoo/MyoWiki

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro at `/`.

```sh
npm run check
npm run build
npx playwright install chromium
npm test
```

Search is generated at build time. Test search with `npm run preview`, not only the development server. Browser tests build on the production output and start their own preview server.

## Content

- Edit Markdown/MDX in `src/content/docs/`.
- English pages stay at `/`; Korean translations live in `src/content/docs/ko/` and are served at `/ko/`. Keep matching filenames so the language selector opens the equivalent page.
- Add navigation entries in `astro.config.mjs`.
- JRip colors, geometry, and responsive adjustments are in `src/styles/theme.css`.
- The site is served from the domain root; internal links use root-relative paths.
- Do not copy uncommitted Myotus API changes into these docs as stable contracts. The initial source snapshot is `e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51`; update source references and the scope notice together when migrating to a newer revision.

The source documents remain in the mod repository; this site maintains a reviewed copy. It is not automatically synchronized with local worktrees.

## GitHub Pages

In repository Settings > Pages, choose **GitHub Actions** as the source and set the custom domain to `wiki.myogoo.me`. The deployment workflow checks types, builds the static site, runs browser checks, uploads `dist`, and deploys pushes to `main`. Pull requests run the same validation without deploying. No external hosting secret is needed.

See [NOTICE.md](NOTICE.md) for content, design, and font attribution.
