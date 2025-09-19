import express from express
import { usuarioRepo } from "../main.js";

const router = express.router()

router.get("/", (req,res) => {
    let id = req.query.id;
    res.send(usuarioRepo.getUsuario(id)) ;
})

router.post("/", (req,res) =>{
    let usuario = req.body;
    if (!(usuario.nombre && usuario.apellido && usuario.email && 
        usuario.fechaNacimiento && usuario.biografia  && 
        usuario.provincia && usuario.localidad)) {
            res.status(400).send("Faltan datos obligatorios");
    }

    if (usuarioRepo.verificarMail(usuario.email)) {
        res.status(400).send("El mail ya está en uso");
    }

    if (usuario.biografia.length > 500) {
        res.status(400).send("La descripción es demasiado larga");
    }

    usuarioConId = {
        ...usuario,
        id: usuarioRepo.obtenerUltimoId(),
    }

    usuarioRepo.agregarUsuario(usuarioConId);
    res.status(201).send("Usuario creado");
})

router.put("/", (req,res) => {
    let id = req.query.id;
    let usuario = req.body;
    usuarioRepo.editarUsuario(id, usuario);
    res.status(200).send("Usuario editado");
})

router.post("/gustos", (req,res) => {
    let id = req.query.id;
    let gustosMusicales = req.body.gustosMusicales;
    let usuario = usuarioRepo.getUsuario(id);
    if (!usuario) {
        return res.status(404).send("Usuario no encontrado");
    }
    usuarioRepo.agregarGustosMusicales(id, gustosMusicales);
    res.status(200).send("Gustos musicales agregados");
})

router.get("/gustos", (req,res) => {
    let id = req.query.id;
    let usuario = usuarioRepo.getUsuario(id);
    if (!usuario) {
        return res.status(404).send("Usuario no encontrado");
    }
    res.status(200).send(usuario.gustosMusicales);
})

export { router as usuariosRoute };