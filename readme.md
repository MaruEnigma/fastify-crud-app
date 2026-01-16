# Fastify Online Store Backend

An Online Store backend application built using Fastify. This project provides APIs for managing store-related features such as users, products, carts, orders, and wallets. It is developed mainly for learning, practice, and portfolio purposes, focusing on real-world backend architecture.
---

##  Table of Contents

* Features
* Technologies Used
* Installation
* Usage

---

##  Features

Fast and high-performance backend using Fastify

User management APIs

Product management

Cart functionality

Order processing

Wallet management

RESTful API design

Modular and scalable project structure

Prisma ORM support (if used)

Database integration (PostgreSQL / MongoDB)

Swagger UI for API documentation and testing

---

## Technologies Used

* Node.js
* Fastify
* TypeScript (optional)
* Prisma ORM
* PostgreSQL / MongoDB
* Swagger (OpenAPI)
* npm

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/MaruEnigma/fastify-crud-app.git
cd fastify-crud-app
```

2. Install dependencies

```bash
npm install
```

3. Create environment variables

Create a `.env` file in the root directory and add:

```
PORT=3000
DATABASE_URL=your_database_url
```

4. Run database migrations (if using Prisma)

```bash
npx prisma migrate dev
```

5. Start the server

```bash
npm run dev
```

---

## Usage

* Server runs at:

```
http://localhost:3000
```

* API documentation (Swagger UI):

```
http://localhost:3000/docs
```

* Use tools like **Postman**, **Thunder Client**, or **Swagger UI** to test the APIs.

---

## Author

**Marwa Hussain**
Aspiring Backend Developer 

---

⭐ If you like this project, don’t forget to give it a star on GitHub!
