import { useState, useEffect } from 'react'

function PropertyField({ label, type, value, onChange, options, placeholder }) {
  switch (type) {
    case 'select':
      return (
        <div className="property-field">
          <label>{label}</label>
          <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
            <option value="">Seleccionar...</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )

    case 'textarea':
      return (
        <div className="property-field">
          <label>{label}</label>
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
          />
        </div>
      )

    case 'number':
      return (
        <div className="property-field">
          <label>{label}</label>
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      )

    case 'checkbox':
      return (
        <div className="property-field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span>{label}</span>
          </label>
        </div>
      )

    default:
      return (
        <div className="property-field">
          <label>{label}</label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      )
  }
}

function RightPanel({ selectedStep, onUpdateStep }) {
  const [localProperties, setLocalProperties] = useState({})

  useEffect(() => {
    if (selectedStep) {
      setLocalProperties(selectedStep.properties || {})
    } else {
      setLocalProperties({})
    }
  }, [selectedStep])

  const handlePropertyChange = (key, value) => {
    const newProperties = { ...localProperties, [key]: value }
    setLocalProperties(newProperties)
    if (selectedStep) {
      onUpdateStep(selectedStep.id, { properties: newProperties })
    }
  }

  const getPropertiesForType = (type) => {
    const commonProps = [
      { key: 'description', label: 'Descripción', type: 'text', placeholder: 'Descripción del paso' },
      { key: 'timeout', label: 'Timeout (ms)', type: 'number', placeholder: '30000' },
      { key: 'continueOnError', label: 'Continuar en error', type: 'checkbox' }
    ]

    const typeProps = {
      click: [
        { key: 'selector', label: 'Selector', type: 'text', placeholder: '#button-id' },
        { key: 'clickType', label: 'Tipo de clic', type: 'select', options: [
          { value: 'single', label: 'Simple' },
          { value: 'double', label: 'Doble' },
          { value: 'right', label: 'Derecho' }
        ]},
        { key: 'waitBefore', label: 'Esperar antes (ms)', type: 'number', placeholder: '0' }
      ],
      type: [
        { key: 'selector', label: 'Selector', type: 'text', placeholder: '#input-id' },
        { key: 'text', label: 'Texto', type: 'textarea', placeholder: 'Texto a escribir' },
        { key: 'clearBefore', label: 'Limpiar antes', type: 'checkbox' },
        { key: 'delay', label: 'Delay entre teclas (ms)', type: 'number', placeholder: '50' }
      ],
      navigate: [
        { key: 'url', label: 'URL', type: 'text', placeholder: 'https://ejemplo.com' },
        { key: 'waitUntil', label: 'Esperar hasta', type: 'select', options: [
          { value: 'load', label: 'Carga completa' },
          { value: 'domcontentloaded', label: 'DOM cargado' },
          { value: 'networkidle0', label: 'Red inactiva' }
        ]}
      ],
      extract: [
        { key: 'selector', label: 'Selector', type: 'text', placeholder: '.content' },
        { key: 'attribute', label: 'Atributo', type: 'text', placeholder: 'innerText' },
        { key: 'variable', label: 'Guardar en variable', type: 'text', placeholder: 'extractedText' }
      ],
      wait_seconds: [
        { key: 'seconds', label: 'Segundos', type: 'number', placeholder: '5' }
      ],
      wait_element: [
        { key: 'selector', label: 'Selector', type: 'text', placeholder: '#element-id' },
        { key: 'state', label: 'Estado', type: 'select', options: [
          { value: 'visible', label: 'Visible' },
          { value: 'hidden', label: 'Oculto' },
          { value: 'attached', label: 'Presente' }
        ]}
      ]
    }

    return [...(typeProps[type] || []), ...commonProps]
  }

  if (!selectedStep) {
    return (
      <div className="right-panel-content">
        <div className="panel-empty-state">
          <i className="fas fa-mouse-pointer"></i>
          <p>Selecciona un paso para ver sus propiedades</p>
        </div>
      </div>
    )
  }

  const properties = getPropertiesForType(selectedStep.type)

  return (
    <div className="right-panel-content">
      <div className="step-header">
        <div className="step-icon">
          <i className={`fas ${selectedStep.icon || 'fa-cog'}`}></i>
        </div>
        <div className="step-title">
          <h4>{selectedStep.label || selectedStep.type}</h4>
          <span className="step-type-badge">{selectedStep.type}</span>
        </div>
      </div>

      <div className="properties-form">
        {properties.map((prop) => (
          <PropertyField
            key={prop.key}
            label={prop.label}
            type={prop.type}
            value={localProperties[prop.key]}
            onChange={(value) => handlePropertyChange(prop.key, value)}
            options={prop.options}
            placeholder={prop.placeholder}
          />
        ))}
      </div>
    </div>
  )
}

export default RightPanel
