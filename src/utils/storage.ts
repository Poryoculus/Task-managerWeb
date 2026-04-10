import fs from "fs/promises";

const FILE_PATH = "./tasks.json";

export async function loadTasks() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const tasks = JSON.parse(data);

    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: any) {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}
