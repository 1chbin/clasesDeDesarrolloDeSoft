import express from 'express';
import { SolicitudAmistadService } from '../services/solicitudAmistadService.js';

const router = express.Router();
const solicitudAmistadService = new SolicitudAmistadService();

// POST /api/solicitudes-de-amistad
router.post("/", (req, res) => {
    solicitudAmistadService.crearSolicitudAmistad(req, res);
});

// PUT /api/solicitudes-de-amistad/:id
router.put("/:id", (req, res) => {
    solicitudAmistadService.responderSolicitudAmistad(req, res);
});

export { router as solicitudAmistadRoute };