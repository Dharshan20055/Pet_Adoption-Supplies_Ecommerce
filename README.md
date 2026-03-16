# Pet Marketplace — Full Stack Project

A full-stack pet adoption & sales ecommerce platform.

## Stack
- Frontend: React 18 + Material UI v5
- Backend: Spring Boot 3.2
- Database: MySQL (Railway)
- Auth: JWT (Spring Security)
- Payments: Stripe Checkout
- Real-time: WebSocket (STOMP + SockJS)
- API Docs: Swagger UI (SpringDoc)

## Module Assignments
| Developer    | Module                          |
|--------------|---------------------------------|
| Ashwin       | Auth & User Management          |
| SriVarshini  | Pet Catalog & Filters           |
| ThanushKumar | Buyer Workflow (Cart & Requests)|
| Maheshwari   | Seller Workflow & Live Chat     |

## Backend Setup
1. Configure application.properties with Railway DB credentials and JWT secret
2. Set Stripe keys: stripe.api.key and stripe.webhook.secret
3. Run: cd backend && mvn spring-boot:run
4. Swagger UI: http://localhost:8080/swagger-ui.html

## Frontend Setup
1. cd frontend && npm install
2. Create .env with REACT_APP_API_URL=http://localhost:8080
3. Run: npm start (opens at localhost:3000)

## Database
Run backend/src/main/resources/migrations/V1__init_schema.sql on Railway MySQL
or use spring.jpa.hibernate.ddl-auto=update for auto table creation.

## Key API Endpoints
POST /auth/register — Register
POST /auth/login    — Login (returns JWT)
GET  /pets          — Browse all pets
GET  /pets/filter   — Filter by breed/category/location/type
POST /pets/add      — Seller: add pet listing
POST /cart/add      — Add to cart
POST /requests/add  — Submit adoption/purchase request
PUT  /requests/{id}/approve — Seller approves
PUT  /requests/{id}/reject  — Seller rejects
POST /payment/create-checkout-session — Stripe payment
WS   /ws -> /app/chat/{requestId}     — Live chat

## Stripe Webhooks (dev)
stripe listen --forward-to localhost:8080/payment/webhook

## Deployment
Backend -> Railway (set env vars for DB + JWT + Stripe)
Frontend -> Vercel (set REACT_APP_API_URL to Railway backend URL)
