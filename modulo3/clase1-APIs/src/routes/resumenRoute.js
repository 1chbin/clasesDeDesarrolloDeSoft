import express from 'express';
import { resumenService } from '../services/resumenService.js';

const router = express.Router();
const service = new resumenService();

router.get('/', async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Debes enviar q como query param." });
    const resultado = await service.buscarMultimedia(q);
    res.json(resultado);
});

export { router as resumenRoute };
