// Categorías de acciones para el Workflow Studio
export const ACTION_CATEGORIES = [
  {
    id: 'web-browser',
    name: 'Navegador Web',
    icon: 'fa-globe',
    actions: [
      { type: 'open_browser', label: 'Abrir Navegador', icon: 'fa-window-restore' },
      { type: 'navigate', label: 'Navegar a URL', icon: 'fa-link' },
      { type: 'click', label: 'Hacer Clic', icon: 'fa-mouse-pointer' },
      { type: 'type', label: 'Escribir Texto', icon: 'fa-keyboard' },
      { type: 'extract', label: 'Extraer Texto', icon: 'fa-file-export' },
      { type: 'screenshot', label: 'Captura de Pantalla', icon: 'fa-camera' },
      { type: 'scroll', label: 'Scroll', icon: 'fa-arrows-alt-v' },
      { type: 'close_browser', label: 'Cerrar Navegador', icon: 'fa-window-close' }
    ]
  },
  {
    id: 'http-requests',
    name: 'HTTP Requests',
    icon: 'fa-server',
    actions: [
      { type: 'http_get', label: 'GET Request', icon: 'fa-download' },
      { type: 'http_post', label: 'POST Request', icon: 'fa-upload' },
      { type: 'http_put', label: 'PUT Request', icon: 'fa-edit' },
      { type: 'http_delete', label: 'DELETE Request', icon: 'fa-trash' }
    ]
  },
  {
    id: 'sap',
    name: 'SAP',
    icon: 'fa-cubes',
    actions: [
      { type: 'sap_connect', label: 'Conectar SAP', icon: 'fa-plug' },
      { type: 'sap_transaction', label: 'Ejecutar Transacción', icon: 'fa-exchange-alt' },
      { type: 'sap_disconnect', label: 'Desconectar SAP', icon: 'fa-unlink' }
    ]
  },
  {
    id: 'microsoft365',
    name: 'Microsoft 365',
    icon: 'fa-microsoft',
    actions: [
      { type: 'excel_read', label: 'Leer Excel', icon: 'fa-file-excel' },
      { type: 'excel_write', label: 'Escribir Excel', icon: 'fa-file-excel' },
      { type: 'outlook_send', label: 'Enviar Email', icon: 'fa-envelope' },
      { type: 'teams_message', label: 'Mensaje Teams', icon: 'fa-comments' }
    ]
  },
  {
    id: 'mouse-keyboard',
    name: 'Mouse y Teclado',
    icon: 'fa-keyboard',
    actions: [
      { type: 'mouse_click', label: 'Clic de Mouse', icon: 'fa-mouse-pointer' },
      { type: 'mouse_move', label: 'Mover Mouse', icon: 'fa-arrows-alt' },
      { type: 'key_press', label: 'Presionar Tecla', icon: 'fa-keyboard' },
      { type: 'hotkey', label: 'Combinación de Teclas', icon: 'fa-keyboard' }
    ]
  },
  {
    id: 'clipboard',
    name: 'Portapapeles',
    icon: 'fa-clipboard',
    actions: [
      { type: 'clipboard_copy', label: 'Copiar', icon: 'fa-copy' },
      { type: 'clipboard_paste', label: 'Pegar', icon: 'fa-paste' },
      { type: 'clipboard_get', label: 'Obtener Contenido', icon: 'fa-clipboard-list' }
    ]
  },
  {
    id: 'data-table',
    name: 'Tabla de Datos',
    icon: 'fa-table',
    actions: [
      { type: 'datatable_create', label: 'Crear DataTable', icon: 'fa-plus-square' },
      { type: 'datatable_add_row', label: 'Añadir Fila', icon: 'fa-plus' },
      { type: 'datatable_filter', label: 'Filtrar', icon: 'fa-filter' },
      { type: 'datatable_sort', label: 'Ordenar', icon: 'fa-sort' },
      { type: 'datatable_export', label: 'Exportar', icon: 'fa-file-export' }
    ]
  },
  {
    id: 'loop',
    name: 'Bucles',
    icon: 'fa-sync',
    actions: [
      { type: 'for_each', label: 'Para Cada', icon: 'fa-redo' },
      { type: 'while', label: 'Mientras', icon: 'fa-spinner' },
      { type: 'break', label: 'Romper Bucle', icon: 'fa-stop' }
    ]
  },
  {
    id: 'condition',
    name: 'Condiciones',
    icon: 'fa-code-branch',
    actions: [
      { type: 'if', label: 'Si (If)', icon: 'fa-question' },
      { type: 'else', label: 'Sino (Else)', icon: 'fa-code-branch' },
      { type: 'switch', label: 'Switch', icon: 'fa-random' }
    ]
  },
  {
    id: 'message-box',
    name: 'Mensajes',
    icon: 'fa-comment',
    actions: [
      { type: 'message_box', label: 'Mostrar Mensaje', icon: 'fa-info-circle' },
      { type: 'input_dialog', label: 'Cuadro de Entrada', icon: 'fa-edit' }
    ]
  },
  {
    id: 'logging',
    name: 'Logging',
    icon: 'fa-file-alt',
    actions: [
      { type: 'log_info', label: 'Log Info', icon: 'fa-info' },
      { type: 'log_warning', label: 'Log Warning', icon: 'fa-exclamation-triangle' },
      { type: 'log_error', label: 'Log Error', icon: 'fa-times-circle' }
    ]
  },
  {
    id: 'wait',
    name: 'Esperas',
    icon: 'fa-clock',
    actions: [
      { type: 'wait_seconds', label: 'Esperar Segundos', icon: 'fa-hourglass-half' },
      { type: 'wait_element', label: 'Esperar Elemento', icon: 'fa-eye' },
      { type: 'wait_page_load', label: 'Esperar Carga', icon: 'fa-spinner' }
    ]
  },
  {
    id: 'files',
    name: 'Archivos',
    icon: 'fa-folder',
    actions: [
      { type: 'file_read', label: 'Leer Archivo', icon: 'fa-file-alt' },
      { type: 'file_write', label: 'Escribir Archivo', icon: 'fa-file-signature' },
      { type: 'file_copy', label: 'Copiar Archivo', icon: 'fa-copy' },
      { type: 'file_move', label: 'Mover Archivo', icon: 'fa-file-export' },
      { type: 'file_delete', label: 'Eliminar Archivo', icon: 'fa-trash-alt' }
    ]
  },
  {
    id: 'database',
    name: 'Base de Datos',
    icon: 'fa-database',
    actions: [
      { type: 'db_connect', label: 'Conectar BD', icon: 'fa-plug' },
      { type: 'db_query', label: 'Ejecutar Query', icon: 'fa-search' },
      { type: 'db_insert', label: 'Insertar', icon: 'fa-plus' },
      { type: 'db_update', label: 'Actualizar', icon: 'fa-edit' },
      { type: 'db_disconnect', label: 'Desconectar BD', icon: 'fa-unlink' }
    ]
  },
  {
    id: 'ai',
    name: 'Inteligencia Artificial',
    icon: 'fa-brain',
    actions: [
      { type: 'ai_ocr', label: 'OCR con IA', icon: 'fa-file-image' },
      { type: 'ai_chat', label: 'Chat IA', icon: 'fa-robot' },
      { type: 'ai_analyze', label: 'Analizar Documento', icon: 'fa-search-plus' }
    ]
  }
]

// Estados de ejecución
export const EXECUTION_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ERROR: 'error',
  STOPPED: 'stopped'
}

// Tipos de log
export const LOG_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

// Colores de los iconos por tipo de log
export const LOG_ICONS = {
  info: 'fa-info-circle',
  success: 'fa-check-circle',
  warning: 'fa-exclamation-triangle',
  error: 'fa-times-circle'
}

// API endpoints
export const API_ENDPOINTS = {
  WORKFLOWS: '/api/workflows',
  SETTINGS: '/api/settings',
  DATABASE: '/api/database',
  OMNICHANNEL: '/api/omnichannel',
  VIDEO_CONFERENCE: '/api/video-conference',
  AI_CONFIG: '/api/ai-config',
  HEALTH: '/api/health'
}
