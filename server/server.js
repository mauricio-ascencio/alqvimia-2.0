import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Cargar .env desde la raiz del proyecto (un nivel arriba de server/)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

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
import workflowsRoutes from './routes/workflows.js'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'

const app = express()
const httpServer = createServer(app)

// Puertos desde variables de entorno
const PORT = parseInt(process.env.BACKEND_PORT) || 4000
const FRONTEND_PORT = parseInt(process.env.VITE_PORT) || 4200

// URLs del frontend permitidas
const allowedOrigins = [
  `http://localhost:${FRONTEND_PORT}`,
  `http://127.0.0.1:${FRONTEND_PORT}`,
  'http://localhost:4200',
  'http://localhost:5173'  // fallback
]

// Configuración CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

app.use(express.json())

// Servir archivos estáticos públicos (para spy-injector.js)
app.use(express.static(path.resolve(__dirname, '../public')))

// Rutas API
app.use('/api/settings', settingsRoutes)
app.use('/api/workflows', workflowsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
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

// Ruta raiz - informacion del servidor
app.get('/', (req, res) => {
  res.json({
    name: 'Alqvimia RPA 2.0 - Backend API',
    version: '2.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      settings: '/api/settings',
      workflows: '/api/workflows'
    },
    frontend: `http://localhost:${FRONTEND_PORT}`
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

// Nota: /api/workflows se maneja ahora por workflowsRoutes

app.get('/api/settings', (req, res) => {
  res.json({
    serverPort: PORT,
    frontendUrl: `http://localhost:${FRONTEND_PORT}`
  })
})

// API para obtener ventanas de Windows
app.get('/api/windows', async (req, res) => {
  try {
    // PowerShell script mejorado para obtener TODAS las ventanas visibles
    // incluyendo múltiples ventanas de navegadores (Chrome, Edge, Firefox, etc.)
    const psScript = `
      Add-Type @"
        using System;
        using System.Text;
        using System.Collections.Generic;
        using System.Runtime.InteropServices;

        public class WindowEnumerator {
          [DllImport("user32.dll")]
          private static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

          [DllImport("user32.dll")]
          private static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

          [DllImport("user32.dll")]
          private static extern int GetWindowTextLength(IntPtr hWnd);

          [DllImport("user32.dll")]
          private static extern bool IsWindowVisible(IntPtr hWnd);

          [DllImport("user32.dll")]
          private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);

          private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

          public static List<object> GetAllWindows() {
            var windows = new List<object>();
            EnumWindows((hWnd, lParam) => {
              if (IsWindowVisible(hWnd)) {
                int length = GetWindowTextLength(hWnd);
                if (length > 0) {
                  StringBuilder sb = new StringBuilder(length + 1);
                  GetWindowText(hWnd, sb, sb.Capacity);
                  string title = sb.ToString();
                  if (!string.IsNullOrWhiteSpace(title)) {
                    uint processId;
                    GetWindowThreadProcessId(hWnd, out processId);
                    try {
                      var proc = System.Diagnostics.Process.GetProcessById((int)processId);
                      windows.Add(new {
                        Handle = hWnd.ToInt64(),
                        Title = title,
                        ProcessId = processId,
                        ProcessName = proc.ProcessName
                      });
                    } catch {}
                  }
                }
              }
              return true;
            }, IntPtr.Zero);
            return windows;
          }
        }
"@
      [WindowEnumerator]::GetAllWindows() | ConvertTo-Json -Compress
    `

    const { stdout } = await execAsync(`powershell -Command "${psScript.replace(/\n/g, ' ').replace(/"/g, '\\"')}"`, {
      encoding: 'utf8',
      timeout: 8000
    })

    let windows = []
    if (stdout && stdout.trim()) {
      const parsed = JSON.parse(stdout)
      // Asegurar que siempre sea un array
      windows = Array.isArray(parsed) ? parsed : [parsed]

      // Mapear a formato consistente y filtrar ventanas del sistema
      windows = windows.map((w, index) => ({
        id: w.ProcessId || index + 1,
        title: w.Title || 'Sin título',
        processName: w.ProcessName || 'unknown',
        handle: w.Handle ? `0x${w.Handle.toString(16).toUpperCase()}` : '0x0',
        type: categorizeWindow(w.ProcessName)
      })).filter(w => {
        // Filtrar ventanas del sistema y sin título
        if (!w.title || w.title === 'Sin título') return false
        const excludedProcesses = ['textinputhost', 'applicationframehost', 'shellexperiencehost', 'searchhost', 'startmenuexperiencehost']
        return !excludedProcesses.includes(w.processName.toLowerCase())
      })
    }

    res.json({ windows, success: true })
  } catch (error) {
    console.error('[API] Error obteniendo ventanas:', error.message)
    res.json({
      windows: [],
      success: false,
      error: error.message
    })
  }
})

// API para activar (poner en primer plano) una ventana de Windows
app.post('/api/windows/activate', async (req, res) => {
  try {
    const { processId, handle, processName } = req.body

    if (!processId && !handle) {
      return res.json({ success: false, error: 'Se requiere processId o handle' })
    }

    // PowerShell script para activar ventana usando handle o processId
    let psScript
    if (handle && handle !== '0x0') {
      // Usar handle directamente
      const handleInt = parseInt(handle, 16)
      psScript = `
        Add-Type @"
        using System;
        using System.Runtime.InteropServices;
        public class Win32 {
          [DllImport("user32.dll")]
          public static extern bool SetForegroundWindow(IntPtr hWnd);
          [DllImport("user32.dll")]
          public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
        }
"@
        $handle = [IntPtr]${handleInt}
        [Win32]::ShowWindow($handle, 9)
        [Win32]::SetForegroundWindow($handle)
        Write-Output "OK"
      `
    } else {
      // Usar processId
      psScript = `
        $proc = Get-Process -Id ${processId} -ErrorAction SilentlyContinue
        if ($proc -and $proc.MainWindowHandle -ne 0) {
          Add-Type @"
          using System;
          using System.Runtime.InteropServices;
          public class Win32 {
            [DllImport("user32.dll")]
            public static extern bool SetForegroundWindow(IntPtr hWnd);
            [DllImport("user32.dll")]
            public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
          }
"@
          [Win32]::ShowWindow($proc.MainWindowHandle, 9)
          [Win32]::SetForegroundWindow($proc.MainWindowHandle)
          Write-Output "OK"
        } else {
          Write-Output "NOT_FOUND"
        }
      `
    }

    const { stdout } = await execAsync(`powershell -Command "${psScript.replace(/\n/g, ' ').replace(/"/g, '\\"')}"`, {
      encoding: 'utf8',
      timeout: 5000
    })

    const success = stdout.trim().includes('OK')
    res.json({
      success,
      message: success ? 'Ventana activada' : 'No se pudo activar la ventana'
    })
  } catch (error) {
    console.error('[API] Error activando ventana:', error.message)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// Categorizar tipo de ventana
function categorizeWindow(processName) {
  const name = (processName || '').toLowerCase()

  if (['chrome', 'firefox', 'msedge', 'opera', 'brave', 'iexplore'].some(b => name.includes(b))) {
    return 'browser'
  }
  if (['code', 'devenv', 'idea', 'sublime', 'notepad', 'atom'].some(e => name.includes(e))) {
    return 'editor'
  }
  if (['explorer'].includes(name)) {
    return 'explorer'
  }
  if (['cmd', 'powershell', 'windowsterminal', 'conhost'].some(t => name.includes(t))) {
    return 'terminal'
  }
  if (['excel', 'winword', 'powerpnt', 'outlook'].some(o => name.includes(o))) {
    return 'office'
  }
  return 'application'
}

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
