# Expenses Tracker Backend
Node/Express + MongoDB backend for an expenses tracker app with JWT authentication.

## Features
- JWT user auth (signup/login)
- Dashboard endpoints (totals, recent transactions)
- Income and Expense CRUD
- Export incomes/expenses to Excel
- Aggregation endpoints for charts (bar, pie, line)
- Mobile friendly readiness (CORS, JSON)

## Environment variables (.env)
- MONGO_URI - MongoDB connection string
- JWT_SECRET - Secret for signing JWTs
- PORT - Server port (default 5000)

## Install
```
npm install
npm run dev
```

## API overview
- POST /api/auth/register
- POST /api/auth/login
- GET /api/dashboard/summary
- CRUD: /api/incomes, /api/expenses
- GET /api/export/incomes, /api/export/expenses
- GET /api/charts/* for aggregated chart data

