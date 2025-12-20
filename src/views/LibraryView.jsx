import { useState, useEffect } from 'react'
import { useSocket } from '../context/SocketContext'

function LibraryView() {
  const [workflows, setWorkflows] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const { socket, isConnected } = useSocket()

  const loadWorkflows = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/workflows')
      if (response.ok) {
        const data = await response.json()
        setWorkflows(data)
      }
    } catch (err) {
      console.error('Error cargando workflows:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWorkflows()
  }, [])

  const filteredWorkflows = workflows.filter(wf =>
    wf.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteWorkflow = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este workflow?')) {
      try {
        await fetch(`/api/workflows/${id}`, { method: 'DELETE' })
        setWorkflows(workflows.filter(wf => wf.id !== id))
      } catch (err) {
        console.error('Error eliminando workflow:', err)
      }
    }
  }

  const editWorkflow = (workflow) => {
    console.log('Editar workflow:', workflow)
  }

  const executeWorkflow = (workflow) => {
    if (socket && isConnected) {
      socket.emit('execute-workflow', { workflowId: workflow.id })
    }
  }

  return (
    <div className="view" id="library-view">
      <div className="view-header">
        <h2><i className="fas fa-folder-open"></i> Biblioteca de Workflows</h2>
        <p>Gestiona todos tus workflows guardados</p>
      </div>

      <div className="library-content">
        <div className="library-toolbar">
          <input
            type="text"
            id="searchWorkflows"
            placeholder="Buscar workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" id="refreshLibrary" onClick={loadWorkflows}>
            <i className={`fas fa-sync ${loading ? 'fa-spin' : ''}`}></i> Actualizar
          </button>
        </div>

        <div className="workflows-grid" id="workflowsGrid">
          {filteredWorkflows.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No hay workflows guardados</p>
              <small>Crea tu primer workflow para comenzar</small>
            </div>
          ) : (
            filteredWorkflows.map(workflow => (
              <div key={workflow.id} className="workflow-card">
                <div className="workflow-card-header">
                  <i className="fas fa-project-diagram"></i>
                  <h4>{workflow.name}</h4>
                </div>
                <div className="workflow-card-body">
                  <p className="workflow-description">
                    {workflow.description || 'Sin descripción'}
                  </p>
                  <div className="workflow-meta">
                    <span>
                      <i className="fas fa-layer-group"></i>
                      {workflow.steps?.length || 0} pasos
                    </span>
                    <span>
                      <i className="fas fa-calendar"></i>
                      {new Date(workflow.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="workflow-card-footer">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => executeWorkflow(workflow)}
                    title="Ejecutar"
                  >
                    <i className="fas fa-play"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => editWorkflow(workflow)}
                    title="Editar"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteWorkflow(workflow.id)}
                    title="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default LibraryView
