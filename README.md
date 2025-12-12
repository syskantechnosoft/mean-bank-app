# MEAN Stack Banking Application with Neon/Glassmorphism UI

This is a full-featured Banking Application built with the MEAN stack (MongoDB, Express, Angular, Node.js). It features a modern, ultra-responsive UI with neon and glassmorphism high-tech aesthetics.

## Features

### 🔐 Authentication & Security
-   User Registration and Login with JWT Authentication.
-   Password Hashing using Bcrypt.
-   Secure Route Guards in Angular.

### 🏦 Banking Operations
-   **Create Accounts**: Support for Savings, Current, Deposit, and Loan accounts.
-   **Transactions**:
    -   Deposit Money
    -   Withdraw Money
    -   Fund Transfer to other accounts
-   **Card Management**:
    -   Request Debit/Credit Cards.
    -   Activate/Block Cards.
-   **Cheque Book**: Request new cheque books.

### 👤 User Profile
-   Update Personal Information.
-   **Manage Payees**: Add/Remove Payees for quick transfers.

### 🎨 UI/UX
-   **Theme**: Dark Mode with Neon Accents and Ambient Gradients.
-   **Effects**: Glassmorphism (blur effects), Parallax Backgrounds, 3D Hover Effects.
-   **Responsiveness**: Fully responsive Navbar, Dashboard, and Landing pages for Mobile/Tablet/Desktop.

### ⚙️ DevOps
-   **Docker**: Fully containerized Backend and Frontend.
-   **Docker Compose**: Orchestrates Mongo, Backend, and Frontend services.
-   **CI/CD**: GitHub Actions pipeline for automated Testing and Building.

---

## 🛠 Tech Stack

-   **Frontend**: Angular 17+ (Standalone Components), CSS3 (Variables, Animations).
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB.
-   **Testing**: Jest (Backend), Karma/Jasmine (Frontend), Cypress (E2E).
-   **Containerization**: Docker, Docker Compose.

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   Docker Desktop
-   Git

### 1. Local Development (Without Docker)

**Backend Setup:**
```bash
cd backend
npm install
# Create a .env file based on the example below
npm start
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```
Access Frontend at `http://localhost:4200` and Backend at `http://localhost:5000`.

### 2. Running with Docker Compose (Recommended)

Run the entire stack with a single command:
```bash
docker-compose up --build
```
This will start:
-   MongoDB on port 27017
-   Backend Service on port 5000
-   Frontend Application on port 80 (Served via Nginx)

Access the app at `http://localhost`.

### 3. Environment Variables (.env)
Create a `.env` file in the `backend` directory:
```
MONGO_URI=mongodb://mongo:27017/banking-app
# Use localhost if running locally without docker: mongodb://localhost:27017/banking-app
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 🧪 Testing

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Unit Tests:**
```bash
cd frontend
npm test
```

**E2E Tests:**
```bash
cd frontend
npx cypress open
```

---

## 📂 Project Structure

```
├── .github/            # GitHub Actions Workflows
├── backend/            # Express Server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── tests/          # Jest Tests
│   └── Dockerfile
├── frontend/           # Angular App
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── guards/
│   │   └── assets/
│   └── Dockerfile
└── docker-compose.yml
```

---

## 📜 License
MIT License.
