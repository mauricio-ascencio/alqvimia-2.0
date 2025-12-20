import { create } from 'zustand'

export const useExecutorStore = create((set) => ({
  // Estado de ejecución
  isExecuting: false,
  currentStepIndex: -1,
  totalSteps: 0,
  executionLogs: [],
  executionStatus: 'idle', // idle, running, paused, completed, error
  executionStartTime: null,
  executionEndTime: null,
  executionError: null,

  // Workflow en ejecución
  executingWorkflow: null,

  // Iniciar ejecución
  startExecution: (workflow) => set({
    isExecuting: true,
    executingWorkflow: workflow,
    currentStepIndex: 0,
    totalSteps: workflow.steps?.length || workflow.actions?.length || 0,
    executionLogs: [],
    executionStatus: 'running',
    executionStartTime: Date.now(),
    executionEndTime: null,
    executionError: null
  }),

  // Detener ejecución
  stopExecution: () => set((state) => ({
    isExecuting: false,
    executionStatus: 'stopped',
    executionEndTime: Date.now()
  })),

  // Pausar/Reanudar
  pauseExecution: () => set((state) => ({
    executionStatus: state.executionStatus === 'paused' ? 'running' : 'paused'
  })),

  // Actualizar progreso
  setCurrentStep: (index) => set({ currentStepIndex: index }),

  // Completar ejecución
  completeExecution: (success = true) => set({
    isExecuting: false,
    executionStatus: success ? 'completed' : 'error',
    executionEndTime: Date.now()
  }),

  // Añadir log
  addLog: (log) => set((state) => ({
    executionLogs: [...state.executionLogs, {
      ...log,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }]
  })),

  // Limpiar logs
  clearLogs: () => set({ executionLogs: [] }),

  // Establecer error
  setError: (error) => set({
    executionError: error,
    executionStatus: 'error',
    isExecuting: false,
    executionEndTime: Date.now()
  }),

  // Reset
  resetExecution: () => set({
    isExecuting: false,
    currentStepIndex: -1,
    totalSteps: 0,
    executionLogs: [],
    executionStatus: 'idle',
    executionStartTime: null,
    executionEndTime: null,
    executionError: null,
    executingWorkflow: null
  })
}))
