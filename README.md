# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## 📖 Project Overview

This repository contains the **backend server** for the WTWR (What to Wear?) application.  
The WTWR app helps users decide what to wear based on the weather forecast. While the frontend displays weather data and clothing suggestions, **this backend project focuses on building the server, database, and API that power those features**.

### Key Functionalities

- Provides a RESTful API for the WTWR frontend
- Handles user authentication and authorization
- Stores and manages user data and clothing items in a database
- Fetches and processes weather data for use in the app
- Implements secure data handling practices

The eventual goal of this project is to create a **fully functioning server with API endpoints and user authorization**, deployed on a remote machine.

---

## 🛠️ Technologies and Techniques Used

- **Node.js** – JavaScript runtime for the backend
- **Express.js** – Web framework for building REST APIs
- **MongoDB & Mongoose** – Database and ODM for storing user and clothing data
- **JWT (JSON Web Tokens)** – For secure user authentication and authorization
- **bcrypt** – For password hashing
- **Celebrate / Joi** – For request validation
- **ESLint** – Code style and linting
- **Git & GitHub** – Version control
- **Deployment:** Remote server setup with a hosting service (e.g., Render, Heroku, or your own VPS)
