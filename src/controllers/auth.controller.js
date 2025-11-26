import bcrypt from "bcryptjs";
import prisma from "../prismaClient.js";

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar datos
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        // Generar hash de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};
