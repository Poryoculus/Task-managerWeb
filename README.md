# 📝 Task Manager CLI (TypeScript)

## 📌 Overview


The software is a command-line Task Manager application developed with TypeScript and Node.js. It allows users to create, organize, and manage tasks directly from the terminal. The application is structured into models, services, and utility modules, promoting separation of concerns and maintainability.

The purpose of this project is to practice backend logic and reinforce key programming concepts such as asynchronous operations, error handling, and recursion. By building a practical tool, the project simulates real-world task management scenarios while improving code organization, data persistence strategies, and overall software design skills.

---

## 🚀 Features

- Add tasks with title and category
- View all tasks
- Mark tasks as completed
- Delete tasks
- Filter tasks by completion status
- Persistent storage using JSON file
- Recursive countdown function
- Error handling demonstration

---

## 🛠️ Technologies Used

- TypeScript
- Node.js
- ts-node
- File system (fs module)

---

## 📂 Project Structure
+ src/
  - index.ts
  + models
    - task.ts
  + services
    - TaskService.ts
  + task.json
  + utils
    + errorDemo.ts
    + recursion.ts
    + storage.ts
---

## ▶️ How to Run the Program

/1. Clone the repository:

```
git clone https://github.com/Poryoculus/task-manager.git
cd task-manager
```
/2.	Install dependencies:
```
npm install
```

/3.	Run the application:
```
npm run start
```

## Youtube video

https://youtu.be/MJ83jBdcqtI

# Development Environment

The development of this project was done using Nvim as the primary code editor. Node.js was used as the runtime environment to execute the application, and ts-node was used to run TypeScript files directly without a separate compilation step. The built-in file system (fs) module was used to handle data persistence through a JSON file.

The programming language used for this project was TypeScript. It was chosen for its strong typing system and its ability to improve code reliability and maintainability, making it well-suited for building structured backend applications and managing application logic efficiently.

# Useful Websites

- https://www.typescriptlang.org/docs/  
- https://nodejs.org/en/docs  
- https://www.w3schools.com/typescript/  
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
