// tasks.controller.js
import { prisma } from '../prismaClient.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.tasks.findMany();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST: crear tarea
export const CreateTasks = async (req, res) => {
    try {
        const { title, userId } = req.body;
        const tasks = await prisma.tasks.create({
            data: { title, userId }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error creando tarea" });
    }
};

// PUT: actualizar tarea
export const updateTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const tasks = await prisma.tasks.update({
            where: { id: Number(id) },
            data: { title }
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando tarea" });
    }
};

// DELETE: eliminar tarea
export const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.tasks.delete({
            where: { id: Number(id) }
        });

        res.json({ message: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando tarea" });
    }
};