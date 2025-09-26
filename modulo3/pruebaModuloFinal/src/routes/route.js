import express from 'express';
import { service } from '../app.js';

const router = express.Router();

router.get("/tarea", (req, res) => {
    service.obtenerTareas(req, res);    
});

router.get("/tarea/filtros", (req,res) => {
    service.filtrarTareas(req, res);
});

router.post("/tarea", (req, res) => {
    service.agregarTarea(req, res);    
});

router.put('/tarea/completar/:id', (req, res) => {
    service.completarTarea(req, res);
})



export { router as route };
