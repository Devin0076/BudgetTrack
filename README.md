# BudgetTrack

BudgetTrack is a budgeting application that allows users to securely register, log in, and track their income and expenses. The application provides transaction management and financial analytics to help users understand their spending and income patterns.

## Live Deployment

Deployed URL:  
https://budgettrack-v1ol.onrender.com

---

## Features

- User registration with securely hashed passwords
- User login with JWT authentication
- Protected API routes using authentication middleware
- Create, view, update, and delete financial transactions
- Monthly financial summaries
- Category-based spending breakdown
- Centralized error handling
- Automated tests using Jest and Supertest
- Continuous Integration using GitHub Actions

---

## Tech Stack

Frontend
- HTML
- JavaScript

Backend
- Node.js
- Express

Database
- PostgreSQL

Testing
- Jest
- Supertest

CI/CD
- GitHub Actions

---

## Architecture

The backend follows a layered architecture:

Routes → Controllers → Services → Repositories → Database

Responsibilities of each layer:

Routes  
Define API endpoints and route requests.

Controllers  
Handle request and response logic.

Services  
Contain business logic such as analytics calculations.

Repositories (Models)  
Handle database queries and data persistence.

Middleware  
Provides authentication and centralized error handling.

This structure improves maintainability, scalability, and testability.

---

## Design Patterns

### Strategy Pattern

The analytics system uses the **Strategy Pattern** to compute financial summaries from transaction data.  
Each strategy represents a different calculation that can be performed on the same dataset.

Strategies implemented:

- Monthly Income
- Monthly Expense
- Net Balance
- Category Breakdown

Example usage:

```javascript
runStrategy("monthlyIncome", transactions)
```

Using the Strategy Pattern allows new analytics calculations to be added without modifying the core analytics service, improving maintainability and scalability.

---

## API Endpoints

Base URL (local):  
http://localhost:3001

Base URL (deployed):  
https://budgettrack-v1ol.onrender.com

### Authentication

POST /api/auth/register  
POST /api/auth/login  
GET /api/me (protected)

### Transactions (Protected)

GET /api/transactions  
POST /api/transactions  
PUT /api/transactions/:id  
DELETE /api/transactions/:id

### Analytics

GET /api/analytics/monthly-summary

---

## Local Setup

Clone the repository

```bash
git clone https://github.com/Devin0076/BudgetTrack.git
cd BudgetTrack
```

Create environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_postgres_connection_string
TEST_DATABASE_URL=your_test_database_connection_string
TEST_DB_SCHEMA=test_schema
JWT_SECRET=your_secret
PORT=3001
```

Install and run the server

```bash
cd server
npm install
npm run dev
```

Then open:

http://localhost:3001  
http://localhost:3001/health

---

## Testing

Run tests from the server folder:

```bash
npm test
```

Tests include:

- Authentication endpoint tests
- Transaction endpoint tests
- Error handling validation
- Analytics strategy calculations

---

## Continuous Integration

This project uses **GitHub Actions** to automatically run tests.

The CI workflow runs when:

- Code is pushed to the `main` branch
- A pull request is created

Workflow location:

```
.github/workflows/ci.yml
```

CI steps:

1. Install dependencies
2. Run automated tests
3. Report failures