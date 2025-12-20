import { create } from 'zustand'

export const useUIStore = create((set) => ({
  // Estado de paneles
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  sidebarCollapsed: false,

  // Modal activo
  activeModal: null,
  modalData: null,

  // Notificaciones
  notifications: [],

  // Tema
  theme: 'dark',

  // Acciones de paneles
  toggleLeftPanel: () => set((state) => ({
    leftPanelCollapsed: !state.leftPanelCollapsed
  })),

  toggleRightPanel: () => set((state) => ({
    rightPanelCollapsed: !state.rightPanelCollapsed
  })),

  toggleSidebar: () => set((state) => ({
    sidebarCollapsed: !state.sidebarCollapsed
  })),

  setLeftPanelCollapsed: (collapsed) => set({ leftPanelCollapsed: collapsed }),
  setRightPanelCollapsed: (collapsed) => set({ rightPanelCollapsed: collapsed }),

  // Acciones de modal
  openModal: (modalId, data = null) => set({
    activeModal: modalId,
    modalData: data
  }),

  closeModal: () => set({
    activeModal: null,
    modalData: null
  }),

  // Acciones de notificaciones
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id)
  })),

  clearNotifications: () => set({ notifications: [] }),

  // Tema
  setTheme: (theme) => set({ theme })
}))
