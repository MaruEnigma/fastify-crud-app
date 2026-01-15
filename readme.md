# Fastify CRUD Application

A simple **CRUD (Create, Read, Update, Delete)** backend application built using **Fastify**. This project is mainly for learning and practice purposes to understand how backend APIs work.

---

##  Table of Contents

* Features
* Technologies Used
* Installation
* Usage

---

##  Features

* Fast and lightweight backend using **Fastify**
* Create, Read, Update, and Delete operations
* RESTful API design
* Clean and organized project structure
* Prisma ORM support (if used)
* Database integration (PostgreSQL / MongoDB)
* Swagger UI for API testing and documentation

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
git clone <your-repository-url>
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
