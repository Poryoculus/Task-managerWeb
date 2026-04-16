import express from "express";
import path from "path";
import taskRoutes from "./routes/taskRoutes";
import { taskService } from "./services/TaskService";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", taskRoutes);

// Initialize service and start server
taskService.init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
