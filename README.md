# API enComunidad

Una API REST para gestionar usuarios y solicitudes de amistad construida con Express.js.

## Instalación y Ejecución

```bash
npm install
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints de la API

### Usuarios

#### 1. Obtener todos los usuarios
- **GET** `/usuarios`
- **Descripción**: Obtiene todos los usuarios registrados
- **Respuesta**: Array de usuarios

#### 2. Obtener usuario por ID
- **GET** `/usuarios?id={id}`
- **Descripción**: Obtiene un usuario específico por su ID
- **Parámetros**: 
  - `id` (query): ID del usuario
- **Respuesta**: Objeto usuario o error 404

#### 3. Crear nuevo usuario
- **POST** `/usuarios`
- **Descripción**: Crea un nuevo usuario
- **Body** (JSON):
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "fechaNacimiento": "1990-01-01",
  "biografia": "Mi biografía",
  "provincia": "Buenos Aires",
  "localidad": "CABA"
}
```
- **Respuesta**: "Usuario creado" (201) o error (400)

#### 4. Editar usuario
- **PUT** `/usuarios?id={id}`
- **Descripción**: Edita un usuario existente
- **Parámetros**: 
  - `id` (query): ID del usuario
- **Body** (JSON): Campos a editar
- **Respuesta**: "Usuario editado" (200) o error (404)

#### 5. Eliminar usuario
- **DELETE** `/usuarios?id={id}`
- **Descripción**: Elimina un usuario
- **Parámetros**: 
  - `id` (query): ID del usuario
- **Respuesta**: "Usuario eliminado" (200) o error (404)

#### 6. Agregar gustos musicales
- **POST** `/usuarios/gustos?id={id}`
- **Descripción**: Agrega gustos musicales a un usuario
- **Parámetros**: 
  - `id` (query): ID del usuario
- **Body** (JSON):
```json
{
  "gustosMusicales": ["rock", "pop", "jazz"]
}
```

#### 7. Obtener gustos musicales
- **GET** `/usuarios/gustos?id={id}`
- **Descripción**: Obtiene los gustos musicales de un usuario
- **Parámetros**: 
  - `id` (query): ID del usuario

### Estadísticas de Usuarios

#### 8. Usuarios por género musical
- **GET** `/usuarios/stats/genero/{genero}`
- **Descripción**: Cantidad de usuarios que comparten un género musical
- **Parámetros**: 
  - `genero` (path): Género musical

#### 9. Usuarios por provincia
- **GET** `/usuarios/stats/provincia/{provincia}`
- **Descripción**: Cantidad de usuarios en una provincia
- **Parámetros**: 
  - `provincia` (path): Nombre de la provincia

#### 10. Usuarios por localidad
- **GET** `/usuarios/stats/localidad/{localidad}`
- **Descripción**: Cantidad de usuarios en una localidad
- **Parámetros**: 
  - `localidad` (path): Nombre de la localidad

#### 11. Usuarios mayores de cierta edad
- **GET** `/usuarios/stats/mayores/{edad}`
- **Descripción**: Cantidad de usuarios mayores a cierta edad
- **Parámetros**: 
  - `edad` (path): Edad mínima

### Amigos y Solicitudes

#### 12. Crear solicitud de amistad
- **POST** `/amigos/solicitudes-amistad`
- **Descripción**: Crea una nueva solicitud de amistad
- **Body** (JSON):
```json
{
  "idSolicitante": 1,
  "idSolicitado": 2
}
```

#### 13. Responder solicitud de amistad
- **PUT** `/amigos/solicitudes-amistad/{id}`
- **Descripción**: Acepta o rechaza una solicitud de amistad
- **Parámetros**: 
  - `id` (path): ID del usuario que recibe la solicitud
- **Body** (JSON):
```json
{
  "idSolicitante": 1,
  "aceptar": true
}
```

#### 14. Obtener amigos
- **GET** `/amigos/{id}/amigos`
- **Descripción**: Obtiene la lista de amigos de un usuario
- **Parámetros**: 
  - `id` (path): ID del usuario

#### 15. Obtener falsos amigos
- **GET** `/amigos/{id}/falsos-amigos`
- **Descripción**: Obtiene la lista de usuarios que rechazaron solicitudes
- **Parámetros**: 
  - `id` (path): ID del usuario

#### 16. Obtener solicitudes enviadas
- **GET** `/amigos/{id}/amigos-pendientes`
- **Descripción**: Obtiene las solicitudes de amistad enviadas pendientes
- **Parámetros**: 
  - `id` (path): ID del usuario

#### 17. Obtener solicitudes recibidas
- **GET** `/amigos/{id}/solicitudes-de-amistad`
- **Descripción**: Obtiene las solicitudes de amistad recibidas
- **Parámetros**: 
  - `id` (path): ID del usuario

### Estadísticas de Amigos

#### 18. Usuarios spammers
- **GET** `/amigos/stats/spammers/{cantidad}`
- **Descripción**: Usuarios que enviaron más solicitudes que el límite
- **Parámetros**: 
  - `cantidad` (path): Número máximo de solicitudes

#### 19. Usuarios callados
- **GET** `/amigos/stats/callados/{amigos}`
- **Descripción**: Usuarios con más amigos que el límite especificado
- **Parámetros**: 
  - `amigos` (path): Número mínimo de amigos

#### 20. Usuarios más rechazados
- **GET** `/amigos/stats/mas-rechazados`
- **Descripción**: Top 3 usuarios con más rechazos

## Ejemplos de uso con Postman

### 1. Crear un usuario
```
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Ana",
  "apellido": "García",
  "email": "ana@example.com",
  "fechaNacimiento": "1995-03-15",
  "biografia": "Me gusta la música y los libros",
  "provincia": "Córdoba",
  "localidad": "Córdoba Capital"
}
```

### 2. Crear otro usuario
```
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Carlos",
  "apellido": "López",
  "email": "carlos@example.com",
  "fechaNacimiento": "1988-07-20",
  "biografia": "Desarrollador y amante del rock",
  "provincia": "Buenos Aires",
  "localidad": "La Plata"
}
```

### 3. Agregar gustos musicales
```
POST http://localhost:3000/usuarios/gustos?id=1
Content-Type: application/json

{
  "gustosMusicales": ["pop", "rock", "indie"]
}
```

### 4. Crear solicitud de amistad
```
POST http://localhost:3000/amigos/solicitudes-amistad
Content-Type: application/json

{
  "idSolicitante": 1,
  "idSolicitado": 2
}
```

### 5. Aceptar solicitud de amistad
```
PUT http://localhost:3000/amigos/solicitudes-amistad/2
Content-Type: application/json

{
  "idSolicitante": 1,
  "aceptar": true
}
```

### 6. Obtener amigos de un usuario
```
GET http://localhost:3000/amigos/1/amigos
```

### 7. Obtener estadísticas
```
GET http://localhost:3000/usuarios/stats/genero/rock
GET http://localhost:3000/usuarios/stats/provincia/Buenos Aires
GET http://localhost:3000/amigos/stats/mas-rechazados
```

## Códigos de Estado

- **200**: OK - Solicitud exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Error en los datos enviados
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error del servidor

## Notas

- Todos los endpoints que requieren un ID esperan un número entero
- Los IDs se asignan automáticamente al crear usuarios
- Las fechas deben estar en formato ISO (YYYY-MM-DD)
- La biografía tiene un límite de 500 caracteres
- No se pueden enviar solicitudes de amistad a uno mismo
- No se pueden duplicar solicitudes de amistad