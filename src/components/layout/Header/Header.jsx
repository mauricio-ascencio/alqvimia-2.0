import { useSocket } from '../../../context/SocketContext'

function Header() {
  const { isConnected, connect, disconnect } = useSocket()

  const handleToggleConnection = () => {
    if (isConnected) {
      disconnect()
    } else {
      connect()
    }
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <i className="fas fa-flask"></i>
          <span className="logo-text">Alqvimia</span>
          <span className="version">v2.0</span>
        </div>
      </div>

      <div className="header-center">
        <h1 className="app-title">RPA Automation System</h1>
      </div>

      <div className="header-right">
        <div className="connection-status">
          <button
            className={`btn-connection ${isConnected ? 'connected' : 'disconnected'}`}
            onClick={handleToggleConnection}
            title={isConnected ? 'Desconectar del servidor' : 'Conectar al servidor'}
          >
            <i className={`fas ${isConnected ? 'fa-plug' : 'fa-plug-circle-xmark'}`}></i>
            <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
