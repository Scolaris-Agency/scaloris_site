// Thin fetch wrapper for the Scolaris backend's public (unauthenticated)
// endpoints. Used from both Server Components (agency/content/pages reads,
// rendered into the HTML at request/revalidation time — this is the whole
// point of the SSR migration: that content is in the initial page source,
// not fetched client-side after mount) and the one genuinely client-side
// call, the contact form's POST /leads (see components/ContactForm.tsx).
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function apiFetch<T>(
  path: string,
  options?: { method?: string; body?: unknown; revalidate?: number },
): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    method: options?.method ?? 'GET',
    headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    // Reads (agency/content/pages) revalidate in the background every 60s —
    // fresh enough after a dashboard edit without hitting the backend on
    // every single request. Writes (leads POST) skip the cache entirely.
    ...(options?.method && options.method !== 'GET'
      ? { cache: 'no-store' as const }
      : { next: { revalidate: options?.revalidate ?? 60 } }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new ApiError(data?.message ?? 'Une erreur est survenue.', res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}
