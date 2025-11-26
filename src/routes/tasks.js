// tasks.js
import express from 'express';
import { getAllTasks } from '../controllers/tasks.controller.js';

const router = express.Router();

router.get('/tasks', getAllTasks);

export default router;