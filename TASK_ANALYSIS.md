# Reaktivate TDD Challenge 1: Project & Task Analysis

## 1. Project Overview

This repository is a starter React application for the **Fast-Test Homework Challenge** (TDD / MVP architecture refactoring).

### Current Codebase Structure
```
reaktivate/
├── .agents/
│   └── skills/
│       ├── reaktivate-books-api/
│       │   └── SKILL.md             # Swagger API specification & DTO definitions
│       ├── fast-test-architecture/
│       │   └── SKILL.md             # MVP/MVVM MobX pattern & fast-testing guidelines
│       └── code-review-mvvm/
│           └── SKILL.md             # Fast-Test MVVM architecture & MobX code review audit skill
├── REFACTORING_LOG.md               # Continuous log of all fixes, updates, and architectural changes
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── index.js                     # React entry point with embedded fetching & render logic
│   ├── styles.css                   # Basic styles
│   ├── Books/
│   │   └── Books.repository.js      # Repository fetching/posting books via ApiGateway
│   └── Shared/
│       ├── ApiGateway.js            # Fetch wrapper for HTTP requests
│       └── config.js                # Base API URL configuration
└── .agent/
    └── Fast-Test Homework.pdf      # Detailed task description & guidelines
```

---

## 2. Refactoring Log

All code changes, bug fixes, architectural refactoring, and feature additions will be logged in:
👉 [REFACTORING_LOG.md](file:///Users/kastet/work/reaktivate/REFACTORING_LOG.md)

---

## 3. Workspace Skills

We have established three specialized workspace skills to guide development, architecture, and code auditing:

1. 📖 **[reaktivate-books-api](file:///Users/kastet/work/reaktivate/.agents/skills/reaktivate-books-api/SKILL.md)**:
   - Full Swagger API specifications for endpoints (`/v1/books/{user}/`, `/v1/books/{user}/private`, `/v1/books/{user}/reset`).
   - JSON schemas, HTTP headers, self-signed SSL handling, and DTO definitions.

2. 🏗️ **[fast-test-architecture](file:///Users/kastet/work/reaktivate/.agents/skills/fast-test-architecture/SKILL.md)**:
   - MVP/MVVM architectural pattern rules for React + MobX.
   - Decoupling functional Views from Controllers/ViewModels.
   - Guidelines for fast unit testing Controllers without React DOM rendering overhead.

3. 🔍 **[code-review-mvvm](file:///Users/kastet/work/reaktivate/.agents/skills/code-review-mvvm/SKILL.md)**:
   - Automated checklist and audit procedure for reviewing code changes.
   - Checks zero logic in JSX, MobX `runInAction` usage, observer bindings, and controller testability.

---

## 4. Main Goals & Requirements

The primary objective is to **refactor the existing solution** following the **Fast-Test Approach (MVP / MVVM pattern)** where logic is completely decoupled from rendering. This allows unit testing business logic in isolation without reliance on DOM / heavy UI rendering.

### Part 1: Core Refactoring & TDD Setup
1. **Zero Logic in Views (JSX/TSX)**:
   - Views must be pure/dumb rendering components.
   - All logic, state manipulation, and side effects must reside inside **Controllers / Presenters / Stores**.
2. **State Management & Reactivity**:
   - Use **MobX** and **`mobx-react`** (or `mobx-react-lite`).
3. **Implement Book Creation**:
   - Complete the "Add Book" functionality (calling `BooksRepository.addBook`).
4. **Test Coverage**:
   - Write fast unit tests covering all business logic (Controllers, Repositories, Stores).

---

### Part 2: Power-Up Requirements
1. **Books Filter Switch**:
   - Add a toggle switch (tabs/buttons/radio) between **"All Books"** and **"Private Books"**.
2. **Application Header**:
   - Add a sticky global header displaying a counter for private books, e.g., `"Your books: X"`.

---

## 5. Architecture Pattern: Model-View-Presenter (MVP / MVVM)

```
+----------+      actions      +------------+       PM       +------------+       DTO      +--------------------+
|   View   | ----------------> | Controller | -------------> | Repository | -------------> | Services / Gateway |
|  (React) | <---------------- |   (Logic)  | <------------- |  (Domain)  | <------------- |    (ApiGateway)    |
+----------+   VM (observable) +------------+       PM       +------------+       DTO      +--------------------+
```

---

## 6. Implementation Roadmap

1. [ ] Install test framework / setup Jest & MobX dependencies if missing.
2. [ ] Refactor `Books.repository.js` & `ApiGateway.js` for clean testability / dependency injection.
3. [ ] Create `BooksController` (or ViewModel) using MobX to manage book list, filtering, and add-book actions.
4. [ ] Refactor `App.jsx` / `BooksView.jsx` to be dumb observer components.
5. [ ] Implement "All Books" vs "Private Books" toggle and Global Header counter.
6. [ ] Write unit tests for Controllers and Repositories.
