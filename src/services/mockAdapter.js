// Creates an axios-compatible adapter that handles /api/addresses endpoints
export default function createMockAdapter(storageKey = 'fy_addresses_v1') {
  // helper to read/write storage
  const read = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  const write = (data) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  // ensure some seed if not present
  if (!read()) {
    // don't seed here; leave to existing data file or Addresses page if needed
    write([]);
  }

  return async function mockAdapter(config) {
    const { url = '', method = 'get', data } = config;
    const parsedUrl = url.split('?')[0];

    // small delay to simulate network
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    await delay(300);

    if (parsedUrl === '/api/addresses' && method.toLowerCase() === 'get') {
      const list = read() || [];
      return { data: list, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (parsedUrl === '/api/addresses' && method.toLowerCase() === 'post') {
      const payload = typeof data === 'string' ? JSON.parse(data) : data;
      const list = read() || [];
      const id = `addr-${Date.now()}`;
      const item = { ...payload, id };
      // if item requests default, unset others
      const next = item.isDefault ? list.map(a => ({ ...a, isDefault: false })) : list.slice();
      next.unshift(item);
      write(next);
      return { data: item, status: 201, statusText: 'Created', headers: {}, config };
    }

    // PUT /api/addresses/:id
    if (parsedUrl.startsWith('/api/addresses/') && method.toLowerCase() === 'put') {
      const id = parsedUrl.replace('/api/addresses/', '');
      const payload = typeof data === 'string' ? JSON.parse(data) : data;
      const list = read() || [];
      const next = list.map(a => a.id === id ? { ...a, ...payload } : a);
      // if payload sets default, ensure others unset
      if (payload.isDefault) {
        for (const a of next) if (a.id !== id) a.isDefault = false;
      }
      write(next);
      const updated = next.find(a => a.id === id);
      return { data: updated, status: 200, statusText: 'OK', headers: {}, config };
    }

    // DELETE /api/addresses/:id
    if (parsedUrl.startsWith('/api/addresses/') && method.toLowerCase() === 'delete') {
      const id = parsedUrl.replace('/api/addresses/', '');
      const list = read() || [];
      const next = list.filter(a => a.id !== id);
      write(next);
      return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config };
    }

    // Fallback: pass-through: attempt to fetch from real network using browser fetch
    // but in this environment, return 404
    return { data: null, status: 404, statusText: 'Not Found', headers: {}, config };
  };
}
