import { Router } from "express";
import {
  listTasks,
  showNewForm,
  createTask,
  completeTask,
  deleteTask,
  showStats,
} from "../controllers/taskController";

const router = Router();

router.get("/", listTasks);
router.get("/tasks/new", showNewForm);
router.post("/tasks", createTask);
router.post("/tasks/:id/complete", completeTask);
router.post("/tasks/:id/delete", deleteTask);
router.get("/stats", showStats);

export default router;
