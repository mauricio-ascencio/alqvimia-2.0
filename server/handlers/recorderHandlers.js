// Manejadores para el Grabador
export function registerRecorderHandlers(io, socket, serverState) {

  // Iniciar grabación
  socket.on('recorder:start', (data) => {
    console.log(`[Recorder] Iniciando grabación para ${socket.id}`)

    const session = {
      id: `rec_${Date.now()}`,
      clientId: socket.id,
      startedAt: new Date(),
      actions: [],
      config: {
        captureClicks: data?.captureClicks ?? true,
        captureKeyboard: data?.captureKeyboard ?? true,
        captureScroll: data?.captureScroll ?? false,
        targetWindow: data?.targetWindow || null
      }
    }

    serverState.recordingSessions.set(socket.id, session)

    socket.emit('recorder:started', {
      success: true,
      sessionId: session.id,
      message: 'Grabación iniciada'
    })
  })

  // Detener grabación
  socket.on('recorder:stop', () => {
    console.log(`[Recorder] Deteniendo grabación para ${socket.id}`)

    const session = serverState.recordingSessions.get(socket.id)

    if (session) {
      session.endedAt = new Date()
      session.duration = session.endedAt - session.startedAt

      socket.emit('recorder:stopped', {
        success: true,
        sessionId: session.id,
        actionsCount: session.actions.length,
        duration: session.duration,
        actions: session.actions
      })

      // Mantener la sesión por si quieren guardarla
    } else {
      socket.emit('recorder:stopped', {
        success: false,
        message: 'No hay sesión de grabación activa'
      })
    }
  })

  // Pausar grabación
  socket.on('recorder:pause', () => {
    const session = serverState.recordingSessions.get(socket.id)

    if (session) {
      session.paused = true
      session.pausedAt = new Date()

      socket.emit('recorder:paused', {
        success: true,
        sessionId: session.id
      })
    }
  })

  // Reanudar grabación
  socket.on('recorder:resume', () => {
    const session = serverState.recordingSessions.get(socket.id)

    if (session && session.paused) {
      session.paused = false
      session.pausedAt = null

      socket.emit('recorder:resumed', {
        success: true,
        sessionId: session.id
      })
    }
  })

  // Registrar acción capturada
  socket.on('recorder:action', (actionData) => {
    const session = serverState.recordingSessions.get(socket.id)

    if (session && !session.paused) {
      const action = {
        id: `action_${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...actionData
      }

      session.actions.push(action)

      // Notificar al cliente de la acción registrada
      socket.emit('recorder:action-recorded', {
        actionId: action.id,
        totalActions: session.actions.length
      })

      console.log(`[Recorder] Acción registrada: ${action.type}`)
    }
  })

  // Obtener acciones grabadas
  socket.on('recorder:get-actions', () => {
    const session = serverState.recordingSessions.get(socket.id)

    if (session) {
      socket.emit('recorder:actions', {
        sessionId: session.id,
        actions: session.actions
      })
    } else {
      socket.emit('recorder:actions', {
        actions: []
      })
    }
  })

  // Guardar grabación como workflow
  socket.on('recorder:save-as-workflow', (data) => {
    const session = serverState.recordingSessions.get(socket.id)

    if (session) {
      const workflow = {
        id: `wf_${Date.now()}`,
        name: data?.name || 'Grabación sin nombre',
        description: data?.description || '',
        createdAt: new Date().toISOString(),
        actions: session.actions,
        source: 'recorder'
      }

      // TODO: Guardar en base de datos

      socket.emit('recorder:workflow-saved', {
        success: true,
        workflowId: workflow.id,
        message: 'Workflow guardado correctamente'
      })

      console.log(`[Recorder] Workflow guardado: ${workflow.name}`)
    }
  })

  // Limpiar sesión
  socket.on('recorder:clear', () => {
    serverState.recordingSessions.delete(socket.id)

    socket.emit('recorder:cleared', {
      success: true,
      message: 'Sesión de grabación limpiada'
    })
  })
}
