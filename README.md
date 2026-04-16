# 📝 Task Manager CLI (TypeScript)

## 📌 Overview

The software is a web-based Task Manager application developed with TypeScript, Node.js, and Express. It allows users to create, organize, and manage tasks through a browser interface instead of the command line.

The application follows a modular architecture using controllers, services, and utility modules, promoting separation of concerns and maintainability.

The purpose of this project is to practice backend development concepts such as request handling, routing, asynchronous operations, and data persistence. It also reinforces software design principles by simulating a real-world task management system with a simple UI.

---

## 🚀 Features

	•	Create tasks with title and category
	•	View tasks in a web interface
	•	Mark tasks as completed
	•	Delete tasks
	•	Filter tasks (completed / pending)
	•	View task statistics (total, completed, pending, percentage)
	•	Tasks grouped by category
	•	Persistent storage using a JSON file
	•	Recursive countdown demo
	•	Error handling demonstration

---

## 🛠️ Technologies Used

	•	TypeScript
	•	Node.js
	•	Express.js
	•	File System (fs module)
	•	HTML + CSS (server-rendered)

---

## 📂 Project Structure
+ src/
  - app.ts
  + routes/
    - taskRoutes.ts
  + controllers/
    - taskController.ts
  + services/
    - TaskService.ts
  + models/
    - Task.ts
  + utils/
    - storage.ts
  + public/
    - style.css
+ tasks.json
---

## ▶️ How to Run the Program

/1. Clone the repository:

```
git clone https://github.com/Poryoculus/Task-managerWeb.git
cd Task-managerWeb
```
/2.	Install dependencies:
```
npm install
```

/3.	Run the server
```
npm run start
```


/3.	Open the browser
```
http://localhost:3000
```

## Youtube video

Soon

# Development Environment

The development of this project was done using Nvim as the primary code editor. Node.js was used as the runtime environment, and TypeScript was used to provide strong typing and improve code maintainability.

Express.js was used to handle HTTP requests and routing, transforming the application from a CLI tool into a web-based system. The built-in file system (fs) module was used for persistent storage through a JSON file.

# Useful Websites

- https://www.typescriptlang.org/docs/  
- https://nodejs.org/en/docs  
- https://www.w3schools.com/typescript/  
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- https://expressjs.com/
