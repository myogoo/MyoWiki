import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { buildSidebar } from './src/config/projects.mjs';

function normalizeBase(input) {
  if (!input || input === '/') {
    return '/';
  }

  return `/${input.replace(/^\/+|\/+$/g, '')}`;
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

function getDefaultBase(owner, repo) {
  if (!owner || !repo) {
    return '/';
  }

  return repo.toLowerCase() === `${owner}.github.io`.toLowerCase() ? '/' : `/${repo}`;
}

const { owner, repo } = getGitHubRepositoryContext();
const site = (process.env.SITE_URL ?? getDefaultSite(owner)).replace(/\/$/, '');
const base = normalizeBase(process.env.BASE_PATH ?? getDefaultBase(owner, repo));

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
