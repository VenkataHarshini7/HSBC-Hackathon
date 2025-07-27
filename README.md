________________________________________
📘 HSBC Hackathon – Finance API Documentation
Name: Venkata Harshini Devarapalli
College: GNITS
Batch : 4
Project Title: HSBC Finance Dashboard API
Tech Stack: Node.js, Express.js, MongoDB (optional), Vite (Frontend), REST API
________________________________________
📂 Project Structure
finance-dashboard-vite/
├── backend/
│   ├── routes/
│   ├── middleware/
│   └── app.js / server.js
├── frontend/ (Vite-based React App)
├── .env
├── package.json
________________________________________
🚀 Features Implemented
1. User Authentication & Authorization
•	JWT-based Login System: Secure token-based login.
•	Role-based Access Control: Admin vs User separation (if done).
•	Password Encryption using bcrypt.
2. Financial Product APIs
•	Endpoints to manage financial products such as:
o	Savings Accounts
o	Credit Cards
o	Loans
o	Mutual Funds
•	Features:
o	GET /products: Fetch all available products.
o	POST /products: Add new financial product.
3. Transaction API
•	Add/view transaction records (dummy or real).
•	Filter by date, amount, category, or type (debit/credit).
•	GET /transactions
•	POST /transactions
•	Supports pagination and filtering.
🛡️ Security Measures
•	Authentication: JWT with token expiration and refresh logic (if included).
•	Validation: All POST and PUT requests validated using express-validator.
•	Environment Variables: Used .env file to secure database URI, secret keys.
________________________________________
🧪 Sample API Calls
Login
POST /api/login
{
  "email": "user@example.com",
  "password": "password123"
}
Add Transaction
POST /api/transactions
{
  "amount": 2500,
  "type": "credit",
  "category": "Salary",
  "date": "2025-07-25"
}
Get Budget Summary
GET /api/budget/summary?month=07&year=2025
________________________________________
🛠️ Deployment & Running
Backend
cd backend
npm install
node server.js
Frontend
cd frontend
npm install
npm run dev
________________________________________
📌 Additional Notes
•	All API responses are JSON formatted.
•	Status codes are standardized (200 OK, 201 Created, 400 Bad Request, etc.).
•	Frontend and backend run on separate ports with CORS enabled.
________________________________________
📚 Future Scope (If Not Yet Implemented)
•	Integration with real financial APIs (like Plaid, HSBC sandbox if available).
•	Graphs and analytics.
•	Notification system for budget thresholds.
•	Downloadable reports (PDF/CSV).

