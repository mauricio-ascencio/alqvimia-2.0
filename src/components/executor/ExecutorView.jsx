import { useEffect } from 'react'
import { useExecutorStore } from '../../stores/executorStore'
import { useWorkflowStore } from '../../stores/workflowStore'
import { useSocket } from '../../context/SocketContext'
import { Button, Card } from '../common'
import { LOG_ICONS } from '../../utils/constants'

function ExecutorView() {
  const {
    isExecuting,
    currentStepIndex,
    totalSteps,
    executionLogs,
    executionStatus,
    executionError,
    startExecution,
    stopExecution,
    pauseExecution,
    addLog,
    completeExecution,
    setCurrentStep,
    setError,
    resetExecution
  } = useExecutorStore()

  const { currentWorkflow, workflowName } = useWorkflowStore()
  const { socket, isConnected, emit, on } = useSocket()

  useEffect(() => {
    if (!socket) return

    const unsubStatus = on('workflow-status', (data) => {
      setCurrentStep(data.stepIndex)
      addLog({
        type: 'info',
        message: `Ejecutando: ${data.stepName || `Paso ${data.stepIndex + 1}`}`
      })
    })

    const unsubComplete = on('workflow-completed', (result) => {
      completeExecution(true)
      addLog({
        type: 'success',
        message: 'Workflow completado exitosamente'
      })
    })

    const unsubError = on('workflow-error', (error) => {
      setError(error.message)
      addLog({
        type: 'error',
        message: `Error: ${error.message}`
      })
    })

    return () => {
      unsubStatus?.()
      unsubComplete?.()
      unsubError?.()
    }
  }, [socket, on])

  const handleExecute = () => {
    if (currentWorkflow.length === 0) {
      alert('No hay pasos en el workflow actual')
      return
    }

    const workflow = {
      name: workflowName,
      steps: currentWorkflow
    }

    startExecution(workflow)
    emit('execute-workflow', workflow)
    addLog({
      type: 'info',
      message: `Iniciando ejecución: ${workflowName}`
    })
  }

  const handleStop = () => {
    emit('stop-workflow')
    stopExecution()
    addLog({
      type: 'warning',
      message: 'Ejecución detenida por el usuario'
    })
  }

  const handlePause = () => {
    pauseExecution()
    addLog({
      type: 'info',
      message: executionStatus === 'paused' ? 'Ejecución reanudada' : 'Ejecución pausada'
    })
  }

  const progress = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0

  const getStatusColor = () => {
    switch (executionStatus) {
      case 'running': return 'status-running'
      case 'paused': return 'status-paused'
      case 'completed': return 'status-completed'
      case 'error': return 'status-error'
      default: return 'status-idle'
    }
  }

  const getStatusText = () => {
    switch (executionStatus) {
      case 'running': return 'Ejecutando...'
      case 'paused': return 'Pausado'
      case 'completed': return 'Completado'
      case 'error': return 'Error'
      case 'stopped': return 'Detenido'
      default: return 'Listo'
    }
  }

  return (
    <div className="view" id="executor-view">
      <div className="view-header">
        <h2><i className="fas fa-play-circle"></i> Ejecutor de Workflows</h2>
        <p className="view-description">Ejecuta y monitorea tus workflows</p>
      </div>

      <div className="executor-toolbar">
        <div className="execution-controls">
          {!isExecuting ? (
            <Button
              variant="success"
              icon="fa-play"
              onClick={handleExecute}
              disabled={!isConnected || currentWorkflow.length === 0}
            >
              Ejecutar Workflow
            </Button>
          ) : (
            <>
              <Button
                variant="warning"
                icon={executionStatus === 'paused' ? 'fa-play' : 'fa-pause'}
                onClick={handlePause}
              >
                {executionStatus === 'paused' ? 'Reanudar' : 'Pausar'}
              </Button>
              <Button
                variant="danger"
                icon="fa-stop"
                onClick={handleStop}
              >
                Detener
              </Button>
            </>
          )}
        </div>

        <div className={`execution-status ${getStatusColor()}`}>
          <span className="status-indicator"></span>
          <span>{getStatusText()}</span>
        </div>
      </div>

      <div className="executor-content">
        <Card title="Monitor de Ejecución" icon="fa-chart-line">
          <div className="execution-info">
            <div className="info-item">
              <label>Workflow:</label>
              <span>{workflowName}</span>
            </div>
            <div className="info-item">
              <label>Total de pasos:</label>
              <span>{totalSteps || currentWorkflow.length}</span>
            </div>
            <div className="info-item">
              <label>Paso actual:</label>
              <span>{isExecuting ? currentStepIndex + 1 : '-'}</span>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>

          {executionError && (
            <div className="execution-error">
              <i className="fas fa-exclamation-circle"></i>
              <span>{executionError}</span>
            </div>
          )}
        </Card>

        <Card
          title="Log de Ejecución"
          icon="fa-terminal"
          headerAction={
            <Button
              variant="secondary"
              size="sm"
              icon="fa-trash"
              onClick={resetExecution}
              disabled={isExecuting}
            >
              Limpiar
            </Button>
          }
        >
          <div className="execution-log">
            {executionLogs.length > 0 ? (
              executionLogs.map((log) => (
                <div key={log.id} className={`log-entry log-${log.type}`}>
                  <span className="log-time">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <i className={`fas ${LOG_ICONS[log.type] || 'fa-info-circle'}`}></i>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            ) : (
              <div className="empty-log">
                <i className="fas fa-terminal"></i>
                <p>No hay logs de ejecución</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ExecutorView
