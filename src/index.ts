import readline from "readline";
import { TaskService } from "./services/TaskService";
import { countDown } from "./utils/recursion";
import { riskyFunction } from "./utils/errorDemo";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function start() {
  const service = new TaskService();
  await service.init();
  main(service);
}

function showMenu() {
  console.log(`
=== Task Manager ===
1. Add Task
2. View Tasks
3. Complete Task
4. Delete Task
5. Filter Tasks
6. Recursive Countdown
7. Error Handling Demo
8. Exit
`);
}

function main(service: TaskService) {
  showMenu();

  rl.question("Choose an option: ", (option) => {
    switch (option) {
      case "1":
        rl.question("Enter task title: ", (title) => {
          rl.question("Enter task category: ", async (category) => {
            await service.createTask(title, category);
            console.log("Task added!");
            main(service);
          });
        });
        break;

      case "2":
        const tasks = service.getTasks();

        if (tasks.length === 0) {
          console.log("No tasks found.");
        } else {
          tasks.forEach((task) => {
            console.log(`
ID: ${task.id}
Title: ${task.title}
Category: ${task.category}
Completed: ${task.completed}
Created At: ${task.createdAt.toLocaleString()}
-------------------------
`);
          });
        }

        main(service);
        break;

      case "3":
        rl.question("Enter task ID: ", async (id) => {
          const success = await service.completeTask(Number(id));
          console.log(success ? "Task completed!" : "Task not found");
          main(service);
        });
        break;

      case "4":
        rl.question("Enter task ID: ", async (id) => {
          const success = await service.deleteTask(Number(id));
          console.log(success ? "Task deleted!" : "Task not found");
          main(service);
        });
        break;

      case "5":
        rl.question("Show completed? (true/false): ", (value) => {
          const tasks = service.filterTasks(value === "true");

          if (tasks.length === 0) {
            console.log("No matching tasks.");
          } else {
            tasks.forEach((task) => {
              console.log(`
ID: ${task.id}
Title: ${task.title}
Category: ${task.category}
Completed: ${task.completed}
Created At: ${task.createdAt.toLocaleString()}
-------------------------
`);
            });
          }

          main(service);
        });
        break;

      case "6":
        rl.question("Enter a number: ", (num) => {
          countDown(Number(num));
          main(service);
        });
        break;

      case "7":
        try {
          riskyFunction(-1);
        } catch (error) {
          console.log("Caught an error:", (error as Error).message);
        }
        main(service);
        break;

      case "8":
        console.log("Goodbye 👋");
        rl.close();
        break;

      default:
        console.log("Invalid option");
        main(service);
    }
  });
}

start();
