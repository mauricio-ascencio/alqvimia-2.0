import { useWorkflowStore } from '../../stores/workflowStore'

function WorkflowTabs() {
  const {
    openTabs,
    activeTabId,
    setActiveTab,
    closeTab,
    workflowName,
    isDirty
  } = useWorkflowStore()

  const handleCloseTab = (e, tabId) => {
    e.stopPropagation()
    if (openTabs.length > 1) {
      closeTab(tabId)
    }
  }

  return (
    <div className="workflow-tabs">
      {openTabs.map((tab) => (
        <div
          key={tab.id}
          className={`workflow-tab ${activeTabId === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <i className="fas fa-project-diagram"></i>
          <span className="tab-name">
            {tab.id === activeTabId ? workflowName : tab.name}
          </span>
          {activeTabId === tab.id && isDirty && (
            <span className="unsaved-indicator">•</span>
          )}
          {openTabs.length > 1 && (
            <button
              className="tab-close"
              onClick={(e) => handleCloseTab(e, tab.id)}
              title="Cerrar"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      ))}
      <button className="add-tab" title="Nuevo Workflow">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}

export default WorkflowTabs
