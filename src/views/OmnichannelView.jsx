import { useState } from 'react'

function OmnichannelView() {
  const [activeTab, setActiveTab] = useState('messages')
  const [whatsappStatus, setWhatsappStatus] = useState('Desconectado')
  const [telegramStatus, setTelegramStatus] = useState('Desconectado')
  const [stats, setStats] = useState({
    totalConversations: 0,
    queuedMessages: 0,
    totalTemplates: 0
  })
  const [messageForm, setMessageForm] = useState({
    channel: 'whatsapp',
    recipient: '',
    text: ''
  })
  const [templateForm, setTemplateForm] = useState({
    name: '',
    text: ''
  })
  const [templates, setTemplates] = useState([])
  const [conversations, setConversations] = useState([])

  const initializeSystem = () => {
    console.log('Inicializando sistema omnicanal')
  }

  const refreshStatus = () => {
    console.log('Actualizando estado')
  }

  const showWhatsAppQR = () => {
    console.log('Mostrar QR de WhatsApp')
  }

  const openTelegramConfig = () => {
    console.log('Configurar Telegram')
  }

  const sendMessage = () => {
    console.log('Enviar mensaje:', messageForm)
  }

  const saveTemplate = () => {
    console.log('Guardar template:', templateForm)
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="view" id="omnichannel-view">
      <div
        className="view-header"
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2><i className="fas fa-comments"></i> Omnicanalidad - WhatsApp & Telegram</h2>
            <p style={{ opacity: 0.9, margin: '0.5rem 0 0 0' }}>
              Sistema de chatbots y mensajería multicanal
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-light"
              onClick={initializeSystem}
              style={{
                background: 'white',
                color: '#10b981',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <i className="fas fa-power-off"></i> Inicializar Sistema
            </button>
            <button
              className="btn btn-light"
              onClick={refreshStatus}
              style={{
                background: 'white',
                color: '#10b981',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <i className="fas fa-sync"></i> Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Estado del Sistema */}
      <div
        id="omnichannelStatus"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* WhatsApp Status Card */}
        <div
          className="stat-card"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <i className="fab fa-whatsapp" style={{ fontSize: '2.5rem' }}></i>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>WhatsApp</h3>
              <p id="whatsappStatus" style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
                {whatsappStatus}
              </p>
            </div>
          </div>
          <div id="whatsappPhone" style={{ fontSize: '0.9rem', opacity: 0.9 }}></div>
          <button
            onClick={showWhatsAppQR}
            className="btn"
            style={{
              marginTop: '1rem',
              background: 'white',
              color: '#25D366',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <i className="fas fa-qrcode"></i> Ver QR Code
          </button>
        </div>

        {/* Telegram Status Card */}
        <div
          className="stat-card"
          style={{
            background: 'linear-gradient(135deg, #0088cc 0%, #0066cc 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <i className="fab fa-telegram" style={{ fontSize: '2.5rem' }}></i>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>Telegram</h3>
              <p id="telegramStatus" style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
                {telegramStatus}
              </p>
            </div>
          </div>
          <div id="telegramUsername" style={{ fontSize: '0.9rem', opacity: 0.9 }}></div>
          <button
            onClick={openTelegramConfig}
            className="btn"
            style={{
              marginTop: '1rem',
              background: 'white',
              color: '#0088cc',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <i className="fas fa-cog"></i> Configurar Bot
          </button>
        </div>

        {/* Estadísticas */}
        <div
          className="stat-card"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            padding: '1.5rem',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <i className="fas fa-chart-line" style={{ fontSize: '2.5rem' }}></i>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Estadísticas</h3>
              <p style={{ margin: '0.25rem 0', opacity: 0.9 }}>
                Conversaciones: <span id="totalConversations">{stats.totalConversations}</span>
              </p>
              <p style={{ margin: '0.25rem 0', opacity: 0.9 }}>
                Mensajes en cola: <span id="queuedMessages">{stats.queuedMessages}</span>
              </p>
              <p style={{ margin: '0.25rem 0', opacity: 0.9 }}>
                Templates: <span id="totalTemplates">{stats.totalTemplates}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="tabs"
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '2px solid #334155'
        }}
      >
        <button
          className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => switchTab('messages')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'messages' ? '2px solid #10b981' : '2px solid transparent',
            color: activeTab === 'messages' ? '#10b981' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: activeTab === 'messages' ? 600 : 400
          }}
        >
          <i className="fas fa-comment-dots"></i> Enviar Mensajes
        </button>
        <button
          className={`tab-button ${activeTab === 'conversations' ? 'active' : ''}`}
          onClick={() => switchTab('conversations')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'conversations' ? '2px solid #10b981' : '2px solid transparent',
            color: activeTab === 'conversations' ? '#10b981' : '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-comments"></i> Conversaciones
        </button>
        <button
          className={`tab-button ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => switchTab('templates')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'templates' ? '2px solid #10b981' : '2px solid transparent',
            color: activeTab === 'templates' ? '#10b981' : '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-file-alt"></i> Templates
        </button>
        <button
          className={`tab-button ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => switchTab('config')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'config' ? '2px solid #10b981' : '2px solid transparent',
            color: activeTab === 'config' ? '#10b981' : '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-cog"></i> Configuración
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Messages Tab */}
        <div
          id="messages-tab"
          className="tab-pane"
          style={{ display: activeTab === 'messages' ? 'block' : 'none' }}
        >
          <div
            style={{
              background: '#1e293b',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}
          >
            <h3 style={{ marginBottom: '1.5rem' }}>
              <i className="fas fa-paper-plane"></i> Enviar Mensaje
            </h3>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                  Canal
                </label>
                <select
                  id="messageChannel"
                  value={messageForm.channel}
                  onChange={(e) => setMessageForm({ ...messageForm, channel: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <option value="whatsapp">📱 WhatsApp</option>
                  <option value="telegram">🤖 Telegram</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                  Destinatario
                </label>
                <input
                  type="text"
                  id="messageRecipient"
                  placeholder="5215512345678 o 123456789"
                  value={messageForm.recipient}
                  onChange={(e) => setMessageForm({ ...messageForm, recipient: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
                <small style={{ color: '#94a3b8' }}>
                  WhatsApp: número con código de país | Telegram: chat ID
                </small>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                  Mensaje
                </label>
                <textarea
                  id="messageText"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  value={messageForm.text}
                  onChange={(e) => setMessageForm({ ...messageForm, text: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>

              <button
                onClick={sendMessage}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-paper-plane"></i> Enviar Mensaje
              </button>
            </div>
          </div>
        </div>

        {/* Conversations Tab */}
        <div
          id="conversations-tab"
          className="tab-pane"
          style={{ display: activeTab === 'conversations' ? 'block' : 'none' }}
        >
          <div
            style={{
              background: '#1e293b',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}
          >
            <h3 style={{ marginBottom: '1.5rem' }}>
              <i className="fas fa-comments"></i> Historial de Conversaciones
            </h3>
            <div id="conversationsList">
              {conversations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                  <p>No hay conversaciones</p>
                </div>
              ) : (
                conversations.map((conv, index) => (
                  <div key={index} className="conversation-item">
                    {conv.lastMessage}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Templates Tab */}
        <div
          id="templates-tab"
          className="tab-pane"
          style={{ display: activeTab === 'templates' ? 'block' : 'none' }}
        >
          <div
            style={{
              background: '#1e293b',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}
          >
            <h3 style={{ marginBottom: '1.5rem' }}>
              <i className="fas fa-file-alt"></i> Templates de Mensajes
            </h3>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                  Nombre del Template
                </label>
                <input
                  type="text"
                  id="templateName"
                  placeholder="bienvenida"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                  {'Mensaje (usa {{variable}} para variables)'}
                </label>
                <textarea
                  id="templateText"
                  rows="4"
                  placeholder="Hola {{nombre}}! Bienvenido a {{empresa}}"
                  value={templateForm.text}
                  onChange={(e) => setTemplateForm({ ...templateForm, text: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>

              <button
                onClick={saveTemplate}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-save"></i> Guardar Template
              </button>
            </div>

            <div id="templatesList">
              {templates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  <i className="fas fa-file" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                  <p>No hay templates guardados</p>
                </div>
              ) : (
                templates.map((tpl, index) => (
                  <div key={index} className="template-item">
                    <strong>{tpl.name}</strong>
                    <p>{tpl.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Config Tab */}
        <div
          id="config-tab"
          className="tab-pane"
          style={{ display: activeTab === 'config' ? 'block' : 'none' }}
        >
          <div
            style={{
              background: '#1e293b',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}
          >
            <h3 style={{ marginBottom: '1.5rem' }}>
              <i className="fas fa-cog"></i> Configuración del Sistema
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Configura los parámetros de conexión para WhatsApp y Telegram.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OmnichannelView
