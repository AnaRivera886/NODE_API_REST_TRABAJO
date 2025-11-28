import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

// ========================= REGISTER ==========================
export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashed },
        });

        res.status(201).json({ message: "Usuario registrado", id: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

// =========================== LOGIN ===========================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }

        // Buscar usuario
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar JWT
        const token = jwt.sign(
            {
                sub: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h", // exp
            }
        );

        res.json({
            message: "Login exitoso",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error del servidor" });
    }
};
