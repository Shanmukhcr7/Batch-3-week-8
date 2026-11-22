@echo off
setlocal
echo ===================================================
echo   Shanmukh Portfolio - 1-Click GitHub Push
echo ===================================================
echo.
echo Paste your GitHub repository URL below.
echo (Example: https://github.com/shanmukhcr7/my-portfolio.git)
echo.
set /p REPO_URL="GitHub Repo URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Please run this script again and paste your GitHub URL.
    pause
    exit /b
)

echo.
echo [1/4] Initializing Git repository...
git init

echo [2/4] Staging files...
git add .

echo [3/4] Creating commit...
git commit -m "feat: cinematic portfolio launch"

echo [4/4] Pushing to main branch...
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================
    echo   SUCCESS! Pushed to GitHub without errors.
    echo   You can now go to Vercel.com and click Deploy!
    echo ===================================================
) else (
    echo [INFO] If it asked for authentication, sign in to your GitHub in the pop-up browser window.
)

pause
