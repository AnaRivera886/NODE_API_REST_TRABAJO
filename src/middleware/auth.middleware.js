import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No autorizado. Token faltante." });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adjuntar usuario a la request
        req.user = { id: decoded.sub };

        next(); // continuar
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado." });
    }
};
