import { useState } from 'react'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useWorkflowStore } from '../../stores/workflowStore'
import { useUIStore } from '../../stores/uiStore'
import LeftPanel from './LeftPanel/LeftPanel'
import CenterPanel from './CenterPanel/CenterPanel'
import RightPanel from './RightPanel/RightPanel'
import WorkflowTabs from './WorkflowTabs'

function WorkflowStudioView() {
  const {
    currentWorkflow,
    selectedStep,
    workflowName,
    addStep,
    removeStep,
    updateStep,
    reorderSteps,
    selectStep
  } = useWorkflowStore()

  const {
    leftPanelCollapsed,
    rightPanelCollapsed,
    toggleLeftPanel,
    toggleRightPanel
  } = useUIStore()

  const [activeId, setActiveId] = useState(null)
  const [draggedAction, setDraggedAction] = useState(null)

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)

    // Si es una acción nueva del panel izquierdo
    if (active.data.current?.isNewAction) {
      setDraggedAction(active.data.current.action)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    setActiveId(null)
    setDraggedAction(null)

    if (!over) return

    // Si se está arrastrando una nueva acción al canvas
    if (active.data.current?.isNewAction) {
      const action = active.data.current.action
      addStep({
        type: action.type,
        label: action.label,
        icon: action.icon,
        properties: {}
      })
      return
    }

    // Si se está reordenando dentro del canvas
    if (active.id !== over.id) {
      const oldIndex = currentWorkflow.findIndex(step => step.id === active.id)
      const newIndex = currentWorkflow.findIndex(step => step.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = [...currentWorkflow]
        const [removed] = newOrder.splice(oldIndex, 1)
        newOrder.splice(newIndex, 0, removed)
        reorderSteps(newOrder)
      }
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setDraggedAction(null)
  }

  return (
    <div className="view workflow-studio-view" id="workflows-view">
      <div className="studio-header">
        <WorkflowTabs />
        <div className="studio-actions">
          <button className="btn btn-secondary btn-sm" title="Importar">
            <i className="fas fa-file-import"></i>
          </button>
          <button className="btn btn-secondary btn-sm" title="Exportar">
            <i className="fas fa-file-export"></i>
          </button>
          <button className="btn btn-primary btn-sm" title="Guardar">
            <i className="fas fa-save"></i> Guardar
          </button>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="studio-container">
          {/* Panel Izquierdo - Acciones */}
          <div className={`studio-panel left-panel ${leftPanelCollapsed ? 'collapsed' : ''}`}>
            <div className="panel-header">
              <span>Acciones</span>
              <button
                className="panel-toggle"
                onClick={toggleLeftPanel}
                title={leftPanelCollapsed ? 'Expandir' : 'Colapsar'}
              >
                <i className={`fas fa-chevron-${leftPanelCollapsed ? 'right' : 'left'}`}></i>
              </button>
            </div>
            {!leftPanelCollapsed && <LeftPanel />}
          </div>

          {/* Panel Central - Canvas */}
          <div className="studio-panel center-panel">
            <SortableContext
              items={currentWorkflow.map(step => step.id)}
              strategy={verticalListSortingStrategy}
            >
              <CenterPanel
                workflow={currentWorkflow}
                selectedStep={selectedStep}
                onSelectStep={selectStep}
                onRemoveStep={removeStep}
              />
            </SortableContext>
          </div>

          {/* Panel Derecho - Propiedades */}
          <div className={`studio-panel right-panel ${rightPanelCollapsed ? 'collapsed' : ''}`}>
            <div className="panel-header">
              <button
                className="panel-toggle"
                onClick={toggleRightPanel}
                title={rightPanelCollapsed ? 'Expandir' : 'Colapsar'}
              >
                <i className={`fas fa-chevron-${rightPanelCollapsed ? 'left' : 'right'}`}></i>
              </button>
              <span>Propiedades</span>
            </div>
            {!rightPanelCollapsed && (
              <RightPanel
                selectedStep={selectedStep}
                onUpdateStep={updateStep}
              />
            )}
          </div>
        </div>

        <DragOverlay>
          {draggedAction && (
            <div className="drag-overlay-item">
              <i className={`fas ${draggedAction.icon}`}></i>
              <span>{draggedAction.label}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <div className="studio-footer">
        <div className="footer-info">
          <span>{currentWorkflow.length} pasos</span>
          <span className="separator">|</span>
          <span>{workflowName}</span>
        </div>
      </div>
    </div>
  )
}

export default WorkflowStudioView
