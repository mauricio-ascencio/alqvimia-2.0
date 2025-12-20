import { useState } from 'react'
import { useSocket } from '../context/SocketContext'

function RecorderView() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordedActions, setRecordedActions] = useState([])
  const { socket, isConnected } = useSocket()

  const startRecording = () => {
    if (!isConnected) {
      alert('Conecta al servidor primero')
      return
    }
    setIsRecording(true)
    setIsPaused(false)
    if (socket) {
      socket.emit('start-recording')
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    if (socket) {
      socket.emit('stop-recording')
    }
  }

  const pauseRecording = () => {
    setIsPaused(!isPaused)
    if (socket) {
      socket.emit(isPaused ? 'resume-recording' : 'pause-recording')
    }
  }

  const saveRecording = () => {
    console.log('Guardar como workflow:', recordedActions)
  }

  const clearRecording = () => {
    setRecordedActions([])
  }

  return (
    <div className="view" id="recorder-view">
      <div className="view-header">
        <h2><i className="fas fa-video"></i> Grabador de Acciones</h2>
        <p>Graba interacciones automáticamente para crear workflows</p>
      </div>

      <div className="recorder-controls">
        <div className="control-panel">
          <button
            className="btn btn-danger btn-lg"
            id="startRecording"
            onClick={startRecording}
            disabled={isRecording}
          >
            <i className="fas fa-circle"></i> Iniciar Grabación
          </button>
          <button
            className="btn btn-secondary btn-lg"
            id="stopRecording"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            <i className="fas fa-stop"></i> Detener
          </button>
          <button
            className="btn btn-primary btn-lg"
            id="pauseRecording"
            onClick={pauseRecording}
            disabled={!isRecording}
          >
            <i className={`fas fa-${isPaused ? 'play' : 'pause'}`}></i> {isPaused ? 'Reanudar' : 'Pausar'}
          </button>
        </div>

        <div className="recording-status" id="recordingStatus">
          <i className={`fas fa-${isRecording ? (isPaused ? 'pause-circle' : 'circle recording') : 'info-circle'}`}></i>
          <span>
            {isRecording
              ? isPaused
                ? 'Grabación en pausa'
                : 'Grabando...'
              : 'Listo para grabar'}
          </span>
        </div>
      </div>

      <div className="recorded-actions">
        <h3>Acciones Grabadas <span id="actionCount">({recordedActions.length})</span></h3>
        <div className="actions-list" id="recordedActionsList">
          {recordedActions.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-video-slash"></i>
              <p>No hay acciones grabadas</p>
              <small>Inicia la grabación para capturar acciones</small>
            </div>
          ) : (
            recordedActions.map((action, index) => (
              <div key={index} className="action-item recorded">
                <span className="action-number">{index + 1}</span>
                <i className={`fas fa-${action.icon || 'mouse-pointer'}`}></i>
                <span className="action-type">{action.type}</span>
                <span className="action-target">{action.target}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="recorder-footer">
        <button
          className="btn btn-success"
          id="saveRecording"
          onClick={saveRecording}
          disabled={recordedActions.length === 0}
        >
          <i className="fas fa-save"></i> Guardar como Workflow
        </button>
        <button
          className="btn btn-warning"
          id="clearRecording"
          onClick={clearRecording}
          disabled={recordedActions.length === 0}
        >
          <i className="fas fa-trash"></i> Limpiar
        </button>
      </div>
    </div>
  )
}

export default RecorderView
