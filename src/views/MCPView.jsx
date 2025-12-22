import { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'

function MCPView() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const [connectors, setConnectors] = useState([
    // Bases de Datos
    { id: 1, name: 'PostgreSQL', type: 'database', icon: 'fa-database', status: 'connected', color: '#336791', description: 'Base de datos relacional avanzada' },
    { id: 2, name: 'MySQL', type: 'database', icon: 'fa-database', status: 'disconnected', color: '#4479A1', description: 'Base de datos relacional popular' },
    { id: 3, name: 'MongoDB', type: 'database', icon: 'fa-leaf', status: 'connected', color: '#47A248', description: 'Base de datos NoSQL documental' },
    { id: 4, name: 'Redis', type: 'database', icon: 'fa-bolt', status: 'connected', color: '#DC382D', description: 'Cache y store en memoria' },
    { id: 5, name: 'SQLite', type: 'database', icon: 'fa-database', status: 'disconnected', color: '#003B57', description: 'Base de datos embebida' },
    { id: 6, name: 'MariaDB', type: 'database', icon: 'fa-database', status: 'disconnected', color: '#003545', description: 'Fork de MySQL open source' },
    { id: 7, name: 'Oracle', type: 'database', icon: 'fa-database', status: 'connected', color: '#F80000', description: 'Base de datos empresarial' },
    { id: 8, name: 'SQL Server', type: 'database', icon: 'fa-microsoft', brand: true, status: 'connected', color: '#CC2927', description: 'Base de datos Microsoft' },
    { id: 9, name: 'Cassandra', type: 'database', icon: 'fa-eye', status: 'disconnected', color: '#1287B1', description: 'Base de datos distribuida' },
    { id: 10, name: 'DynamoDB', type: 'database', icon: 'fa-aws', brand: true, status: 'connected', color: '#4053D6', description: 'NoSQL de AWS' },

    // APIs
    { id: 11, name: 'REST API', type: 'api', icon: 'fa-cloud', status: 'connected', color: '#FF6B6B', description: 'Conexión RESTful genérica' },
    { id: 12, name: 'GraphQL', type: 'api', icon: 'fa-project-diagram', status: 'connected', color: '#E535AB', description: 'API con queries flexibles' },
    { id: 13, name: 'OpenAPI/Swagger', type: 'api', icon: 'fa-book', status: 'disconnected', color: '#85EA2D', description: 'Documentación y testing' },
    { id: 14, name: 'gRPC', type: 'api', icon: 'fa-network-wired', status: 'disconnected', color: '#244C5A', description: 'RPC de alto rendimiento' },
    { id: 15, name: 'SOAP', type: 'api', icon: 'fa-soap', status: 'disconnected', color: '#0078D4', description: 'Web services XML' },
    { id: 16, name: 'WebSocket', type: 'api', icon: 'fa-bolt', status: 'connected', color: '#010101', description: 'Comunicación bidireccional' },

    // Almacenamiento
    { id: 17, name: 'Amazon S3', type: 'storage', icon: 'fa-aws', brand: true, status: 'connected', color: '#FF9900', description: 'Almacenamiento en la nube AWS' },
    { id: 18, name: 'Google Cloud Storage', type: 'storage', icon: 'fa-google', brand: true, status: 'connected', color: '#4285F4', description: 'Almacenamiento GCP' },
    { id: 19, name: 'Azure Blob', type: 'storage', icon: 'fa-microsoft', brand: true, status: 'disconnected', color: '#0089D6', description: 'Almacenamiento Azure' },
    { id: 20, name: 'Dropbox', type: 'storage', icon: 'fa-dropbox', brand: true, status: 'connected', color: '#0061FF', description: 'Sincronización de archivos' },
    { id: 21, name: 'OneDrive', type: 'storage', icon: 'fa-microsoft', brand: true, status: 'connected', color: '#0078D4', description: 'Almacenamiento Microsoft' },
    { id: 22, name: 'Box', type: 'storage', icon: 'fa-box', status: 'disconnected', color: '#0061D5', description: 'Gestión empresarial de archivos' },
    { id: 23, name: 'Google Drive', type: 'storage', icon: 'fa-google-drive', brand: true, status: 'connected', color: '#34A853', description: 'Almacenamiento Google' },
    { id: 24, name: 'MinIO', type: 'storage', icon: 'fa-server', status: 'disconnected', color: '#C72C48', description: 'S3 compatible self-hosted' },

    // Mensajería
    { id: 25, name: 'WhatsApp Business', type: 'messaging', icon: 'fa-whatsapp', brand: true, status: 'connected', color: '#25D366', description: 'Mensajería empresarial' },
    { id: 26, name: 'Slack', type: 'messaging', icon: 'fa-slack', brand: true, status: 'disconnected', color: '#4A154B', description: 'Colaboración empresarial' },
    { id: 27, name: 'Microsoft Teams', type: 'messaging', icon: 'fa-microsoft', brand: true, status: 'connected', color: '#6264A7', description: 'Comunicación Microsoft' },
    { id: 28, name: 'Telegram', type: 'messaging', icon: 'fa-telegram', brand: true, status: 'connected', color: '#0088CC', description: 'Mensajería segura' },
    { id: 29, name: 'Discord', type: 'messaging', icon: 'fa-discord', brand: true, status: 'disconnected', color: '#5865F2', description: 'Comunicación por voz y texto' },
    { id: 30, name: 'Twilio SMS', type: 'messaging', icon: 'fa-sms', status: 'connected', color: '#F22F46', description: 'Mensajes de texto programables' },
    { id: 31, name: 'SendGrid', type: 'messaging', icon: 'fa-envelope', status: 'connected', color: '#1A82E2', description: 'Email transaccional' },
    { id: 32, name: 'Mailchimp', type: 'messaging', icon: 'fa-mailchimp', brand: true, status: 'disconnected', color: '#FFE01B', description: 'Email marketing' },

    // IA/ML
    { id: 33, name: 'OpenAI GPT', type: 'ai', icon: 'fa-robot', status: 'connected', color: '#412991', description: 'Modelos de lenguaje GPT' },
    { id: 34, name: 'Claude AI', type: 'ai', icon: 'fa-brain', status: 'connected', color: '#D77544', description: 'Asistente IA de Anthropic' },
    { id: 35, name: 'Google Gemini', type: 'ai', icon: 'fa-google', brand: true, status: 'connected', color: '#4285F4', description: 'IA multimodal de Google' },
    { id: 36, name: 'Azure OpenAI', type: 'ai', icon: 'fa-microsoft', brand: true, status: 'disconnected', color: '#0078D4', description: 'OpenAI en Azure' },
    { id: 37, name: 'Hugging Face', type: 'ai', icon: 'fa-smile', status: 'connected', color: '#FFD21E', description: 'Modelos open source' },
    { id: 38, name: 'AWS Bedrock', type: 'ai', icon: 'fa-aws', brand: true, status: 'disconnected', color: '#FF9900', description: 'IA fundacional AWS' },
    { id: 39, name: 'Ollama', type: 'ai', icon: 'fa-server', status: 'connected', color: '#000000', description: 'LLMs locales' },
    { id: 40, name: 'LangChain', type: 'ai', icon: 'fa-link', status: 'connected', color: '#1C3C3C', description: 'Framework para LLMs' },

    // CRM/ERP
    { id: 41, name: 'Salesforce', type: 'crm', icon: 'fa-salesforce', brand: true, status: 'connected', color: '#00A1E0', description: 'CRM líder del mercado' },
    { id: 42, name: 'HubSpot', type: 'crm', icon: 'fa-hubspot', brand: true, status: 'connected', color: '#FF7A59', description: 'CRM y marketing' },
    { id: 43, name: 'Zoho CRM', type: 'crm', icon: 'fa-address-book', status: 'disconnected', color: '#C8202B', description: 'CRM económico' },
    { id: 44, name: 'SAP', type: 'crm', icon: 'fa-industry', status: 'connected', color: '#0FAAFF', description: 'ERP empresarial' },
    { id: 45, name: 'Microsoft Dynamics', type: 'crm', icon: 'fa-microsoft', brand: true, status: 'disconnected', color: '#002050', description: 'ERP y CRM Microsoft' },
    { id: 46, name: 'Oracle ERP', type: 'crm', icon: 'fa-building', status: 'disconnected', color: '#F80000', description: 'Suite empresarial Oracle' },
    { id: 47, name: 'NetSuite', type: 'crm', icon: 'fa-chart-line', status: 'disconnected', color: '#0267C1', description: 'ERP en la nube' },

    // Pagos
    { id: 48, name: 'Stripe', type: 'payments', icon: 'fa-stripe', brand: true, status: 'connected', color: '#635BFF', description: 'Pagos online' },
    { id: 49, name: 'PayPal', type: 'payments', icon: 'fa-paypal', brand: true, status: 'connected', color: '#003087', description: 'Pagos digitales' },
    { id: 50, name: 'MercadoPago', type: 'payments', icon: 'fa-credit-card', status: 'connected', color: '#009EE3', description: 'Pagos en LATAM' },
    { id: 51, name: 'Square', type: 'payments', icon: 'fa-square', status: 'disconnected', color: '#006AFF', description: 'Pagos y POS' },
    { id: 52, name: 'Conekta', type: 'payments', icon: 'fa-money-bill-wave', status: 'disconnected', color: '#0D2E5C', description: 'Pagos en México' },

    // Automatización
    { id: 53, name: 'Zapier', type: 'automation', icon: 'fa-bolt', status: 'connected', color: '#FF4A00', description: 'Automatización sin código' },
    { id: 54, name: 'Make (Integromat)', type: 'automation', icon: 'fa-cogs', status: 'connected', color: '#6D00CC', description: 'Automatización visual' },
    { id: 55, name: 'Power Automate', type: 'automation', icon: 'fa-microsoft', brand: true, status: 'connected', color: '#0066FF', description: 'Automatización Microsoft' },
    { id: 56, name: 'n8n', type: 'automation', icon: 'fa-sitemap', status: 'disconnected', color: '#EA4B71', description: 'Workflow open source' },
    { id: 57, name: 'UiPath', type: 'automation', icon: 'fa-robot', status: 'connected', color: '#FA4616', description: 'RPA empresarial' },
    { id: 58, name: 'Automation Anywhere', type: 'automation', icon: 'fa-robot', status: 'disconnected', color: '#FF6900', description: 'RPA cognitiva' },

    // Monitoreo
    { id: 59, name: 'Prometheus', type: 'monitoring', icon: 'fa-fire', status: 'connected', color: '#E6522C', description: 'Monitoreo de métricas' },
    { id: 60, name: 'Grafana', type: 'monitoring', icon: 'fa-chart-area', status: 'connected', color: '#F46800', description: 'Visualización de datos' },
    { id: 61, name: 'Datadog', type: 'monitoring', icon: 'fa-dog', status: 'disconnected', color: '#632CA6', description: 'Observabilidad completa' },
    { id: 62, name: 'New Relic', type: 'monitoring', icon: 'fa-chart-bar', status: 'disconnected', color: '#008C99', description: 'APM y monitoreo' },
    { id: 63, name: 'Splunk', type: 'monitoring', icon: 'fa-search', status: 'connected', color: '#65A637', description: 'Análisis de logs' },
    { id: 64, name: 'Elasticsearch', type: 'monitoring', icon: 'fa-search-plus', status: 'connected', color: '#005571', description: 'Búsqueda y análisis' }
  ])

  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Todos', icon: 'fa-th-large' },
    { id: 'database', label: 'Bases de Datos', icon: 'fa-database' },
    { id: 'api', label: 'APIs', icon: 'fa-cloud' },
    { id: 'storage', label: 'Almacenamiento', icon: 'fa-hdd' },
    { id: 'messaging', label: 'Mensajería', icon: 'fa-comments' },
    { id: 'ai', label: 'IA/ML', icon: 'fa-brain' },
    { id: 'crm', label: 'CRM/ERP', icon: 'fa-building' },
    { id: 'payments', label: 'Pagos', icon: 'fa-credit-card' },
    { id: 'automation', label: 'Automatización', icon: 'fa-cogs' },
    { id: 'monitoring', label: 'Monitoreo', icon: 'fa-chart-line' }
  ]

  const filteredConnectors = useMemo(() => {
    let result = connectors
    if (activeFilter !== 'all') {
      result = result.filter(c => c.type === activeFilter)
    }
    if (searchTerm) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return result
  }, [connectors, activeFilter, searchTerm])

  const stats = useMemo(() => ({
    total: connectors.length,
    connected: connectors.filter(c => c.status === 'connected').length,
    disconnected: connectors.filter(c => c.status === 'disconnected').length
  }), [connectors])

  const toggleConnection = (id) => {
    setConnectors(connectors.map(c =>
      c.id === id
        ? { ...c, status: c.status === 'connected' ? 'disconnected' : 'connected' }
        : c
    ))
  }

  return (
    <div className="view" id="mcp-view">
      <div className="view-header">
        <h2><i className="fas fa-plug"></i> MCP Conectores</h2>
        <p>Configura y gestiona tus conexiones con servicios externos</p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          padding: '1.25rem',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <i className="fas fa-plug" style={{ fontSize: '1.5rem', opacity: 0.9 }}></i>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>{stats.total}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Total Conectores</div>
            </div>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          padding: '1.25rem',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <i className="fas fa-check-circle" style={{ fontSize: '1.5rem', opacity: 0.9 }}></i>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>{stats.connected}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Conectados</div>
            </div>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          padding: '1.25rem',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <i className="fas fa-unlink" style={{ fontSize: '1.5rem', opacity: 0.9 }}></i>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>{stats.disconnected}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Desconectados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
          <i className="fas fa-search" style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }}></i>
          <input
            type="text"
            placeholder="Buscar conectores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus"></i> Agregar Conector
        </button>
      </div>

      {/* Category Filters */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            style={{
              padding: '0.5rem 1rem',
              background: activeFilter === filter.id ? 'var(--primary-color)' : 'var(--bg-secondary)',
              border: `1px solid ${activeFilter === filter.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
              borderRadius: '20px',
              color: activeFilter === filter.id ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              transition: 'all 0.2s'
            }}
          >
            <i className={`fas ${filter.icon}`}></i>
            {filter.label}
            <span style={{
              background: activeFilter === filter.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-tertiary)',
              padding: '0.125rem 0.5rem',
              borderRadius: '10px',
              fontSize: '0.75rem'
            }}>
              {filter.id === 'all' ? connectors.length : connectors.filter(c => c.type === filter.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{
        marginBottom: '1rem',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        Mostrando {filteredConnectors.length} de {connectors.length} conectores
      </div>

      {/* Connectors Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredConnectors.map(connector => (
          <div key={connector.id} style={{
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '1.25rem',
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
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{connector.name}</h4>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.8rem',
                  color: connector.status === 'connected' ? 'var(--success-color)' : 'var(--text-secondary)'
                }}>
                  <i className="fas fa-circle" style={{ fontSize: '0.4rem' }}></i>
                  {connector.status === 'connected' ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
            </div>
            <p style={{
              margin: '0 0 1rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.4'
            }}>
              {connector.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-sm btn-primary"
                style={{ flex: 1 }}
                onClick={() => toggleConnection(connector.id)}
              >
                {connector.status === 'connected' ? (
                  <><i className="fas fa-cog"></i> Configurar</>
                ) : (
                  <><i className="fas fa-plug"></i> Conectar</>
                )}
              </button>
              {connector.status === 'connected' && (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => toggleConnection(connector.id)}
                  title="Desconectar"
                >
                  <i className="fas fa-unlink"></i>
                </button>
              )}
              <button className="btn btn-sm btn-secondary" title="Documentación">
                <i className="fas fa-book"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredConnectors.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--text-secondary)'
        }}>
          <i className="fas fa-plug" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
          <h3>No se encontraron conectores</h3>
          <p>Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Add Connector Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '500px' }}>
            <div className="modal-header">
              <h3><i className="fas fa-plus"></i> Agregar Nuevo Conector</h3>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label><i className="fas fa-plug"></i> Nombre del Conector</label>
                <input type="text" className="form-control" placeholder="Ej: Mi Base de Datos" />
              </div>
              <div className="form-group">
                <label><i className="fas fa-layer-group"></i> Tipo</label>
                <select className="form-control">
                  {filters.filter(f => f.id !== 'all').map(f => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label><i className="fas fa-link"></i> URL de Conexión</label>
                <input type="text" className="form-control" placeholder="https://..." />
              </div>
              <div className="form-group">
                <label><i className="fas fa-key"></i> API Key (opcional)</label>
                <input type="password" className="form-control" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label><i className="fas fa-align-left"></i> Descripción</label>
                <textarea className="form-control" rows={2} placeholder="Describe el conector..."></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancelar</button>
              <button className="btn btn-success"><i className="fas fa-plug"></i> Conectar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MCPView
