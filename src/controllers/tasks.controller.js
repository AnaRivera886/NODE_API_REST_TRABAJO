// tasks.controller.js
import { prisma } from "../prismaClient.js";

// GET: Obtener solo las tareas del usuario autenticado
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.id }
        });

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST: crear tarea asociada al usuario autenticado
export const CreateTasks = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: status || "pending",
                userId: req.user.id // 🔥 AHORA VIENE DEL TOKEN
            }
        });

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creando tarea" });
    }
};

// PUT: actualizar tarea SOLO si pertenece al usuario autenticado
export const updateTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await prisma.task.updateMany({
            where: {
                id: Number(id),
                userId: req.user.id
            },
            data: { title, description, status }
        });

        if (task.count === 0) {
            return res.status(404).json({ error: "Tarea no encontrada o no autorizada" });
        }

        res.json({ message: "Tarea actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error actualizando tarea" });
    }
};

// DELETE: eliminar solo si la tarea pertenece al usuario autenticado
export const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await prisma.task.deleteMany({
            where: {
                id: Number(id),
                userId: req.user.id
            }
        });

        if (task.count === 0) {
            return res.status(404).json({ error: "Tarea no encontrada o no autorizada" });
        }

        res.json({ message: "Tarea eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error eliminando tarea" });
    }
};
