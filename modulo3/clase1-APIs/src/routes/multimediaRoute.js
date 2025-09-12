import express from 'express';
import { multimediaService } from '../services/multimediaService.js';

const router = express.Router();
const service = new multimediaService();

router.get('/', async (req, res) => {
	const { titulo } = req.query;
	if (!titulo) return res.status(400).json({ error: "Debes enviar titulo como query param." });
	const series = await service.buscarSeries({ titulo });
	res.json({ series });
});

export { router as multimediaRoute };
