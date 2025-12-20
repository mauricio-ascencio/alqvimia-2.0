import { useState } from 'react'
import { Button, Card, Input } from '../common'

function ElementSpyView() {
  const [targetUrl, setTargetUrl] = useState('')
  const [isInspecting, setIsInspecting] = useState(false)
  const [selectedElement, setSelectedElement] = useState(null)
  const [selectors, setSelectors] = useState({
    css: '',
    xpath: '',
    id: '',
    className: '',
    name: ''
  })

  const handleLaunchInspector = () => {
    if (!targetUrl) {
      alert('Por favor, ingresa una URL')
      return
    }
    // Aquí se lanzaría la ventana de inspección
    setIsInspecting(true)
    window.open(targetUrl, '_blank', 'width=1200,height=800')
  }

  const handleCopySelector = (type) => {
    const value = selectors[type]
    if (value) {
      navigator.clipboard.writeText(value)
    }
  }

  const handleAddToWorkflow = () => {
    if (selectors.css) {
      // Añadir al workflow actual
      console.log('Añadir selector al workflow:', selectors.css)
    }
  }

  return (
    <div className="view active" id="spy-view">
      <div className="view-header">
        <h2><i className="fas fa-crosshairs"></i> Element Spy</h2>
        <p className="view-description">Inspector de elementos para automatización web</p>
      </div>

      <div className="spy-toolbar">
        <div className="url-input-group">
          <Input
            type="url"
            placeholder="https://ejemplo.com"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            icon="fa-link"
            className="url-input"
          />
          <Button
            variant="primary"
            icon="fa-external-link-alt"
            onClick={handleLaunchInspector}
          >
            Lanzar Inspector
          </Button>
        </div>
      </div>

      <div className="spy-content">
        <div className="spy-features">
          <Card
            title="Selector Picker"
            icon="fa-mouse-pointer"
            className="feature-card"
          >
            <p>Haz clic en cualquier elemento de la página para obtener sus selectores automáticamente.</p>
            <Button
              variant="secondary"
              icon="fa-crosshairs"
              disabled={!isInspecting}
            >
              Activar Picker
            </Button>
          </Card>

          <Card
            title="Multiple Selectors"
            icon="fa-list"
            className="feature-card"
          >
            <p>Genera múltiples tipos de selectores: CSS, XPath, ID, Class, Name.</p>
          </Card>

          <Card
            title="Vista Previa"
            icon="fa-eye"
            className="feature-card"
          >
            <p>Visualiza el elemento seleccionado con resaltado en la página.</p>
          </Card>
        </div>

        <div className="spy-inspector">
          <Card title="Elemento Seleccionado" icon="fa-info-circle">
            {selectedElement ? (
              <div className="element-info">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Tag:</label>
                    <span>{selectedElement.tag}</span>
                  </div>
                  <div className="info-item">
                    <label>ID:</label>
                    <span>{selectedElement.id || '-'}</span>
                  </div>
                  <div className="info-item">
                    <label>Class:</label>
                    <span>{selectedElement.className || '-'}</span>
                  </div>
                  <div className="info-item">
                    <label>Name:</label>
                    <span>{selectedElement.name || '-'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-mouse-pointer"></i>
                <p>Selecciona un elemento en la página para ver sus propiedades</p>
              </div>
            )}
          </Card>

          <Card title="Selectores Generados" icon="fa-code">
            <div className="selectors-list">
              <div className="selector-item">
                <label>CSS Selector:</label>
                <div className="selector-value">
                  <input
                    type="text"
                    value={selectors.css}
                    readOnly
                    placeholder="No hay selector CSS"
                  />
                  <button
                    className="btn btn-sm"
                    onClick={() => handleCopySelector('css')}
                    title="Copiar"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div className="selector-item">
                <label>XPath:</label>
                <div className="selector-value">
                  <input
                    type="text"
                    value={selectors.xpath}
                    readOnly
                    placeholder="No hay XPath"
                  />
                  <button
                    className="btn btn-sm"
                    onClick={() => handleCopySelector('xpath')}
                    title="Copiar"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div className="selector-item">
                <label>ID:</label>
                <div className="selector-value">
                  <input
                    type="text"
                    value={selectors.id}
                    readOnly
                    placeholder="No hay ID"
                  />
                  <button
                    className="btn btn-sm"
                    onClick={() => handleCopySelector('id')}
                    title="Copiar"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="selector-actions">
              <Button
                variant="success"
                icon="fa-plus"
                onClick={handleAddToWorkflow}
                disabled={!selectors.css}
              >
                Agregar a Workflow
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ElementSpyView
