import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://wiki.myogoo.me',
  base: '/',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Myotus',
      description: 'The Myotus developer wiki. Extend Applied Energistics 2 terminals with shared APIs, configuration tabs, and upgrade cards.',
      favicon: '/favicon.png',
      social: [{ icon: 'github', label: 'Myotus on GitHub', href: 'https://github.com/mc-myo-s-mod/Myotus' }],
      editLink: { baseUrl: 'https://github.com/myogoo/MyoWiki/edit/main/' },
      customCss: [
        '@fontsource-variable/manrope',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/theme.css',
      ],
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        MarkdownContent: './src/components/MarkdownContent.astro',
      },
      sidebar: [
        { label: 'Start here', items: [
          { label: 'Overview', slug: '' },
          { label: 'Install Myotus', slug: 'installation' },
          { label: 'Versions & downloads', slug: 'versions' },
          { label: 'Addon quickstart', slug: 'quickstart' },
        ] },
        { label: 'Build with Myotus', items: [
          { label: 'API reference', slug: 'api' },
          { label: 'Architecture & lifecycle', slug: 'architecture' },
          { label: 'Build & verification', slug: 'workflows' },
        ] },
        { label: 'In the game', items: [
          { label: 'Terminal settings', slug: 'terminal-settings' },
          { label: 'Items & materials', slug: 'items' },
        ] },
        { label: 'Project', items: [
          { label: 'About these docs', slug: 'about' },
          { label: 'Report an issue ↗', link: 'https://github.com/mc-myo-s-mod/Myotus/issues' },
        ] },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    }),
  ],
});
