import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Utiliza prisma para interactuar con la base de datos

// Cierra la conexión cuando tu aplicación se cierre
process.on('SIGINT', async () => {
await prisma.$disconnect();
process.exit(0);
});