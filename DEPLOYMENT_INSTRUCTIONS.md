# GitHub & Vercel Deployment Guide

## ⚠️ Why Did GitHub Show "Something went really wrong, and we can't process that file"?

When dragging folders directly into the **GitHub website (web browser)**, GitHub's browser uploader fails because:
1. **Square bracket folder names**: Next.js App Router uses dynamic routes with square brackets (like `src/app/assets/[...path]`). GitHub's web browser uploader rejects square brackets `[` `]` in folder paths.
2. **Binary media files & deep subfolders**: GitHub's web drag-and-drop form has strict limitations on multipart form uploads with subdirectories and videos.

**Solution**: Use Git directly! Git is already installed on your computer and pushes all folders (including `[...path]` and video files) with 100% success.

---

## ⚡ Method 1: The 1-Click Script (Easiest & Fastest)

Inside this folder (`shanmukh-portfolio-github`):

1. Double-click **`push-to-github.bat`**.
2. It will prompt: `GitHub Repo URL: `
3. Paste your GitHub repository URL (e.g. `https://github.com/shanmukhcr7/portfolio.git`) and press **Enter**.
4. That's it! It will initialize, stage, commit, and push your repository automatically in 5 seconds.

---

## 💻 Method 2: Push via PowerShell / Terminal

If you prefer running commands manually:

```bash
cd "C:\Users\shanm\Downloads\batch 3 week 8\shanmukh-portfolio-github"
git init
git add .
git commit -m "feat: initial commit of Shanmukh portfolio"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

---

## 🌐 Deploy to Vercel (1-Click)

1. Open [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Click **Import** next to your newly pushed repository.
4. Framework is automatically detected as **Next.js**.
5. Click **Deploy**.
6. Your portfolio will be live worldwide in ~60 seconds!
