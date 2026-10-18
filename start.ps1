# Start AlgoMock Backend and Frontend
$root = $PSScriptRoot
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot"
$env:JWT_SECRET = "mysecretkeyformyalgomockapplication1234567890"
if (-not $env:GEMINI_API_KEY) {
    # $env:GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
}

Write-Host "Launching AlgoMock Spring Boot Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:JAVA_HOME='$env:JAVA_HOME'; `$env:JWT_SECRET='$env:JWT_SECRET'; `$env:GEMINI_API_KEY='$env:GEMINI_API_KEY'; cd '$root\backend'; .\mvnw.cmd spring-boot:run"


Write-Host "Launching AlgoMock React Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

Write-Host "Both services launched successfully!" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8080/" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173/" -ForegroundColor Yellow
