# Access Hub - Resource Manager RBAC

A simple Resource Management application built with React, TypeScript, Express, MongoDB, and JWT Authentication.

The application uses Role-Based Access Control (RBAC) to manage permissions for different users.

---

## Features

### Authentication

* User Signup
* User Signin
* JWT Authentication
* Protected Routes

### Resource Management

* Create Resource
* View Resources
* Update Resource
* Delete Resource

### Role Based Access Control (RBAC)

#### USER

A normal user can:

* Create resources
* View their own resources
* Edit their own resources
* Delete their own resources

#### ADMIN

An admin can:

* View all resources
* Edit any resource
* Delete any resource

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Zod

---

## Project Structure

### Frontend

```text
src/
├── components/
├── pages/
├── lib/
├── App.tsx
└── main.tsx
```

### Backend

```text
src/
├── db.ts
├── middleware.ts
├── index.ts
└── models/
```

---

## API Endpoints

### Authentication

#### Signup

```http
POST /signup
```

Request Body:

```json
{
  "username": "john",
  "password": "123456",
  "role": "USER"
}
```

#### Signin

```http
POST /signin
```

Request Body:

```json
{
  "username": "john",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt_token"
}
```

---

### Resources

#### Create Resource

```http
POST /resources
```

#### Get Resources

```http
GET /resources
```

#### Update Resource

```http
PUT /resource/:resourceId
```

#### Delete Resource

```http
DELETE /resource/:resourceId
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend

bun install

bun run dev
```

### Frontend

```bash
cd frontend

bun install

bun run dev
```

---

## Environment Variables

Create a `.env` file in the backend project.

```env
PORT=3000

JWT_SECRET_KEY=your_secret_key

MONGO_URL=your_mongodb_connection_string
```

---

## How It Works

1. User creates an account.
2. User signs in.
3. Backend generates a JWT token.
4. Frontend stores the token in localStorage.
5. Every protected request sends the token in the Authorization header.
6. Backend verifies the token.
7. Access is granted based on the user's role.

---

## Future Improvements

* Search Resources
* Pagination
* User Profile
* Dark Mode
* Resource Categories
* Admin User Management
* Toast Notifications
* Better Dashboard Analytics

---

## Author

Mohamed Fazil

Built to learn Authentication, Authorization, CRUD Operations, and Role-Based Access Control using the MERN stack.
