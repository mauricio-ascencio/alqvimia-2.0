const API_BASE = 'http://localhost:3000'

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`

  const defaultHeaders = {
    'Content-Type': 'application/json'
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error de red' }))
      throw new Error(error.message || `HTTP Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error)
    throw error
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),

  post: (endpoint, data) => request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  put: (endpoint, data) => request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  delete: (endpoint) => request(endpoint, { method: 'DELETE' })
}

// Servicios específicos
export const workflowService = {
  getAll: () => api.get('/api/workflows'),
  getById: (id) => api.get(`/api/workflows/${id}`),
  save: (workflow) => api.post('/api/workflows/save', workflow),
  delete: (id) => api.delete(`/api/workflows/${id}`)
}

export const settingsService = {
  load: () => api.get('/api/settings/load'),
  save: (settings) => api.post('/api/settings/save', settings)
}

export const databaseService = {
  testConnection: (config) => api.post('/api/database/test-connection', config),
  listDatabases: (config) => api.post('/api/database/list-databases', config),
  connect: (config) => api.post('/api/database/connect', config),
  listTables: (config) => api.post('/api/database/list-tables', config),
  executeQuery: (data) => api.post('/api/database/execute-query', data),
  exportData: (data) => api.post('/api/database/export', data)
}

export const omnichannelService = {
  initialize: () => api.post('/api/omnichannel/initialize'),
  getStatus: () => api.get('/api/omnichannel/status'),
  getWhatsAppQR: () => api.get('/api/omnichannel/whatsapp/qr'),
  sendMessage: (data) => api.post('/api/omnichannel/send-message', data),
  getConversations: () => api.get('/api/omnichannel/conversations'),
  shutdown: () => api.post('/api/omnichannel/shutdown')
}

export const videoConferenceService = {
  uploadRecording: (formData) => fetch(`${API_BASE}/api/video-conference/upload-recording`, {
    method: 'POST',
    body: formData
  }).then(res => res.json()),

  saveSession: (session) => api.post('/api/video-conference/save-session', session),
  saveMinutes: (data) => api.post('/api/video-conference/save-minutes', data),
  sendInvite: (data) => api.post('/api/video-conference/send-invite', data),
  testSMTP: (config) => api.post('/api/video-conference/test-smtp', config)
}

export const aiService = {
  loadConfig: () => api.get('/api/ai-config/load'),
  saveConfig: (config) => api.post('/api/ai-config/save', config),
  testConnection: (provider) => api.post('/api/ai-config/test', provider)
}

export default api
