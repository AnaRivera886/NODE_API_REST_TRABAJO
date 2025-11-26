import express from "express";
import tasksRoutes from "./routes/tasks.js";

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api", tasksRoutes);

// Servidor
app.listen(3000, () => { 
    console.log("Servidor corriendo en http://localhost:3000");
});
