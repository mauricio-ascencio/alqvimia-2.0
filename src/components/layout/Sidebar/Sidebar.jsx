import NavItem from './NavItem'

const navItems = [
  { id: 'spy', icon: 'fa-crosshairs', label: 'Element Spy' },
  { id: 'recorder', icon: 'fa-circle-dot', label: 'Grabador' },
  { id: 'workflows', icon: 'fa-project-diagram', label: 'Workflows' },
  { id: 'executor', icon: 'fa-play-circle', label: 'Ejecutor' },
  { id: 'library', icon: 'fa-folder-open', label: 'Biblioteca' },
  { id: 'ai-dashboard', icon: 'fa-brain', label: 'IA Dashboard' },
  { id: 'omnichannel', icon: 'fa-comments', label: 'Omnicanalidad' },
  { id: 'video-conference', icon: 'fa-video', label: 'Videoconferencia' }
]

function Sidebar({ currentView, onViewChange, collapsed, onToggleCollapse }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="mainSidebar">
      <button
        className="sidebar-toggle"
        onClick={onToggleCollapse}
        title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
      </button>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              isActive={currentView === item.id}
              onClick={() => onViewChange(item.id)}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-info">
          {!collapsed && (
            <>
              <span className="info-label">Alqvimia RPA</span>
              <span className="info-version">React 2.0</span>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
