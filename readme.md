# Mongoose Express CRUD Mastery (TypeScript)

Node.js Express app in TypeScript using MongoDB/Mongoose for user and order management. Features Zod validation and bcrypt for secure password hashing.

## Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod
- bcrypt

## Getting Started

1. **Clone:** `git clone https://github.com/SazidulAlam47/Mongoose-Express-CRUD-Mastery.git`
2. **Install:** `npm install`
3. **Environment:** Create `.env` with `PORT` and `MONGODB_URI`.
4. **Build:** `npm run build`
5. **Start:** `npm start` (Server runs on `http://localhost:5000` by default).

## API Endpoints

### User

- `POST /api/users`: Create user.
- `GET /api/users`: Get all users (limited fields).
- `GET /api/users/:userId`: Get user by ID.
- `PUT /api/users/:userId`: Update user.
- `DELETE /api/users/:userId`: Delete user.

### Order

- `PUT /api/users/:userId/orders`: Add order to user.
- `GET /api/users/:userId/orders`: Get user's orders.
- `GET /api/users/:userId/orders/total-price`: Calculate total order price.

## Features

- Zod validation for data integrity.
- Robust error handling.
- Clear API documentation in original README.md.
