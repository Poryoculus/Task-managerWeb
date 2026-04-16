import { RequestHandler } from "express";
import { taskService } from "../services/TaskService";
import { countDown } from "../utils/recursion";
import { riskyFunction } from "../utils/errorDemo";

export const listTasks: RequestHandler = async (req, res) => {
  const tasks = taskService.getTasks();
  res.send(
    renderLayout(
      "Task List",
      `
      <div class="page-header">
        <h1>Tasks</h1>
        <a href="/tasks/new" class="btn btn-primary">Create New Task</a>
      </div>
      <div class="filter-bar">
        <a href="/" class="${!req.query.filter ? "active" : ""}">All</a>
        <a href="/?filter=pending" class="${req.query.filter === "pending" ? "active" : ""}">Pending</a>
        <a href="/?filter=done" class="${req.query.filter === "done" ? "active" : ""}">Completed</a>
      </div>
      ${renderTaskList(tasks, req.query.filter as string)}
      `,
    ),
  );
};

export const showNewForm: RequestHandler = async (req, res) => {
  res.send(
    renderLayout(
      "New task",
      `
      <h1>New task</h1>
      <form method="POST" action="/tasks" class="task-form">
        <label>Title
          <input type="text" name="title" placeholder="Enter task title..." required />
        </label>
        <label>Category
          <input type="text" name="category" placeholder="e.g. Work, Personal..." />
        </label>
        <div class="form-actions">
          <a href="/" class="btn btn-ghost">Cancel</a>
          <button type="submit" class="btn">Create task</button>
        </div>
      </form>
      `,
    ),
  );
};

export const createTask: RequestHandler = async (req, res) => {
  const { title, category } = req.body;
  if (title) {
    await taskService.createTask(title, category || "general");
  }
  res.redirect("/");
};

export const completeTask: RequestHandler = async (req, res) => {
  await taskService.completeTask(Number(req.params.id));
  res.redirect("/");
};

export const deleteTask: RequestHandler = async (req, res) => {
  await taskService.deleteTask(Number(req.params.id));
  res.redirect("/");
};

export const showStats: RequestHandler = async (req, res) => {
  const tasks = taskService.getTasks();
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const byCategory: Record<string, { total: number; done: number }> = {};
  tasks.forEach((t) => {
    if (!byCategory[t.category]) byCategory[t.category] = { total: 0, done: 0 };
    byCategory[t.category].total++;
    if (t.completed) byCategory[t.category].done++;
  });

  const categoryRows =
    Object.entries(byCategory)
      .map(
        ([cat, data]) => `
        <tr>
          <td>${cat}</td>
          <td>${data.total}</td>
          <td>${data.done}</td>
          <td>${data.total - data.done}</td>
        </tr>
      `,
      )
      .join("") || `<tr><td colspan="4">No tasks yet.</td></tr>`;

  const nums: number[] = [];
  function captureCountdown(n: number) {
    if (n <= 0) {
      nums.push(0);
      return;
    }
    nums.push(n);
    captureCountdown(n - 1);
  }
  captureCountdown(5);
  const countdownOutput = nums.join(" → ");

  let errorOutput = "";
  try {
    riskyFunction(-1);
  } catch (e) {
    errorOutput = (e as Error).message;
  }

  res.send(
    renderLayout(
      "Stats",
      `
      <h1>Statistics</h1>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-num">${total}</div><div class="stat-label">Total</div></div>
        <div class="stat-card"><div class="stat-num">${completed}</div><div class="stat-label">Completed</div></div>
        <div class="stat-card"><div class="stat-num">${pending}</div><div class="stat-label">Pending</div></div>
        <div class="stat-card"><div class="stat-num">${pct}%</div><div class="stat-label">Complete</div></div>
      </div>
      <h2>By category</h2>
      <table class="stats-table">
        <thead><tr><th>Category</th><th>Total</th><th>Done</th><th>Pending</th></tr></thead>
        <tbody>${categoryRows}</tbody>
      </table>
      <h2>Recursion demo</h2>
      <p class="demo-output">countDown(5): ${countdownOutput}</p>
      <h2>Error handling demo</h2>
      <p class="demo-output">riskyFunction(-1): caught — "${errorOutput}"</p>
      `,
    ),
  );
};

function renderTaskList(tasks: any[], filter?: string) {
  let filtered = tasks;
  if (filter === "pending") filtered = tasks.filter((t) => !t.completed);
  if (filter === "done") filtered = tasks.filter((t) => t.completed);
  if (filtered.length === 0) return `<p class="empty">No tasks found.</p>`;

  return `
    <table class="task-table">
      <thead><tr><th>#</th><th>Title</th><th>Category</th><th>Created</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${filtered
          .map(
            (t) => `
          <tr class="${t.completed ? "done" : ""}">
            <td>${t.id}</td>
            <td>${t.title}</td>
            <td><span class="badge">${t.category}</span></td>
            <td>${new Date(t.createdAt).toLocaleDateString()}</td>
            <td>${t.completed ? '<span class="status done">Done</span>' : '<span class="status pending">Pending</span>'}</td>
            <td class="actions">
              ${
                !t.completed
                  ? `
                <form method="POST" action="/tasks/${t.id}/complete" style="display:inline">
                  <button class="btn btn-sm btn-success">Complete</button>
                </form>`
                  : ""
              }
              <form method="POST" action="/tasks/${t.id}/delete" style="display:inline">
                <button class="btn btn-sm btn-danger">Delete</button>
              </form>
            </td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderLayout(title: string, content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Task Manager</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <nav>
    <a href="/" class="nav-brand">Task Manager</a>
    <div class="nav-links">
      <a href="/">Tasks</a>
      <a href="/tasks/new">New task</a>
      <a href="/stats">Stats</a>
    </div>
  </nav>
  <main>${content}</main>
</body>
</html>`;
}
