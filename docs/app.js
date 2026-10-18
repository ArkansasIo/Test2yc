const API_BASE_URL = window.API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function refresh() {
  const status = document.querySelector('#status');
  const records = document.querySelector('#records');
  try {
    const health = await request('/health');
    status.textContent = `API online · database: ${health.database}`;
    status.className = 'ok';
    const data = await request('/records');
    records.innerHTML = data.records.length
      ? data.records.map(r => `<article><strong>${escapeHtml(r.name)}</strong><span>${escapeHtml(r.value ?? '')}</span></article>`).join('')
      : '<p>No records found.</p>';
  } catch (error) {
    status.textContent = `API unavailable: ${error.message}`;
    status.className = 'error';
    records.textContent = 'Unable to load records.';
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

document.querySelector('#refresh').addEventListener('click', refresh);
refresh();
