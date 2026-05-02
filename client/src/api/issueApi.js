import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

// ── Issues ──────────────────────────────────────────
export const fetchIssues      = (params = {}) => api.get('/issues', { params })
export const fetchIssueById   = (id)          => api.get(`/issues/${id}`)
export const fetchStats       = ()            => api.get('/issues/stats')

export const uploadFiles      = (formData, category = 'maintenance') => api.post(`/upload?category=${category}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

export const createIssue      = (data)        => api.post('/issues', data)
export const updateIssue      = (id, data)    => api.patch(`/issues/${id}`, data)
export const updateStatus     = (id, status)  => api.patch(`/issues/${id}/status`, { status })
export const closeIssue       = (id, data)    => api.patch(`/issues/${id}/close`, data)
export const togglePin        = (id)          => api.patch(`/issues/${id}/pin`)
export const deleteIssue      = (id)          => api.delete(`/issues/${id}`)

export default api
