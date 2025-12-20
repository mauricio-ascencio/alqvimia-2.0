// Manejadores para el Ejecutor de Workflows
export function registerExecutorHandlers(io, socket, serverState) {

  // Estado de ejecuciones por cliente
  const executions = new Map()

  // Ejecutar workflow
  socket.on('executor:run', async (data) => {
    const workflowId = data?.workflowId
    const workflow = serverState.activeWorkflows.get(workflowId)

    if (!workflow) {
      socket.emit('executor:error', { message: 'Workflow no encontrado' })
      return
    }

    const executionId = `exec_${Date.now()}`
    const execution = {
      id: executionId,
      workflowId,
      workflowName: workflow.name,
      status: 'running',
      startedAt: new Date(),
      currentStep: 0,
      totalSteps: workflow.actions.length,
      logs: [],
      variables: { ...data?.variables }
    }

    executions.set(executionId, execution)

    socket.emit('executor:started', {
      executionId,
      workflowName: workflow.name,
      totalSteps: execution.totalSteps
    })

    console.log(`[Executor] Iniciando: ${workflow.name}`)

    // Simular ejecución de acciones
    for (let i = 0; i < workflow.actions.length; i++) {
      const action = workflow.actions[i]
      execution.currentStep = i + 1

      // Verificar si fue pausado o detenido
      if (execution.status === 'paused') {
        socket.emit('executor:paused', { executionId, step: i + 1 })
        // Esperar a que se reanude
        await waitForResume(execution)
      }

      if (execution.status === 'stopped') {
        socket.emit('executor:stopped', { executionId, step: i + 1 })
        return
      }

      // Notificar paso actual
      socket.emit('executor:step', {
        executionId,
        step: i + 1,
        totalSteps: workflow.actions.length,
        action: {
          type: action.type,
          label: action.label || action.type
        }
      })

      // Log de la acción
      const log = {
        timestamp: new Date().toISOString(),
        step: i + 1,
        type: 'info',
        message: `Ejecutando: ${action.label || action.type}`
      }
      execution.logs.push(log)
      socket.emit('executor:log', { executionId, log })

      // TODO: Ejecutar acción real
      // Por ahora simulamos un delay
      await sleep(500)

      // Log de éxito
      const successLog = {
        timestamp: new Date().toISOString(),
        step: i + 1,
        type: 'success',
        message: `Completado: ${action.label || action.type}`
      }
      execution.logs.push(successLog)
      socket.emit('executor:log', { executionId, log: successLog })
    }

    // Completar ejecución
    execution.status = 'completed'
    execution.endedAt = new Date()
    execution.duration = execution.endedAt - execution.startedAt

    socket.emit('executor:completed', {
      executionId,
      duration: execution.duration,
      stepsExecuted: execution.totalSteps
    })

    console.log(`[Executor] Completado: ${workflow.name} en ${execution.duration}ms`)
  })

  // Pausar ejecución
  socket.on('executor:pause', (data) => {
    const execution = executions.get(data?.executionId)

    if (execution && execution.status === 'running') {
      execution.status = 'paused'
      console.log(`[Executor] Pausado: ${execution.workflowName}`)
    }
  })

  // Reanudar ejecución
  socket.on('executor:resume', (data) => {
    const execution = executions.get(data?.executionId)

    if (execution && execution.status === 'paused') {
      execution.status = 'running'
      console.log(`[Executor] Reanudado: ${execution.workflowName}`)
    }
  })

  // Detener ejecución
  socket.on('executor:stop', (data) => {
    const execution = executions.get(data?.executionId)

    if (execution) {
      execution.status = 'stopped'
      execution.endedAt = new Date()
      console.log(`[Executor] Detenido: ${execution.workflowName}`)
    }
  })

  // Obtener estado de ejecución
  socket.on('executor:status', (data) => {
    const execution = executions.get(data?.executionId)

    if (execution) {
      socket.emit('executor:status', {
        executionId: execution.id,
        status: execution.status,
        currentStep: execution.currentStep,
        totalSteps: execution.totalSteps,
        duration: execution.endedAt
          ? execution.endedAt - execution.startedAt
          : Date.now() - execution.startedAt
      })
    } else {
      socket.emit('executor:error', { message: 'Ejecución no encontrada' })
    }
  })

  // Obtener logs de ejecución
  socket.on('executor:get-logs', (data) => {
    const execution = executions.get(data?.executionId)

    if (execution) {
      socket.emit('executor:logs', {
        executionId: execution.id,
        logs: execution.logs
      })
    }
  })

  // Obtener historial de ejecuciones
  socket.on('executor:history', () => {
    const history = Array.from(executions.values()).map(exec => ({
      id: exec.id,
      workflowId: exec.workflowId,
      workflowName: exec.workflowName,
      status: exec.status,
      startedAt: exec.startedAt,
      endedAt: exec.endedAt,
      duration: exec.duration
    }))

    socket.emit('executor:history', { executions: history })
  })
}

// Utilidades
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function waitForResume(execution) {
  return new Promise(resolve => {
    const check = setInterval(() => {
      if (execution.status !== 'paused') {
        clearInterval(check)
        resolve()
      }
    }, 100)
  })
}
