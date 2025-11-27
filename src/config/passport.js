import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../prismaClient.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretkey123", // Usa la misma clave que en authMiddleware
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await prisma.users.findUnique({
                where: { id: jwt_payload.id }
            });

            if (!user) {
                return done(null, false);
            }

            return done(null, user); // user = req.user
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
