@echo off
title AlqVimia 2.0 - Sistema Completo
color 0A

echo.
echo  ========================================
echo       ALQVIMIA 2.0 - RPA AUTOMATION
echo  ========================================
echo.
echo  Iniciando servicios...
echo.

:: Verificar si node_modules del servidor existe
if not exist "server\node_modules" (
    echo  [1/3] Instalando dependencias del servidor...
    cd server
    call npm install
    cd ..
    echo       Dependencias del servidor instaladas.
) else (
    echo  [1/3] Dependencias del servidor OK
)

echo.
echo  [2/3] Iniciando Backend (Puerto 3000)...
start "Alqvimia Backend" cmd /k "cd server && npm start"

:: Esperar a que el servidor inicie
timeout /t 2 /nobreak > nul

echo  [3/3] Iniciando Frontend (Puerto 5173)...
start "Alqvimia Frontend" cmd /k "npm run dev"

echo.
echo  ========================================
echo       SERVICIOS INICIADOS
echo  ========================================
echo.
echo   Backend:  http://localhost:3000
echo   Frontend: http://localhost:5173
echo.
echo   Presiona cualquier tecla para cerrar
echo   ambos servicios...
echo  ========================================
echo.

pause > nul

:: Cerrar ventanas de los servicios
taskkill /FI "WINDOWTITLE eq Alqvimia Backend*" /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq Alqvimia Frontend*" /F > nul 2>&1

echo.
echo  Servicios detenidos.
