// tasks.js
import express from 'express';
import { getAllTasks } from '../controllers/tasks.controller.js';

const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', CreateTasks);
router.put('/tasks/:id', updateTasks);
router.delete('/tasks/:id', deleteTasks);

export default router;