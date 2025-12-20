import { useState } from 'react'

function MCPView() {
  const [connectors, setConnectors] = useState([
    { id: 1, name: 'PostgreSQL', type: 'database', icon: 'fa-database', status: 'connected', color: '#336791' },
    { id: 2, name: 'MySQL', type: 'database', icon: 'fa-database', status: 'disconnected', color: '#4479A1' },
    { id: 3, name: 'MongoDB', type: 'database', icon: 'fa-leaf', status: 'connected', color: '#47A248' },
    { id: 4, name: 'REST API', type: 'api', icon: 'fa-cloud', status: 'connected', color: '#FF6B6B' },
    { id: 5, name: 'OpenAPI', type: 'api', icon: 'fa-book', status: 'disconnected', color: '#85EA2D' },
    { id: 6, name: 'Amazon S3', type: 'storage', icon: 'fa-aws', brand: true, status: 'connected', color: '#FF9900' },
    { id: 7, name: 'WhatsApp Business', type: 'messaging', icon: 'fa-whatsapp', brand: true, status: 'connected', color: '#25D366' },
    { id: 8, name: 'Slack', type: 'messaging', icon: 'fa-slack', brand: true, status: 'disconnected', color: '#4A154B' },
    { id: 9, name: 'Microsoft Teams', type: 'messaging', icon: 'fa-microsoft', brand: true, status: 'connected', color: '#6264A7' }
  ])

  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Todos', icon: 'fa-th-large' },
    { id: 'database', label: 'Bases de Datos', icon: 'fa-database' },
    { id: 'api', label: 'APIs', icon: 'fa-cloud' },
    { id: 'storage', label: 'Almacenamiento', icon: 'fa-hdd' },
    { id: 'messaging', label: 'Mensajería', icon: 'fa-comments' }
  ]

  const filteredConnectors = activeFilter === 'all'
    ? connectors
    : connectors.filter(c => c.type === activeFilter)

  return (
    <div className="view" id="mcp-view">
      <div className="view-header">
        <h2><i className="fas fa-plug"></i> MCP Conectores</h2>
        <p>Configura y gestiona tus conexiones con servicios externos</p>
      </div>

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`btn btn-sm ${activeFilter === filter.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            <i className={`fas ${filter.icon}`}></i> {filter.label}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredConnectors.map(connector => (
          <div key={connector.id} style={{
            background: 'var(--card-bg)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: connector.color,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className={`${connector.brand ? 'fab' : 'fas'} ${connector.icon}`} style={{
                  fontSize: '1.5rem',
                  color: 'white'
                }}></i>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{connector.name}</h4>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.85rem',
                  color: connector.status === 'connected' ? 'var(--success-color)' : 'var(--text-secondary)'
                }}>
                  <i className={`fas fa-circle`} style={{ fontSize: '0.5rem' }}></i>
                  {connector.status === 'connected' ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-sm btn-primary" style={{ flex: 1 }}>
                {connector.status === 'connected' ? 'Configurar' : 'Conectar'}
              </button>
              {connector.status === 'connected' && (
                <button className="btn btn-sm btn-danger">
                  <i className="fas fa-unlink"></i>
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add New Connector Card */}
        <div style={{
          background: 'var(--dark-bg)',
          borderRadius: '12px',
          border: '2px dashed var(--border-color)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '180px',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}>
          <i className="fas fa-plus-circle" style={{
            fontSize: '3rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            opacity: 0.5
          }}></i>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Agregar Conector</p>
        </div>
      </div>
    </div>
  )
}

export default MCPView
