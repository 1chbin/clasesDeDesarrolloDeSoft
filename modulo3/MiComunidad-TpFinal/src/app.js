import express from 'express';
import { usuariosRoute } from './routes/usuariosRoute.js';
import { solicitudAmistadRoute } from './routes/solicitudAmistadRoute.js';
import { postRoute } from './routes/postRoute.js';
import { estadisticasAmigosRoute } from './routes/estadisticasAmigosRoute.js';
import { estadisticasPostsRoute } from './routes/estadisticasPostsRoute.js';

const app = express();

app.use(express.json());

// Rutas principales
app.use("/api/usuarios", usuariosRoute);
app.use("/api/solicitudes-de-amistad", solicitudAmistadRoute);
app.use("/api/posts", postRoute);

// Rutas de estadísticas
app.use("/api/estadisticas-amigos", estadisticasAmigosRoute);
app.use("/api/estadisticas-posts", estadisticasPostsRoute);

app.listen(3000, ()=> {
    console.log("Servidor levantado y listo para atender request")
})