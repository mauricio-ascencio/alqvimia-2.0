-- =====================================================
-- ALQVIMIA RPA 2.0 - ESQUEMA DE BASE DE DATOS MySQL
-- =====================================================
-- Fecha: 2025
-- Descripcion: Schema completo para el sistema Alqvimia RPA
-- =====================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS alqvimia_rpa
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE alqvimia_rpa;

-- =====================================================
-- TABLA: usuarios
-- Almacena información de usuarios del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    rol ENUM('admin', 'usuario', 'operador', 'viewer') DEFAULT 'usuario',
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: configuraciones_sistema
-- Configuraciones globales del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS configuraciones_sistema (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    tipo ENUM('string', 'number', 'boolean', 'json', 'array') DEFAULT 'string',
    categoria VARCHAR(50) DEFAULT 'general',
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_clave (clave)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: configuraciones_usuario
-- Configuraciones personalizadas por usuario
-- =====================================================
CREATE TABLE IF NOT EXISTS configuraciones_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tema VARCHAR(50) DEFAULT 'midnight-blue',
    idioma VARCHAR(10) DEFAULT 'es',
    notificaciones_email BOOLEAN DEFAULT TRUE,
    notificaciones_push BOOLEAN DEFAULT TRUE,
    sidebar_collapsed BOOLEAN DEFAULT FALSE,
    configuracion_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario (usuario_id)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: temas
-- Temas personalizados del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS temas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    es_predeterminado BOOLEAN DEFAULT FALSE,
    es_personalizado BOOLEAN DEFAULT FALSE,
    variables_css JSON NOT NULL,
    preview_colors JSON,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: workflows
-- Flujos de trabajo/automatizaciones
-- =====================================================
CREATE TABLE IF NOT EXISTS workflows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50) DEFAULT 'general',
    version VARCHAR(20) DEFAULT '1.0.0',
    estado ENUM('borrador', 'activo', 'pausado', 'archivado') DEFAULT 'borrador',
    pasos JSON NOT NULL,
    variables JSON,
    configuracion JSON,
    usuario_creador_id INT,
    ejecuciones_totales INT DEFAULT 0,
    ultima_ejecucion DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_creador_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_nombre (nombre),
    INDEX idx_categoria (categoria),
    INDEX idx_estado (estado),
    FULLTEXT INDEX ft_busqueda (nombre, descripcion)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: ejecuciones
-- Historial de ejecuciones de workflows
-- =====================================================
CREATE TABLE IF NOT EXISTS ejecuciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workflow_id INT NOT NULL,
    usuario_id INT,
    estado ENUM('pendiente', 'ejecutando', 'completado', 'error', 'cancelado') DEFAULT 'pendiente',
    inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fin DATETIME DEFAULT NULL,
    duracion_ms INT DEFAULT NULL,
    resultado JSON,
    logs TEXT,
    error_mensaje TEXT,
    progreso INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_workflow (workflow_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha (inicio)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: plantillas_ia
-- Plantillas de IA disponibles
-- =====================================================
CREATE TABLE IF NOT EXISTS plantillas_ia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50) DEFAULT 'fa-robot',
    tipo ENUM('gpt', 'claude', 'gemini', 'custom', 'openai', 'azure') DEFAULT 'gpt',
    modelo VARCHAR(100),
    configuracion JSON,
    prompt_sistema TEXT,
    activo BOOLEAN DEFAULT TRUE,
    es_premium BOOLEAN DEFAULT FALSE,
    orden INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_activo (activo)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: plantillas_agentes
-- Plantillas de agentes RPA
-- =====================================================
CREATE TABLE IF NOT EXISTS plantillas_agentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50) DEFAULT 'fa-user-robot',
    categoria VARCHAR(50) DEFAULT 'general',
    capacidades JSON,
    configuracion_default JSON,
    activo BOOLEAN DEFAULT TRUE,
    es_premium BOOLEAN DEFAULT FALSE,
    orden INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_activo (activo)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: conexiones_mcp
-- Conexiones a servidores MCP
-- =====================================================
CREATE TABLE IF NOT EXISTS conexiones_mcp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    puerto INT DEFAULT 8080,
    protocolo ENUM('http', 'https', 'ws', 'wss') DEFAULT 'http',
    estado ENUM('conectado', 'desconectado', 'error') DEFAULT 'desconectado',
    ultimo_ping DATETIME DEFAULT NULL,
    configuracion JSON,
    credenciales_encriptadas TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_estado (estado)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: variables_globales
-- Variables globales del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS variables_globales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    valor TEXT,
    tipo ENUM('string', 'number', 'boolean', 'json', 'secret') DEFAULT 'string',
    descripcion VARCHAR(255),
    es_secreta BOOLEAN DEFAULT FALSE,
    categoria VARCHAR(50) DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_nombre (nombre),
    INDEX idx_categoria (categoria)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: acciones_grabadas
-- Acciones grabadas por el recorder
-- =====================================================
CREATE TABLE IF NOT EXISTS acciones_grabadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sesion_id VARCHAR(36) NOT NULL,
    tipo_accion VARCHAR(50) NOT NULL,
    selector TEXT,
    valor TEXT,
    coordenadas JSON,
    screenshot_path VARCHAR(255),
    metadata JSON,
    orden INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_sesion (sesion_id),
    INDEX idx_tipo (tipo_accion)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: sesiones_grabacion
-- Sesiones de grabación
-- =====================================================
CREATE TABLE IF NOT EXISTS sesiones_grabacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    nombre VARCHAR(150),
    descripcion TEXT,
    usuario_id INT,
    estado ENUM('grabando', 'pausado', 'finalizado') DEFAULT 'grabando',
    inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fin DATETIME DEFAULT NULL,
    total_acciones INT DEFAULT 0,
    convertido_a_workflow BOOLEAN DEFAULT FALSE,
    workflow_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE SET NULL,
    INDEX idx_usuario (usuario_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: logs_sistema
-- Logs del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS logs_sistema (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('debug', 'info', 'warning', 'error', 'critical') DEFAULT 'info',
    categoria VARCHAR(50) DEFAULT 'general',
    mensaje TEXT NOT NULL,
    contexto JSON,
    usuario_id INT DEFAULT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nivel (nivel),
    INDEX idx_categoria (categoria),
    INDEX idx_fecha (created_at),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: notificaciones
-- Notificaciones del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo ENUM('info', 'success', 'warning', 'error', 'system') DEFAULT 'info',
    titulo VARCHAR(150) NOT NULL,
    mensaje TEXT,
    leida BOOLEAN DEFAULT FALSE,
    url_accion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_leida (leida)
) ENGINE=InnoDB;

-- =====================================================
-- TABLA: sesiones_videoconferencia
-- Sesiones de videoconferencia
-- =====================================================
CREATE TABLE IF NOT EXISTS sesiones_videoconferencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    nombre VARCHAR(150),
    host_usuario_id INT,
    estado ENUM('programada', 'activa', 'finalizada', 'cancelada') DEFAULT 'programada',
    inicio_programado DATETIME,
    inicio_real DATETIME DEFAULT NULL,
    fin DATETIME DEFAULT NULL,
    duracion_minutos INT DEFAULT NULL,
    participantes_max INT DEFAULT 10,
    grabacion_activa BOOLEAN DEFAULT FALSE,
    transcripcion_activa BOOLEAN DEFAULT FALSE,
    configuracion JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (host_usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_estado (estado),
    INDEX idx_fecha (inicio_programado)
) ENGINE=InnoDB;

-- =====================================================
-- INSERTAR DATOS INICIALES
-- =====================================================

-- Insertar temas predeterminados
INSERT INTO temas (nombre, slug, descripcion, es_predeterminado, variables_css, preview_colors) VALUES
('Midnight Blue', 'midnight-blue', 'Tema oscuro con acentos azules', TRUE,
 '{"primary-color": "#2563eb", "dark-bg": "#0f172a", "card-bg": "#1e293b"}',
 '{"primary": "#2563eb", "bg": "#0f172a", "accent": "#7c3aed"}'),
('Ocean Breeze', 'ocean-breeze', 'Tema oscuro con tonos de océano',  FALSE,
 '{"primary-color": "#0891b2", "dark-bg": "#042f2e", "card-bg": "#134e4a"}',
 '{"primary": "#0891b2", "bg": "#042f2e", "accent": "#2dd4bf"}'),
('Sunset Purple', 'sunset-purple', 'Tema oscuro con tonos púrpura', FALSE,
 '{"primary-color": "#a855f7", "dark-bg": "#1c1917", "card-bg": "#292524"}',
 '{"primary": "#a855f7", "bg": "#1c1917", "accent": "#ec4899"}'),
('Forest Green', 'forest-green', 'Tema oscuro con tonos verdes', FALSE,
 '{"primary-color": "#22c55e", "dark-bg": "#14532d", "card-bg": "#166534"}',
 '{"primary": "#22c55e", "bg": "#14532d", "accent": "#84cc16"}'),
('Ruby Red', 'ruby-red', 'Tema oscuro con acentos rojos', FALSE,
 '{"primary-color": "#e11d48", "dark-bg": "#1c1917", "card-bg": "#292524"}',
 '{"primary": "#e11d48", "bg": "#1c1917", "accent": "#f43f5e"}'),
('Golden Amber', 'golden-amber', 'Tema oscuro con tonos dorados', FALSE,
 '{"primary-color": "#f59e0b", "dark-bg": "#1c1917", "card-bg": "#292524"}',
 '{"primary": "#f59e0b", "bg": "#1c1917", "accent": "#eab308"}'),
('Cyberpunk Neon', 'cyberpunk-neon', 'Tema futurista con neones', FALSE,
 '{"primary-color": "#00f5d4", "dark-bg": "#0a0a0a", "card-bg": "#1a1a2e"}',
 '{"primary": "#00f5d4", "bg": "#0a0a0a", "accent": "#f72585"}'),
('Arctic Frost', 'arctic-frost', 'Tema claro y minimalista', FALSE,
 '{"primary-color": "#3b82f6", "dark-bg": "#f1f5f9", "card-bg": "#ffffff"}',
 '{"primary": "#3b82f6", "bg": "#f1f5f9", "accent": "#06b6d4"}'),
('Lavender Dreams', 'lavender-dreams', 'Tema oscuro con tonos lavanda', FALSE,
 '{"primary-color": "#8b5cf6", "dark-bg": "#18181b", "card-bg": "#27272a"}',
 '{"primary": "#8b5cf6", "bg": "#18181b", "accent": "#d946ef"}'),
('Volcanic Orange', 'volcanic-orange', 'Tema oscuro con tonos volcánicos', FALSE,
 '{"primary-color": "#ea580c", "dark-bg": "#1c1917", "card-bg": "#292524"}',
 '{"primary": "#ea580c", "bg": "#1c1917", "accent": "#dc2626"}');

-- Insertar plantillas de IA
INSERT INTO plantillas_ia (nombre, descripcion, icono, tipo, modelo, configuracion) VALUES
('GPT-4 Assistant', 'Asistente inteligente basado en GPT-4', 'fa-brain', 'gpt', 'gpt-4', '{"temperature": 0.7, "max_tokens": 2000}'),
('Claude Analyst', 'Analista de datos con Claude', 'fa-chart-line', 'claude', 'claude-3-opus', '{"temperature": 0.5, "max_tokens": 4000}'),
('Code Generator', 'Generador de código especializado', 'fa-code', 'gpt', 'gpt-4-turbo', '{"temperature": 0.2, "max_tokens": 3000}'),
('Document Processor', 'Procesador de documentos con IA', 'fa-file-alt', 'claude', 'claude-3-sonnet', '{"temperature": 0.3}'),
('Email Composer', 'Compositor de emails profesionales', 'fa-envelope', 'gpt', 'gpt-4', '{"temperature": 0.6}'),
('Data Extractor', 'Extractor de datos estructurados', 'fa-database', 'gpt', 'gpt-4-turbo', '{"temperature": 0.1}'),
('Translation Expert', 'Traductor multilingüe avanzado', 'fa-language', 'gpt', 'gpt-4', '{"temperature": 0.3}'),
('Summarizer Pro', 'Resumidor de textos largos', 'fa-compress-alt', 'claude', 'claude-3-haiku', '{"temperature": 0.4}'),
('Creative Writer', 'Escritor creativo para contenido', 'fa-pen-fancy', 'gpt', 'gpt-4', '{"temperature": 0.9}'),
('Q&A Expert', 'Experto en preguntas y respuestas', 'fa-question-circle', 'claude', 'claude-3-opus', '{"temperature": 0.5}'),
('Sentiment Analyzer', 'Analizador de sentimientos', 'fa-smile', 'gpt', 'gpt-4-turbo', '{"temperature": 0.2}'),
('Report Generator', 'Generador de reportes automáticos', 'fa-file-invoice', 'claude', 'claude-3-sonnet', '{"temperature": 0.4}');

-- Insertar plantillas de agentes
INSERT INTO plantillas_agentes (nombre, descripcion, icono, categoria, capacidades) VALUES
('Web Scraper Agent', 'Agente especializado en extracción de datos web', 'fa-spider', 'extraccion', '["scraping", "parsing", "data-extraction"]'),
('Form Filler Agent', 'Agente para autocompletar formularios', 'fa-edit', 'automatizacion', '["form-filling", "validation", "submission"]'),
('Email Automation Agent', 'Agente para gestión de correos', 'fa-mail-bulk', 'comunicacion', '["email-reading", "email-sending", "filtering"]'),
('File Manager Agent', 'Agente para gestión de archivos', 'fa-folder-open', 'archivos', '["file-move", "file-copy", "file-rename", "file-delete"]'),
('Excel Processor Agent', 'Agente para procesamiento de Excel', 'fa-file-excel', 'datos', '["excel-read", "excel-write", "formulas", "pivot-tables"]'),
('PDF Handler Agent', 'Agente para manipulación de PDFs', 'fa-file-pdf', 'documentos', '["pdf-read", "pdf-merge", "pdf-split", "pdf-extract"]'),
('Browser Navigator Agent', 'Agente para navegación web automatizada', 'fa-globe', 'navegacion', '["click", "type", "scroll", "wait", "screenshot"]'),
('API Integration Agent', 'Agente para integraciones API REST', 'fa-plug', 'integracion', '["api-get", "api-post", "api-put", "api-delete", "authentication"]'),
('Database Agent', 'Agente para operaciones de base de datos', 'fa-database', 'datos', '["query", "insert", "update", "delete", "backup"]'),
('Notification Agent', 'Agente para envío de notificaciones', 'fa-bell', 'comunicacion', '["slack", "teams", "email", "sms", "push"]'),
('Report Builder Agent', 'Agente para generación de reportes', 'fa-chart-bar', 'reportes', '["data-aggregation", "chart-generation", "pdf-export"]'),
('Monitoring Agent', 'Agente para monitoreo de sistemas', 'fa-eye', 'monitoreo', '["health-check", "alert", "log-analysis", "performance"]');

-- Insertar configuraciones del sistema por defecto
INSERT INTO configuraciones_sistema (clave, valor, tipo, categoria, descripcion) VALUES
('app_nombre', 'Alqvimia RPA 2.0', 'string', 'general', 'Nombre de la aplicación'),
('app_version', '2.0.0', 'string', 'general', 'Versión actual de la aplicación'),
('tema_default', 'midnight-blue', 'string', 'apariencia', 'Tema por defecto del sistema'),
('idioma_default', 'es', 'string', 'general', 'Idioma por defecto'),
('max_workflows_por_usuario', '50', 'number', 'limites', 'Máximo de workflows por usuario'),
('max_ejecuciones_paralelas', '5', 'number', 'ejecucion', 'Máximo de ejecuciones paralelas'),
('tiempo_sesion_minutos', '480', 'number', 'seguridad', 'Tiempo de sesión en minutos'),
('habilitar_registro', 'true', 'boolean', 'seguridad', 'Permitir registro de nuevos usuarios'),
('nivel_log', 'info', 'string', 'sistema', 'Nivel de logging del sistema'),
('backup_automatico', 'true', 'boolean', 'sistema', 'Habilitar backups automáticos'),
('intervalo_backup_horas', '24', 'number', 'sistema', 'Intervalo de backups en horas'),
('notificaciones_email', 'true', 'boolean', 'notificaciones', 'Habilitar notificaciones por email'),
('mcp_server_url', 'http://localhost:8080', 'string', 'mcp', 'URL del servidor MCP'),
('socket_reconexion_intentos', '5', 'number', 'conexion', 'Intentos de reconexión del socket'),
('recorder_screenshot', 'true', 'boolean', 'recorder', 'Capturar screenshots al grabar');

-- Insertar usuario administrador por defecto (password: admin123)
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Administrador', 'admin@alqvimia.local', '$2b$10$rOzJqQZQZQZQZQZQZQZQZuQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ', 'admin');

-- Insertar configuración del usuario admin
INSERT INTO configuraciones_usuario (usuario_id, tema, idioma) VALUES
(1, 'midnight-blue', 'es');

-- =====================================================
-- FIN DEL ESQUEMA
-- =====================================================
