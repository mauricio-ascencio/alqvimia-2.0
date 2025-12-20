import { useState, useRef, useEffect } from 'react'
import { Button, Modal } from '../common'
import VCSidebar from './VCSidebar/VCSidebar'

function VideoConferenceView() {
  const [isInSession, setIsInSession] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [activeSidebarTab, setActiveSidebarTab] = useState('participants')
  const [showSidebar, setShowSidebar] = useState(true)
  const [sessionTime, setSessionTime] = useState(0)
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Tú', isHost: true, isMuted: false, isVideoOff: false }
  ])
  const [chatMessages, setChatMessages] = useState([])
  const [notes, setNotes] = useState([])
  const [transcript, setTranscript] = useState([])

  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isInSession) {
      timerRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isInSession])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsInSession(true)
      setSessionTime(0)
    } catch (err) {
      console.error('Error accessing media devices:', err)
      alert('No se pudo acceder a la cámara/micrófono')
    }
  }

  const endSession = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
    }
    setIsInSession(false)
    setIsRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOff(!isVideoOff)
  const toggleRecording = () => setIsRecording(!isRecording)
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing)

  const handleSendMessage = (message) => {
    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        user: 'Tú',
        message,
        timestamp: new Date().toISOString()
      }
    ])
  }

  const handleAddNote = (content) => {
    setNotes([
      ...notes,
      {
        id: Date.now(),
        content,
        author: 'Tú',
        timestamp: new Date().toISOString()
      }
    ])
  }

  if (!isInSession) {
    return (
      <div className="view video-conference-view" id="video-conference-view">
        <div className="vc-landing">
          <div className="vc-landing-content">
            <div className="vc-landing-icon">
              <i className="fas fa-video"></i>
            </div>
            <h2>Videoconferencia</h2>
            <p>Inicia una sesión de videoconferencia con grabación, transcripción y notas colaborativas</p>

            <div className="vc-features-grid">
              <div className="vc-feature">
                <i className="fas fa-record-vinyl"></i>
                <span>Grabación</span>
              </div>
              <div className="vc-feature">
                <i className="fas fa-closed-captioning"></i>
                <span>Transcripción</span>
              </div>
              <div className="vc-feature">
                <i className="fas fa-sticky-note"></i>
                <span>Notas</span>
              </div>
              <div className="vc-feature">
                <i className="fas fa-robot"></i>
                <span>IA Integrada</span>
              </div>
            </div>

            <Button
              variant="success"
              icon="fa-video"
              onClick={startSession}
              className="start-session-btn"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="view video-conference-view active-session" id="video-conference-view">
      <div className="vc-header">
        <div className="vc-header-left">
          <h3><i className="fas fa-video"></i> Sesión de Videoconferencia</h3>
        </div>
        <div className="vc-header-center">
          <div className="vc-timer">
            {isRecording && <span className="recording-indicator"></span>}
            <i className="fas fa-clock"></i>
            <span>{formatTime(sessionTime)}</span>
          </div>
        </div>
        <div className="vc-header-right">
          <button
            className="btn btn-sm"
            onClick={() => setShowSidebar(!showSidebar)}
            title={showSidebar ? 'Ocultar panel' : 'Mostrar panel'}
          >
            <i className={`fas fa-${showSidebar ? 'chevron-right' : 'chevron-left'}`}></i>
          </button>
        </div>
      </div>

      <div className="vc-main">
        <div className={`vc-video-area ${!showSidebar ? 'full-width' : ''}`}>
          <div className="vc-video-grid">
            <div className="vc-video-item main-video">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={isVideoOff ? 'video-off' : ''}
              />
              {isVideoOff && (
                <div className="video-off-overlay">
                  <i className="fas fa-user-circle"></i>
                  <span>Cámara desactivada</span>
                </div>
              )}
              <div className="video-label">
                <span>Tú {participants[0]?.isHost && '(Host)'}</span>
                {isMuted && <i className="fas fa-microphone-slash"></i>}
              </div>
            </div>
          </div>
        </div>

        {showSidebar && (
          <VCSidebar
            activeTab={activeSidebarTab}
            onTabChange={setActiveSidebarTab}
            participants={participants}
            chatMessages={chatMessages}
            onSendMessage={handleSendMessage}
            notes={notes}
            onAddNote={handleAddNote}
            transcript={transcript}
          />
        )}
      </div>

      <div className="vc-controls">
        <div className="controls-group">
          <button
            className={`control-btn ${isMuted ? 'active' : ''}`}
            onClick={toggleMute}
            title={isMuted ? 'Activar micrófono' : 'Silenciar'}
          >
            <i className={`fas fa-microphone${isMuted ? '-slash' : ''}`}></i>
          </button>

          <button
            className={`control-btn ${isVideoOff ? 'active' : ''}`}
            onClick={toggleVideo}
            title={isVideoOff ? 'Activar cámara' : 'Desactivar cámara'}
          >
            <i className={`fas fa-video${isVideoOff ? '-slash' : ''}`}></i>
          </button>

          <button
            className={`control-btn ${isScreenSharing ? 'active' : ''}`}
            onClick={toggleScreenShare}
            title={isScreenSharing ? 'Dejar de compartir' : 'Compartir pantalla'}
          >
            <i className="fas fa-desktop"></i>
          </button>

          <button
            className={`control-btn recording ${isRecording ? 'active' : ''}`}
            onClick={toggleRecording}
            title={isRecording ? 'Detener grabación' : 'Iniciar grabación'}
          >
            <i className="fas fa-record-vinyl"></i>
          </button>
        </div>

        <div className="controls-group center">
          <button
            className="control-btn end-call"
            onClick={endSession}
            title="Finalizar sesión"
          >
            <i className="fas fa-phone-slash"></i>
          </button>
        </div>

        <div className="controls-group">
          <button
            className="control-btn"
            onClick={() => setActiveSidebarTab('chat')}
            title="Chat"
          >
            <i className="fas fa-comment"></i>
            {chatMessages.length > 0 && (
              <span className="badge">{chatMessages.length}</span>
            )}
          </button>

          <button
            className="control-btn"
            onClick={() => setActiveSidebarTab('participants')}
            title="Participantes"
          >
            <i className="fas fa-users"></i>
            <span className="badge">{participants.length}</span>
          </button>

          <button
            className="control-btn"
            title="Más opciones"
          >
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoConferenceView
