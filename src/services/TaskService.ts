import { Task } from "../models/Task";
import { loadTasks, saveTasks } from "../utils/storage";

export class TaskService {
  private tasks: Task[] = [];
  private currentId: number = 1;

  async init(): Promise<void> {
    this.tasks = await loadTasks();

    this.currentId =
      this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
  }

  async createTask(title: string, category: string): Promise<Task> {
    const task: Task = {
      id: this.currentId++,
      title,
      completed: false,
      category,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    await saveTasks(this.tasks);

    return task;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  async completeTask(id: number): Promise<boolean> {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      return false;
    }

    task.completed = true;
    await saveTasks(this.tasks);

    return true;
  }

  async deleteTask(id: number): Promise<boolean> {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    await saveTasks(this.tasks);

    return true;
  }

  filterTasks(completed: boolean): Task[] {
    return this.tasks.filter((t) => t.completed === completed);
  }
}
