# 📚 Reaktivate Books

A simple React application built using **Fast-Test MVVM Architecture** and **MobX State Management**.

[![Linter](https://img.shields.io/github/actions/workflow/status/SergiiVdovareize/booktivate/ci.yml?branch=main&label=Linter&logo=biome)](https://github.com/SergiiVdovareize/booktivate/actions/workflows/ci.yml)
[![Unit Tests](https://img.shields.io/github/actions/workflow/status/SergiiVdovareize/booktivate/ci.yml?branch=main&label=Unit%20Tests&logo=jest)](https://github.com/SergiiVdovareize/booktivate/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/Coverage-93.58%25-brightgreen.svg)](https://booktivate.vdovareize.me/coverage/index.html)
[![Lighthouse CI](https://img.shields.io/badge/Lighthouse_CI-passing-blue?logo=lighthouse)](https://booktivate.vdovareize.me/lighthouse/index.html)
[![Argos CI](https://img.shields.io/badge/Argos_UI-passing-brightgreen)](https://app.argos-ci.com/s-vdovareize/booktivate)
[![Deploy](https://github.com/SergiiVdovareize/booktivate/actions/workflows/deploy.yml/badge.svg)](https://github.com/SergiiVdovareize/booktivate/actions/workflows/deploy.yml)

---

## Links

* **Live Application Demo**: [https://booktivate.vdovareize.me/](https://booktivate.vdovareize.me/)
* **Test Coverage**: [https://booktivate.vdovareize.me/coverage/index.html](https://booktivate.vdovareize.me/coverage/index.html)
* **Lighthouse Audit Report**: [https://booktivate.vdovareize.me/lighthouse/index.html](https://booktivate.vdovareize.me/lighthouse/index.html)
* **Argos Visual UI Builds**: [https://app.argos-ci.com/s-vdovareize/booktivate](https://app.argos-ci.com/s-vdovareize/booktivate)

> **💡 Demo Tip**: Use the username `svdovareize` to view pre-populated demo data.

---

## Architecture & Features

* **Fast-Test MVVM Architecture**: React components decoupled from state and business logic via Controller and MobX stores.
* **Domain Model & Sanitization**: Programmer's Model (PM) domain entities with automated HTTP DTO sanitization.
* **Network & Quality Assurance**: MSW fault-injection testing, Argos visual UI testing, and Lighthouse Core Web Vitals CI gate.

---

## Available Scripts

### Run App Locally
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run Unit & MSW Integration Tests
```bash
npm test                      # Run Jest unit & MSW integration tests
npm run test:coverage         # Run unit & MSW tests with coverage report
```

### Run Lighthouse Core Web Vitals Audit Locally
```bash
npm run build && npm run lhci # Build production bundle and run Lighthouse CI audit
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

## Continuous Integration (GitHub Actions)

The repository features a **2-Tiered GitHub Actions Pipeline**:

1. **`ci.yml` (Continuous Integration)**:
   - **Tier 1**: Runs Biome linter check (`npm run lint`) & Jest unit + MSW integration tests with coverage (`npm run test:coverage`) in parallel.
   - **Tier 2**: Runs Playwright Argos visual tests (`npm run test:argos`) & Production Build (`npm run build`) upon Tier 1 completion.
2. **`deploy.yml` (GitHub Pages Deployment)**:
   - Automatically builds the application, runs test coverage, executes Lighthouse audit against the production URL, embeds the HTML redirect page at `build/lighthouse/index.html`, and deploys to GitHub Pages on every push to `main`.
