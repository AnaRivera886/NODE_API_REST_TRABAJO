import express from "express";
import tasksRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/tasks", tasksRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
