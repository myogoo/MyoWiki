import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://wiki.myogoo.me',
  base: '/',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Myotus',
      locales: {
        root: { label: 'English', lang: 'en' },
        ko: { label: '한국어', lang: 'ko' },
      },
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
        { label: 'Start here', translations: { ko: '시작하기' }, items: [
          { label: 'Overview', translations: { ko: '소개' }, slug: '' },
          { label: 'Install Myotus', translations: { ko: 'Myotus 설치' }, slug: 'installation' },
          { label: 'Versions & downloads', translations: { ko: '버전과 다운로드' }, slug: 'versions' },
          { label: 'Addon quickstart', translations: { ko: '애드온 빠른 시작' }, slug: 'quickstart' },
        ] },
        { label: 'Build with Myotus', translations: { ko: 'Myotus로 개발하기' }, items: [
          { label: 'API reference', translations: { ko: 'API 레퍼런스' }, slug: 'api' },
          { label: 'Architecture & lifecycle', translations: { ko: '구조와 생명주기' }, slug: 'architecture' },
          { label: 'Build & verification', translations: { ko: '빌드와 검증' }, slug: 'workflows' },
        ] },
        { label: 'In the game', translations: { ko: '게임 내 기능' }, items: [
          { label: 'Terminal settings', translations: { ko: '터미널 설정' }, slug: 'terminal-settings' },
          { label: 'Items & materials', translations: { ko: '아이템과 재료' }, slug: 'items' },
        ] },
        { label: 'Project', translations: { ko: '프로젝트' }, items: [
          { label: 'About these docs', translations: { ko: '문서 안내' }, slug: 'about' },
          { label: 'Report an issue ↗', translations: { ko: '문제 제보 ↗' }, link: 'https://github.com/mc-myo-s-mod/Myotus/issues' },
        ] },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    }),
  ],
});
