# Deployment Guide: GitHub & Vercel

This guide will help you put your code on **GitHub** (to save it) and **Vercel** (to publish it).

## Part 1: Push to GitHub

### 1. Initialize Git
Open your terminal (in VS Code, press `Ctrl + ~`), make sure you are in the project folder, and run:
```bash
git init
```

### 2. Add your files
```bash
git add .
```

### 3. Save (Commit) your changes
```bash
git commit -m "Initial commit - Organic Store Website"
```

### 4. Create a Repo on GitHub
1.  Go to [github.com](https://github.com) and sign in.
2.  Click the **+** icon (top right) -> **New repository**.
3.  Name it (e.g., `organic-store`).
4.  Click **Create repository**.

### 5. Connect and Push
GitHub will show you a page with commands. Copy the ones that look like this (replace `YOUR_USERNAME` with your actual username):
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/organic-store.git
git push -u origin main
```
*Run these in your terminal.*

---

## Part 2: Deploy to Vercel

### Option A: Automatic (Best Way)
1.  Go to [vercel.com](https://vercel.com) and log in.
2.  Click **Add New...** -> **Project**.
3.  Select **Continue with GitHub**.
4.  You will see your `organic-store` repo in the list. Click **Import**.
5.  Click **Deploy**.
*Vercel will now automatically update your site whenever you push code to GitHub!*

### Option B: Manual (CLI)
If you just want to deploy from your computer immediately:
1.  In your terminal, run:
    ```bash
    vercel
    ```
2.  Follow the prompts (Press Enter for 'Yes' to everything).
