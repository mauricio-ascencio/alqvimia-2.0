import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableStep({ step, isSelected, onSelect, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: step.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`workflow-step ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => onSelect(step)}
    >
      <div className="step-connector top"></div>

      <div className="step-content">
        <div className="step-icon">
          <i className={`fas ${step.icon || 'fa-cog'}`}></i>
        </div>
        <div className="step-info">
          <span className="step-type">{step.label || step.type}</span>
          {step.properties?.selector && (
            <span className="step-detail">{step.properties.selector}</span>
          )}
        </div>
        <div className="step-actions">
          <button
            className="step-action-btn"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(step.id)
            }}
            title="Eliminar"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="step-connector bottom"></div>
    </div>
  )
}

function CenterPanel({ workflow, selectedStep, onSelectStep, onRemoveStep }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'workflow-canvas'
  })

  return (
    <div className="center-panel-content">
      <div className="canvas-toolbar">
        <button className="btn btn-sm" title="Deshacer">
          <i className="fas fa-undo"></i>
        </button>
        <button className="btn btn-sm" title="Rehacer">
          <i className="fas fa-redo"></i>
        </button>
        <div className="toolbar-separator"></div>
        <button className="btn btn-sm" title="Zoom In">
          <i className="fas fa-search-plus"></i>
        </button>
        <button className="btn btn-sm" title="Zoom Out">
          <i className="fas fa-search-minus"></i>
        </button>
        <button className="btn btn-sm" title="Ajustar">
          <i className="fas fa-expand"></i>
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`workflow-canvas ${isOver ? 'drag-over' : ''}`}
      >
        {workflow.length > 0 ? (
          <div className="workflow-steps">
            <div className="start-node">
              <i className="fas fa-play"></i>
              <span>Inicio</span>
            </div>

            {workflow.map((step) => (
              <SortableStep
                key={step.id}
                step={step}
                isSelected={selectedStep?.id === step.id}
                onSelect={onSelectStep}
                onRemove={onRemoveStep}
              />
            ))}

            <div className="end-node">
              <i className="fas fa-stop"></i>
              <span>Fin</span>
            </div>
          </div>
        ) : (
          <div className="canvas-empty-state">
            <div className="empty-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <h3>Arrastra acciones aquí</h3>
            <p>Selecciona acciones del panel izquierdo y arrástralas al canvas para construir tu workflow</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CenterPanel
