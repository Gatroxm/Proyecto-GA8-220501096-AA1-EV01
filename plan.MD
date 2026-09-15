# PROMPT MAESTRO — GA8-220501096-AA1-EV01
# GatroxM.dev — Integración de módulos de software

Actúa como un arquitecto de software senior, desarrollador Full Stack especializado en Angular, Node.js, Express, MongoDB y Mongoose, y además como asesor técnico para evidencias del SENA ADSO.

Estoy desarrollando la evidencia:

GA8-220501096-AA1-EV01
"Desarrollar software a partir de la integración de sus módulos componentes."

Programa:
Análisis y desarrollo de software — ADSO

Proyecto formativo:
Construcción de software integrador de tecnologías orientadas a servicios.

Resultado de aprendizaje:
220501096-04 — Codificar el software de acuerdo con el diseño establecido.

Actividad:
GA8-220501096-AA1 — Integrar módulos, de acuerdo con el diseño establecido.

Criterio principal de evaluación:
"Integra los módulos del software de acuerdo con los propósitos del sistema."

Criterios específicos:

1. Codifica los módulos, de acuerdo con los requerimientos del sistema en el lenguaje seleccionado.
2. Aplica buenas prácticas de codificación.
3. Maneja de manera adecuada el IDE de desarrollo.
4. Aplica el control de versiones del código escrito.
5. Aplica pruebas unitarias.

==================================================
1. REGLA PRINCIPAL — ANALIZA ANTES DE MODIFICAR
==================================================

ANTES DE CREAR, MODIFICAR O ELIMINAR CUALQUIER ARCHIVO:

1. Analiza completamente el repositorio actual.
2. Identifica qué proyecto existe actualmente.
3. Identifica frontend, backend, API, modelos, rutas, servicios, componentes y configuración.
4. Identifica qué funcionalidades ya están implementadas.
5. Identifica qué tecnologías se están utilizando actualmente.
6. Identifica qué partes pueden reutilizarse.
7. Identifica qué partes hacen falta para cumplir GA8-220501096-AA1-EV01.
8. NO borres funcionalidades existentes sin una razón técnica.
9. NO reemplaces un proyecto funcional por uno completamente nuevo.
10. NO inventes endpoints, entidades, campos o funcionalidades si ya existen en el proyecto.
11. Si falta una funcionalidad necesaria, intégrala respetando la arquitectura existente.
12. Si encuentras inconsistencias, primero analízalas y elige la solución menos invasiva.

Al finalizar este análisis, muestra primero un resumen de:

- Arquitectura actual.
- Frontend actual.
- Backend actual.
- Base de datos actual.
- API actual.
- Módulos existentes.
- Funcionalidades existentes.
- Qué falta para cumplir la evidencia.
- Qué archivos propones crear/modificar.

NO empieces a modificar archivos hasta terminar este análisis.

==================================================
2. IDENTIDAD DEL PROYECTO
==================================================

La marca del proyecto es:

GatroxM.dev

Tagline:

"Building Smart Software for the Future"

Mantén esta identidad visual y conceptual en el frontend.

NO conviertas el proyecto automáticamente en "Gestión de Empleados".

El ejemplo de SENA utiliza empleados únicamente como referencia.

La aplicación debe estar basada en el proyecto real existente.

Si el proyecto actual tiene un dominio funcional diferente, conserva ese dominio.

==================================================
3. OBJETIVO TÉCNICO
==================================================

El objetivo es conseguir una arquitectura integrada:

Angular
    ↓
HTTP / REST
    ↓
Node.js + Express
    ↓
Mongoose
    ↓
MongoDB

Debe existir comunicación REAL entre frontend y backend.

NO utilizar datos JSON estáticos para simular la API cuando el backend real esté disponible.

NO crear mocks innecesarios.

El frontend debe consumir los endpoints reales del backend.

==================================================
4. TECNOLOGÍAS REQUERIDAS
==================================================

Frontend:

- Angular
- TypeScript
- Angular HttpClient
- Angular Router cuando sea necesario
- HTML
- CSS/SCSS
- Bootstrap o Materialize si ya existe una de estas tecnologías en el proyecto
- Componentes reutilizables

Backend:

- Node.js
- Express.js
- Mongoose
- MongoDB
- CORS
- Morgan si ya se utiliza o resulta apropiado
- Nodemon para desarrollo
- dotenv

Testing:

- Framework de pruebas compatible con el proyecto
- Pruebas unitarias reales

Control de versiones:

- Git
- GitHub

Herramienta de pruebas API:

- Postman

IMPORTANTE:

Si el proyecto ya utiliza versiones específicas de Angular, Node o paquetes, respétalas siempre que sean compatibles.

NO actualices masivamente dependencias solamente por actualizar.

Evita generar conflictos de versiones.

==================================================
5. ARQUITECTURA DEL BACKEND
==================================================

Organiza el backend aplicando separación de responsabilidades.

La estructura debe aproximarse a:

backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── utils/
│   └── app.js / app.ts
├── tests/
├── .env
├── .env.example
├── package.json
└── README.md

Adapta esta estructura al lenguaje real del backend.

No crees carpetas innecesarias.

Responsabilidades:

ROUTES
- Definen endpoints.

CONTROLLERS
- Reciben solicitudes.
- Validan entrada básica.
- Delegan lógica al service.
- Devuelven respuestas HTTP.

SERVICES
- Contienen lógica de negocio.
- No deben depender directamente de Express cuando no sea necesario.

MODELS
- Definen esquemas Mongoose.

MIDDLEWARES
- Manejo de errores.
- CORS.
- Validaciones cuando corresponda.

CONFIG
- Conexión a MongoDB.
- Variables de entorno.

==================================================
6. API REST
==================================================

Analiza primero los endpoints existentes.

NO inventes endpoints si ya existen.

Si falta CRUD para la entidad principal del proyecto, implementa:

GET
POST
GET por ID
PUT o PATCH
DELETE

Las respuestas deben ser consistentes.

Ejemplo conceptual:

GET /api/recurso

POST /api/recurso

GET /api/recurso/:id

PUT /api/recurso/:id

DELETE /api/recurso/:id

PERO:

Utiliza el nombre real de las entidades del proyecto.

No copies literalmente "recurso".

Implementa:

- códigos HTTP apropiados;
- manejo de errores;
- validaciones;
- respuestas JSON;
- mensajes claros;
- manejo de registros inexistentes.

==================================================
7. BASE DE DATOS
==================================================

Utiliza MongoDB mediante Mongoose.

Analiza primero las entidades existentes.

No cambies el modelo de datos innecesariamente.

Verifica:

- conexión;
- modelos;
- esquemas;
- tipos de datos;
- validaciones;
- índices si son necesarios;
- operaciones CRUD.

Las operaciones del frontend deben terminar realmente persistiendo en MongoDB.

IMPORTANTE:

No quiero una aplicación donde:

Angular
    ↓
guarde datos solamente en memoria.

Quiero:

Angular
    ↓
API REST
    ↓
Mongoose
    ↓
MongoDB

==================================================
8. FRONTEND ANGULAR
==================================================

Construye o adapta el frontend Angular existente.

El frontend debe estar organizado por componentes.

Estructura aproximada:

frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── models/
│   │   ├── shared/
│   │   └── ...
│   └── ...
├── package.json
└── README.md

Adapta la estructura al proyecto existente.

==================================================
9. SERVICIOS ANGULAR
==================================================

Toda comunicación con el backend debe centralizarse mediante servicios Angular.

Ejemplo conceptual:

src/app/services/

Crear servicios específicos según las entidades reales.

No colocar llamadas HTTP directamente en todos los componentes.

Utilizar:

HttpClient

Los servicios deben encargarse de:

- GET
- POST
- PUT/PATCH
- DELETE

cuando corresponda.

==================================================
10. CONFIGURACIÓN DE API
==================================================

No colocar URLs del backend repetidas por todo el código.

Utiliza configuración centralizada.

Por ejemplo:

environment.ts

environment.development.ts

o el mecanismo apropiado para la versión de Angular utilizada.

Ejemplo conceptual:

apiUrl = 'http://localhost:3000/api';

Pero adapta el puerto y URL al backend real.

==================================================
11. CRUD REAL DESDE ANGULAR
==================================================

Debe ser posible demostrar desde Angular:

1. Crear registro.
2. Consultar registros.
3. Consultar un registro.
4. Editar registro.
5. Eliminar registro.

El flujo debe ser:

USUARIO
 ↓
ANGULAR COMPONENT
 ↓
ANGULAR SERVICE
 ↓
HTTP
 ↓
EXPRESS ROUTE
 ↓
CONTROLLER
 ↓
SERVICE
 ↓
MONGOOSE
 ↓
MONGODB

Y la respuesta debe regresar:

MongoDB
 ↓
Mongoose
 ↓
Express
 ↓
HTTP
 ↓
Angular Service
 ↓
Component
 ↓
INTERFAZ

Esto es fundamental para demostrar la integración solicitada por SENA.

==================================================
12. ESTADOS DE LA INTERFAZ
==================================================

Los componentes deben manejar como mínimo:

- loading;
- error;
- empty state;
- success.

Ejemplo:

Mientras carga:

"Cargando información..."

Si ocurre error:

"No fue posible obtener la información."

Si no hay registros:

"No hay registros disponibles."

Después de guardar:

"Registro creado correctamente."

No utilizar alertas innecesarias si puede utilizarse una solución visual mejor.

==================================================
13. DISEÑO
==================================================

Mantén el branding:

GatroxM.dev

"Building Smart Software for the Future"

La interfaz debe verse profesional.

Debe ser:

- responsive;
- limpia;
- consistente;
- usable;
- organizada.

No conviertas el frontend en una interfaz genérica de tutorial.

Respeta los estilos que ya existan.

Si ya existe una línea visual, reutilízala.

==================================================
14. COMPONENTES REUTILIZABLES
==================================================

Evita duplicar código.

Identifica componentes reutilizables como:

- navbar;
- sidebar;
- botones;
- tablas;
- formularios;
- modales;
- mensajes;
- loaders;
- tarjetas.

No crear componentes innecesarios.

La reutilización debe aportar valor real.

==================================================
15. VALIDACIONES
==================================================

Implementa validaciones tanto donde sea apropiado en frontend como en backend.

Frontend:

- campos obligatorios;
- formatos;
- longitud;
- mensajes de validación.

Backend:

- validar datos recibidos;
- validar existencia de registros;
- manejar errores de MongoDB;
- evitar datos inválidos.

Nunca confiar únicamente en las validaciones del frontend.

==================================================
16. MANEJO DE ERRORES
==================================================

Implementa manejo de errores centralizado en backend cuando sea apropiado.

Evita:

try/catch duplicados innecesariamente.

Los errores deben devolver respuestas HTTP claras.

Ejemplo conceptual:

{
  "success": false,
  "message": "Registro no encontrado"
}

Adapta la estructura al estilo actual del proyecto.

==================================================
17. CORS
==================================================

Como Angular y Node pueden ejecutarse en diferentes puertos durante desarrollo:

Configura CORS correctamente.

No desactives seguridad innecesariamente.

Permite únicamente los orígenes necesarios para desarrollo.

Documenta la configuración.

==================================================
18. VARIABLES DE ENTORNO
==================================================

Nunca dejar credenciales sensibles directamente en Git.

Utilizar:

.env

y proporcionar:

.env.example

Ejemplo conceptual:

MONGODB_URI=
PORT=
NODE_ENV=

NO colocar contraseñas reales en:

- código;
- README;
- commits;
- frontend.

Asegúrate de que .env esté en .gitignore.

==================================================
19. PRUEBAS UNITARIAS
==================================================

ESTE PUNTO ES OBLIGATORIO.

La evidencia exige:

"Aplica pruebas unitarias."

Por lo tanto, crea pruebas unitarias REALES.

No crear archivos de prueba vacíos solamente para cumplir.

Analiza la lógica del proyecto y prueba funcionalidades importantes.

Como mínimo cubrir:

- validación;
- lógica de negocio;
- servicio principal;
- casos exitosos;
- casos de error.

Si es posible, utiliza mocks para evitar depender de MongoDB real en las pruebas unitarias.

Diferenciar claramente:

PRUEBA UNITARIA
de
PRUEBA DE API / INTEGRACIÓN.

Las pruebas unitarias deben poder ejecutarse con un comando.

Ejemplo:

npm test

o el comando correspondiente.

Al finalizar, debe ser posible mostrar:

Tests passed.

==================================================
20. POSTMAN
==================================================

Aunque Angular consuma la API, prepara la API para ser demostrada también mediante Postman.

Documenta los endpoints principales.

Debemos poder demostrar:

POST
GET
GET BY ID
PUT/PATCH
DELETE

con la entidad principal.

NO crear datos falsos desconectados del sistema.

Las operaciones realizadas en Postman deben afectar realmente MongoDB.

==================================================
21. GIT Y GITHUB
==================================================

El proyecto debe estar preparado para control de versiones.

Verifica:

.gitignore

README.md

No incluir:

node_modules/
.env
archivos temporales
builds innecesarios

El proyecto debe poder clonarse e instalarse.

Revisa el estado Git:

git status

Revisa historial:

git log --oneline

Si el repositorio ya tiene historial, NO lo destruyas.

NO hagas git reset destructivo.

NO elimines commits.

==================================================
22. README
==================================================

Crear o actualizar README.md con:

# GatroxM.dev

Descripción del proyecto.

## Tecnologías

Frontend:
- Angular
- TypeScript

Backend:
- Node.js
- Express
- Mongoose

Database:
- MongoDB

Testing:
- framework utilizado

## Arquitectura

Explicar:

Angular
↓
REST API
↓
Express
↓
Mongoose
↓
MongoDB

## Requisitos

Node.js
MongoDB
Angular CLI si aplica

## Instalación

Backend:

npm install

Frontend:

npm install

## Variables de entorno

Explicar .env.example.

## Ejecución

Backend:

comando real del proyecto.

Frontend:

ng serve

o el comando correspondiente.

## Testing

Comando real para ejecutar las pruebas.

## API

Documentar endpoints reales.

## Git

Explicar que el proyecto utiliza Git/GitHub.

==================================================
23. NO HACER
==================================================

NO:

- borrar el proyecto existente;
- cambiar completamente la arquitectura sin analizar;
- inventar endpoints;
- inventar entidades;
- inventar datos;
- utilizar JSON estático cuando existe API real;
- colocar credenciales en código;
- agregar dependencias innecesarias;
- actualizar todas las dependencias sin necesidad;
- romper funcionalidades existentes;
- crear código duplicado;
- dejar errores de TypeScript;
- dejar errores de compilación;
- crear pruebas falsas;
- crear documentación que no coincida con el código;
- generar funcionalidades que no tengan relación con el proyecto.

==================================================
24. VERIFICACIÓN FINAL
==================================================

Después de implementar los cambios:

1. Instala dependencias.
2. Verifica backend.
3. Verifica frontend.
4. Verifica conexión MongoDB.
5. Ejecuta pruebas unitarias.
6. Ejecuta la API.
7. Ejecuta Angular.
8. Comprueba comunicación Angular → API.
9. Comprueba CRUD completo.
10. Comprueba persistencia en MongoDB.
11. Comprueba errores y validaciones.
12. Comprueba Git.
13. Comprueba README.

Debes corregir errores que encuentres.

No declares terminado un proyecto que no compile.

==================================================
25. PRUEBA COMPLETA DE INTEGRACIÓN
==================================================

Realiza una prueba completa siguiendo este flujo:

1. Iniciar MongoDB.
2. Iniciar backend.
3. Iniciar Angular.
4. Abrir frontend.
5. Crear registro desde Angular.
6. Verificar respuesta de API.
7. Verificar registro en MongoDB.
8. Consultar registro desde Angular.
9. Modificar registro desde Angular.
10. Verificar modificación en MongoDB.
11. Eliminar registro desde Angular.
12. Verificar eliminación en MongoDB.
13. Ejecutar pruebas unitarias.
14. Probar endpoints con Postman.

==================================================
26. PREPARACIÓN PARA VIDEO SENA
==================================================

Deja el proyecto preparado para una sustentación de 8 a 12 minutos.

Durante la sustentación se debe poder mostrar:

1. Presentación de GatroxM.dev.
2. Arquitectura.
3. Estructura del proyecto.
4. Backend.
5. API REST.
6. Angular.
7. Comunicación Angular → API.
8. CRUD.
9. MongoDB.
10. Pruebas unitarias.
11. Git/GitHub.

No crear un video.

Únicamente deja el proyecto preparado para que posteriormente pueda grabarse.

==================================================
27. RESULTADO FINAL ESPERADO
==================================================

Al terminar quiero tener un sistema funcional donde:

Angular
    ↓
consume API REST
    ↓
Node.js / Express
    ↓
Mongoose
    ↓
MongoDB

Y donde además:

- los módulos estén separados;
- exista comunicación entre módulos;
- exista CRUD funcional;
- existan pruebas unitarias;
- exista manejo de errores;
- exista validación;
- exista control de versiones;
- exista documentación;
- exista una interfaz profesional;
- el proyecto pueda ejecutarse en tiempo real;
- todo esté basado en el proyecto real existente.

==================================================
28. INFORME FINAL DEL TRABAJO
==================================================

NO termines simplemente diciendo "listo".

Al finalizar, genera un informe técnico en la terminal con:

### 1. Arquitectura encontrada

### 2. Cambios realizados

### 3. Archivos creados

### 4. Archivos modificados

### 5. Módulos integrados

### 6. Endpoints disponibles

### 7. Entidades MongoDB

### 8. Pruebas unitarias creadas

### 9. Resultado de las pruebas

### 10. Comandos para ejecutar backend

### 11. Comandos para ejecutar frontend

### 12. Comando para ejecutar pruebas

### 13. Estado de Git

### 14. Pendientes

Si algo NO pudo implementarse, dilo claramente y explica por qué.

==================================================
29. ORDEN DE EJECUCIÓN
==================================================

IMPORTANTE:

Trabaja en este orden:

FASE 1
Analizar proyecto actual.

FASE 2
Presentar diagnóstico.

FASE 3
Definir arquitectura objetivo.

FASE 4
Implementar o corregir backend.

FASE 5
Implementar o corregir API REST.

FASE 6
Verificar MongoDB/Mongoose.

FASE 7
Implementar/adaptar Angular.

FASE 8
Conectar Angular con API real.

FASE 9
Implementar/verificar CRUD.

FASE 10
Implementar pruebas unitarias.

FASE 11
Verificar Git/GitHub.

FASE 12
Actualizar README.

FASE 13
Ejecutar pruebas completas.

FASE 14
Corregir errores.

FASE 15
Generar informe final.

==================================================
30. REGLA FINAL
==================================================

Piensa como un desarrollador senior y como evaluador SENA.

La prioridad no es generar mucho código.

La prioridad es que el proyecto:

FUNCIONE
+
ESTÉ INTEGRADO
+
ESTÉ ORGANIZADO
+
SEA DEMOSTRABLE
+
TENGA PRUEBAS
+
ESTÉ VERSIONADO
+
CUMPLA LA EVIDENCIA GA8-220501096-AA1-EV01.

No inventes información del proyecto.

Analiza primero.

Después implementa.

Después prueba.

Después corrige.

Después documenta.

Y finalmente indícame exactamente qué debo ejecutar y qué debo mostrar durante la sustentación.
🔥 Una recomendación antes de ejecutarlo

Como ya hemos trabajado anteriormente el backend Node/Express/Mongoose y también otros proyectos de SENA, yo no le daría permiso a OpenCode para crear un proyecto nuevo desde cero si ya estás parado dentro del repositorio que vamos a usar.

La primera respuesta que queremos de OpenCode debería ser algo parecido a:

ANÁLISIS DEL PROYECTO

Frontend:
Angular ...

Backend:
Node.js + Express ...

Base de datos:
MongoDB ...

API:
...

Módulos existentes:
...

Faltantes para GA8-220501096-AA1-EV01:
...

Plan de implementación:
...