import { useState } from 'react'

function ParticipantsPanel({ participants }) {
  return (
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
  )
}

function ChatPanel({ messages, onSendMessage }) {
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="vc-panel chat-panel">
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg) => (
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  )
}

function NotesPanel({ notes, onAddNote }) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddNote(inputValue)
      setInputValue('')
    }
  }

  return (
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={2}
        />
        <button onClick={handleAdd}>
          <i className="fas fa-plus"></i> Agregar
        </button>
      </div>
    </div>
  )
}

function TranscriptPanel({ transcript }) {
  return (
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
  )
}

function AIPanel() {
  return (
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
  )
}

function VCSidebar({
  activeTab,
  onTabChange,
  participants,
  chatMessages,
  onSendMessage,
  notes,
  onAddNote,
  transcript
}) {
  const tabs = [
    { id: 'participants', icon: 'fa-users', label: 'Participantes' },
    { id: 'chat', icon: 'fa-comment', label: 'Chat' },
    { id: 'notes', icon: 'fa-sticky-note', label: 'Notas' },
    { id: 'transcript', icon: 'fa-closed-captioning', label: 'Transcripción' },
    { id: 'ai', icon: 'fa-robot', label: 'IA' }
  ]

  const renderPanel = () => {
    switch (activeTab) {
      case 'participants':
        return <ParticipantsPanel participants={participants} />
      case 'chat':
        return <ChatPanel messages={chatMessages} onSendMessage={onSendMessage} />
      case 'notes':
        return <NotesPanel notes={notes} onAddNote={onAddNote} />
      case 'transcript':
        return <TranscriptPanel transcript={transcript} />
      case 'ai':
        return <AIPanel />
      default:
        return null
    }
  }

  return (
    <div className="vc-sidebar">
      <div className="vc-sidebar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            title={tab.label}
          >
            <i className={`fas ${tab.icon}`}></i>
          </button>
        ))}
      </div>
      <div className="vc-sidebar-content">
        <div className="panel-header">
          <h4>{tabs.find((t) => t.id === activeTab)?.label}</h4>
        </div>
        {renderPanel()}
      </div>
    </div>
  )
}

export default VCSidebar
