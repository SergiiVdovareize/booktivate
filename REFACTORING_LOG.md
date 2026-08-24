# Refactoring & Development Log

This document tracks all fixes, architectural refactoring, feature implementations, and improvements made during the **Reaktivate Fast-Test Homework** project.

---

## Log Entries

### Entry #1: Workspace Setup & Skills Documentation
* **Timestamp**: 2026-08-24 10:03
* **Category**: Setup / Skills / Architecture Documentation
* **Changes Made**:
  1. Created `TASK_ANALYSIS.md` outlining project requirements, Part 1 & Part 2 goals, and architectural breakdown.
  2. Created `.agents/skills/reaktivate-books-api/SKILL.md` documenting all Swagger endpoints, request/response DTO schemas, and SSL parameters.
  3. Created `.agents/skills/fast-test-architecture/SKILL.md` documenting the MVP/MVVM pattern rules for React + MobX, functional presentation views, and fast controller unit testing.
  4. Created `.agents/skills/code-review-mvvm/SKILL.md` for auditing zero-logic JSX presentation, MobX reactivity, and testability.
* **Rationale**: Establishing complete domain and architectural reference skills before refactoring prevents anti-patterns and ensures strict compliance with homework guidelines.
* **Status**: Completed

---

### Entry #2: Fix Node 17+ OpenSSL Legacy Provider Compatibility Error
* **Timestamp**: 2026-08-24 10:04
* **Category**: Build System / Node.js Environment Fix
* **Changes Made**:
  1. Updated `package.json` scripts (`start`, `build`, `test`) to set `NODE_OPTIONS=--openssl-legacy-provider`.
* **Rationale**: Node.js v17+ (and Node v24 running locally) uses OpenSSL 3.0, which rejects the MD4 hashing algorithm used internally by legacy Webpack 4 in `react-scripts@3.0.1`. Adding `--openssl-legacy-provider` allows CRA v3 scripts to compile cleanly without requiring breaking upgrades to legacy dependencies.
* **Verification**: Ran `npm run build` — compiled successfully with exit code 0.
* **Status**: Completed

---

## Future Refactoring Checklist

- [ ] Fix `ApiGateway.js` async `response.json()` bug & add dependency injection to `BooksRepository.js`.
- [ ] Create `BooksController` (ViewModel) with MobX observable state and actions.
- [ ] Refactor React components into pure functional presentation views observing `BooksController`.
- [ ] Implement "Add Book" modal/form with validation.
- [ ] Implement "All Books" vs "Private Books" filter switch.
- [ ] Implement global sticky header with private books counter.
- [ ] Write unit tests for `BooksController` and `BooksRepository`.
