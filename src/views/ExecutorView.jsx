import { useState, useEffect } from 'react'
import { useSocket } from '../context/SocketContext'

function ExecutorView() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(null)
  const [totalSteps, setTotalSteps] = useState(0)
  const [executionLogs, setExecutionLogs] = useState([])
  const { socket, isConnected } = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('execution-progress', (data) => {
        setProgress(data.progress)
        setCurrentStep(data.currentStep)
        setTotalSteps(data.totalSteps)
      })

      socket.on('execution-log', (log) => {
        setExecutionLogs(prev => [...prev, log])
      })

      socket.on('execution-complete', () => {
        setIsExecuting(false)
        setProgress(100)
      })

      socket.on('execution-error', (error) => {
        setIsExecuting(false)
        setExecutionLogs(prev => [...prev, { type: 'error', message: error.message, timestamp: new Date().toISOString() }])
      })

      return () => {
        socket.off('execution-progress')
        socket.off('execution-log')
        socket.off('execution-complete')
        socket.off('execution-error')
      }
    }
  }, [socket])

  const executeWorkflow = () => {
    if (!isConnected) {
      alert('Conecta al servidor primero')
      return
    }
    setIsExecuting(true)
    setProgress(0)
    setExecutionLogs([])
    if (socket) {
      socket.emit('execute-workflow')
    }
  }

  const stopExecution = () => {
    setIsExecuting(false)
    if (socket) {
      socket.emit('stop-execution')
    }
  }

  const getLogIcon = (type) => {
    switch (type) {
      case 'success': return 'fa-check-circle'
      case 'error': return 'fa-times-circle'
      case 'warning': return 'fa-exclamation-triangle'
      default: return 'fa-info-circle'
    }
  }

  const getLogColor = (type) => {
    switch (type) {
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#3b82f6'
    }
  }

  return (
    <div className="view" id="executor-view">
      <div className="view-header">
        <h2><i className="fas fa-play-circle"></i> Ejecutor de Workflows</h2>
        <p>Ejecuta y monitorea tus workflows de automatización</p>
      </div>

      <div className="executor-panel">
        <div className="execution-controls">
          <button
            className="btn btn-success btn-lg"
            id="executeWorkflow"
            onClick={executeWorkflow}
            disabled={isExecuting}
          >
            <i className="fas fa-play"></i> Ejecutar Workflow Actual
          </button>
          <button
            className="btn btn-danger btn-lg"
            id="stopExecution"
            onClick={stopExecution}
            disabled={!isExecuting}
          >
            <i className="fas fa-stop"></i> Detener Ejecución
          </button>
        </div>

        <div className="execution-monitor">
          <h3>Monitor de Ejecución</h3>
          <div className="monitor-display" id="executionMonitor">
            {!isExecuting && progress === 0 ? (
              <div className="monitor-idle">
                <i className="fas fa-robot"></i>
                <p>Esperando ejecución...</p>
              </div>
            ) : (
              <div className="monitor-active">
                <div className="execution-status">
                  {isExecuting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Ejecutando paso {currentStep} de {totalSteps}</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                      <span>Ejecución completada</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className="progress-section"
            id="progressSection"
            style={{ display: isExecuting || progress > 0 ? 'block' : 'none' }}
          >
            <div className="progress-bar">
              <div
                className="progress-fill"
                id="progressFill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        </div>

        <div className="execution-log">
          <h3>Log de Ejecución</h3>
          <div className="log-list" id="executionLog">
            {executionLogs.length === 0 ? (
              <div className="log-empty">
                <i className="fas fa-list"></i>
                <p>Los logs aparecerán aquí durante la ejecución</p>
              </div>
            ) : (
              executionLogs.map((log, index) => (
                <div key={index} className={`log-entry ${log.type}`}>
                  <i className={`fas ${getLogIcon(log.type)}`} style={{ color: getLogColor(log.type) }}></i>
                  <span className="log-time">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutorView
