import { useState } from 'react'
import { ACTION_CATEGORIES } from '../utils/constants'

// Categorías exactas del HTML original
const WORKFLOW_CATEGORIES = [
  {
    id: 'web-browser',
    name: 'Navegador Web',
    icon: 'fa-globe',
    count: 8,
    actions: [
      { action: 'browser_open', icon: 'fa-window-maximize', label: 'Abrir Navegador' },
      { action: 'navigate', icon: 'fa-compass', label: 'Navegar a URL' },
      { action: 'click', icon: 'fa-mouse-pointer', label: 'Hacer Clic' },
      { action: 'type', icon: 'fa-keyboard', label: 'Escribir Texto' },
      { action: 'extract_text', icon: 'fa-font', label: 'Extraer Texto' },
      { action: 'screenshot', icon: 'fa-camera', label: 'Captura de Pantalla' },
      { action: 'scroll', icon: 'fa-arrows-alt-v', label: 'Hacer Scroll' },
      { action: 'browser_close', icon: 'fa-times-circle', label: 'Cerrar Navegador' }
    ]
  },
  {
    id: 'active-directory',
    name: 'Active Directory',
    icon: 'fa-users-cog',
    count: 5,
    actions: [
      { action: 'ad_connect', icon: 'fa-server', label: 'Conectar AD' },
      { action: 'ad_get_user', icon: 'fa-user', label: 'Obtener Usuario' },
      { action: 'ad_create_user', icon: 'fa-user-plus', label: 'Crear Usuario' },
      { action: 'ad_disable_user', icon: 'fa-user-lock', label: 'Deshabilitar Usuario' },
      { action: 'ad_add_to_group', icon: 'fa-users', label: 'Agregar a Grupo' }
    ]
  },
  {
    id: 'ai',
    name: 'Inteligencia Artificial',
    icon: 'fa-brain',
    count: 4,
    actions: [
      { action: 'ai_text_generation', icon: 'fa-robot', label: 'Generar Texto' },
      { action: 'ai_sentiment', icon: 'fa-smile', label: 'Análisis de Sentimiento' },
      { action: 'ai_classification', icon: 'fa-tags', label: 'Clasificación' },
      { action: 'ai_translation', icon: 'fa-language', label: 'Traducción' }
    ]
  },
  {
    id: 'database',
    name: 'Base de Datos',
    icon: 'fa-database',
    count: 4,
    actions: [
      { action: 'db_connect', icon: 'fa-plug', label: 'Conectar Base de Datos' },
      { action: 'db_query', icon: 'fa-search', label: 'Ejecutar Consulta' },
      { action: 'db_insert', icon: 'fa-plus-circle', label: 'Insertar Datos' },
      { action: 'db_disconnect', icon: 'fa-unlink', label: 'Desconectar' }
    ]
  },
  {
    id: 'files',
    name: 'Archivos',
    icon: 'fa-folder',
    count: 6,
    actions: [
      { action: 'file_read', icon: 'fa-file-alt', label: 'Leer Archivo' },
      { action: 'file_write', icon: 'fa-file-edit', label: 'Escribir Archivo' },
      { action: 'file_copy', icon: 'fa-copy', label: 'Copiar Archivo' },
      { action: 'file_move', icon: 'fa-file-export', label: 'Mover Archivo' },
      { action: 'file_delete', icon: 'fa-trash', label: 'Eliminar Archivo' },
      { action: 'file_exists', icon: 'fa-question-circle', label: 'Archivo Existe' }
    ]
  },
  {
    id: 'email',
    name: 'Correo Electrónico',
    icon: 'fa-envelope',
    count: 3,
    actions: [
      { action: 'email_send', icon: 'fa-paper-plane', label: 'Enviar Email' },
      { action: 'email_read', icon: 'fa-envelope-open', label: 'Leer Email' },
      { action: 'email_download_attachment', icon: 'fa-paperclip', label: 'Descargar Adjunto' }
    ]
  },
  {
    id: 'control-flow',
    name: 'Control de Flujo',
    icon: 'fa-code-branch',
    count: 5,
    actions: [
      { action: 'if_condition', icon: 'fa-question', label: 'Si / Condición' },
      { action: 'for_loop', icon: 'fa-redo', label: 'Bucle For' },
      { action: 'while_loop', icon: 'fa-sync', label: 'Bucle While' },
      { action: 'delay', icon: 'fa-clock', label: 'Esperar/Delay' },
      { action: 'try_catch', icon: 'fa-shield-alt', label: 'Try/Catch' }
    ]
  },
  {
    id: 'excel',
    name: 'Excel',
    icon: 'fa-file-excel',
    count: 3,
    actions: [
      { action: 'excel_read', icon: 'fa-file-excel', label: 'Leer Excel' },
      { action: 'excel_write', icon: 'fa-file-edit', label: 'Escribir Excel' },
      { action: 'excel_close', icon: 'fa-times-circle', label: 'Cerrar Excel' }
    ]
  },
  {
    id: 'pdf',
    name: 'PDF',
    icon: 'fa-file-pdf',
    count: 2,
    actions: [
      { action: 'pdf_read', icon: 'fa-file-pdf', label: 'Leer PDF' },
      { action: 'pdf_create', icon: 'fa-file-pdf', label: 'Crear PDF' }
    ]
  },
  {
    id: 'rest',
    name: 'REST Web Services',
    icon: 'fa-network-wired',
    count: 4,
    actions: [
      { action: 'rest_get', icon: 'fa-download', label: 'GET Request' },
      { action: 'rest_post', icon: 'fa-upload', label: 'POST Request' },
      { action: 'rest_put', icon: 'fa-edit', label: 'PUT Request' },
      { action: 'rest_delete', icon: 'fa-trash', label: 'DELETE Request' }
    ]
  },
  {
    id: 'sap',
    name: 'SAP',
    icon: 'fa-building',
    count: 3,
    actions: [
      { action: 'sap_connect', icon: 'fa-plug', label: 'Conectar SAP' },
      { action: 'sap_get_data', icon: 'fa-database', label: 'Obtener Datos' },
      { action: 'sap_create_order', icon: 'fa-shopping-cart', label: 'Crear Orden' }
    ]
  },
  {
    id: 'microsoft365',
    name: 'Microsoft 365',
    icon: 'fa-microsoft',
    isBrand: true,
    count: 4,
    actions: [
      { action: 'm365_calendar', icon: 'fa-calendar', label: 'Calendario' },
      { action: 'm365_excel', icon: 'fa-file-excel', label: 'Excel Online' },
      { action: 'm365_onedrive', icon: 'fa-cloud', label: 'OneDrive' },
      { action: 'm365_outlook', icon: 'fa-envelope', label: 'Outlook' }
    ]
  },
  {
    id: 'mouse-keyboard',
    name: 'Mouse & Keyboard',
    icon: 'fa-mouse',
    count: 4,
    actions: [
      { action: 'mouse_click', icon: 'fa-mouse-pointer', label: 'Click Mouse' },
      { action: 'mouse_move', icon: 'fa-arrows-alt', label: 'Mover Mouse' },
      { action: 'keyboard_type', icon: 'fa-keyboard', label: 'Teclear' },
      { action: 'keyboard_hotkey', icon: 'fa-keyboard', label: 'Tecla Rápida' }
    ]
  }
]

function WorkflowsView() {
  const [workflowName, setWorkflowName] = useState('Mi Workflow')
  const [workflowSteps, setWorkflowSteps] = useState([])
  const [selectedStep, setSelectedStep] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState(
    WORKFLOW_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  )
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  const handleDragStart = (e, action) => {
    e.dataTransfer.setData('action', JSON.stringify(action))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    try {
      const actionData = JSON.parse(e.dataTransfer.getData('action'))
      const newStep = {
        id: Date.now(),
        ...actionData,
        params: {}
      }
      setWorkflowSteps([...workflowSteps, newStep])
    } catch (err) {
      console.error('Error al agregar acción:', err)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const selectStep = (step) => {
    setSelectedStep(step)
  }

  const deleteStep = (stepId) => {
    setWorkflowSteps(workflowSteps.filter(s => s.id !== stepId))
    if (selectedStep?.id === stepId) {
      setSelectedStep(null)
    }
  }

  const newWorkflow = () => {
    setWorkflowName('Nuevo Workflow')
    setWorkflowSteps([])
    setSelectedStep(null)
  }

  const saveWorkflow = () => {
    const workflow = {
      name: workflowName,
      steps: workflowSteps,
      createdAt: new Date().toISOString()
    }
    console.log('Guardar workflow:', workflow)
    alert('Workflow guardado!')
  }

  const filteredCategories = WORKFLOW_CATEGORIES.map(cat => ({
    ...cat,
    actions: cat.actions.filter(action =>
      action.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.actions.length > 0 || !searchTerm)

  return (
    <div className="view" id="workflows-view">
      <div className="workflow-studio" id="workflowStudio">
        {/* Header con tabs */}
        <div className="studio-header">
          <div className="workflow-tabs" id="workflowTabs">
            <button className="workflow-tab active" data-tab="main">
              <i className="fas fa-file"></i>
              <span id="currentWorkflowName">{workflowName}</span>
              <i className="fas fa-times close-tab"></i>
            </button>
          </div>
          <button className="btn btn-sm btn-primary" onClick={newWorkflow}>
            <i className="fas fa-plus"></i>
          </button>
        </div>

        {/* Panel Izquierdo - Acciones */}
        <div className={`studio-left-panel ${leftPanelCollapsed ? 'collapsed' : ''}`} id="leftPanel">
          <div className="panel-header">
            <h3>
              <i className="fas fa-th-large"></i>
              Acciones
            </h3>
            <button className="panel-collapse-btn" onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}>
              <i className={`fas fa-chevron-${leftPanelCollapsed ? 'right' : 'left'}`}></i>
            </button>
          </div>

          <div className="actions-search">
            <input
              type="text"
              placeholder="Buscar acciones..."
              id="actionsSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="actions-list" id="actionsList">
            {filteredCategories.map(category => (
              <div key={category.id} className={`action-category ${expandedCategories[category.id] ? 'expanded' : ''}`}>
                <div className="category-header" onClick={() => toggleCategory(category.id)}>
                  <i className="fas fa-chevron-right"></i>
                  <i className={`${category.isBrand ? 'fab' : 'fas'} ${category.icon} category-icon`}></i>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </div>
                <div className="category-items">
                  {category.actions.map(action => (
                    <div
                      key={action.action}
                      className="action-item"
                      draggable="true"
                      data-action={action.action}
                      onDragStart={(e) => handleDragStart(e, action)}
                    >
                      <i className={`fas ${action.icon}`}></i>
                      <span>{action.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Central - Canvas */}
        <div className="studio-center-panel">
          <div className="canvas-toolbar">
            <button className="btn btn-sm btn-primary" onClick={newWorkflow}>
              <i className="fas fa-file"></i> Nuevo
            </button>
            <button className="btn btn-sm btn-success" onClick={saveWorkflow}>
              <i className="fas fa-save"></i> Guardar
            </button>
            <button className="btn btn-sm btn-secondary">
              <i className="fas fa-file-import"></i> Importar
            </button>
            <button className="btn btn-sm btn-secondary">
              <i className="fas fa-download"></i> Exportar
            </button>
            <div style={{ borderLeft: '1px solid var(--border-color)', height: '24px', margin: '0 0.5rem' }}></div>
            <button className="btn btn-sm btn-warning">
              <i className="fas fa-exchange-alt"></i> Migrar
            </button>
            <button className="btn btn-sm" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
              <i className="fas fa-robot"></i> IA
            </button>
            <div style={{ marginLeft: 'auto' }}>
              <button className="btn btn-sm btn-secondary">
                <i className="fas fa-sitemap"></i> Vista
              </button>
            </div>
          </div>

          <div className="canvas-container">
            <div
              className="workflow-canvas"
              id="workflowCanvas"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {workflowSteps.length === 0 ? (
                <div className="workflow-canvas-empty" id="canvasEmptyState">
                  <i className="fas fa-project-diagram"></i>
                  <p>Arrastra acciones aquí para construir tu workflow</p>
                  <small>O usa el generador con IA para crear workflows automáticamente</small>
                </div>
              ) : (
                <div id="workflowSteps">
                  {workflowSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`workflow-step ${selectedStep?.id === step.id ? 'selected' : ''}`}
                      onClick={() => selectStep(step)}
                    >
                      <div className="step-number">{index + 1}</div>
                      <div className="step-icon">
                        <i className={`fas ${step.icon}`}></i>
                      </div>
                      <div className="step-content">
                        <span className="step-label">{step.label}</span>
                      </div>
                      <button className="step-delete" onClick={(e) => { e.stopPropagation(); deleteStep(step.id); }}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel Derecho - Propiedades */}
        <div className={`studio-right-panel ${rightPanelCollapsed ? 'collapsed' : ''}`} id="rightPanel">
          <div className="panel-header">
            <h3>
              <i className="fas fa-cog"></i>
              Propiedades
            </h3>
            <button className="panel-collapse-btn" onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}>
              <i className={`fas fa-chevron-${rightPanelCollapsed ? 'left' : 'right'}`}></i>
            </button>
          </div>

          <div className="properties-content" id="propertiesContent">
            {selectedStep ? (
              <div className="property-form">
                <div className="property-group">
                  <label>Acción:</label>
                  <input type="text" value={selectedStep.label} readOnly />
                </div>
                <div className="property-group">
                  <label>Tipo:</label>
                  <input type="text" value={selectedStep.action} readOnly />
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <i className="fas fa-mouse-pointer" style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '1rem' }}></i>
                <p>Selecciona una acción para ver sus propiedades</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="studio-footer">
          <div className="studio-footer-left">
            <div className="studio-footer-item">
              <i className="fas fa-layer-group"></i>
              <span id="stepsCount">{workflowSteps.length} pasos</span>
            </div>
            <div className="studio-footer-item">
              <i className="fas fa-clock"></i>
              <span>Última modificación: Ahora</span>
            </div>
          </div>
          <div className="studio-footer-right">
            <div className="studio-footer-item" id="connectionStatus">
              <i className="fas fa-circle" style={{ color: '#10b981' }}></i>
              <span>Conectado</span>
            </div>
            <div className="studio-footer-item">
              <span>Alqvimia Studio v2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowsView
