const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchReturns(params: { risk?: string; search?: string; limit?: number; offset?: number }) {
  const query = new URLSearchParams();
  if (params.risk) query.set('risk', params.risk);
  if (params.search) query.set('search', params.search);
  if (params.limit !== undefined) query.set('limit', String(params.limit));
  if (params.offset !== undefined) query.set('offset', String(params.offset));

  const response = await fetch(`${API_BASE}/returns?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`fetchReturns failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchReturnDetail(id: string) {
  const response = await fetch(`${API_BASE}/returns/${id}`);
  if (!response.ok) {
    throw new Error(`fetchReturnDetail failed: ${response.status}`);
  }
  return response.json();
}