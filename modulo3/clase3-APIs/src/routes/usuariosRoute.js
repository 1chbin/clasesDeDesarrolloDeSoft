import express from 'express';
import { UsuarioService } from '../services/usuariosService.js';

const router = express.Router();
const usuarioService = new UsuarioService();

//http://localhost:3000/api/usuarios
router.get("/", (req, res) => {
    usuarioService.obtenerUsuarios(req, res);
});

// http://localhost:3000/api/usuarios/1
router.get("/:id", (req, res) => {
    usuarioService.obtenerUsuarioPorId(req, res);
});

// http://localhost:3000/api/usuarios
router.post("/", (req, res) => {
    usuarioService.crearUsuario(req, res);
});
// {
//     "id": 1,
//     "email": "prueba1@mail.com",
//     "nombre": "Prueba",
//     "apellido": "apellidoDePrueba",
//     "fechaNacimiento": "1990-05-15",
//     "biografia": "Esta es una biografia de prueba.",
//     "provincia": "Buenos Aires",
//     "localidad": "La Plata",
//     "gustoPreferido": "Rock"
// }

// http://localhost:3000/api/usuarios/1
router.put("/:id", (req, res) => {
    usuarioService.actualizarUsuario(req, res);
});

// http://localhost:3000/api/usuarios/1/gustos-musicales
router.post("/:id/gustos-musicales", (req, res) => {
    usuarioService.agregarGustosMusicales(req, res);
});
// {
//     "gustosMusicales": ["Rock", "Pop", "Jazz"]
// }

// http://localhost:3000/api/usuarios/1/gustos-musicales
router.get("/:id/gustos-musicales", (req, res) => {
    usuarioService.obtenerGustosMusicales(req, res);
});

// http://localhost:3000/api/usuarios/estadisticas/gusto-musical/Rock
router.get("/estadisticas/gusto-musical/:gusto", (req, res) => {
    usuarioService.contarPorGustoMusical(req, res);
});

// http://localhost:3000/api/usuarios/estadisticas/provincia/Buenos Aires
router.get("/estadisticas/provincia/:provincia", (req, res) => {
    usuarioService.contarPorProvincia(req, res);
});

// http://localhost:3000/api/usuarios/estadisticas/localidad/La Plata
router.get("/estadisticas/localidad/:localidad", (req, res) => {
    usuarioService.contarPorLocalidad(req, res);
});

// http://localhost:3000/api/usuarios/estadisticas/mayores/30
router.get("/estadisticas/mayores/:edad", (req, res) => {
    usuarioService.contarMayoresDe(req, res);
});

export { router as usuariosRoute };