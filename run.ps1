#!/usr/bin/env pwsh

# Run Flutter app on Windows
Set-Location -Path "C:\Users\Tsemi\sunset\flutter_ict_hub"
Write-Host "✨ Starting Flutter ICT Hub on Windows..."
Write-Host "📁 Current directory: $(Get-Location)"
Write-Host ""

flutter run -d windows
