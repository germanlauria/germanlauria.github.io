@echo off
chcp 65001 >nul
title Probar voces
cd /d "%~dp0.."
echo.
echo  PROBAR VOCES
echo  Graba la misma frase con varias voces para que elijas una. Necesita internet.
echo.

set "PY="
where py >nul 2>nul && set "PY=py"
if not defined PY where python >nul 2>nul && set "PY=python"
if not defined PY goto nopython
%PY% -c "import sys" >nul 2>nul || goto nopython

echo  Instalando / actualizando edge-tts...
%PY% -m pip install --quiet --upgrade edge-tts
if errorlevel 1 (
  echo.
  echo  No se pudo instalar edge-tts. Revisa la conexion a internet y volve a intentar.
  pause
  exit /b 1
)
echo.
%PY% herramientas\generar-voces.py --muestras
echo.
pause
exit /b 0

:nopython
echo  No encontre Python en esta computadora.
echo  1. Descargalo de https://www.python.org/downloads/
echo  2. Al instalar, marca la casilla "Add python.exe to PATH".
echo  3. Volve a hacer doble clic en este archivo.
echo.
pause
exit /b 1
