import { useState, useEffect } from 'react'

// Temas disponibles
const availableThemes = [
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: 'Tema oscuro elegante con acentos azules',
    icon: 'fa-moon',
    preview: {
      primary: '#2563eb',
      bg: '#0f172a',
      card: '#1e293b',
      accent: '#7c3aed'
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Tonos de verde y cian inspirados en el mar',
    icon: 'fa-water',
    preview: {
      primary: '#0891b2',
      bg: '#042f2e',
      card: '#134e4a',
      accent: '#2dd4bf'
    }
  },
  {
    id: 'sunset-purple',
    name: 'Sunset Purple',
    description: 'Morados y rosas para un look moderno',
    icon: 'fa-cloud-sun',
    preview: {
      primary: '#a855f7',
      bg: '#1c1917',
      card: '#292524',
      accent: '#ec4899'
    }
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Verdes naturales y relajantes',
    icon: 'fa-tree',
    preview: {
      primary: '#22c55e',
      bg: '#14532d',
      card: '#166534',
      accent: '#84cc16'
    }
  },
  {
    id: 'ruby-red',
    name: 'Ruby Red',
    description: 'Rojos intensos y elegantes',
    icon: 'fa-gem',
    preview: {
      primary: '#e11d48',
      bg: '#1c1917',
      card: '#292524',
      accent: '#f43f5e'
    }
  },
  {
    id: 'golden-amber',
    name: 'Golden Amber',
    description: 'Dorados cálidos y acogedores',
    icon: 'fa-sun',
    preview: {
      primary: '#f59e0b',
      bg: '#1c1917',
      card: '#292524',
      accent: '#eab308'
    }
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Colores neón futuristas con efecto glow',
    icon: 'fa-bolt',
    preview: {
      primary: '#00f5d4',
      bg: '#0a0a0a',
      card: '#1a1a2e',
      accent: '#f72585'
    }
  },
  {
    id: 'arctic-frost',
    name: 'Arctic Frost',
    description: 'Tema claro limpio y profesional',
    icon: 'fa-snowflake',
    preview: {
      primary: '#3b82f6',
      bg: '#f1f5f9',
      card: '#ffffff',
      accent: '#06b6d4'
    }
  },
  {
    id: 'lavender-dreams',
    name: 'Lavender Dreams',
    description: 'Lavandas suaves y relajantes',
    icon: 'fa-spa',
    preview: {
      primary: '#8b5cf6',
      bg: '#18181b',
      card: '#27272a',
      accent: '#d946ef'
    }
  },
  {
    id: 'volcanic-orange',
    name: 'Volcanic Orange',
    description: 'Naranjas vibrantes y energéticos',
    icon: 'fa-fire',
    preview: {
      primary: '#ea580c',
      bg: '#1c1917',
      card: '#292524',
      accent: '#dc2626'
    }
  }
]

// Plantillas de IA predefinidas
const aiTemplates = [
  {
    id: 1,
    name: 'Extractor de Datos',
    icon: 'fa-file-export',
    description: 'Extrae información estructurada de documentos, PDFs y páginas web',
    prompt: 'Analiza el siguiente contenido y extrae los datos relevantes en formato JSON estructurado...',
    category: 'extraction',
    color: '#4CAF50'
  },
  {
    id: 2,
    name: 'Clasificador de Documentos',
    icon: 'fa-folder-tree',
    description: 'Clasifica documentos automáticamente según su contenido y tipo',
    prompt: 'Clasifica el siguiente documento en una de estas categorías: factura, contrato, memo, reporte...',
    category: 'classification',
    color: '#2196F3'
  },
  {
    id: 3,
    name: 'Generador de Resúmenes',
    icon: 'fa-compress-alt',
    description: 'Crea resúmenes ejecutivos de textos largos',
    prompt: 'Resume el siguiente texto en máximo 3 párrafos, destacando los puntos clave...',
    category: 'summarization',
    color: '#9C27B0'
  },
  {
    id: 4,
    name: 'Analizador de Sentimientos',
    icon: 'fa-smile',
    description: 'Detecta el tono y sentimiento en textos y conversaciones',
    prompt: 'Analiza el sentimiento del siguiente texto y clasifícalo como positivo, negativo o neutral...',
    category: 'analysis',
    color: '#FF9800'
  },
  {
    id: 5,
    name: 'Traductor Multilenguaje',
    icon: 'fa-language',
    description: 'Traduce textos entre múltiples idiomas manteniendo el contexto',
    prompt: 'Traduce el siguiente texto al idioma especificado, manteniendo el tono y contexto original...',
    category: 'translation',
    color: '#00BCD4'
  },
  {
    id: 6,
    name: 'Corrector de Texto',
    icon: 'fa-spell-check',
    description: 'Corrige errores ortográficos, gramaticales y de estilo',
    prompt: 'Revisa y corrige el siguiente texto, mejorando gramática, ortografía y claridad...',
    category: 'correction',
    color: '#E91E63'
  },
  {
    id: 7,
    name: 'Generador de Código',
    icon: 'fa-code',
    description: 'Genera código en varios lenguajes de programación',
    prompt: 'Genera código funcional en el lenguaje especificado para realizar la siguiente tarea...',
    category: 'generation',
    color: '#673AB7'
  },
  {
    id: 8,
    name: 'Asistente de Email',
    icon: 'fa-envelope',
    description: 'Redacta y mejora correos electrónicos profesionales',
    prompt: 'Redacta un correo electrónico profesional con el siguiente objetivo y tono...',
    category: 'communication',
    color: '#3F51B5'
  },
  {
    id: 9,
    name: 'Analizador de Logs',
    icon: 'fa-terminal',
    description: 'Analiza logs de sistema para detectar errores y patrones',
    prompt: 'Analiza los siguientes logs e identifica errores, advertencias y patrones anómalos...',
    category: 'analysis',
    color: '#607D8B'
  },
  {
    id: 10,
    name: 'Validador de Datos',
    icon: 'fa-check-double',
    description: 'Valida y verifica la consistencia de datos estructurados',
    prompt: 'Valida los siguientes datos según las reglas especificadas y reporta inconsistencias...',
    category: 'validation',
    color: '#795548'
  },
  {
    id: 11,
    name: 'Generador de Reportes',
    icon: 'fa-chart-bar',
    description: 'Crea reportes ejecutivos a partir de datos',
    prompt: 'Genera un reporte ejecutivo basado en los siguientes datos, incluyendo métricas clave...',
    category: 'generation',
    color: '#FF5722'
  },
  {
    id: 12,
    name: 'Extractor de Entidades',
    icon: 'fa-tags',
    description: 'Identifica nombres, fechas, lugares y otras entidades en textos',
    prompt: 'Extrae todas las entidades nombradas del siguiente texto: personas, organizaciones, fechas, lugares...',
    category: 'extraction',
    color: '#009688'
  }
]

// Plantillas de Agentes predefinidas
const agentTemplates = [
  {
    id: 1,
    name: 'Agente de Atención al Cliente',
    icon: 'fa-headset',
    description: 'Responde consultas de clientes de forma automatizada',
    capabilities: ['Responder FAQs', 'Escalar tickets', 'Registrar quejas'],
    category: 'customer-service',
    color: '#4CAF50'
  },
  {
    id: 2,
    name: 'Agente de Procesamiento de Facturas',
    icon: 'fa-file-invoice-dollar',
    description: 'Extrae y procesa datos de facturas automáticamente',
    capabilities: ['Leer PDFs', 'Extraer montos', 'Validar RUT/RFC', 'Registrar en sistema'],
    category: 'finance',
    color: '#2196F3'
  },
  {
    id: 3,
    name: 'Agente de Onboarding',
    icon: 'fa-user-plus',
    description: 'Automatiza el proceso de incorporación de nuevos empleados',
    capabilities: ['Crear cuentas', 'Enviar credenciales', 'Asignar permisos', 'Programar capacitaciones'],
    category: 'hr',
    color: '#9C27B0'
  },
  {
    id: 4,
    name: 'Agente de Monitoreo',
    icon: 'fa-desktop',
    description: 'Monitorea sistemas y notifica anomalías',
    capabilities: ['Revisar logs', 'Detectar errores', 'Enviar alertas', 'Generar reportes'],
    category: 'it',
    color: '#F44336'
  },
  {
    id: 5,
    name: 'Agente de Ventas',
    icon: 'fa-shopping-cart',
    description: 'Asiste en el proceso de ventas y cotizaciones',
    capabilities: ['Consultar inventario', 'Generar cotizaciones', 'Seguimiento de leads'],
    category: 'sales',
    color: '#FF9800'
  },
  {
    id: 6,
    name: 'Agente de Reportes',
    icon: 'fa-chart-pie',
    description: 'Genera reportes periódicos automáticamente',
    capabilities: ['Consultar bases de datos', 'Crear gráficos', 'Enviar por email', 'Programar ejecución'],
    category: 'analytics',
    color: '#00BCD4'
  },
  {
    id: 7,
    name: 'Agente de Email',
    icon: 'fa-mail-bulk',
    description: 'Gestiona y responde emails automáticamente',
    capabilities: ['Leer emails', 'Clasificar mensajes', 'Responder automáticamente', 'Archivar'],
    category: 'communication',
    color: '#E91E63'
  },
  {
    id: 8,
    name: 'Agente de Base de Datos',
    icon: 'fa-database',
    description: 'Ejecuta operaciones en bases de datos',
    capabilities: ['Consultas SQL', 'Backup automático', 'Sincronización', 'Limpieza de datos'],
    category: 'data',
    color: '#673AB7'
  },
  {
    id: 9,
    name: 'Agente de Integración SAP',
    icon: 'fa-cubes',
    description: 'Conecta y sincroniza datos con SAP',
    capabilities: ['Leer transacciones', 'Crear órdenes', 'Sincronizar maestros', 'Ejecutar BAPIs'],
    category: 'erp',
    color: '#3F51B5'
  },
  {
    id: 10,
    name: 'Agente de Web Scraping',
    icon: 'fa-spider',
    description: 'Extrae datos de páginas web automáticamente',
    capabilities: ['Navegar sitios', 'Extraer tablas', 'Descargar archivos', 'Programar extracción'],
    category: 'extraction',
    color: '#607D8B'
  },
  {
    id: 11,
    name: 'Agente de WhatsApp Business',
    icon: 'fa-whatsapp',
    description: 'Automatiza respuestas en WhatsApp Business',
    capabilities: ['Responder mensajes', 'Enviar multimedia', 'Gestionar grupos', 'Integraciones'],
    category: 'messaging',
    color: '#25D366'
  },
  {
    id: 12,
    name: 'Agente de Documentos',
    icon: 'fa-file-alt',
    description: 'Procesa y organiza documentos automáticamente',
    capabilities: ['OCR', 'Clasificación', 'Archivado', 'Búsqueda inteligente'],
    category: 'documents',
    color: '#795548'
  }
]

function SettingsView() {
  const [activeTab, setActiveTab] = useState('general')
  const [selectedAITemplate, setSelectedAITemplate] = useState(null)
  const [selectedAgentTemplate, setSelectedAgentTemplate] = useState(null)
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('alqvimia-theme') || 'midnight-blue'
  })
  const [settings, setSettings] = useState({
    general: {
      language: 'es',
      theme: 'midnight-blue',
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
    { id: 'appearance', label: 'Apariencia', icon: 'fa-palette' },
    { id: 'server', label: 'Servidor', icon: 'fa-server' },
    { id: 'ai', label: 'Inteligencia Artificial', icon: 'fa-brain' },
    { id: 'ai-templates', label: 'Plantillas IA', icon: 'fa-magic' },
    { id: 'agent-templates', label: 'Plantillas Agentes', icon: 'fa-robot' },
    { id: 'ocr', label: 'OCR', icon: 'fa-eye' },
    { id: 'database', label: 'Base de Datos', icon: 'fa-database' },
    { id: 'backup', label: 'Respaldo', icon: 'fa-download' }
  ]

  // Aplicar tema al cargar
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    localStorage.setItem('alqvimia-theme', currentTheme)
  }, [currentTheme])

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId)
    setSettings({
      ...settings,
      general: { ...settings.general, theme: themeId }
    })
  }

  const handleSave = () => {
    console.log('Guardando configuración:', settings)
    localStorage.setItem('alqvimia-theme', currentTheme)
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

          {activeTab === 'appearance' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Personaliza tu Experiencia</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Elige un tema que se adapte a tu estilo. Los cambios se aplican inmediatamente.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem'
              }}>
                {availableThemes.map(theme => (
                  <div
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    style={{
                      background: currentTheme === theme.id
                        ? `linear-gradient(135deg, ${theme.preview.primary}20, ${theme.preview.accent}20)`
                        : 'var(--dark-bg)',
                      border: currentTheme === theme.id
                        ? `3px solid ${theme.preview.primary}`
                        : '2px solid var(--border-color)',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Preview de colores */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '100%',
                        height: '60px',
                        borderRadius: '10px',
                        background: theme.preview.bg,
                        display: 'flex',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <div style={{
                          width: '30%',
                          background: theme.preview.card,
                          borderRight: `2px solid ${theme.preview.primary}`
                        }}></div>
                        <div style={{
                          flex: 1,
                          padding: '0.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem'
                        }}>
                          <div style={{
                            height: '10px',
                            width: '60%',
                            background: theme.preview.primary,
                            borderRadius: '3px'
                          }}></div>
                          <div style={{
                            height: '8px',
                            width: '80%',
                            background: `${theme.preview.accent}60`,
                            borderRadius: '3px'
                          }}></div>
                          <div style={{
                            height: '8px',
                            width: '40%',
                            background: `${theme.preview.accent}40`,
                            borderRadius: '3px'
                          }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Info del tema */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${theme.preview.primary}, ${theme.preview.accent})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem'
                      }}>
                        <i className={`fas ${theme.icon}`}></i>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{theme.name}</h4>
                      </div>
                      {currentTheme === theme.id && (
                        <div style={{
                          background: theme.preview.primary,
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          Activo
                        </div>
                      )}
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4
                    }}>
                      {theme.description}
                    </p>

                    {/* Barra de colores */}
                    <div style={{
                      display: 'flex',
                      gap: '0.35rem',
                      marginTop: '1rem'
                    }}>
                      <div style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        background: theme.preview.bg
                      }}></div>
                      <div style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        background: theme.preview.card
                      }}></div>
                      <div style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        background: theme.preview.primary
                      }}></div>
                      <div style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        background: theme.preview.accent
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Información adicional */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'var(--dark-bg)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <i className="fas fa-info-circle" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}></i>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem' }}>Tema actual: {availableThemes.find(t => t.id === currentTheme)?.name}</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      El tema se guarda automáticamente y se aplicará cada vez que inicies la aplicación.
                    </p>
                  </div>
                </div>
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

          {activeTab === 'ai-templates' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Plantillas de IA</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {aiTemplates.length} plantillas disponibles
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '0.5rem'
              }}>
                {aiTemplates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedAITemplate(selectedAITemplate?.id === template.id ? null : template)}
                    style={{
                      background: selectedAITemplate?.id === template.id ? 'var(--primary-color)' : 'var(--dark-bg)',
                      border: `2px solid ${selectedAITemplate?.id === template.id ? template.color : 'var(--border-color)'}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: template.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <i className={`fas ${template.icon}`} style={{ color: 'white', fontSize: '1.1rem' }}></i>
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{template.name}</h4>
                        <span style={{
                          fontSize: '0.75rem',
                          background: 'var(--secondary-color)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          color: 'var(--text-secondary)'
                        }}>
                          {template.category}
                        </span>
                      </div>
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4
                    }}>
                      {template.description}
                    </p>
                    {selectedAITemplate?.id === template.id && (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        fontSize: '0.8rem'
                      }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Prompt:</strong>
                        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                          {template.prompt}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedAITemplate && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'var(--dark-bg)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    <strong>{selectedAITemplate.name}</strong> seleccionada
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" onClick={() => setSelectedAITemplate(null)}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary">
                      <i className="fas fa-plus"></i> Usar Plantilla
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'agent-templates' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Plantillas de Agentes</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {agentTemplates.length} plantillas disponibles
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '0.5rem'
              }}>
                {agentTemplates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedAgentTemplate(selectedAgentTemplate?.id === template.id ? null : template)}
                    style={{
                      background: selectedAgentTemplate?.id === template.id ? 'var(--primary-color)' : 'var(--dark-bg)',
                      border: `2px solid ${selectedAgentTemplate?.id === template.id ? template.color : 'var(--border-color)'}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: template.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <i className={`fas ${template.icon}`} style={{ color: 'white', fontSize: '1.1rem' }}></i>
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{template.name}</h4>
                        <span style={{
                          fontSize: '0.75rem',
                          background: 'var(--secondary-color)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          color: 'var(--text-secondary)'
                        }}>
                          {template.category}
                        </span>
                      </div>
                    </div>
                    <p style={{
                      margin: '0 0 0.75rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4
                    }}>
                      {template.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {template.capabilities.slice(0, selectedAgentTemplate?.id === template.id ? undefined : 2).map((cap, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.7rem',
                            background: `${template.color}30`,
                            color: template.color,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px'
                          }}
                        >
                          {cap}
                        </span>
                      ))}
                      {selectedAgentTemplate?.id !== template.id && template.capabilities.length > 2 && (
                        <span style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-secondary)',
                          padding: '0.2rem 0.5rem'
                        }}>
                          +{template.capabilities.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedAgentTemplate && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'var(--dark-bg)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    <strong>{selectedAgentTemplate.name}</strong> seleccionado
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" onClick={() => setSelectedAgentTemplate(null)}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary">
                      <i className="fas fa-plus"></i> Crear Agente
                    </button>
                  </div>
                </div>
              )}
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
