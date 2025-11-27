// tasks.js
import express from 'express';
import { getAllTasks,CreateTasks,updateTasks,deleteTasks } from '../controllers/tasks.controller.js';
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // Aplicar middleware de autenticación a todas las rutas

router.get('/tasks', getAllTasks);
router.post('/tasks', CreateTasks);
router.put('/tasks/:id', updateTasks);
router.delete('/tasks/:id', deleteTasks);

export default router;

