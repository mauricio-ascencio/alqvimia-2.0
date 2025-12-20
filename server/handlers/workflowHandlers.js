// Manejadores para Workflows
export function registerWorkflowHandlers(io, socket, serverState) {

  // Obtener todos los workflows
  socket.on('workflow:get-all', () => {
    console.log(`[Workflow] Solicitando lista de workflows`)

    // TODO: Obtener de base de datos
    const workflows = Array.from(serverState.activeWorkflows.values())

    socket.emit('workflow:list', { workflows })
  })

  // Obtener un workflow específico
  socket.on('workflow:get', (data) => {
    const workflowId = data?.workflowId

    if (!workflowId) {
      socket.emit('workflow:error', { message: 'ID de workflow requerido' })
      return
    }

    const workflow = serverState.activeWorkflows.get(workflowId)

    if (workflow) {
      socket.emit('workflow:data', { workflow })
    } else {
      socket.emit('workflow:error', { message: 'Workflow no encontrado' })
    }
  })

  // Crear nuevo workflow
  socket.on('workflow:create', (data) => {
    const workflow = {
      id: `wf_${Date.now()}`,
      name: data?.name || 'Nuevo Workflow',
      description: data?.description || '',
      actions: data?.actions || [],
      variables: data?.variables || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: socket.id
    }

    serverState.activeWorkflows.set(workflow.id, workflow)

    socket.emit('workflow:created', {
      success: true,
      workflow
    })

    console.log(`[Workflow] Creado: ${workflow.name}`)
  })

  // Actualizar workflow
  socket.on('workflow:update', (data) => {
    const workflowId = data?.workflowId
    const workflow = serverState.activeWorkflows.get(workflowId)

    if (!workflow) {
      socket.emit('workflow:error', { message: 'Workflow no encontrado' })
      return
    }

    // Actualizar campos
    if (data.name) workflow.name = data.name
    if (data.description) workflow.description = data.description
    if (data.actions) workflow.actions = data.actions
    if (data.variables) workflow.variables = data.variables
    workflow.updatedAt = new Date().toISOString()

    socket.emit('workflow:updated', {
      success: true,
      workflow
    })

    console.log(`[Workflow] Actualizado: ${workflow.name}`)
  })

  // Eliminar workflow
  socket.on('workflow:delete', (data) => {
    const workflowId = data?.workflowId

    if (serverState.activeWorkflows.has(workflowId)) {
      serverState.activeWorkflows.delete(workflowId)

      socket.emit('workflow:deleted', {
        success: true,
        workflowId
      })

      console.log(`[Workflow] Eliminado: ${workflowId}`)
    } else {
      socket.emit('workflow:error', { message: 'Workflow no encontrado' })
    }
  })

  // Duplicar workflow
  socket.on('workflow:duplicate', (data) => {
    const workflowId = data?.workflowId
    const original = serverState.activeWorkflows.get(workflowId)

    if (!original) {
      socket.emit('workflow:error', { message: 'Workflow no encontrado' })
      return
    }

    const duplicate = {
      ...JSON.parse(JSON.stringify(original)),
      id: `wf_${Date.now()}`,
      name: `${original.name} (copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    serverState.activeWorkflows.set(duplicate.id, duplicate)

    socket.emit('workflow:duplicated', {
      success: true,
      workflow: duplicate
    })

    console.log(`[Workflow] Duplicado: ${duplicate.name}`)
  })

  // Exportar workflow
  socket.on('workflow:export', (data) => {
    const workflowId = data?.workflowId
    const workflow = serverState.activeWorkflows.get(workflowId)

    if (!workflow) {
      socket.emit('workflow:error', { message: 'Workflow no encontrado' })
      return
    }

    const exportData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      workflow: workflow
    }

    socket.emit('workflow:exported', {
      success: true,
      data: JSON.stringify(exportData, null, 2),
      filename: `${workflow.name.replace(/\s+/g, '_')}.json`
    })
  })

  // Importar workflow
  socket.on('workflow:import', (data) => {
    try {
      const importData = typeof data.content === 'string'
        ? JSON.parse(data.content)
        : data.content

      const workflow = {
        ...importData.workflow,
        id: `wf_${Date.now()}`,
        importedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      serverState.activeWorkflows.set(workflow.id, workflow)

      socket.emit('workflow:imported', {
        success: true,
        workflow
      })

      console.log(`[Workflow] Importado: ${workflow.name}`)
    } catch (error) {
      socket.emit('workflow:error', {
        message: 'Error al importar workflow',
        error: error.message
      })
    }
  })

  // Validar workflow
  socket.on('workflow:validate', (data) => {
    const workflowId = data?.workflowId
    const workflow = serverState.activeWorkflows.get(workflowId)

    if (!workflow) {
      socket.emit('workflow:error', { message: 'Workflow no encontrado' })
      return
    }

    const errors = []
    const warnings = []

    // Validaciones básicas
    if (!workflow.actions || workflow.actions.length === 0) {
      errors.push('El workflow no tiene acciones definidas')
    }

    if (!workflow.name || workflow.name.trim() === '') {
      warnings.push('El workflow no tiene nombre')
    }

    socket.emit('workflow:validated', {
      workflowId,
      valid: errors.length === 0,
      errors,
      warnings
    })
  })
}
