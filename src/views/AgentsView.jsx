import { useState } from 'react'

function AgentsView() {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Agente de Cobranza', type: 'collection', status: 'active', conversations: 156 },
    { id: 2, name: 'Atención al Cliente', type: 'customer-service', status: 'active', conversations: 432 },
    { id: 3, name: 'Mesa de Ayuda TI', type: 'it-support', status: 'inactive', conversations: 89 },
    { id: 4, name: 'Asistente de Ventas', type: 'sales', status: 'active', conversations: 267 },
    { id: 5, name: 'CFO Assistant', type: 'finance', status: 'active', conversations: 45 }
  ])

  const getStatusBadge = (status) => {
    return status === 'active'
      ? <span className="badge badge-success">Activo</span>
      : <span className="badge badge-secondary">Inactivo</span>
  }

  const getTypeIcon = (type) => {
    const icons = {
      'collection': 'fa-comments-dollar',
      'customer-service': 'fa-headset',
      'it-support': 'fa-laptop-medical',
      'sales': 'fa-user-tie',
      'finance': 'fa-chart-pie'
    }
    return icons[type] || 'fa-robot'
  }

  return (
    <div className="view" id="agents-view">
      <div className="view-header">
        <h2><i className="fas fa-robot"></i> Agentes IA</h2>
        <p>Gestiona tus agentes de inteligencia artificial conversacional</p>
      </div>

      <div className="agents-toolbar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Buscar agentes..."
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--dark-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              width: '300px'
            }}
          />
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Crear Agente
        </button>
      </div>

      <div className="agents-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {agents.map(agent => (
          <div key={agent.id} className="agent-card" style={{
            background: 'var(--card-bg)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            transition: 'all 0.3s'
          }}>
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className={`fas ${getTypeIcon(agent.type)}`} style={{ fontSize: '1.5rem' }}></i>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{agent.name}</h4>
                {getStatusBadge(agent.status)}
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                color: 'var(--text-secondary)'
              }}>
                <span><i className="fas fa-comments"></i> {agent.conversations} conversaciones</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm btn-primary" style={{ flex: 1 }}>
                  <i className="fas fa-cog"></i> Configurar
                </button>
                <button className="btn btn-sm btn-secondary">
                  <i className="fas fa-chart-line"></i>
                </button>
                <button className="btn btn-sm btn-danger">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgentsView
