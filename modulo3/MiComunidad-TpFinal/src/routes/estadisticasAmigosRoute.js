import express from 'express';
import { EstadisticasAmigosService } from '../services/estadisticasAmigosService.js';

const router = express.Router();
const estadisticasService = new EstadisticasAmigosService();

// GET /api/estadisticas-amigos/spammers/:limite
router.get("/spammers/:limite", (req, res) => {
    estadisticasService.obtenerUsuariosSpammers(req, res);
});

// GET /api/estadisticas-amigos/callados/:limite
router.get("/callados/:limite", (req, res) => {
    estadisticasService.obtenerUsuariosCallados(req, res);
});

// GET /api/estadisticas-amigos/rechazados
router.get("/rechazados", (req, res) => {
    estadisticasService.obtenerUsuariosRechazados(req, res);
});

export { router as estadisticasAmigosRoute };