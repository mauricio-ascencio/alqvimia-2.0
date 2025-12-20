// Manejadores para Agentes IA
export function registerAgentHandlers(io, socket, serverState) {

  // Obtener todos los agentes
  socket.on('agent:get-all', () => {
    console.log(`[Agent] Solicitando lista de agentes`)

    const agents = Array.from(serverState.agents.values())
    socket.emit('agent:list', { agents })
  })

  // Crear nuevo agente
  socket.on('agent:create', (data) => {
    const agent = {
      id: `agent_${Date.now()}`,
      name: data?.name || 'Nuevo Agente',
      description: data?.description || '',
      type: data?.type || 'assistant',
      model: data?.model || 'gpt-4',
      systemPrompt: data?.systemPrompt || '',
      tools: data?.tools || [],
      status: 'inactive',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    serverState.agents.set(agent.id, agent)

    socket.emit('agent:created', {
      success: true,
      agent
    })

    console.log(`[Agent] Creado: ${agent.name}`)
  })

  // Actualizar agente
  socket.on('agent:update', (data) => {
    const agentId = data?.agentId
    const agent = serverState.agents.get(agentId)

    if (!agent) {
      socket.emit('agent:error', { message: 'Agente no encontrado' })
      return
    }

    // Actualizar campos
    if (data.name) agent.name = data.name
    if (data.description) agent.description = data.description
    if (data.type) agent.type = data.type
    if (data.model) agent.model = data.model
    if (data.systemPrompt) agent.systemPrompt = data.systemPrompt
    if (data.tools) agent.tools = data.tools
    agent.updatedAt = new Date().toISOString()

    socket.emit('agent:updated', {
      success: true,
      agent
    })

    console.log(`[Agent] Actualizado: ${agent.name}`)
  })

  // Eliminar agente
  socket.on('agent:delete', (data) => {
    const agentId = data?.agentId

    if (serverState.agents.has(agentId)) {
      serverState.agents.delete(agentId)

      socket.emit('agent:deleted', {
        success: true,
        agentId
      })

      console.log(`[Agent] Eliminado: ${agentId}`)
    } else {
      socket.emit('agent:error', { message: 'Agente no encontrado' })
    }
  })

  // Activar agente
  socket.on('agent:activate', (data) => {
    const agentId = data?.agentId
    const agent = serverState.agents.get(agentId)

    if (!agent) {
      socket.emit('agent:error', { message: 'Agente no encontrado' })
      return
    }

    agent.status = 'active'
    agent.activatedAt = new Date().toISOString()

    socket.emit('agent:activated', {
      success: true,
      agentId,
      status: 'active'
    })

    console.log(`[Agent] Activado: ${agent.name}`)
  })

  // Desactivar agente
  socket.on('agent:deactivate', (data) => {
    const agentId = data?.agentId
    const agent = serverState.agents.get(agentId)

    if (!agent) {
      socket.emit('agent:error', { message: 'Agente no encontrado' })
      return
    }

    agent.status = 'inactive'
    agent.deactivatedAt = new Date().toISOString()

    socket.emit('agent:deactivated', {
      success: true,
      agentId,
      status: 'inactive'
    })

    console.log(`[Agent] Desactivado: ${agent.name}`)
  })

  // Enviar mensaje a agente
  socket.on('agent:message', async (data) => {
    const agentId = data?.agentId
    const agent = serverState.agents.get(agentId)

    if (!agent) {
      socket.emit('agent:error', { message: 'Agente no encontrado' })
      return
    }

    if (agent.status !== 'active') {
      socket.emit('agent:error', { message: 'El agente no está activo' })
      return
    }

    const messageId = `msg_${Date.now()}`

    socket.emit('agent:message-received', {
      messageId,
      agentId,
      status: 'processing'
    })

    // TODO: Integrar con OpenAI/Anthropic API
    // Por ahora simulamos una respuesta

    setTimeout(() => {
      const response = {
        messageId,
        agentId,
        agentName: agent.name,
        userMessage: data?.message,
        response: `[Simulación] Respuesta del agente ${agent.name} al mensaje: "${data?.message}"`,
        timestamp: new Date().toISOString()
      }

      socket.emit('agent:response', response)
    }, 1000)
  })

  // Obtener historial de conversación
  socket.on('agent:get-history', (data) => {
    const agentId = data?.agentId

    // TODO: Obtener de base de datos
    socket.emit('agent:history', {
      agentId,
      messages: []
    })
  })

  // Limpiar historial
  socket.on('agent:clear-history', (data) => {
    const agentId = data?.agentId

    // TODO: Limpiar en base de datos

    socket.emit('agent:history-cleared', {
      success: true,
      agentId
    })
  })

  // Obtener herramientas disponibles para agentes
  socket.on('agent:get-tools', () => {
    const availableTools = [
      { id: 'web_search', name: 'Búsqueda Web', description: 'Buscar en internet' },
      { id: 'code_interpreter', name: 'Intérprete de Código', description: 'Ejecutar código Python' },
      { id: 'file_browser', name: 'Explorador de Archivos', description: 'Leer y escribir archivos' },
      { id: 'workflow_executor', name: 'Ejecutor de Workflows', description: 'Ejecutar workflows de Alqvimia' },
      { id: 'database_query', name: 'Consulta BD', description: 'Ejecutar queries SQL' },
      { id: 'api_caller', name: 'Llamador API', description: 'Hacer peticiones HTTP' }
    ]

    socket.emit('agent:tools', { tools: availableTools })
  })
}
