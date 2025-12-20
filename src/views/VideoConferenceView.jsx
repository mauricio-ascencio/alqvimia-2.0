import { useState, useRef, useEffect } from 'react'

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
  const [chatInput, setChatInput] = useState('')
  const [noteInput, setNoteInput] = useState('')

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

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now(),
          user: 'Tú',
          message: chatInput,
          timestamp: new Date().toISOString()
        }
      ])
      setChatInput('')
    }
  }

  const handleAddNote = () => {
    if (noteInput.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          content: noteInput,
          author: 'Tú',
          timestamp: new Date().toISOString()
        }
      ])
      setNoteInput('')
    }
  }

  const sidebarTabs = [
    { id: 'participants', icon: 'fa-users', label: 'Participantes' },
    { id: 'chat', icon: 'fa-comment', label: 'Chat' },
    { id: 'notes', icon: 'fa-sticky-note', label: 'Notas' },
    { id: 'transcript', icon: 'fa-closed-captioning', label: 'Transcripción' },
    { id: 'ai', icon: 'fa-robot', label: 'IA' }
  ]

  if (!isInSession) {
    return (
      <div className="view" id="video-conference-view">
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

            <button
              className="btn btn-success start-session-btn"
              onClick={startSession}
            >
              <i className="fas fa-video"></i> Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="view active-session" id="video-conference-view">
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
          <div className="vc-sidebar">
            <div className="vc-sidebar-tabs">
              {sidebarTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sidebar-tab ${activeSidebarTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSidebarTab(tab.id)}
                  title={tab.label}
                >
                  <i className={`fas ${tab.icon}`}></i>
                </button>
              ))}
            </div>
            <div className="vc-sidebar-content">
              <div className="panel-header">
                <h4>{sidebarTabs.find((t) => t.id === activeSidebarTab)?.label}</h4>
              </div>

              {/* Participants Panel */}
              {activeSidebarTab === 'participants' && (
                <div className="vc-panel participants-panel">
                  <div className="panel-list">
                    {participants.map((p) => (
                      <div key={p.id} className="participant-item">
                        <div className="participant-avatar">
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="participant-info">
                          <span className="participant-name">
                            {p.name} {p.isHost && <span className="host-badge">Host</span>}
                          </span>
                        </div>
                        <div className="participant-status">
                          {p.isMuted && <i className="fas fa-microphone-slash"></i>}
                          {p.isVideoOff && <i className="fas fa-video-slash"></i>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Panel */}
              {activeSidebarTab === 'chat' && (
                <div className="vc-panel chat-panel">
                  <div className="chat-messages">
                    {chatMessages.length > 0 ? (
                      chatMessages.map((msg) => (
                        <div key={msg.id} className="chat-message">
                          <div className="message-header">
                            <span className="message-user">{msg.user}</span>
                            <span className="message-time">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="message-content">{msg.message}</div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-chat">
                        <i className="fas fa-comments"></i>
                        <p>No hay mensajes</p>
                      </div>
                    )}
                  </div>
                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="Escribe un mensaje..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Notes Panel */}
              {activeSidebarTab === 'notes' && (
                <div className="vc-panel notes-panel">
                  <div className="notes-list">
                    {notes.length > 0 ? (
                      notes.map((note) => (
                        <div key={note.id} className="note-item">
                          <div className="note-content">{note.content}</div>
                          <div className="note-meta">
                            <span>{note.author}</span>
                            <span>{new Date(note.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-notes">
                        <i className="fas fa-sticky-note"></i>
                        <p>No hay notas</p>
                      </div>
                    )}
                  </div>
                  <div className="notes-input">
                    <textarea
                      placeholder="Agregar nota..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      rows={2}
                    />
                    <button onClick={handleAddNote}>
                      <i className="fas fa-plus"></i> Agregar
                    </button>
                  </div>
                </div>
              )}

              {/* Transcript Panel */}
              {activeSidebarTab === 'transcript' && (
                <div className="vc-panel transcript-panel">
                  {transcript.length > 0 ? (
                    <div className="transcript-list">
                      {transcript.map((item, index) => (
                        <div key={index} className="transcript-item">
                          <span className="transcript-speaker">{item.speaker}:</span>
                          <span className="transcript-text">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-transcript">
                      <i className="fas fa-closed-captioning"></i>
                      <p>La transcripción aparecerá aquí</p>
                      <span>Inicia la grabación para activar</span>
                    </div>
                  )}
                </div>
              )}

              {/* AI Panel */}
              {activeSidebarTab === 'ai' && (
                <div className="vc-panel ai-panel">
                  <div className="ai-plugins">
                    <div className="ai-plugin">
                      <i className="fas fa-robot"></i>
                      <span>GPT-4</span>
                      <label className="toggle">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="ai-plugin">
                      <i className="fas fa-brain"></i>
                      <span>Claude</span>
                      <label className="toggle">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="ai-plugin">
                      <i className="fas fa-gem"></i>
                      <span>Gemini</span>
                      <label className="toggle">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  <div className="ai-actions">
                    <button className="btn btn-sm btn-secondary">
                      <i className="fas fa-file-alt"></i> Generar Minutas
                    </button>
                    <button className="btn btn-sm btn-secondary">
                      <i className="fas fa-tasks"></i> Extraer Tareas
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
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
            onClick={() => { setShowSidebar(true); setActiveSidebarTab('chat'); }}
            title="Chat"
          >
            <i className="fas fa-comment"></i>
            {chatMessages.length > 0 && (
              <span className="badge">{chatMessages.length}</span>
            )}
          </button>

          <button
            className="control-btn"
            onClick={() => { setShowSidebar(true); setActiveSidebarTab('participants'); }}
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
