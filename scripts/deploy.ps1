$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Deployment Script for RuneScape Secret Santa..." -ForegroundColor Cyan

# 1. Check if Git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git is not initialized. Initializing now..." -ForegroundColor Yellow
    git init
}

# 2. Check for Remote Origin
$remote = try { git remote get-url origin 2>$null } catch { $null }
if (-not $remote) {
    Write-Host "⚠️ No GitHub repository linked yet." -ForegroundColor Yellow
    Write-Host "Please create a new repository at: https://github.com/new"
    $repoUrl = Read-Host "Paste your GitHub Repository URL here (e.g., https://github.com/User/repo.git)"
    
    if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
        git remote add origin $repoUrl
        # Verify it stuck
        git remote -v
        Write-Host "✅ Remote added!" -ForegroundColor Green
    } else {
        Write-Error "No URL provided. Cannot push to GitHub."
    }
}

# 3. Build Project
Write-Host "🔨 Building project to verify integrity..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed! Fix errors before deploying."
}

# 4. Stage and Commit
Write-Host "📦 Staging files..." -ForegroundColor Cyan
git add .
$status = git status --porcelain
if (-not [string]::IsNullOrWhiteSpace($status)) {
    $commitMsg = Read-Host "Enter commit message (Press Enter for 'Automatic Update')"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Automatic Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    git commit -m "$commitMsg"
    Write-Host "✅ Changes committed." -ForegroundColor Green
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

# 5. Push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
$branch = git branch --show-current
git push -u origin $branch
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌍 IF you have connected Netlify to this repo, your site is updating now." -ForegroundColor Green
} else {
    Write-Error "Failed to push. Check your internet or GitHub credentials."
}

Read-Host "Press Enter to exit..."
