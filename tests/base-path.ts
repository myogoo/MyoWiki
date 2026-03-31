import { readFileSync } from 'node:fs';

export function normalizeBasePath(input?: string) {
  if (!input || input === '/') {
    return '';
  }

  return `/${input.replace(/^\/+|\/+$/g, '')}`;
}

function normalizeSite(input: string) {
  return input.replace(/\/$/, '');
}

function getConfiguredSite(env: NodeJS.ProcessEnv = process.env) {
  const explicitSite = env.PLAYWRIGHT_SITE_URL ?? env.SITE_URL;
  if (explicitSite) {
    return normalizeSite(explicitSite);
  }

  try {
    const configuredDomain = readFileSync(new URL('../public/CNAME', import.meta.url), 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith('#'));

    if (configuredDomain) {
      return normalizeSite(
        configuredDomain.match(/^https?:\/\//i) ? configuredDomain : `https://${configuredDomain}`,
      );
    }
  } catch {
    // No custom domain file is configured.
  }

  return '';
}

function inferBasePathFromSite(env: NodeJS.ProcessEnv = process.env) {
  const configuredSite = getConfiguredSite(env);
  if (!configuredSite) {
    return null;
  }

  try {
    const parsedSite = new URL(configuredSite);
    const siteBasePath = normalizeBasePath(parsedSite.pathname);

    if (siteBasePath) {
      return siteBasePath;
    }

    const repository = env.GITHUB_REPOSITORY;
    const [owner] = repository?.split('/') ?? [];
    const projectPagesHost = owner ? `${owner}.github.io`.toLowerCase() : '';

    if (!projectPagesHost || parsedSite.hostname.toLowerCase() !== projectPagesHost) {
      return '';
    }
  } catch {
    return '';
  }

  return null;
}

export function inferBasePath(env: NodeJS.ProcessEnv = process.env) {
  const explicitBasePath = env.PLAYWRIGHT_BASE_PATH ?? env.BASE_PATH;
  if (explicitBasePath) {
    return normalizeBasePath(explicitBasePath);
  }

  const siteBasePath = inferBasePathFromSite(env);
  if (siteBasePath !== null) {
    return siteBasePath;
  }

  const repository = env.GITHUB_REPOSITORY;
  if (!repository) {
    return '';
  }

  const [owner, repo] = repository.split('/');
  if (!owner || !repo || repo.toLowerCase() === `${owner}.github.io`.toLowerCase()) {
    return '';
  }

  return `/${repo}`;
}

export function withBasePath(path: string, env: NodeJS.ProcessEnv = process.env) {
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  const basePath = inferBasePath(env);

  if (!basePath) {
    return normalizedPath;
  }

  return normalizedPath === '/' ? `${basePath}/` : `${basePath}${normalizedPath}`;
}
