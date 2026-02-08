# Employee Management System

This is a comprehensive Employee Management System using React, Node.js, Express, and MySQL.

## 🚀 How to Run This Project

If you have cloned this repository, you might notice that the `node_modules` folders are missing. This is intentional to keep the project light. You generally **never** upload `node_modules` to GitHub.

To restore them and run the project, follow these steps:

### 1. Prerequisites
- **Node.js** installed on your machine.
- **XAMPP** installed (for MySQL database).

### 2. Database Setup
1. Open XAMPP and start **Apache** and **MySQL**.
2. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Create a new database (e.g., `employee_db`).
4. Import the `employee_db.sql` file provided in this repository.

### 3. Install Backend Dependencies
Open a terminal in the `backend` folder and run:
```bash
cd backend
npm install
```
> **Note:** `npm install` reads the `package.json` file and automatically downloads all the necessary libraries (dependencies) into a fresh `node_modules` folder.

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:8081`.

### 4. Install Frontend Dependencies
Open a new terminal in the `frontend` folder and run:
```bash
cd frontend
npm install
```
> **Note:** Just like the backend, this command restores all frontend libraries (React, etc.) into the `frontend/node_modules` folder.

Start the frontend application:
```bash
npm start
```
The application will open in your browser at `http://localhost:3000`.

## 📂 Project Structure
- **/frontend**: React application code.
- **/backend**: Node.js & Express API server.
- **/database**: SQL scripts for database setup.

## 🔑 Login Credentials
- **Email**: admin@gmail.com
- **Password**: 1234
