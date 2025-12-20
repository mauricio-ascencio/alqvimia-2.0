import { useState, useEffect } from 'react'
import { useWorkflowStore } from '../../stores/workflowStore'
import { workflowService } from '../../services/api'
import { Button, Card, Input } from '../common'

function WorkflowCard({ workflow, onLoad, onDuplicate, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="workflow-card">
      <div className="card-header">
        <div className="card-icon">
          <i className="fas fa-project-diagram"></i>
        </div>
        <div className="card-info">
          <h4>{workflow.name}</h4>
          <span className="card-date">{formatDate(workflow.createdAt || workflow.updatedAt)}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-stats">
          <span>
            <i className="fas fa-list"></i>
            {workflow.actions?.length || workflow.steps?.length || 0} pasos
          </span>
        </div>
      </div>
      <div className="card-actions">
        <Button
          variant="primary"
          size="sm"
          icon="fa-folder-open"
          onClick={() => onLoad(workflow)}
        >
          Cargar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon="fa-copy"
          onClick={() => onDuplicate(workflow)}
          title="Duplicar"
        />
        <Button
          variant="danger"
          size="sm"
          icon="fa-trash"
          onClick={() => onDelete(workflow)}
          title="Eliminar"
        />
      </div>
    </div>
  )
}

function LibraryView() {
  const [workflows, setWorkflows] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { loadWorkflow } = useWorkflowStore()

  const fetchWorkflows = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await workflowService.getAll()
      setWorkflows(response.data || response || [])
    } catch (err) {
      setError('Error al cargar workflows')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const handleLoad = (workflow) => {
    loadWorkflow(workflow)
    // Navegar a la vista de workflows
  }

  const handleDuplicate = async (workflow) => {
    try {
      const newWorkflow = {
        ...workflow,
        name: `${workflow.name} (copia)`,
        id: undefined
      }
      await workflowService.save(newWorkflow)
      fetchWorkflows()
    } catch (err) {
      console.error('Error al duplicar:', err)
    }
  }

  const handleDelete = async (workflow) => {
    if (!confirm(`¿Eliminar "${workflow.name}"?`)) return

    try {
      await workflowService.delete(workflow.id)
      fetchWorkflows()
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }

  const filteredWorkflows = workflows.filter((wf) =>
    wf.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="view" id="library-view">
      <div className="view-header">
        <h2><i className="fas fa-folder-open"></i> Biblioteca de Workflows</h2>
        <p className="view-description">Administra tus workflows guardados</p>
      </div>

      <div className="library-toolbar">
        <div className="search-wrapper">
          <Input
            type="text"
            placeholder="Buscar workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="fa-search"
          />
        </div>
        <Button
          variant="secondary"
          icon="fa-sync"
          onClick={fetchWorkflows}
          loading={loading}
        >
          Actualizar
        </Button>
      </div>

      <div className="library-content">
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando workflows...</p>
          </div>
        ) : filteredWorkflows.length > 0 ? (
          <div className="workflows-grid">
            {filteredWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                onLoad={handleLoad}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <i className="fas fa-folder-open"></i>
            <h3>No hay workflows</h3>
            <p>
              {searchTerm
                ? 'No se encontraron workflows con ese nombre'
                : 'Crea tu primer workflow en el editor'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LibraryView
