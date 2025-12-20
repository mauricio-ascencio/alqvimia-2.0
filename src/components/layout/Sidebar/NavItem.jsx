function NavItem({ id, icon, label, isActive, onClick, collapsed }) {
  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
      <button
        className="nav-link"
        onClick={onClick}
        data-view={id}
        title={collapsed ? label : ''}
      >
        <i className={`fas ${icon}`}></i>
        {!collapsed && <span className="nav-text">{label}</span>}
      </button>
    </li>
  )
}

export default NavItem
