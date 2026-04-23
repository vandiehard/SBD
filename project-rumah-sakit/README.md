# Klinik Management System

A full-stack web application for managing a clinic, including patients, employees, and medical operations. 

## 🛠️ Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MySQL

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Prerequisites
Make sure you have the following installed on your laptop:
- [Node.js](https://nodejs.org/) (which comes with `npm`)
- [XAMPP](https://www.apachefriends.org/index.html) or any MySQL server.

### 2. Database Setup
1. Open XAMPP and start the **MySQL** module.
2. Open your web browser and go to `http://localhost/phpmyadmin/`.
3. Create a new database named **`Klinik_db`**.
4. Import the provided SQL file:
   - Click on the `Klinik_db` database you just created.
   - Go to the **Import** tab.
   - Choose the file `Klinik.sql` (located in the parent directory) and click **Import**.

### 3. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd project-rumah-sakit/backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your database configuration. (You can copy this into a new file named `.env`):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=Klinik_db
   ```
   *(Note: Set `DB_PASSWORD` to your MySQL root password. If you are using default XAMPP, it is usually blank).*
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 4. Frontend Setup
1. Open a **new** terminal and navigate to the `frontend` folder:
   ```bash
   cd project-rumah-sakit/frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run dev
   ```
4. The terminal will show a local URL (e.g., `http://localhost:5173`). Open this URL in your browser to view the application!

---

## 🌟 Features
- **Dashboard:** Overview of the clinic's statistics.
- **Patients (Pasien):** Add, view, edit, and delete patient records.
- **Employees (Karyawan):** Manage clinic staff and doctors.
- **Operations (Operasi):** Manage surgical operations and procedures.
