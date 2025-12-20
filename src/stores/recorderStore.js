import { create } from 'zustand'

export const useRecorderStore = create((set) => ({
  // Estado de grabación
  isRecording: false,
  isPaused: false,
  recordedActions: [],
  targetUrl: '',
  recordingStartTime: null,

  // Acciones de grabación
  startRecording: (url = '') => set({
    isRecording: true,
    isPaused: false,
    recordedActions: [],
    targetUrl: url,
    recordingStartTime: Date.now()
  }),

  stopRecording: () => set({
    isRecording: false,
    isPaused: false,
    recordingStartTime: null
  }),

  pauseRecording: () => set((state) => ({
    isPaused: !state.isPaused
  })),

  addAction: (action) => set((state) => ({
    recordedActions: [...state.recordedActions, {
      ...action,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }]
  })),

  removeAction: (actionId) => set((state) => ({
    recordedActions: state.recordedActions.filter((a) => a.id !== actionId)
  })),

  updateAction: (actionId, updates) => set((state) => ({
    recordedActions: state.recordedActions.map((action) =>
      action.id === actionId ? { ...action, ...updates } : action
    )
  })),

  reorderActions: (newOrder) => set({
    recordedActions: newOrder
  }),

  clearActions: () => set({
    recordedActions: [],
    targetUrl: ''
  }),

  setTargetUrl: (url) => set({ targetUrl: url })
}))
