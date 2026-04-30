# CRM (React + Vite)

Mini CRM project built to match the “Final Project with React JS” requirements:

- React + Vite
- TailwindCSS layout (responsive + dark mode)
- React Router (multi-page app + dynamic route)
- Reusable components (buttons/inputs/modals/states)
- Forms + validation (contact + auth UI)
- Data fetching from a mock API (JSONPlaceholder) with UX states
- Dashboard Lite (Add/Edit/Delete on UI level) + localStorage persistence

## Pages (Routes)

- `/` Home (landing)
- `/customers` Customers list (Search + Filter + API fetch)
- `/customers/:id` Customer details (dynamic route)
- `/dashboard` Dashboard Lite (CRUD UI + localStorage)
- `/contact` Contact form (validation + success)
- `/login` Login (UI + validation)
- `/register` Register (UI + validation)
- `/404` Not found

## Tech Stack

- **React** + **Vite**
- **react-router-dom**
- **TailwindCSS**
- **ESLint**

## Data Source

Customers are fetched from `JSONPlaceholder` (`/users`) and mapped to a CRM-friendly model in:

- `src/features/customers/customerApi.js`

## Getting Started

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Notes

- Dashboard records are saved to `localStorage` under `crm_dashboard_customers_v1`.
- Authentication is UI-only (no backend).
# CMR
