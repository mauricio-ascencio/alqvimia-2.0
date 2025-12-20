import { create } from 'zustand'

export const useWorkflowStore = create((set, get) => ({
  // Estado del workflow actual
  currentWorkflow: [],
  selectedStep: null,
  workflowName: 'Mi Workflow',
  workflowId: null,
  isDirty: false,

  // Tabs de workflows abiertos
  openTabs: [{ id: 'default', name: 'Mi Workflow', steps: [] }],
  activeTabId: 'default',

  // Acciones del workflow
  addStep: (step) => set((state) => ({
    currentWorkflow: [...state.currentWorkflow, { ...step, id: Date.now() }],
    isDirty: true
  })),

  removeStep: (stepId) => set((state) => ({
    currentWorkflow: state.currentWorkflow.filter((s) => s.id !== stepId),
    selectedStep: state.selectedStep?.id === stepId ? null : state.selectedStep,
    isDirty: true
  })),

  updateStep: (stepId, updates) => set((state) => ({
    currentWorkflow: state.currentWorkflow.map((step) =>
      step.id === stepId ? { ...step, ...updates } : step
    ),
    selectedStep: state.selectedStep?.id === stepId
      ? { ...state.selectedStep, ...updates }
      : state.selectedStep,
    isDirty: true
  })),

  reorderSteps: (newOrder) => set({
    currentWorkflow: newOrder,
    isDirty: true
  }),

  selectStep: (step) => set({ selectedStep: step }),

  clearSelection: () => set({ selectedStep: null }),

  setWorkflowName: (name) => set({ workflowName: name, isDirty: true }),

  clearWorkflow: () => set({
    currentWorkflow: [],
    selectedStep: null,
    workflowName: 'Mi Workflow',
    workflowId: null,
    isDirty: false
  }),

  loadWorkflow: (workflow) => set({
    currentWorkflow: workflow.steps || workflow.actions || [],
    workflowName: workflow.name || 'Workflow Cargado',
    workflowId: workflow.id,
    selectedStep: null,
    isDirty: false
  }),

  markSaved: () => set({ isDirty: false }),

  // Gestión de tabs
  addTab: (tab) => set((state) => ({
    openTabs: [...state.openTabs, tab],
    activeTabId: tab.id
  })),

  closeTab: (tabId) => set((state) => {
    const newTabs = state.openTabs.filter((t) => t.id !== tabId)
    return {
      openTabs: newTabs,
      activeTabId: state.activeTabId === tabId
        ? (newTabs[0]?.id || null)
        : state.activeTabId
    }
  }),

  setActiveTab: (tabId) => set({ activeTabId: tabId })
}))
