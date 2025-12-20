import { useState } from 'react'

function SettingsView() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    general: {
      language: 'es',
      theme: 'dark',
      autoSave: true,
      notifications: true
    },
    server: {
      host: 'localhost',
      port: '3000',
      timeout: '30000'
    },
    ai: {
      provider: 'openai',
      model: 'gpt-4',
      temperature: '0.7',
      maxTokens: '2000'
    },
    ocr: {
      provider: 'tesseract',
      language: 'spa',
      enhanceImages: true
    }
  })

  const tabs = [
    { id: 'general', label: 'General', icon: 'fa-cog' },
    { id: 'server', label: 'Servidor', icon: 'fa-server' },
    { id: 'ai', label: 'Inteligencia Artificial', icon: 'fa-brain' },
    { id: 'ocr', label: 'OCR', icon: 'fa-eye' },
    { id: 'database', label: 'Base de Datos', icon: 'fa-database' },
    { id: 'backup', label: 'Respaldo', icon: 'fa-download' }
  ]

  const handleSave = () => {
    console.log('Guardando configuración:', settings)
    alert('Configuración guardada')
  }

  return (
    <div className="view" id="settings-view">
      <div className="view-header">
        <h2><i className="fas fa-cog"></i> Configuraciones</h2>
        <p>Personaliza el comportamiento de Alqvimia RPA</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: '2rem',
        background: 'var(--card-bg)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {/* Sidebar de tabs */}
        <div style={{
          background: 'var(--dark-bg)',
          padding: '1rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '1rem',
                background: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <i className={`fas ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div style={{ padding: '2rem' }}>
          {activeTab === 'general' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Configuración General</h3>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Idioma
                </label>
                <select
                  value={settings.general.language}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, language: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Tema
                </label>
                <select
                  value={settings.general.theme}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, theme: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="dark">Oscuro</option>
                  <option value="light">Claro</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <label className="toggle-switch" style={{ position: 'relative', width: '50px', height: '26px' }}>
                  <input
                    type="checkbox"
                    checked={settings.general.autoSave}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, autoSave: e.target.checked }
                    })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: settings.general.autoSave ? 'var(--success-color)' : 'var(--secondary-color)',
                    borderRadius: '26px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '20px',
                      width: '20px',
                      left: settings.general.autoSave ? '26px' : '3px',
                      bottom: '3px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.4s'
                    }}></span>
                  </span>
                </label>
                <span>Guardar automáticamente</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label className="toggle-switch" style={{ position: 'relative', width: '50px', height: '26px' }}>
                  <input
                    type="checkbox"
                    checked={settings.general.notifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, notifications: e.target.checked }
                    })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: settings.general.notifications ? 'var(--success-color)' : 'var(--secondary-color)',
                    borderRadius: '26px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '20px',
                      width: '20px',
                      left: settings.general.notifications ? '26px' : '3px',
                      bottom: '3px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.4s'
                    }}></span>
                  </span>
                </label>
                <span>Notificaciones</span>
              </div>
            </div>
          )}

          {activeTab === 'server' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Configuración del Servidor</h3>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Host
                </label>
                <input
                  type="text"
                  value={settings.server.host}
                  onChange={(e) => setSettings({
                    ...settings,
                    server: { ...settings.server, host: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Puerto
                </label>
                <input
                  type="text"
                  value={settings.server.port}
                  onChange={(e) => setSettings({
                    ...settings,
                    server: { ...settings.server, port: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Timeout (ms)
                </label>
                <input
                  type="text"
                  value={settings.server.timeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    server: { ...settings.server, timeout: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Configuración de IA</h3>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Proveedor
                </label>
                <select
                  value={settings.ai.provider}
                  onChange={(e) => setSettings({
                    ...settings,
                    ai: { ...settings.ai, provider: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic (Claude)</option>
                  <option value="google">Google (Gemini)</option>
                  <option value="azure">Azure OpenAI</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Modelo
                </label>
                <select
                  value={settings.ai.model}
                  onChange={(e) => setSettings({
                    ...settings,
                    ai: { ...settings.ai, model: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Temperature: {settings.ai.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.ai.temperature}
                  onChange={(e) => setSettings({
                    ...settings,
                    ai: { ...settings.ai, temperature: e.target.value }
                  })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}

          {(activeTab === 'ocr' || activeTab === 'database' || activeTab === 'backup') && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <i className="fas fa-tools" style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}></i>
              <p>Configuración de {tabs.find(t => t.id === activeTab)?.label}</p>
              <small>Próximamente disponible</small>
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button className="btn btn-secondary">
              <i className="fas fa-undo"></i> Restaurar
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              <i className="fas fa-save"></i> Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsView
