import { useState } from 'react'

function AIDashboardView() {
  const [stats, setStats] = useState({
    documentsProcessed: 0,
    averageAccuracy: '0%',
    workflowsGenerated: 0,
    timeSaved: '0h'
  })
  const [processingHistory, setProcessingHistory] = useState([])

  const openConfigWizard = () => {
    console.log('Abrir configuración de IA/OCR')
  }

  const openAIWizard = () => {
    console.log('Abrir generador de workflow con IA')
  }

  const trainModel = () => {
    console.log('Entrenar modelo')
  }

  const batchProcess = () => {
    console.log('Procesamiento por lotes')
  }

  return (
    <div className="view" id="ai-dashboard-view">
      <div
        className="view-header"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2><i className="fas fa-brain"></i> Document Automation Agent - IA Dashboard</h2>
            <p style={{ opacity: 0.9, margin: '0.5rem 0 0 0' }}>
              Automatización inteligente de documentos con IA
            </p>
          </div>
          <button
            className="btn btn-light"
            onClick={openConfigWizard}
            style={{
              background: 'white',
              color: '#6366f1',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            <i className="fas fa-cog"></i> Configurar IA/OCR
          </button>
        </div>
      </div>

      {/* Estadísticas Principales */}
      <div
        className="ai-stats"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        <div
          className="stat-card"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #334155'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                background: '#6366f1',
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-file-invoice" style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </div>
            <div>
              <div
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e2e8f0' }}
                id="totalDocumentsProcessed"
              >
                {stats.documentsProcessed}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Documentos Procesados</div>
            </div>
          </div>
        </div>

        <div
          className="stat-card"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #334155'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                background: '#10b981',
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-check-circle" style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </div>
            <div>
              <div
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e2e8f0' }}
                id="averageAccuracy"
              >
                {stats.averageAccuracy}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Precisión Promedio</div>
            </div>
          </div>
        </div>

        <div
          className="stat-card"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #334155'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                background: '#8b5cf6',
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-bolt" style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </div>
            <div>
              <div
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e2e8f0' }}
                id="totalWorkflowsGenerated"
              >
                {stats.workflowsGenerated}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Workflows Generados</div>
            </div>
          </div>
        </div>

        <div
          className="stat-card"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #334155'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                background: '#f59e0b',
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-clock" style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </div>
            <div>
              <div
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e2e8f0' }}
                id="timeSaved"
              >
                {stats.timeSaved}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Tiempo Ahorrado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          <i className="fas fa-rocket"></i> Acciones Rápidas
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}
        >
          <button
            className="ai-action-card"
            onClick={openAIWizard}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              padding: '1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'white',
              transition: 'transform 0.2s'
            }}
          >
            <i className="fas fa-robot" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
            <h4 style={{ margin: '0.5rem 0' }}>Generar Workflow con IA</h4>
            <p style={{ opacity: 0.9, margin: 0, fontSize: '0.9rem' }}>
              Usa la IA para crear workflows automáticamente
            </p>
          </button>

          <button
            className="ai-action-card"
            onClick={trainModel}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              padding: '1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'white',
              transition: 'transform 0.2s'
            }}
          >
            <i
              className="fas fa-graduation-cap"
              style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
            ></i>
            <h4 style={{ margin: '0.5rem 0' }}>Entrenar Modelo</h4>
            <p style={{ opacity: 0.9, margin: 0, fontSize: '0.9rem' }}>
              Mejora la precisión con documentos de ejemplo
            </p>
          </button>

          <button
            className="ai-action-card"
            onClick={batchProcess}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              border: 'none',
              padding: '1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'white',
              transition: 'transform 0.2s'
            }}
          >
            <i
              className="fas fa-layer-group"
              style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
            ></i>
            <h4 style={{ margin: '0.5rem 0' }}>Procesamiento por Lotes</h4>
            <p style={{ opacity: 0.9, margin: 0, fontSize: '0.9rem' }}>
              Procesa múltiples documentos a la vez
            </p>
          </button>
        </div>
      </div>

      {/* Historial de Procesamiento */}
      <div>
        <h3 style={{ marginBottom: '1rem' }}>
          <i className="fas fa-history"></i> Historial de Procesamiento
        </h3>
        <div
          style={{
            background: '#1e293b',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #334155'
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#0f172a' }}>
              <tr>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#cbd5e1',
                    fontWeight: 600
                  }}
                >
                  Documento
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#cbd5e1',
                    fontWeight: 600
                  }}
                >
                  Tipo
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#cbd5e1',
                    fontWeight: 600
                  }}
                >
                  Campos Extraídos
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#cbd5e1',
                    fontWeight: 600
                  }}
                >
                  Precisión
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#cbd5e1',
                    fontWeight: 600
                  }}
                >
                  Fecha
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#cbd5e1',
                    fontWeight: 600
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody id="processingHistory">
              {processingHistory.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    <i
                      className="fas fa-inbox"
                      style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}
                    ></i>
                    <p>No hay documentos procesados aún</p>
                    <button
                      className="btn btn-primary"
                      onClick={openAIWizard}
                      style={{ marginTop: '1rem' }}
                    >
                      <i className="fas fa-robot"></i> Procesar Primer Documento
                    </button>
                  </td>
                </tr>
              ) : (
                processingHistory.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: '1rem', color: '#e2e8f0' }}>{item.document}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{item.type}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{item.fieldsExtracted}</td>
                    <td style={{ padding: '1rem', color: '#10b981' }}>{item.accuracy}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{item.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <button className="btn btn-sm btn-primary">
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AIDashboardView
