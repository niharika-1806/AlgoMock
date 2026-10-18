@echo off
echo Starting AlgoMock Backend and Frontend...

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot"
set "JWT_SECRET=mysecretkeyformyalgomockapplication1234567890"

:: Set your Gemini API Key below or export it in your environment
if "%GEMINI_API_KEY%"=="" (
    :: set "GEMINI_API_KEY=YOUR_GEMINI_API_KEY"
)

start "AlgoMock Backend (Spring Boot)" cmd /k "cd /d %~dp0backend && mvnw.cmd spring-boot:run"
start "AlgoMock Frontend (React Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Both services launched in separate windows!
echo Backend:  http://localhost:8080/
echo Frontend: http://localhost:5173/
