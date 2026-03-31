import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { buildSidebar } from './src/config/projects.mjs';

function normalizeBase(input) {
  if (!input || input === '/') {
    return '/';
  }

  return `/${input.replace(/^\/+|\/+$/g, '')}`;
}

function normalizeSite(input) {
  return input.replace(/\/$/, '');
}

function getGitHubRepositoryContext() {
  const repository = process.env.GITHUB_REPOSITORY ?? '';
  const [repositoryOwner, repositoryName] = repository.split('/');

  return {
    owner: process.env.GITHUB_REPOSITORY_OWNER ?? repositoryOwner,
    repo: repositoryName,
  };
}

function getDefaultSite(owner) {
  return owner ? `https://${owner}.github.io` : 'https://myogoo.github.io';
}

function getConfiguredSite() {
  const explicitSite = process.env.SITE_URL?.trim();
  if (explicitSite) {
    return normalizeSite(explicitSite);
  }

  try {
    const configuredDomain = readFileSync(new URL('./public/CNAME', import.meta.url), 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith('#'));

    if (configuredDomain) {
      const normalizedDomain = configuredDomain.match(/^https?:\/\//i)
        ? configuredDomain
        : `https://${configuredDomain}`;

      return normalizeSite(normalizedDomain);
    }
  } catch {
    // No custom domain file is configured.
  }

  return '';
}

function getRepositoryBase(owner, repo) {
  if (!owner || !repo) {
    return '/';
  }

  return repo.toLowerCase() === `${owner}.github.io`.toLowerCase() ? '/' : `/${repo}`;
}

function getInferredBase(owner, repo, site) {
  try {
    const parsedSite = new URL(site);
    const siteBase = normalizeBase(parsedSite.pathname);

    if (siteBase !== '/') {
      return siteBase;
    }

    const projectPagesHost = (owner ? `${owner}.github.io` : 'myogoo.github.io').toLowerCase();
    if (parsedSite.hostname.toLowerCase() !== projectPagesHost) {
      return '/';
    }
  } catch {
    return '/';
  }

  return getRepositoryBase(owner, repo);
}

const { owner, repo } = getGitHubRepositoryContext();
const site = getConfiguredSite() || getDefaultSite(owner);
const base = normalizeBase(process.env.BASE_PATH ?? getInferredBase(owner, repo, site));

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'MyoWiki',
      description: 'API documentation hub for Myogoo projects and versioned integrations.',
      tagline: 'Project and version aware docs for Myogoo APIs.',
      logo: {
        src: './src/assets/myotus-logo.svg',
        alt: 'Myotus logo',
      },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/myogoo' },
      ],
      customCss: ['/src/styles/custom.css'],
      lastUpdated: true,
      components: {
        Header: './src/components/starlight/Header.astro',
        Pagination: './src/components/starlight/Pagination.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
        SiteTitle: './src/components/starlight/SiteTitle.astro',
        MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
      },
      sidebar: buildSidebar(),
    }),
  ],
});
