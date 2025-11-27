// tasks.controller.js
import { prisma } from '../prismaClient.js';

// GET: obtener todas las tareas del usuario autenticado
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.tasks.findMany({
            where: {
                userId: req.user.id
            }
        });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST: crear tarea
export const CreateTasks = async (req, res) => {
    try {
        const { title } = req.body;

        const task = await prisma.tasks.create({
            data: {
                title,
                userId: req.user.id   // ← userId desde Passport
            }
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Error creando tarea" });
    }
};

// PUT: actualizar tarea del usuario autenticado
export const updateTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        // Verificar que la tarea pertenece al usuario
        const task = await prisma.tasks.findUnique({
            where: { id: Number(id) },
        });

        if (!task || task.userId !== req.user.id) {
            return res.status(403).json({ error: "No autorizado" });
        }

        const updatedTask = await prisma.tasks.update({
            where: { id: Number(id) },
            data: { title }
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando tarea" });
    }
};

// DELETE: eliminar tarea del usuario autenticado
export const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await prisma.tasks.findUnique({
            where: { id: Number(id) }
        });

        if (!task || task.userId !== req.user.id) {
            return res.status(403).json({ error: "No autorizado" });
        }

        await prisma.tasks.delete({
            where: { id: Number(id) }
        });

        res.json({ message: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando tarea" });
    }
};
