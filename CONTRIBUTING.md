# Contributing to Financial Management System

Thanks for showing interest in improving **Financial Management System**
(repo: [`rudawirocaltontshuma/financial_management_system`](https://github.com/rudawirocaltontshuma/financial_management_system)).
This guide will help you set up your environment and understand how to contribute.

---

## Overview

This project is built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.
It's a frontend-only financial management and accounting platform — no backend, database, or
authentication, and all data is generated locally from seeded mock data. The goal is to keep the
codebase modular, scalable, and easy for other developers to extend or build on.

---

## Project Layout

We use a **colocation-based file system**. Each screen keeps its own page, components, and logic
next to each other rather than spread across shared folders.

```
src
├── app
│   ├── (main)              # Every application route, one top-level folder per screen
│   │   ├── dashboard/
│   │   ├── accounting/ accounts/ general-ledger/ journal-entries/ trial-balance/ period-close/
│   │   ├── receivables/ customers/ invoices/ payments/ credit-notes/ ar-aging/
│   │   ├── payables/ suppliers/ bills/ debit-notes/ ap-aging/
│   │   ├── expenses/ expense-categories/ expense-approvals/ reimbursements/
│   │   ├── banking/ bank-accounts/ bank-transactions/ reconciliation/
│   │   ├── budgets/ forecasts/ variance-analysis/ cost-centers/
│   │   ├── assets/ depreciation/
│   │   ├── reports/ analytics/ settings/ ...
│   │   ├── _components/    # Shared app shell: sidebar, header, command menu, selectors
│   │   └── layout.tsx
│   ├── (external)/platform # Module overview / landing page
│   └── layout.tsx          # Root layout
├── components
│   ├── finance              # Reusable finance UI kit (KPI cards, data table, charts,
│   │                        #   status badges, print portal, entity form generator, ...)
│   └── ui                   # shadcn/ui primitives (do not modify directly)
├── data                      # Local mock data — one file per entity
├── hooks                     # Reusable hooks
├── lib
│   ├── finance               # Money/date formatting, aging-bucket calculations
│   └── mock                  # Seeded random generators used to build mock data
├── styles                    # Tailwind / theme setup
└── types/finance.ts          # Shared TypeScript types for every financial entity
```

Every route folder under `(main)` owns a local `_components/` directory for its screen-specific
pieces; only genuinely shared building blocks live in `src/components/`.

---

## Getting Started

### Fork and Clone the Repository

1. Fork the Repository

   Click [here](https://github.com/rudawirocaltontshuma/financial_management_system/fork) to fork the repository.

2. Clone the Repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/financial_management_system.git
   ```

3. Navigate into the Project
   ```bash
   cd financial_management_system
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   App will be available at [http://localhost:3000](http://localhost:3000).

---

## Contribution Flow

- Always create a new branch before working on changes:
  ```bash
  git checkout -b feature/my-update
  ```

- Use clear commit messages:
  ```bash
  git commit -m "feat: add budget variance chart"
  ```

- Open a Pull Request once ready.
- If your change adds a new UI screen or component, include a screenshot in your PR description.

---

## Where to Contribute

- **Screens**: Any module under `src/app/(main)/<screen>/`, with screen-specific components in that screen's `_components/` folder
- **External pages**: Landing/overview pages outside the app shell → `src/app/(external)/`
- **Shared finance UI**: Data tables, charts, KPI cards, forms → `src/components/finance/`
- **Mock data**: New or extended entities → `src/data/` (typed against `src/types/finance.ts`, generated with the seeded helpers in `src/lib/mock/`)
- **Hooks**: Custom logic goes in `src/hooks/`
- **Themes**: New presets under `src/styles/presets/`

---

## Guidelines

- Prefer **TypeScript types** over `any`
- Husky pre-commit hooks are enabled — linting and formatting run automatically when you commit, and if there are errors the commit will be blocked until they are fixed.
- Follow **shadcn/ui** style & Tailwind v4 conventions; use semantic theme tokens rather than raw color values
- Keep accessibility in mind (ARIA, keyboard nav, visible focus states)
- Use clear commit messages with conventional prefixes (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.)
- Avoid unnecessary dependencies — prefer existing utilities where possible
- Keep all data fictional and local — this project intentionally has no backend, database, or real integrations
- See [`AGENTS.md`](./AGENTS.md) for the full set of coding and structure conventions this project follows

---

## Submitting PRs

- Open a Pull Request once your changes are ready.
- Ensure your branch is up to date with `main` before submitting.
- Reference any related issue in your PR for context.

---

## Questions & Support

- Report bugs, suggestions, or issues via [GitHub Issues](https://github.com/rudawirocaltontshuma/financial_management_system/issues)

---

Your contributions keep this project growing. 🚀
