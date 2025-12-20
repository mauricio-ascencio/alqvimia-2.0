import { useEffect } from 'react'
import { useRecorderStore } from '../../stores/recorderStore'
import { useSocket } from '../../context/SocketContext'
import { Button, Card, Input } from '../common'

function RecorderView() {
  const {
    isRecording,
    isPaused,
    recordedActions,
    targetUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    addAction,
    removeAction,
    clearActions,
    setTargetUrl
  } = useRecorderStore()

  const { socket, isConnected, emit, on } = useSocket()

  useEffect(() => {
    if (!socket) return

    const unsubscribe = on('action-recorded', (action) => {
      addAction(action)
    })

    return unsubscribe
  }, [socket, on, addAction])

  const handleStartRecording = () => {
    if (!targetUrl) {
      alert('Por favor, ingresa una URL objetivo')
      return
    }
    emit('start-recording', { url: targetUrl })
    startRecording(targetUrl)
  }

  const handleStopRecording = () => {
    emit('stop-recording')
    stopRecording()
  }

  const handlePauseRecording = () => {
    pauseRecording()
  }

  const handleSaveAsWorkflow = () => {
    if (recordedActions.length === 0) {
      alert('No hay acciones grabadas')
      return
    }
    // TODO: Abrir modal para guardar
    console.log('Guardar como workflow:', recordedActions)
  }

  const getActionIcon = (type) => {
    const icons = {
      click: 'fa-mouse-pointer',
      type: 'fa-keyboard',
      navigate: 'fa-link',
      scroll: 'fa-arrows-alt-v',
      select: 'fa-hand-pointer',
      hover: 'fa-hand-point-up'
    }
    return icons[type] || 'fa-circle'
  }

  return (
    <div className="view" id="recorder-view">
      <div className="view-header">
        <h2><i className="fas fa-circle-dot"></i> Grabador de Acciones</h2>
        <p className="view-description">Graba tus interacciones para crear workflows automáticamente</p>
      </div>

      <div className="recorder-toolbar">
        <div className="url-input-group">
          <Input
            type="url"
            placeholder="https://ejemplo.com"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            icon="fa-link"
            disabled={isRecording}
          />
        </div>

        <div className="recorder-controls">
          {!isRecording ? (
            <Button
              variant="success"
              icon="fa-circle"
              onClick={handleStartRecording}
              disabled={!isConnected}
            >
              Iniciar Grabación
            </Button>
          ) : (
            <>
              <Button
                variant="warning"
                icon={isPaused ? 'fa-play' : 'fa-pause'}
                onClick={handlePauseRecording}
              >
                {isPaused ? 'Reanudar' : 'Pausar'}
              </Button>
              <Button
                variant="danger"
                icon="fa-stop"
                onClick={handleStopRecording}
              >
                Detener
              </Button>
            </>
          )}
        </div>
      </div>

      {isRecording && (
        <div className={`recording-status ${isPaused ? 'paused' : 'active'}`}>
          <div className="recording-indicator">
            <span className="recording-dot"></span>
            <span>{isPaused ? 'Grabación Pausada' : 'Grabando...'}</span>
          </div>
          <span className="recording-count">{recordedActions.length} acciones</span>
        </div>
      )}

      <div className="recorder-content">
        <Card
          title="Acciones Grabadas"
          icon="fa-list"
          headerAction={
            <Button
              variant="secondary"
              size="sm"
              icon="fa-trash"
              onClick={clearActions}
              disabled={recordedActions.length === 0}
            >
              Limpiar
            </Button>
          }
        >
          {recordedActions.length > 0 ? (
            <div className="recorded-actions-list">
              {recordedActions.map((action, index) => (
                <div key={action.id} className="action-item">
                  <div className="action-number">{index + 1}</div>
                  <div className="action-icon">
                    <i className={`fas ${getActionIcon(action.type)}`}></i>
                  </div>
                  <div className="action-info">
                    <span className="action-type">{action.type}</span>
                    {action.selector && (
                      <span className="action-selector">{action.selector}</span>
                    )}
                    {action.text && (
                      <span className="action-text">"{action.text}"</span>
                    )}
                  </div>
                  <div className="action-actions">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeAction(action.id)}
                      title="Eliminar"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-video"></i>
              <p>No hay acciones grabadas</p>
              <span>Inicia una grabación para capturar tus interacciones</span>
            </div>
          )}
        </Card>
      </div>

      <div className="recorder-footer">
        <Button
          variant="primary"
          icon="fa-save"
          onClick={handleSaveAsWorkflow}
          disabled={recordedActions.length === 0}
        >
          Guardar como Workflow
        </Button>
      </div>
    </div>
  )
}

export default RecorderView
