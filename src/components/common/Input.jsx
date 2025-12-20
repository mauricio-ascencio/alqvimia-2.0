import clsx from 'clsx'

function Input({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  disabled = false,
  readOnly = false,
  required = false,
  className = '',
  inputClassName = '',
  id,
  name,
  autoComplete,
  ...props
}) {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={clsx('form-group', className, { 'has-error': error })}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className={clsx('input-wrapper', { 'has-icon': icon })}>
        {icon && iconPosition === 'left' && (
          <i className={`fas ${icon} input-icon input-icon-left`}></i>
        )}

        <input
          type={type}
          id={inputId}
          name={name}
          className={clsx('form-control', inputClassName)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <i className={`fas ${icon} input-icon input-icon-right`}></i>
        )}
      </div>

      {(error || helperText) && (
        <span className={clsx('form-text', { 'text-danger': error })}>
          {error || helperText}
        </span>
      )}
    </div>
  )
}

export default Input
