import express from 'express';
import { usuariosRoute } from './routes/usuariosRoute.js';

const app = express();

app.use(express.json());

app.use("/api/usuarios", usuariosRoute);

app.listen(3000, ()=> {
    console.log("Servidor levantado y listo para atender request")
})