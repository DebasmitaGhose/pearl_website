# First push to empty private repo: DebasmitaGhose/pearl_website
# Run from the project root in PowerShell:
#   cd C:\Users\YOU\Documents\pearl_website
#   .\scripts\first-push.ps1

$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/DebasmitaGhose/pearl_website.git"

if (-not (Test-Path "package.json")) {
    Write-Error "Run this script from the pearl_website project root (where package.json is)."
}

if (-not (Test-Path ".git")) {
    git init -b main
}

$remotes = git remote 2>$null
if ($remotes -notcontains "origin") {
    git remote add origin $repoUrl
} else {
    git remote set-url origin $repoUrl
}

git add -A
$status = git status --porcelain
if ($status) {
    git commit -m "PEARL lab website"
}

Write-Host ""
Write-Host "Pushing to $repoUrl"
Write-Host "Username: DebasmitaGhose"
Write-Host "Password: use your GitHub Personal Access Token (not your login password)"
Write-Host "Create token: https://github.com/settings/tokens (scope: repo)"
Write-Host ""

git push -u origin main
