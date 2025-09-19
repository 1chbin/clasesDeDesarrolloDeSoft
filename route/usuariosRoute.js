import express from 'express'
import { usuarioRepo } from "../main.js";

const router = express.Router()

router.get("/", (req,res) => {
    let id = req.query.id;
    if (id) {
        const usuario = usuarioRepo.getUsuario(parseInt(id));
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } else {
        res.json(usuarioRepo.getUsuarios());
    }
})

router.post("/", (req,res) =>{
    let usuario = req.body;

    if (!(usuario.nombre && usuario.apellido && usuario.email && 
        usuario.fechaNacimiento && usuario.biografia  && 
        usuario.provincia && usuario.localidad)) {
            return res.status(400).send("Faltan datos obligatorios");
    }

    if (usuarioRepo.verificarMail(usuario.email)) {
        return res.status(400).send("El mail ya está en uso");
    }

    if (usuario.biografia.length > 500) {
        return res.status(400).send("La descripción es demasiado larga");
    }

    let usuarioConId = {
        ...usuario,
        id: usuarioRepo.obtenerUltimoId(),
    }

    usuarioRepo.agregarUsuario(usuarioConId);
    res.status(201).json({
        success: true,
        usuario
    }
    );
})

router.put("/", (req,res) => {
    let id = req.query.id;
    let usuario = req.body;
    try {
        usuarioRepo.editarUsuario(parseInt(id), usuario);
        res.status(200).send("Usuario editado");
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.delete("/", (req,res) => {
    let id = req.query.id;
    try {
        usuarioRepo.eliminarUsuario(parseInt(id));
        res.status(200).send("Usuario eliminado");
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.post("/gustos", (req,res) => {
    let id = req.query.id;
    let gustosMusicales = req.body.gustosMusicales;
    let usuario = usuarioRepo.getUsuario(parseInt(id));
    if (!usuario) {
        return res.status(404).send("Usuario no encontrado");
    }
    usuarioRepo.agregarGustosMusicales(parseInt(id), gustosMusicales);
    res.status(200).send("Gustos musicales agregados");
})

router.get("/gustos", (req,res) => {
    let id = req.query.id;
    let usuario = usuarioRepo.getUsuario(parseInt(id));
    if (!usuario) {
        return res.status(404).send("Usuario no encontrado");
    }
    res.status(200).json(usuario.gustosMusicales);
})

// Statistics routes
router.get("/stats/genero/:genero", (req,res) => {
    let genero = req.params.genero;
    let cantidad = usuarioRepo.compartenGustosMusicales(genero);
    res.json({ genero, cantidad });
})

router.get("/stats/provincia/:provincia", (req,res) => {
    let provincia = req.params.provincia;
    let cantidad = usuarioRepo.residenProvincia(provincia);
    res.json({ provincia, cantidad });
})

router.get("/stats/localidad/:localidad", (req,res) => {
    let localidad = req.params.localidad;
    let cantidad = usuarioRepo.residenLocalidad(localidad);
    res.json({ localidad, cantidad });
})

router.get("/stats/mayores/:edad", (req,res) => {
    let edad = parseInt(req.params.edad);
    let cantidad = usuarioRepo.mayoresDe(edad);
    res.json({ edad, cantidad });
})

export { router as usuariosRoute };