import express from 'express';
import { EstadisticasPostsService } from '../services/estadisticasPostsService.js';

const router = express.Router();
const estadisticasService = new EstadisticasPostsService();

// GET /api/estadisticas-posts/activos/:fecha
router.get("/activos/:fecha", (req, res) => {
    estadisticasService.obtenerUsuariosActivosDelDia(req, res);
});

// GET /api/estadisticas-posts/postean-poco
router.get("/postean-poco", (req, res) => {
    estadisticasService.obtenerUsuariosQuePosteanPoco(req, res);
});

// GET /api/estadisticas-posts/escriben-mucho
router.get("/escriben-mucho", (req, res) => {
    estadisticasService.obtenerUsuariosQueEscribenMucho(req, res);
});

// GET /api/estadisticas-posts/mas-likeado/:fecha
router.get("/mas-likeado/:fecha", (req, res) => {
    estadisticasService.obtenerPostMasLikeadoDelDia(req, res);
});

// GET /api/estadisticas-posts/mas-comentado/:fecha
router.get("/mas-comentado/:fecha", (req, res) => {
    estadisticasService.obtenerPostMasComentadoDelDia(req, res);
});

// GET /api/estadisticas-posts/mas-comentarios/:limite
router.get("/mas-comentarios/:limite", (req, res) => {
    estadisticasService.obtenerPostsConMasDeXComentarios(req, res);
});

// GET /api/estadisticas-posts/mas-likes/:limite
router.get("/mas-likes/:limite", (req, res) => {
    estadisticasService.obtenerPostsConMasDeXLikes(req, res);
});

export { router as estadisticasPostsRoute };