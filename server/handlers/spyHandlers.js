// Manejadores para Element Spy
export function registerSpyHandlers(io, socket, serverState) {

  // Iniciar sesión de espionaje
  socket.on('spy:start', (data) => {
    console.log(`[Spy] Iniciando sesión para ${socket.id}`)

    serverState.spySessions.set(socket.id, {
      active: true,
      startedAt: new Date(),
      targetWindow: data?.targetWindow || null
    })

    socket.emit('spy:started', {
      success: true,
      message: 'Sesión de espionaje iniciada'
    })
  })

  // Detener sesión de espionaje
  socket.on('spy:stop', () => {
    console.log(`[Spy] Deteniendo sesión para ${socket.id}`)

    serverState.spySessions.delete(socket.id)

    socket.emit('spy:stopped', {
      success: true,
      message: 'Sesión de espionaje detenida'
    })
  })

  // Capturar elemento
  socket.on('spy:capture', (data) => {
    console.log(`[Spy] Captura solicitada: ${JSON.stringify(data)}`)

    // TODO: Integrar con automatización real (PyAutoGUI, etc.)
    // Por ahora enviamos datos simulados

    const elementData = {
      id: `element_${Date.now()}`,
      type: data?.type || 'unknown',
      selector: data?.selector || '',
      xpath: data?.xpath || '',
      attributes: data?.attributes || {},
      position: data?.position || { x: 0, y: 0 },
      size: data?.size || { width: 0, height: 0 },
      capturedAt: new Date().toISOString()
    }

    socket.emit('spy:element-captured', elementData)
  })

  // Obtener lista de ventanas disponibles
  socket.on('spy:get-windows', () => {
    console.log(`[Spy] Solicitando lista de ventanas`)

    // TODO: Integrar con el sistema operativo
    // Por ahora enviamos datos de ejemplo

    const windows = [
      { id: 1, title: 'Chrome - Google', processName: 'chrome.exe', handle: '0x1234' },
      { id: 2, title: 'Visual Studio Code', processName: 'code.exe', handle: '0x5678' },
      { id: 3, title: 'Explorador de Windows', processName: 'explorer.exe', handle: '0x9ABC' }
    ]

    socket.emit('spy:windows-list', { windows })
  })

  // Seleccionar ventana objetivo
  socket.on('spy:select-window', (data) => {
    console.log(`[Spy] Ventana seleccionada: ${data?.windowId}`)

    const session = serverState.spySessions.get(socket.id)
    if (session) {
      session.targetWindow = data?.windowId
    }

    socket.emit('spy:window-selected', {
      success: true,
      windowId: data?.windowId
    })
  })

  // Modo de captura continua
  socket.on('spy:toggle-continuous', (data) => {
    const session = serverState.spySessions.get(socket.id)
    if (session) {
      session.continuousMode = data?.enabled || false
      console.log(`[Spy] Modo continuo: ${session.continuousMode}`)
    }

    socket.emit('spy:continuous-toggled', {
      enabled: data?.enabled || false
    })
  })
}
