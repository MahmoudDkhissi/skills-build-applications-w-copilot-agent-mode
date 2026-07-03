const DEFAULT_API_BASE_URL = 'http://localhost:8000';

export function getApiBaseUrl() {
  // Set VITE_CODESPACE_NAME in .env.local for Codespaces URLs.
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : DEFAULT_API_BASE_URL;
}

export function buildApiUrl(path) {
  return new URL(path, `${getApiBaseUrl().replace(/\/$/, '')}/`).toString();
}

function getNestedItems(value) {
  if (!value || typeof value !== 'object') {
    return [];
  }

  const candidateKeys = ['items', 'data', 'results', 'docs', 'documents', 'records', 'payload'];

  for (const key of candidateKeys) {
    const candidate = value[key];

    if (Array.isArray(candidate)) {
      return candidate;
    }

    if (candidate && typeof candidate === 'object') {
      const nestedItems = getNestedItems(candidate);

      if (nestedItems.length > 0) {
        return nestedItems;
      }
    }
  }

  return [];
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      total: payload.length,
      page: null,
      pageSize: null,
    };
  }

  const items = getNestedItems(payload);
  const total =
    payload && typeof payload === 'object'
      ? payload.count ?? payload.total ?? payload.totalCount ?? payload.totalItems ?? items.length
      : items.length;

  return {
    items,
    total,
    page: payload && typeof payload === 'object' ? payload.page ?? payload.currentPage ?? null : null,
    pageSize:
      payload && typeof payload === 'object' ? payload.pageSize ?? payload.limit ?? payload.perPage ?? null : null,
  };
}

export async function fetchCollection(path) {
  const response = await fetch(buildApiUrl(path));

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return normalizeCollectionResponse(await response.json());
}