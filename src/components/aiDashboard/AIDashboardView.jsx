import { useState, useEffect } from 'react'
import { Button, Card } from '../common'

function StatCard({ icon, title, value, trend, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stat-content">
        <span className="stat-value">{value}</span>
        <span className="stat-title">{title}</span>
        {trend && <span className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
          <i className={`fas fa-arrow-${trend > 0 ? 'up' : 'down'}`}></i>
          {Math.abs(trend)}%
        </span>}
      </div>
    </div>
  )
}

function ActionCard({ icon, title, description, onClick }) {
  return (
    <div className="action-card" onClick={onClick}>
      <div className="action-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="action-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="action-arrow">
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  )
}

function AIDashboardView() {
  const [stats, setStats] = useState({
    documentsProcessed: 0,
    averagePrecision: 0,
    workflowsGenerated: 0,
    timeSaved: 0
  })

  const [history, setHistory] = useState([])

  useEffect(() => {
    // Cargar estadísticas desde localStorage
    const savedStats = localStorage.getItem('ai-dashboard-stats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }

    const savedHistory = localStorage.getItem('ai-processing-history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleGenerateWorkflow = () => {
    // TODO: Abrir wizard de generación con IA
    console.log('Generar workflow con IA')
  }

  const handleTrainModel = () => {
    // TODO: Abrir configuración de entrenamiento
    console.log('Entrenar modelo')
  }

  const handleBatchProcess = () => {
    // TODO: Abrir procesamiento por lotes
    console.log('Procesamiento por lotes')
  }

  return (
    <div className="view" id="ai-dashboard-view">
      <div className="view-header ai-gradient">
        <h2><i className="fas fa-brain"></i> IA Dashboard</h2>
        <p className="view-description">Automatización inteligente de documentos</p>
      </div>

      <div className="ai-stats-grid">
        <StatCard
          icon="fa-file-alt"
          title="Documentos Procesados"
          value={stats.documentsProcessed}
          color="primary"
        />
        <StatCard
          icon="fa-bullseye"
          title="Precisión Promedio"
          value={`${stats.averagePrecision}%`}
          trend={5}
          color="success"
        />
        <StatCard
          icon="fa-project-diagram"
          title="Workflows Generados"
          value={stats.workflowsGenerated}
          color="info"
        />
        <StatCard
          icon="fa-clock"
          title="Tiempo Ahorrado"
          value={`${stats.timeSaved}h`}
          color="warning"
        />
      </div>

      <div className="ai-content">
        <Card title="Acciones Rápidas" icon="fa-bolt">
          <div className="quick-actions">
            <ActionCard
              icon="fa-magic"
              title="Generar Workflow con IA"
              description="Crea workflows automáticamente desde documentos"
              onClick={handleGenerateWorkflow}
            />
            <ActionCard
              icon="fa-graduation-cap"
              title="Entrenar Modelo"
              description="Mejora la precisión con nuevos ejemplos"
              onClick={handleTrainModel}
            />
            <ActionCard
              icon="fa-layer-group"
              title="Procesamiento por Lotes"
              description="Procesa múltiples documentos a la vez"
              onClick={handleBatchProcess}
            />
          </div>
        </Card>

        <Card title="Historial de Procesamiento" icon="fa-history">
          {history.length > 0 ? (
            <div className="processing-history">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Documento</th>
                    <th>Tipo</th>
                    <th>Precisión</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.document}</td>
                      <td>{item.type}</td>
                      <td>{item.precision}%</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge status-${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-robot"></i>
              <p>No hay procesamiento reciente</p>
              <span>Comienza procesando un documento con IA</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default AIDashboardView
