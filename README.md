# 📚 Project Documentation

## 🛠 Requirements

- **Node.js** > 18
- **Docker**
- **MySQL** (or use Docker for database)

## 🚀 Setup Instructions

### 1️⃣ Install Dependencies

```sh
npm install
```

### 2️⃣ Environment Variables

Copy the `.env-example` file to `.env` and update the necessary configurations.

```sh
cp .env-example .env
```

### 3️⃣ Run with Docker

Start the required services using Docker Compose:

```sh
docker compose up -d
```

### 4️⃣ Run Database Migrations

Apply the database migrations:

```sh
npm run migration:run
```

If you need to revert migrations:

```sh
npm run migration:revert
```

### 5️⃣ Seed Database (Optional)

```sh
npm run seed
```

### 6️⃣ Start the Application

```sh
npm start
```

For development mode with hot reload:

```sh
npm run start:dev
```

## 📂 Project Structure

```
📦 src
 ┣ 📂 common          # Shared utilities and constants
 ┃ ┣ 📂 configs       # Configuration files
 ┃ ┣ 📂 constants     # Global constants
 ┃ ┣ 📂 decorators    # Custom decorators
 ┃ ┣ 📂 enums         # Enumerations
 ┃ ┣ 📂 errors        # Custom error handling
 ┃ ┣ 📂 types         # TypeScript type definitions
 ┃ ┣ 📂 utils         # Helper functions
 ┃ ┗ 📂 validations   # Validation logic
 ┣ 📂 controllers     # API controllers (handle HTTP requests)
 ┣ 📂 infrastructure  # Database-related files
 ┃ ┣ 📂 datasource    # Database connection setup
 ┃ ┣ 📂 entity        # Database entities/models
 ┃ ┣ 📂 interfaces    # Database-related interfaces
 ┃ ┣ 📂 migrations    # Database migrations
 ┃ ┗ 📂 repository    # Data access layer (repositories)
 ┣ 📂 middlewares     # Express middlewares (error handling, logging, validation, etc.)
 ┣ 📂 routes          # API routes
 ┣ 📂 seed            # Seed scripts for database
 ┣ 📂 services        # Business logic and service layer
 ┣ 📜 app.ts          # Main application entry point
 ┣ 📜 main.ts         # Bootstrap file
 ┗ 📜 router.ts       # API route configuration

📦 db-config          # Database initialization scripts
📦 dist               # Compiled output (TypeScript -> JavaScript)
📦 logs               # Log files
📦 docs               # API documentation files
📜 .env-example       # Example environment file
📜 docker-compose.yaml # Docker Compose configuration
📜 Dockerfile         # Dockerfile for containerization
📜 nodemon.json       # Nodemon configuration
📜 package.json       # Project dependencies and scripts
```

## 🔗 API Documentation

API documentation is available in the `docs` folder or can be accessed via Swagger when the application is running.

---

📌 **Author:** Ha Gia Dat (Edric)
