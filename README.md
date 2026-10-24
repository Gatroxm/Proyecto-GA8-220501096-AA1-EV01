# GatroxM.dev

**"Building Smart Software for the Future"**

Aplicación full stack que integra módulos de software: un dashboard, un portafolio de proyectos de software y un catálogo de tecnologías, con comunicación real entre el frontend Angular y una API REST construida con Node.js, Express y MongoDB.

Evidencia **GA8-220501096-AA1-EV01** — "Desarrollar software a partir de la integración de sus módulos componentes" (SENA ADSO).

## Tecnologías

**Frontend**
- Angular 22 (standalone, signals)
- TypeScript
- Angular HttpClient y Router
- HTML / SCSS

**Backend**
- Node.js
- Express.js
- Mongoose
- MongoDB
- CORS
- Morgan + Nodemon + dotenv

**Testing**
- Backend: Jest con mocks de Mongoose (15 pruebas unitarias)
- Frontend: Angular Vitest (Karma-less) + HttpTestingController

## Arquitectura

```
Angular (frontend, puerto 4200)
    ↓ HTTP / REST
API REST Express (puerto 3000)
    ↓
Mongoose
    ↓
MongoDB
```

Separación de responsabilidades en el backend:

```
backend/src/
├── config/      Conexión a MongoDB y variables de entorno
├── controllers/ Reciben peticiones y responden HTTP
├── models/      Esquemas Mongoose
├── routes/      Definición de endpoints
├── services/    Lógica de negocio
├── middlewares/ Manejo de errores y CORS
└── utils/       Utilidades (validadores, async handler)
```

## Requisitos

- Node.js 20+
- MongoDB corriendo de forma local (o una URI de MongoDB Atlas)
- Angular CLI (opcional, se puede usar `npx`)

## Instalación

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

## Variables de entorno

Copie `backend/.env.example` a `backend/.env` y ajuste los valores:

```env
MONGODB_URI=mongodb://localhost:27017/gatroxm
PORT=3000
NODE_ENV=development
```

El archivo `.env` NO se sube a Git. Contiene la configuración local del puerto y la conexión a la base de datos.

## Ejecución

**Backend** (terminal 1)

```bash
cd backend
npm run dev        # con nodemon
# o
npm start
```

**Frontend** (terminal 2)

```bash
cd frontend
npx ng serve
```

Luego abra http://localhost:4200 — el dashboard carga los datos reales desde la API.

## Testing

**Backend (Jest)**

```bash
cd backend
npm test
```

**Frontend (Vitest)**

```bash
cd frontend
npx ng test --watch=false
```

## API

Base URL: `http://localhost:3000/api`

### Proyectos

| Método | Endpoint                     | Descripción                           |
| ------ | ---------------------------- | ------------------------------------- |
| GET    | `/api/proyectos`             | Lista todos los proyectos             |
| POST   | `/api/proyectos`             | Crea un proyecto                      |
| GET    | `/api/proyectos/:id`         | Consulta un proyecto por ID           |
| PUT    | `/api/proyectos/:id`         | Actualiza un proyecto                 |
| DELETE | `/api/proyectos/:id`         | Elimina un proyecto                   |
| GET    | `/api/proyectos/resumen`     | Resumen del portafolio                |

### Tecnologías

| Método | Endpoint                     | Descripción                           |
| ------ | ---------------------------- | ------------------------------------- |
| GET    | `/api/tecnologias`           | Lista las tecnologías                 |
| POST   | `/api/tecnologias`           | Crea una tecnología                   |
| GET    | `/api/tecnologias/:id`       | Consulta una tecnología por ID        |
| PUT    | `/api/tecnologias/:id`       | Actualiza una tecnología              |
| DELETE | `/api/tecnologias/:id`       | Elimina una tecnología                |

Colección Postman disponible en `docs/postman/GatroxM.dev.postman_collection.json`.

## Git

El proyecto utiliza Git y GitHub para control de versiones. El repositorio se inicializa en la raíz del proyecto e incluye:

- `.gitignore` con `node_modules/`, `.env`, `dist/`, build y artefactos temporales
- README de documentación
- Historial de commits por fases de la evidencia

## Despliegue en Render

El proyecto se despliega en Render como dos servicios independientes:

| Servicio | Tipo | Root Directory | Build Command | Publish / Start |
| -------- | ---- | -------------- | ------------- | --------------- |
| `gatroxm-api` | Web Service (Node) | `backend` | `npm install` | `npm start` |
| `gatroxm-frontend` | Static Site | `frontend` | `npm install && npm run build` | `dist/frontend/browser` |

La base de datos se aloja en MongoDB Atlas (plan gratuito) porque Render no incluye MongoDB local.

### Variables de entorno del backend en Render

| Variable | Valor |
| -------- | ----- |
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas terminada en `/gatroxm` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | URL pública del frontend, por ejemplo `https://gatroxm-frontend.onrender.com` |

`PORT` lo asigna Render automáticamente. Las credenciales nunca se suben a Git: se configuran en el dashboard de Render.

### Consideraciones

- El frontend debe apuntar a la API desplegada en `frontend/src/environments/environment.ts` (`apiUrl`).
- En el Static Site se configura un rewrite de `/*` a `/index.html` para que funcione el enrutamiento de Angular.
- En el plan gratuito el Web Service se suspende tras 15 minutos sin tráfico; la primera petición puede tardar cerca de un minuto.
- Cada `git push` a `main` dispara un nuevo despliegue de ambos servicios.

Alternativamente, el archivo `render.yaml` de la raíz define ambos servicios y permite crearlos juntos con **New + → Blueprint**.

## Entidades MongoDB

- **Proyecto**: nombre, descripción, cliente, estado, presupuesto, fechas y tecnologías asociadas.
- **Tecnología**: nombre, categoría, versión y descripción.