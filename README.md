# Task Management System (TaskFlow)

A **full-stack Task Management System** developed as part of an internship assignment using **Node.js, Express, MySQL, HTML, CSS, and JavaScript**.

The project demonstrates **frontend fundamentals**, **REST API development with Node.js**, and **database integration**, with a clean UI designed in **Figma**.

---

## 🔹 Project Objective

The objective of this assignment was to build a **single-page task management application** that demonstrates:

* Core **JavaScript** and **DOM manipulation**
* **Node.js backend development**
* REST API integration
* CRUD operations with **MySQL**
* Clean UI/UX 

---

## 🔹 Features Implemented

### Frontend

* Single-page dashboard (no page reloads)
* Add, edit, and delete tasks
* Dynamic task rendering using JavaScript
* Internal scrolling inside task list card
* Responsive layout
* Clean, framework-free UI

### Backend (Node.js)

* Backend built using **Node.js and Express**
* REST APIs for task management
* CRUD operations (Create, Read, Update, Delete)
* Connection handling using a database

---

## 🔹 Tech Stack

### Frontend

* HTML5
* CSS3 (Flexbox)
* Vanilla JavaScript

### Backend

* **Node.js**
* **Express.js**

### Database

* MySQL

### Tools

* Git & GitHub
* phpMyAdmin
* Figma

---

## 🔹 Project Structure

```
task-management-system/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js        
│   ├── routes.js        
│   ├── db.js            
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## 🔹 How the Application Works

1. The frontend sends requests to the **Node.js backend** using API
2. Express routes handle requests and interact with MySQL
3. Tasks are stored and retrieved from the database
4. The frontend dynamically updates the UI without page reloads
5. The same form is reused for both Add and Edit operations

---

## 🔹 Database Design

The project uses a simple `tasks` table with the following fields:

* id (Auto increment)
* title
* description
* status
* created_at (Default as current timestamp)

---

## 🔹 How to Run the Project Locally

### Backend (Node.js)

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:3000
```

---

### Frontend

Open:

```
frontend/index.html
```

---

## 🔹 Assignment Highlights

* Node.js backend with REST APIs
* Framework-free frontend (HTML, CSS, JS)
* Clear separation of frontend and backend
* Clean and readable student-level code
* Designed with scalability in mind

---

## 🔹 Author

**Shubham**
MCA Student
Full-Stack Development Aspirant



# want next.
