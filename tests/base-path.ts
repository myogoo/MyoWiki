export function normalizeBasePath(input?: string) {
  if (!input || input === '/') {
    return '';
  }

  return `/${input.replace(/^\/+|\/+$/g, '')}`;
}

export function inferBasePath(env: NodeJS.ProcessEnv = process.env) {
  const explicitBasePath = env.PLAYWRIGHT_BASE_PATH ?? env.BASE_PATH;
  if (explicitBasePath) {
    return normalizeBasePath(explicitBasePath);
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
