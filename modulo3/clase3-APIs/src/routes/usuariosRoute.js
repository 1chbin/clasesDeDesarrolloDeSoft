import express from 'express';
import { RepositorioDeUsuarios } from '../repositories/usuariosRepository.js';

const router = express.Router();
const repo = new RepositorioDeUsuarios();

router.post("/", (req, res) => {
    const email = req.body.email;

    const usuariosConMismoEmail = repo.buscarPorEmail(email);

    if(usuariosConMismoEmail.length > 0) {
        res.status(400).json({
            success: false,
            message: "Ya existe un usuario con ese email."
        });
        return;
    }

    const usuario = new Usuario();

    repo.guardar(usuario);
});