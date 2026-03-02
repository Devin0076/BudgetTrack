# BudgetTrack (MVP)

BudgetTrack is a simple budgeting app that lets users register, log in, and track income and expenses. This MVP focuses on Sprint 1 core functionality: secure authentication and transaction tracking.

## Live Deployment
Deployed URL: https://budgettrack-v1ol.onrender.com

## Features (Sprint 1)
- User registration with hashed passwords
- User login with JWT authentication
- Protected routes using auth middleware
- Create, view, update, and delete transactions
- Minimal frontend UI to complete the full workflow

## Tech Stack
- Frontend: HTML, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL 
- Testing: Jest, Supertest

## Architecture
The backend follows an MVC style structure:
- Routes define API endpoints
- Controllers handle request logic and responses
- Models handle database queries and data access
- Middleware protects routes using JWT authentication

## API Endpoints
Base URL (local): http://localhost:3001  
Base URL (deployed): https://budgettrack-v1ol.onrender.com

Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/me (protected)

Transactions (protected)
- GET /api/transactions
- POST /api/transactions
- PUT /api/transactions/:id
- DELETE /api/transactions/:id

## Local Setup

1. Clone the repo
```bash
git clone https://github.com/Devin0076/BudgetTrack.git
cd BudgetTrack
```

2. Create environment variables  
Create a file named .env in the project root:

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret
PORT=3001
```

3. Install and run the server
```bash
cd server
npm install
npm run dev
```

Then open:
- http://localhost:3001/
- http://localhost:3001/health

## Testing
From the server folder:

```bash
npm test
```

Tests include:
- Auth register and login
- Transactions create and list

## Known Limitations (MVP)
- Minimal UI
- No summaries or category insights yet

## Future Improvements
- Monthly summaries and category breakdowns
- Better UI and validation messages
- Expanded test coverage and CI pipeline