# Helper script to re-build Berea and sync the production bundle into your website
$ErrorActionPreference = "Stop"

Write-Host "==> Building Berea for production with base: '/berea/'..." -ForegroundColor Cyan
npm --prefix "C:\Users\daleb\Berea" run build

Write-Host "==> Syncing dist to website berea/ folder..." -ForegroundColor Cyan
$dest = Join-Path $PSScriptRoot "berea"
robocopy "C:\Users\daleb\Berea\dist" $dest /E /MT:8

if ($LASTEXITCODE -le 7) {
    Write-Host "==> Berea successfully built and synced to $dest!" -ForegroundColor Green
} else {
    Write-Host "==> Robocopy returned exit code $LASTEXITCODE" -ForegroundColor Yellow
}
