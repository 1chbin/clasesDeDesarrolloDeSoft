import express from 'express';
import { usuariosRoute } from './routes/usuariosRoute.js';

const app = express();

app.use(express.json());

app.use('/api/usuarios', usuariosRoute);

// 404
app.use((req, res) => {
    res.status(404).json({ success:false, message: 'Ruta no encontrada' });
});

// Middleware de error global
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.status || 500;
    res.status(status).json({ success:false, status, message: err.message, details: err.details });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Servidor levantado y listo para atender request en puerto ${PORT}`);
});