import { useState, useEffect } from 'react'
import { omnichannelService } from '../../services/api'
import { Button, Card, Modal } from '../common'

function ChannelCard({ channel, status, icon, color, onConnect }) {
  return (
    <div className={`channel-card channel-${color}`}>
      <div className="channel-icon">
        <i className={`fab ${icon}`}></i>
      </div>
      <div className="channel-info">
        <h4>{channel}</h4>
        <span className={`channel-status ${status}`}>
          <span className="status-dot"></span>
          {status === 'connected' ? 'Conectado' : 'Desconectado'}
        </span>
      </div>
      <Button
        variant={status === 'connected' ? 'secondary' : 'primary'}
        size="sm"
        onClick={() => onConnect(channel.toLowerCase())}
      >
        {status === 'connected' ? 'Desconectar' : 'Conectar'}
      </Button>
    </div>
  )
}

function OmnichannelView() {
  const [activeTab, setActiveTab] = useState('messages')
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected')
  const [telegramStatus, setTelegramStatus] = useState('disconnected')
  const [showQRModal, setShowQRModal] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [conversations, setConversations] = useState([])
  const [messageForm, setMessageForm] = useState({
    channel: 'whatsapp',
    to: '',
    message: ''
  })

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const response = await omnichannelService.getStatus()
      if (response.data) {
        setWhatsappStatus(response.data.whatsapp?.status || 'disconnected')
        setTelegramStatus(response.data.telegram?.status || 'disconnected')
      }
    } catch (err) {
      console.error('Error fetching status:', err)
    }
  }

  const handleConnectWhatsApp = async () => {
    try {
      const response = await omnichannelService.getWhatsAppQR()
      if (response.qr) {
        setQrCode(response.qr)
        setShowQRModal(true)
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleSendMessage = async () => {
    if (!messageForm.to || !messageForm.message) {
      alert('Completa todos los campos')
      return
    }

    try {
      await omnichannelService.sendMessage({
        channel: messageForm.channel,
        to: messageForm.to,
        message: messageForm.message
      })
      setMessageForm({ ...messageForm, to: '', message: '' })
      alert('Mensaje enviado')
    } catch (err) {
      console.error('Error:', err)
      alert('Error al enviar mensaje')
    }
  }

  const tabs = [
    { id: 'messages', label: 'Enviar Mensajes', icon: 'fa-paper-plane' },
    { id: 'conversations', label: 'Conversaciones', icon: 'fa-comments' },
    { id: 'templates', label: 'Templates', icon: 'fa-file-alt' },
    { id: 'config', label: 'Configuración', icon: 'fa-cog' }
  ]

  return (
    <div className="view" id="omnichannel-view">
      <div className="view-header omnichannel-gradient">
        <h2><i className="fas fa-comments"></i> Omnicanalidad</h2>
        <p className="view-description">WhatsApp y Telegram integrados</p>
      </div>

      <div className="channels-status">
        <ChannelCard
          channel="WhatsApp"
          status={whatsappStatus}
          icon="fa-whatsapp"
          color="green"
          onConnect={handleConnectWhatsApp}
        />
        <ChannelCard
          channel="Telegram"
          status={telegramStatus}
          icon="fa-telegram"
          color="blue"
          onConnect={() => {}}
        />
      </div>

      <div className="omnichannel-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`fas ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="omnichannel-content">
        {activeTab === 'messages' && (
          <Card title="Enviar Mensaje" icon="fa-paper-plane">
            <div className="message-form">
              <div className="form-group">
                <label>Canal</label>
                <select
                  value={messageForm.channel}
                  onChange={(e) => setMessageForm({ ...messageForm, channel: e.target.value })}
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telegram">Telegram</option>
                </select>
              </div>

              <div className="form-group">
                <label>Destinatario</label>
                <input
                  type="text"
                  placeholder={messageForm.channel === 'whatsapp' ? '+52 1234567890' : '@usuario'}
                  value={messageForm.to}
                  onChange={(e) => setMessageForm({ ...messageForm, to: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Mensaje</label>
                <textarea
                  placeholder="Escribe tu mensaje..."
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  rows={4}
                />
              </div>

              <Button
                variant="primary"
                icon="fa-paper-plane"
                onClick={handleSendMessage}
              >
                Enviar Mensaje
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'conversations' && (
          <Card title="Conversaciones" icon="fa-comments">
            {conversations.length > 0 ? (
              <div className="conversations-list">
                {conversations.map((conv, index) => (
                  <div key={index} className="conversation-item">
                    <div className="conv-avatar">
                      <i className={`fab fa-${conv.channel}`}></i>
                    </div>
                    <div className="conv-info">
                      <span className="conv-name">{conv.name}</span>
                      <span className="conv-preview">{conv.lastMessage}</span>
                    </div>
                    <span className="conv-time">{conv.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-inbox"></i>
                <p>No hay conversaciones</p>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'templates' && (
          <Card title="Templates de Mensajes" icon="fa-file-alt">
            <div className="empty-state">
              <i className="fas fa-file-alt"></i>
              <p>No hay templates configurados</p>
              <Button variant="primary" icon="fa-plus">
                Crear Template
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'config' && (
          <Card title="Configuración" icon="fa-cog">
            <div className="config-section">
              <h4>WhatsApp</h4>
              <p>Estado: {whatsappStatus}</p>
              <Button
                variant="secondary"
                icon="fa-qrcode"
                onClick={handleConnectWhatsApp}
              >
                Mostrar QR
              </Button>
            </div>

            <div className="config-section">
              <h4>Telegram</h4>
              <div className="form-group">
                <label>Token del Bot</label>
                <input type="password" placeholder="Token de @BotFather" />
              </div>
              <Button variant="primary" icon="fa-save">
                Guardar
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Modal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title="Escanea el código QR"
      >
        <div className="qr-modal-content">
          {qrCode ? (
            <img src={qrCode} alt="QR Code" className="qr-image" />
          ) : (
            <div className="qr-loading">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Generando código QR...</p>
            </div>
          )}
          <p className="qr-instructions">
            Abre WhatsApp en tu teléfono y escanea este código
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default OmnichannelView
