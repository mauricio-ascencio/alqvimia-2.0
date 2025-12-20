import clsx from 'clsx'

function Card({
  children,
  title,
  subtitle,
  icon,
  headerAction,
  footer,
  className = '',
  variant = 'default',
  hoverable = false,
  onClick
}) {
  return (
    <div
      className={clsx(
        'card',
        `card-${variant}`,
        { 'card-hoverable': hoverable },
        { 'card-clickable': onClick },
        className
      )}
      onClick={onClick}
    >
      {(title || headerAction) && (
        <div className="card-header">
          <div className="card-title-wrapper">
            {icon && <i className={`fas ${icon} card-icon`}></i>}
            <div>
              {title && <h4 className="card-title">{title}</h4>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {headerAction && (
            <div className="card-header-action">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
