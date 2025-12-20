import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

// Handlers
import { registerSpyHandlers } from './handlers/spyHandlers.js'
import { registerRecorderHandlers } from './handlers/recorderHandlers.js'
import { registerWorkflowHandlers } from './handlers/workflowHandlers.js'
import { registerExecutorHandlers } from './handlers/executorHandlers.js'
import { registerAgentHandlers } from './handlers/agentHandlers.js'
import { registerMCPHandlers } from './handlers/mcpHandlers.js'

// Servicios
import { initDatabase, isConnected } from './services/database.js'

// Rutas API
import settingsRoutes from './routes/settings.js'

const app = express()
const httpServer = createServer(app)

// Configuración CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))

app.use(express.json())

// Rutas API
app.use('/api/settings', settingsRoutes)

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
})

// Estado global del servidor
const serverState = {
  connectedClients: new Map(),
  activeWorkflows: new Map(),
  recordingSessions: new Map(),
  spySessions: new Map(),
  agents: new Map(),
  mcpConnectors: new Map()
}

// Conexión Socket.IO
io.on('connection', (socket) => {
  console.log(`[Socket] Cliente conectado: ${socket.id}`)

  serverState.connectedClients.set(socket.id, {
    id: socket.id,
    connectedAt: new Date(),
    lastActivity: new Date()
  })

  // Enviar estado inicial
  socket.emit('server:status', {
    connected: true,
    clientId: socket.id,
    serverTime: new Date().toISOString(),
    activeClients: serverState.connectedClients.size
  })

  // Registrar handlers por módulo
  registerSpyHandlers(io, socket, serverState)
  registerRecorderHandlers(io, socket, serverState)
  registerWorkflowHandlers(io, socket, serverState)
  registerExecutorHandlers(io, socket, serverState)
  registerAgentHandlers(io, socket, serverState)
  registerMCPHandlers(io, socket, serverState)

  // Desconexión
  socket.on('disconnect', (reason) => {
    console.log(`[Socket] Cliente desconectado: ${socket.id} - Razón: ${reason}`)
    serverState.connectedClients.delete(socket.id)

    // Limpiar sesiones asociadas
    serverState.spySessions.delete(socket.id)
    serverState.recordingSessions.delete(socket.id)
  })

  // Heartbeat
  socket.on('ping', () => {
    const client = serverState.connectedClients.get(socket.id)
    if (client) {
      client.lastActivity = new Date()
    }
    socket.emit('pong', { timestamp: Date.now() })
  })
})

// API REST endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    connectedClients: serverState.connectedClients.size
  })
})

app.get('/api/workflows', (req, res) => {
  // TODO: Integrar con base de datos
  res.json({ workflows: [] })
})

app.get('/api/settings', (req, res) => {
  res.json({
    serverPort: 7000,
    frontendUrl: 'http://localhost:5173'
  })
})

// Puerto
const PORT = process.env.PORT || 7000

// Función de inicio del servidor
async function startServer() {
  // Intentar conectar a la base de datos
  const dbConnected = await initDatabase()

  httpServer.listen(PORT, async () => {
    console.log('')
    console.log('========================================')
    console.log('   Alqvimia 2.0 - Backend Server')
    console.log('========================================')
    console.log(`   Puerto: ${PORT}`)
    console.log(`   Socket.IO: Activo`)
    console.log(`   API REST: http://localhost:${PORT}/api`)
    console.log(`   MySQL: ${dbConnected ? 'Conectado' : 'No disponible'}`)
    console.log('========================================')
    console.log('')
  })
}

// Iniciar servidor
startServer().catch(error => {
  console.error('Error al iniciar el servidor:', error)
  process.exit(1)
})
