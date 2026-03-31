export const PROJECTS = [
  {
    slug: 'myotus',
    label: 'Myotus',
    description: 'AE2 terminal extension library and API surface.',
    sidebarDirectories: ['developers', 'getting-started', 'player'],
    versions: [
      { slug: '1.21.1', label: '1.21.1', channel: 'NeoForge', latest: true },
      { slug: '1.20.1', label: '1.20.1', channel: 'Forge', latest: false },
    ],
  },
  {
    slug: 'ssec',
    label: 'SSEC',
    description: 'Annotation-driven command and event framework for Fabric mods.',
    sidebarDirectories: ['developers', 'getting-started'],
    versions: [
      { slug: '26.1', label: '26.1', channel: 'Fabric', latest: true },
    ],
  },
];

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getVersion(project, slug) {
  return project?.versions.find((version) => version.slug === slug);
}

export function getDefaultVersion(project) {
  return project?.versions.find((version) => version.latest) ?? project?.versions[0];
}

export function stripBasePath(pathname, base = '/') {
  if (base && base !== '/' && pathname.startsWith(base)) {
    return pathname.slice(base.length) || '/';
  }

  return pathname || '/';
}

export function joinBase(base = '/', path = '') {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  return normalizedPath ? `${normalizedBase}/${normalizedPath}/` : `${normalizedBase || '/'}`;
}

export function getRouteContext(pathname, base = '/') {
  const strippedPath = stripBasePath(pathname, base);
  const segments = strippedPath.split('/').filter(Boolean);
  const project = getProject(segments[0]);
  const version = project ? getVersion(project, segments[1]) : undefined;

  return {
    segments,
    project,
    version,
    restSegments: version ? segments.slice(2) : project ? segments.slice(1) : segments,
  };
}

export function buildVersionHref(base, projectSlug, versionSlug, restSegments = []) {
  return joinBase(base, [projectSlug, versionSlug, ...restSegments].filter(Boolean).join('/'));
}

export function buildProjectHref(base, projectSlug, versionSlug) {
  return buildVersionHref(base, projectSlug, versionSlug, []);
}

export function buildSidebar() {
  return PROJECTS.map((project) => ({
    label: project.label,
    collapsed: false,
    items: project.versions.map((version) => ({
      label: version.label,
      collapsed: false,
      items: (project.sidebarDirectories ?? []).map((directory) => ({
        label: directory,
        collapsed: false,
        autogenerate: { directory: `${project.slug}/${version.slug}/${directory}` },
      })),
    })),
  }));
}

function normalizeRouteHref(href) {
  if (!href || href === '/') {
    return '/';
  }

  return href.replace(/\/$/, '');
}

function isInVersionScope(href, versionHref) {
  const normalizedHref = normalizeRouteHref(href);
  const normalizedVersionHref = normalizeRouteHref(versionHref);

  return (
    normalizedHref === normalizedVersionHref ||
    normalizedHref.startsWith(`${normalizedVersionHref}/`)
  );
}

function filterSidebarEntries(entries, versionHref) {
  return entries.flatMap((entry) => {
    if (entry.type === 'link') {
      return isInVersionScope(entry.href, versionHref) ? [entry] : [];
    }

    const filteredEntries = filterSidebarEntries(entry.entries, versionHref);
    return filteredEntries.length ? [{ ...entry, entries: filteredEntries }] : [];
  });
}

function findVersionGroup(entries, versionLabel) {
  for (const entry of entries) {
    if (entry.type !== 'group') {
      continue;
    }

    if (entry.label === versionLabel && entry.entries.length) {
      return entry;
    }

    const nestedMatch = findVersionGroup(entry.entries, versionLabel);
    if (nestedMatch) {
      return nestedMatch;
    }
  }

  return undefined;
}

export function getScopedSidebar(sidebar, pathname, base = '/') {
  const { project, version } = getRouteContext(pathname, base);

  if (!project || !version) {
    return sidebar;
  }

  const versionHref = buildVersionHref(base, project.slug, version.slug, []);
  const filteredSidebar = filterSidebarEntries(sidebar, versionHref);
  const versionGroup = findVersionGroup(filteredSidebar, version.label);

  return versionGroup?.entries?.length ? versionGroup.entries : filteredSidebar;
}
