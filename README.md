# 📚 Reaktivate Books

A simple React application built using **Fast-Test MVVM Architecture** and **MobX State Management**.

[![Linter](https://img.shields.io/github/actions/workflow/status/svdovareize/booktivate/ci.yml?branch=main&label=Linter&logo=biome)](https://github.com/svdovareize/booktivate/actions/workflows/ci.yml)
[![Unit Tests](https://img.shields.io/github/actions/workflow/status/svdovareize/booktivate/ci.yml?branch=main&label=Unit%20Tests&logo=jest)](https://github.com/svdovareize/booktivate/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/Coverage-93.58%25-brightgreen.svg)](https://svdovareize.github.io/booktivate/coverage/index.html)
[![Argos CI](https://img.shields.io/badge/Argos_UI-passing-brightgreen)](https://app.argos-ci.com/s-vdovareize/booktivate/builds/1)
[![Deploy](https://github.com/svdovareize/booktivate/actions/workflows/deploy.yml/badge.svg)](https://github.com/svdovareize/booktivate/actions/workflows/deploy.yml)

---

## 🚀 Live Demo & Web Reports

* **🌐 Live Application Demo**: [https://svdovareize.github.io/booktivate/](https://svdovareize.github.io/booktivate/)
* **📊 Interactive Test Coverage Webpage**: [https://svdovareize.github.io/booktivate/coverage/index.html](https://svdovareize.github.io/booktivate/coverage/index.html)
* **🎨 Argos Visual UI Builds**: [https://app.argos-ci.com/s-vdovareize/booktivate/builds/1](https://app.argos-ci.com/s-vdovareize/booktivate/builds/1)

---

## 🏗️ Architecture & Features

* **MVVM Architecture**: Controller facade (`BooksController`) managing MobX RootStore (`UserStore`, `UIStore`, `BooksStore`).
* **Dependency Injection**: React Context DI (`ControllerProvider` & `useController()`).
* **Programmer's Model (PM)**: Explicit domain entity (`Book.model.js`) encapsulating business logic (`displayTitle`, `isPrivate`).
* **Data Sanitization**: Automatic filtering of empty HTTP DTOs (`{}`) returned by backend services.
* **User Profile Switcher**: Interactive user switcher with read-only view mode, inline editing, and state cancellation.

---

## 🛠️ Available Scripts

### Run App Locally
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run Unit Tests & Coverage
```bash
npm test                      # Run Jest unit tests
npm run test:coverage         # Run unit tests with coverage report
```

### Run Argos Visual UI Tests
```bash
npm run test:argos            # Run Playwright visual tests & upload to Argos CI
```

### Run Linter & Formatter
```bash
npm run lint                  # Run Biome static linter
npm run format                # Auto-format codebase with Biome
```

### Production Build
```bash
npm run build                 # Create production build and embed HTML coverage report in build/coverage/
```

---

## ⚙️ Continuous Integration (GitHub Actions)

The repository features a **2-Tiered GitHub Actions Pipeline**:

1. **`ci.yml` (Continuous Integration)**:
   - **Tier 1**: Runs Biome linter check (`npm run lint`) & Jest unit tests with coverage (`npm run test:coverage`) in parallel.
   - **Tier 2**: Runs Playwright Argos visual tests (`npm run test:argos`) & production build validation upon Tier 1 completion.
2. **`deploy.yml` (GitHub Pages Deployment)**:
   - Automatically builds and deploys the app & HTML coverage report to GitHub Pages on every successful push to `main`.
