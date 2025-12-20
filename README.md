# Alqvimia RPA 2.0

Versión React de Alqvimia RPA System.

## Requisitos

- Node.js 18+
- Backend corriendo en puerto 3000

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre http://localhost:5173

## Build

```bash
npm run build
```

## Estructura

```
src/
├── components/        # Componentes React
│   ├── common/        # Button, Modal, Card, Input
│   ├── layout/        # Header, Sidebar
│   ├── elementSpy/    # Inspector de elementos
│   ├── recorder/      # Grabador de acciones
│   ├── workflowStudio/# Editor de workflows
│   ├── executor/      # Ejecutor
│   ├── library/       # Biblioteca
│   ├── aiDashboard/   # Dashboard IA
│   ├── omnichannel/   # WhatsApp/Telegram
│   └── videoConference/ # Videoconferencia
├── context/           # React Context (Socket.IO)
├── stores/            # Zustand stores
├── services/          # APIs
├── utils/             # Constantes y helpers
└── assets/css/        # Estilos (del proyecto original)
```

## Tecnologías

- React 18
- Vite 5
- Zustand (estado)
- @dnd-kit (drag & drop)
- Socket.io-client
- React Router DOM
