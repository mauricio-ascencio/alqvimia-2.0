import clsx from 'clsx'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  title,
  ...props
}) {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClass = size !== 'md' ? `btn-${size}` : ''

  return (
    <button
      type={type}
      className={clsx(
        baseClass,
        variantClass,
        sizeClass,
        { 'btn-block': fullWidth },
        { 'btn-loading': loading },
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      title={title}
      {...props}
    >
      {loading && <i className="fas fa-spinner fa-spin"></i>}
      {!loading && icon && iconPosition === 'left' && (
        <i className={`fas ${icon}`}></i>
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <i className={`fas ${icon}`}></i>
      )}
    </button>
  )
}

export default Button
