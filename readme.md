API REST – Node.js + Express + Prisma + JWT + Passport

Este proyecto es una API REST construida con Node.js, Express, Prisma ORM, PostgreSQL (Supabase), JWT, y Passport-JWT.
Incluye registro de usuarios, autenticación, protección de rutas, manejo de tareas y medidas de seguridad como rate-limit y CORS.

## 🚀 Características principales

Registro y login de usuarios con JWT.

CRUD de tareas asociado al usuario autenticado.

Middleware propio de autenticación con JWT.

Integración adicional con Passport JWT.

Rate limit configurado para evitar abuso.

CORS configurado para controlar acceso externo.

Prisma ORM conectado a Supabase.


## 📦 1. Cómo clonar e instalar el proyecto
--------------------------------------------------------------------------
    1. git clone <https://github.com/AnaRivera886/NODE_API_REST_TRABAJO.git>
    2. cd NODE_API_REST_TRABAJO
    3. npm install

--------------------------------------------------------------------------
## 🧩 2. Variables de entorno necesarias (.env)

Crea un archivo .env en la raíz con:
    DATABASE_URL="postgresql://<usuario>:<password>@<host>:<puerto>/<base>?schema=public"
    JWT_SECRET="clave-super-secreta"
    PORT=3000

--------------------------------------------------------------------------

## 🧱 3. Configuración de la base de datos (Prisma)
Aplicar migraciones:
    * npx prisma migrate dev

Generar cliente de Prisma:
    * npx prisma generate

--------------------------------------------------------------------------

## 🔐 4. Flujo de Seguridad del Proyecto
1️⃣ Registro (POST /auth/register)

El usuario envía email + contraseña.

La contraseña se encripta con bcrypt.

Se guarda en la base de datos.

2️⃣ Login (POST /auth/login)

El usuario envía email + contraseña.

Se verifica la contraseña.

Se genera un token JWT con el ID del usuario:

    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
    }

3️⃣ Uso del token

Para acceder a /tasks, el usuario debe enviar el token:

    Authorization: Bearer <token>

--------------------------------------------------------------------------

## 🛡 5. Protecciones implementadas
✔ Middleware personalizado de autenticación

Ubicación:
    src/middlewares/authMiddleware.js

        Hace:

            -Leer Authorization header.

            -Validar el token.

            -Agregar req.user = { id }.

--------------------------------------------------------------------------

✔ Passport JWT

Archivo:
    src/config/passport.js

    Hace:

        -Definir la estrategia JWT.

        -Extraer el token desde el header.

        -Consultar el usuario en la BD.

        -Rechazar acceso si no existe.

        -Se usa en rutas como:

router.use(passport.authenticate("jwt", { session: false }));

--------------------------------------------------------------------------

✔ Rate Limit

Archivo:
    src/middlewares/rateLimit.js

-Protege contra demasiadas solicitudes por minuto.

--------------------------------------------------------------------------

✔ CORS

Configurado en:

    src/app.js

-Permite solicitudes controladas desde otros dominios.

--------------------------------------------------------------------------

## 📝 6. Rutas principales

    🔑 Auth

| Método | Ruta             | Descripción   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Crear usuario |
| POST   | `/auth/login`    | Obtener token |


    🗂 Tasks (protegidas con JWT + Passport)

| Método | Ruta         | Descripción              |
| ------ | ------------ | ------------------------ |
| GET    | `/tasks`     | Lista tareas del usuario |
| POST   | `/tasks`     | Crea tarea               |
| PUT    | `/tasks/:id` | Edita tarea              |
| DELETE | `/tasks/:id` | Borra tarea              |

--------------------------------------------------------------------------

## 🧪 7. Cómo correr el proyecto

    npm run start

# El servidor iniciará en:
    -http://localhost:3000  
--------------------------------------------------------------------------

## 📌 8. Verificación Final 

    | ✔ | Requisito                                |
    | - | ---------------------------------------- |
    | ✔ | README con descripción                   |
    | ✔ | Pasos de instalación                     |
    | ✔ | Migraciones y Prisma                     |
    | ✔ | Variables .env                           |
    | ✔ | Explicación de seguridad (JWT, Passport) |
    | ✔ | Rate-limit                               |
    | ✔ | CORS                                     |
    | ✔ | `.env` NO está subido                    |
    | ✔ | Proyecto inicia sin errores              |





## AUTORES:

    ANA SOFIA RIVERA PIMIENTA (A)
    JEFFERSON BLANDON GOMEZ (B)