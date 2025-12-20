import { useState } from 'react'
import { useSocket } from '../context/SocketContext'

function SpyView() {
  const [spyUrl, setSpyUrl] = useState('https://www.google.com')
  const [inspectorVisible, setInspectorVisible] = useState(false)
  const [selectedElement, setSelectedElement] = useState({
    tag: '',
    id: '',
    className: '',
    name: ''
  })
  const [selectors, setSelectors] = useState([])
  const { socket, isConnected } = useSocket()

  const launchSpy = () => {
    if (!isConnected) {
      alert('Conecta al servidor primero')
      return
    }
    if (socket) {
      socket.emit('launch-spy', { url: spyUrl })
    }
  }

  const addToWorkflow = () => {
    console.log('Agregar a workflow:', selectors[0])
  }

  const copySelector = () => {
    if (selectors.length > 0) {
      navigator.clipboard.writeText(selectors[0].value)
    }
  }

  return (
    <div className="view active" id="spy-view">
      <div className="view-header">
        <h2><i className="fas fa-search"></i> Element Spy Inspector</h2>
        <p>Inspecciona y captura elementos de páginas web con selectores avanzados</p>
      </div>

      <div className="spy-tools">
        <div className="tool-group">
          <label>URL de la página:</label>
          <div className="input-group">
            <input
              type="text"
              id="spyUrl"
              placeholder="https://ejemplo.com"
              value={spyUrl}
              onChange={(e) => setSpyUrl(e.target.value)}
            />
            <button className="btn btn-primary" id="launchSpy" onClick={launchSpy}>
              <i className="fas fa-rocket"></i> Lanzar Spy
            </button>
          </div>
        </div>

        <div className="spy-features">
          <div className="feature-card">
            <i className="fas fa-crosshairs"></i>
            <h3>Selector Picker</h3>
            <p>Haz clic en cualquier elemento para obtener su selector</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-code"></i>
            <h3>Múltiples Selectores</h3>
            <p>CSS, XPath, ID, Class, Name</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-eye"></i>
            <h3>Vista Previa</h3>
            <p>Visualiza el elemento seleccionado en tiempo real</p>
          </div>
        </div>

        <div
          className="element-inspector"
          id="elementInspector"
          style={{ display: inspectorVisible ? 'block' : 'none' }}
        >
          <h3>Elemento Seleccionado</h3>
          <div className="inspector-grid">
            <div className="inspector-item">
              <label>Tag:</label>
              <input type="text" id="elemTag" readOnly value={selectedElement.tag} />
            </div>
            <div className="inspector-item">
              <label>ID:</label>
              <input type="text" id="elemId" readOnly value={selectedElement.id} />
            </div>
            <div className="inspector-item">
              <label>Class:</label>
              <input type="text" id="elemClass" readOnly value={selectedElement.className} />
            </div>
            <div className="inspector-item">
              <label>Name:</label>
              <input type="text" id="elemName" readOnly value={selectedElement.name} />
            </div>
          </div>

          <div className="selector-options">
            <h4>Selectores Disponibles:</h4>
            <div className="selector-list" id="selectorList">
              {selectors.map((sel, index) => (
                <div key={index} className="selector-item">
                  <span className="selector-type">{sel.type}</span>
                  <code>{sel.value}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-success" id="addToWorkflow" onClick={addToWorkflow}>
              <i className="fas fa-plus"></i> Agregar a Workflow
            </button>
            <button className="btn btn-secondary" id="copySelector" onClick={copySelector}>
              <i className="fas fa-copy"></i> Copiar Selector
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpyView
