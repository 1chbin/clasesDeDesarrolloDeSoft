import express from 'express';
import { UsuarioService } from '../services/usuariosService.js';

const router = express.Router();
const usuarioService = new UsuarioService();

router.get("/", (req, res) => {
    usuarioService.obtenerUsuarios(req, res);
});

router.get("/:id", (req, res) => {
    usuarioService.obtenerUsuarioPorId(req, res);
});

router.post("/", (req, res) => {
    usuarioService.crearUsuario(req, res);
});

router.put("/:id", (req, res) => {
    usuarioService.actualizarUsuario(req, res);
});

export { router as usuariosRoute };