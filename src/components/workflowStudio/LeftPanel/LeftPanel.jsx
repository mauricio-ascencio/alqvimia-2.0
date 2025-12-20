import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { ACTION_CATEGORIES } from '../../../utils/constants'

function DraggableAction({ action, categoryId }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `action-${categoryId}-${action.type}`,
    data: {
      isNewAction: true,
      action: action
    }
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`action-item ${isDragging ? 'dragging' : ''}`}
    >
      <i className={`fas ${action.icon}`}></i>
      <span>{action.label}</span>
    </div>
  )
}

function ActionCategory({ category, isExpanded, onToggle }) {
  return (
    <div className={`action-category ${isExpanded ? 'expanded' : ''}`}>
      <div className="category-header" onClick={onToggle}>
        <div className="category-title">
          <i className={`fas ${category.icon}`}></i>
          <span>{category.name}</span>
        </div>
        <div className="category-meta">
          <span className="action-count">{category.actions.length}</span>
          <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`}></i>
        </div>
      </div>
      {isExpanded && (
        <div className="category-actions">
          {category.actions.map((action) => (
            <DraggableAction
              key={action.type}
              action={action}
              categoryId={category.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function LeftPanel() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState(['web-browser'])

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const filteredCategories = ACTION_CATEGORIES.map((category) => ({
    ...category,
    actions: category.actions.filter((action) =>
      action.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter((category) => category.actions.length > 0)

  return (
    <div className="left-panel-content">
      <div className="actions-search">
        <div className="search-input-wrapper">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar acciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      <div className="actions-categories">
        {filteredCategories.map((category) => (
          <ActionCategory
            key={category.id}
            category={category}
            isExpanded={expandedCategories.includes(category.id) || searchTerm !== ''}
            onToggle={() => toggleCategory(category.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default LeftPanel
