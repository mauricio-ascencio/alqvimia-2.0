import { useState } from 'react'
import { useSocket } from './context/SocketContext'

// Vistas - usando las clases CSS exactas del original
import SpyView from './views/SpyView'
import RecorderView from './views/RecorderView'
import WorkflowsView from './views/WorkflowsView'
import ExecutorView from './views/ExecutorView'
import LibraryView from './views/LibraryView'
import AIDashboardView from './views/AIDashboardView'
import OmnichannelView from './views/OmnichannelView'
import VideoConferenceView from './views/VideoConferenceView'
import AgentsView from './views/AgentsView'
import MCPView from './views/MCPView'
import SettingsView from './views/SettingsView'

function App() {
  const [currentView, setCurrentView] = useState('spy')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { isConnected, connect, disconnect } = useSocket()

  const handleConnectionToggle = () => {
    if (isConnected) {
      disconnect()
    } else {
      connect()
    }
  }

  const navItems = [
    { id: 'spy', icon: 'fa-search', label: 'Element Spy' },
    { id: 'recorder', icon: 'fa-video', label: 'Grabador' },
    { id: 'workflows', icon: 'fa-project-diagram', label: 'Workflows' },
    { id: 'executor', icon: 'fa-play-circle', label: 'Ejecutor' },
    { id: 'agents', icon: 'fa-robot', label: 'Agentes' },
    { id: 'mcp', icon: 'fa-plug', label: 'MCP Conectores' },
    { id: 'library', icon: 'fa-folder-open', label: 'Biblioteca' },
    { id: 'ai-dashboard', icon: 'fa-brain', label: 'IA Dashboard' },
    { id: 'omnichannel', icon: 'fa-comments', label: 'Omnicanalidad' },
    { id: 'videoconference', icon: 'fa-video', label: 'Videoconferencia' },
    { id: 'settings', icon: 'fa-cog', label: 'Configuraciones' }
  ]

  const renderView = () => {
    switch (currentView) {
      case 'spy': return <SpyView />
      case 'recorder': return <RecorderView />
      case 'workflows': return <WorkflowsView />
      case 'executor': return <ExecutorView />
      case 'agents': return <AgentsView />
      case 'mcp': return <MCPView />
      case 'library': return <LibraryView />
      case 'ai-dashboard': return <AIDashboardView />
      case 'omnichannel': return <OmnichannelView />
      case 'videoconference': return <VideoConferenceView />
      case 'settings': return <SettingsView />
      default: return <SpyView />
    }
  }

  return (
    <div className="app-container">
      {/* Header - exactamente igual al original */}
      <header className="app-header">
        <div className="header-left">
          <i className="fas fa-robot"></i>
          <h1>Alqvimia</h1>
          <span className="version">v2.0</span>
        </div>
        <div className="header-right">
          <div className="connection-toggle-container">
            <span className={`connection-label ${isConnected ? 'connected' : ''}`}>
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
            <label className="connection-switch">
              <input
                type="checkbox"
                checked={isConnected}
                onChange={handleConnectionToggle}
              />
              <span className="connection-slider"></span>
            </label>
            <span className={`connection-status-text ${isConnected ? 'connected' : ''}`}>
              {isConnected ? 'Servidor activo' : 'Haz clic para conectar'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content - estructura exacta del original */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="mainSidebar">
          <div className="sidebar-header">
            <button
              className="sidebar-toggle"
              id="sidebarToggle"
              title={sidebarCollapsed ? 'Expandir menú' : 'Contraer menú'}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                data-view={item.id}
                data-tooltip={item.label}
                onClick={() => setCurrentView(item.id)}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App
