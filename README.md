# Estetica Backend (Atlas)
## Features
- Static admin auth: login with admin@gmail.com / 123456 (configured via .env)
- Categories CRUD (protected for create/update/delete)
- Products CRUD (each product can be linked to a category)
- Cart flow (add, list, update, remove) — cart items stored per user email
- MongoDB Atlas connection (use your mongodb+srv URI in .env)

## Setup
1. Copy `.env.example` to `.env` and fill `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:
   ```
   npm install
   ```
3. Run server:
   ```
   npm run dev
   ```
## Auth
- POST `/api/auth/login` with `{ "email", "password" }`
- Default admin credentials are `admin@gmail.com` / `123456` (override in .env)

## Important endpoints
- Categories:
  - GET `/api/categories`
  - POST `/api/categories` (protected)
  - PUT `/api/categories/:id` (protected)
  - DELETE `/api/categories/:id` (protected)
- Products:
  - GET `/api/products` (supports ?q=&category=&page=&limit=)
  - GET `/api/products/:id`
  - POST `/api/products` (protected)
  - PUT `/api/products/:id` (protected)
  - DELETE `/api/products/:id` (protected)
- Cart (protected):
  - GET `/api/cart`  (gets cart for token email)
  - POST `/api/cart/add`  body: { productId, qty }
  - PUT `/api/cart/update/:itemId` body: { qty }
  - DELETE `/api/cart/remove/:itemId`

## Notes
- The project uses CommonJS (`require`) across files.
- Cart is keyed by user email (suitable for static auth). If you later add DB-backed users, you can switch to userId.
- For testing without a frontend, login to get a token and use it in `Authorization: Bearer <token>` header when calling protected endpoints.
