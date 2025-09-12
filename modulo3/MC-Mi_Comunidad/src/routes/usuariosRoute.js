import express from 'express';
import { usuarioService } from '../services/usuariosService.js';

const router = express.Router();

// POST /api/usuarios
router.post('/', (req, res, next) => {
    try {
        const usuario = usuarioService.crear(req.body || {});
        res.status(201).json({ success: true, usuario });
    } catch (e){ next(e); }
});

//GET /api/usuarios
router.get('/', (req, res, next) => {
    try {
        const usuarios = usuarioService.obtenerTodos();
        res.json({ success: true, usuarios });
    } catch (e){ next(e); }
});

// GET /api/usuarios/:id
router.get('/:id', (req, res, next) => {
    try {
        const usuario = usuarioService.obtener(req.params.id);
        res.json({ success: true, usuario });
    } catch (e){ next(e); }
});

// PUT /api/usuarios/:id
router.put('/:id', (req, res, next) => {
    try {
        const usuario = usuarioService.actualizar(req.params.id, req.body || {});
        res.json({ success: true, usuario });
    } catch (e){ next(e); }
});

// POST /api/usuarios/:id/gustos-musicales
router.post('/:id/gustos-musicales', (req, res, next) => {
    try {
        const gustos = usuarioService.agregarGusto(req.params.id, req.body?.gusto);
        res.status(201).json({ success: true, gustos });
    } catch (e){ next(e); }
});

// GET /api/usuarios/:id/gustos-musicales
router.get('/:id/gustos-musicales', (req, res, next) => {
    try {
        const gustos = usuarioService.gustos(req.params.id);
        res.json({ success: true, gustos });
    } catch (e){ next(e); }
});

export { router as usuariosRoute };