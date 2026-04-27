import { create } from 'zustand'
import * as api from '../api/issueApi'

/**
 * useIssueStore — API-backed Zustand store.
 *
 * State shape:
 *   issues[]   — the full list loaded from the backend
 *   loading    — true while any network request is in flight
 *   error      — last error message, or null
 *
 * All mutations hit the API first, then update local state on success.
 */
const useIssueStore = create((set, get) => ({
  issues:  [],
  loading: false,
  error:   null,

  // ── helpers ──────────────────────────────────
  _setLoading: (v) => set({ loading: v }),
  _setError:   (e) => set({ error: e, loading: false }),

  // ── READ ─────────────────────────────────────
  /**
   * Load all issues from the backend.
   * Call once on Dashboard mount.
   */
  loadIssues: async (params = {}) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.fetchIssues(params)
      set({ issues: data.data, loading: false })
    } catch (err) {
      get()._setError(err.response?.data?.message ?? err.message)
    }
  },

  // ── CREATE ────────────────────────────────────
  addIssue: async (formData) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.createIssue(formData)
      set((s) => ({ issues: [data.data, ...s.issues], loading: false }))
      return data.data   // return so the form can navigate to the new issue
    } catch (err) {
      get()._setError(err.response?.data?.message ?? err.message)
      throw err          // re-throw so the form can show inline errors
    }
  },

  // ── UPDATE (general fields) ───────────────────
  updateIssue: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.updateIssue(id, updates)
      set((s) => ({
        issues: s.issues.map((i) => (i._id === id ? data.data : i)),
        loading: false,
      }))
    } catch (err) {
      get()._setError(err.response?.data?.message ?? err.message)
      throw err
    }
  },

  // ── STATUS CHANGE ─────────────────────────────
  updateStatus: async (id, status) => {
    try {
      const { data } = await api.updateStatus(id, status)
      set((s) => ({
        issues: s.issues.map((i) => (i._id === id ? data.data : i)),
      }))
    } catch (err) {
      get()._setError(err.response?.data?.message ?? err.message)
    }
  },

  // ── CLOSE ─────────────────────────────────────
  closeIssue: async (id, closureNote, closureProof = []) => {
    try {
      const { data } = await api.closeIssue(id, { closureNote, closureProof })
      set((s) => ({
        issues: s.issues.map((i) => (i._id === id ? data.data : i)),
      }))
    } catch (err) {
      get()._setError(err.response?.data?.message ?? err.message)
      throw err
    }
  },

  // ── PIN ───────────────────────────────────────
  togglePin: async (id) => {
    try {
      const { data } = await api.togglePin(id)
      set((s) => ({
        issues: s.issues.map((i) => (i._id === id ? data.data : i)),
      }))
    } catch (err) {
      get()._setError(err.response?.data?.message ?? err.message)
    }
  },

  // ── DELETE ────────────────────────────────────
  deleteIssue: async (id) => {
    try {
      await api.deleteIssue(id)
      set((s) => ({ issues: s.issues.filter((i) => i._id !== id) }))
    } catch (err) {
      get()._setError(err.response?.data?.message ?? err.message)
    }
  },

  // ── CLEAR ERROR ─────────────────────────────
  clearError: () => set({ error: null }),
}))

export default useIssueStore
// zustand store setup
