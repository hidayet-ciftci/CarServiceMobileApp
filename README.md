# 🚗 Car Rental Solution

<p align="center">
  <strong>A full-stack car rental management system built with ASP.NET Core Web API and React Native (Expo).</strong>
</p>

<p align="center">

![.NET](https://img.shields.io/badge/.NET-6-blueviolet)
![C#](https://img.shields.io/badge/C%23-Backend-green)
![React Native](https://img.shields.io/badge/React_Native-Mobile-blue)
![Expo](https://img.shields.io/badge/Expo-SDK54-black)
![SQL Server](https://img.shields.io/badge/SQL_Server-Database-red)
![License](https://img.shields.io/badge/License-Portfolio-success)

</p>

---

# 📖 Overview

Car Rental Solution is a full-stack vehicle rental management system consisting of a **React Native mobile application** and an **ASP.NET Core Web API** following the **N-Tier Architecture**.

The project enables users to browse vehicles, make reservations, manage customer information, and securely authenticate using JWT. The backend exposes RESTful APIs while the mobile application provides a modern cross-platform user experience.

---

# ✨ Features

- 🔐 JWT Authentication & Authorization
- 🚘 Vehicle Management
- 📅 Reservation Management
- 👤 Customer Management
- 📱 Cross-platform Mobile Application (Android & iOS)
- 🏗 N-Tier Architecture
- 📄 Swagger API Documentation
- ⚙ Background Job Processing with Hangfire
- 📝 Structured Logging using Serilog

---

# 🏗 System Architecture

```
               React Native (Expo)

                       │
                    Axios API

                       │

             ASP.NET Core Web API

                       │

        ┌──────────────┴──────────────┐

            Business Layer

                  │

              Data Access

                  │

          Entity Framework Core

                  │

             SQL Server Database
```

The backend is organized into the following layers:

- Business
- Core
- DataAccess
- Entities
- WebAPI

This separation improves maintainability, scalability, and testability.

---

# 🛠 Tech Stack

## Backend

- ASP.NET Core 6
- C#
- Entity Framework Core
- SQL Server
- JWT Authentication
- Hangfire
- Serilog
- Swagger / OpenAPI

## Mobile

- React Native
- Expo SDK
- TypeScript
- Redux Toolkit
- React Redux
- Axios
- React Native Paper
- Expo Router

---

# 📂 Project Structure

```
CarRentalSolution
│
├── CarRentalProject
│   ├── Business
│   ├── Core
│   ├── DataAccess
│   ├── Entities
│   └── WebApi
│
├── CarRental-FE
│   ├── app
│   ├── assets
│   ├── components
│   ├── constants
│   ├── store
│   └── hooks
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/CarRentalSolution.git

cd CarRentalSolution
```

---

# ⚙ Backend Setup

## 1. Restore Packages

```bash
dotnet restore
```

## 2. Configure Database

Open

```
CarRentalProject/WebApi/appsettings.json
```

Update the connection string.

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "YOUR_SQL_SERVER_CONNECTION"
}
```

---

## 3. Create Database

Run the SQL script:

```
CarRentalProject/databaseSQL.sql
```

---

## 4. Run API

```bash
dotnet build

dotnet run --project CarRentalProject/WebApi
```

Swagger UI

```
https://localhost:5001/swagger
```

---

# 📱 Frontend Setup

Navigate to the frontend folder.

```bash
cd CarRental-FE
```

Install dependencies.

```bash
npm install
```

Run the application.

```bash
npm start
```

or

```bash
expo start
```

Update the backend API URL inside:

```
constants/api.ts
```

---

# 🔐 Authentication

The backend uses **JWT Bearer Authentication**.

Configure the following values inside:

```
appsettings.json
```

- Issuer
- Audience
- Secret Key

---

# 📊 Background Jobs

The application uses **Hangfire** for background processing.

Typical use cases include:

- Scheduled jobs
- Email notifications
- Maintenance tasks

---

# 📝 Logging

Application logs are generated using **Serilog**.

Logging configuration is available through:

```
appsettings.json
```

---

# 📸 Screenshots

> Screenshots will be added soon.

```
docs/

├── login.png

├── home.png

├── vehicle-details.png

└── reservation.png
```

Example:

```markdown
![Login](docs/login.png)

![Home](docs/home.png)
```

---

# 🔄 Application Flow

```
User

↓

Login

↓

JWT Authentication

↓

REST API Request

↓

Business Layer

↓

Data Access Layer

↓

SQL Server

↓

API Response

↓

Mobile Application
```

---

# 📌 Sample API Endpoints

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | /api/auth/login        | User Login         |
| POST   | /api/auth/register     | Register User      |
| GET    | /api/vehicles          | Get Vehicles       |
| GET    | /api/vehicles/{id}     | Vehicle Details    |
| POST   | /api/reservations      | Create Reservation |
| PUT    | /api/reservations/{id} | Update Reservation |

---

# 🚀 Future Improvements

- Docker Support
- CI/CD Pipeline
- Unit Tests
- Integration Tests
- Redis Cache
- Push Notifications
- Payment Integration
- Role-Based Authorization

---

# 👨‍💻 Developer

**Hidayet Çiftçi**

Backend & Mobile Developer

### Technologies

- ASP.NET Core
- C#
- Entity Framework Core
- SQL Server
- React Native
- Expo
- Redux Toolkit
- TypeScript

---

# 📄 License

This repository is published for **portfolio and educational purposes**.
