import express from "express";
import { solicitudAmistad } from "../main.js";

const router = express.Router();

router.post("/solicitudes-amistad", (req,res) => {
    let { idSolicitante, idSolicitado } = req.body;
    if (!idSolicitante || !idSolicitado) {
        return res.status(400).send("Debe enviar los IDs de solicitante y solicitado");
    }

    if (idSolicitante == idSolicitado) {
        return res.status(400).send("No se puede enviar una solicitud a si mismo");
    }
    
    solicitudAmistad.crearSolicitudDeAmistad(parseInt(idSolicitante), parseInt(idSolicitado));
    res.status(201).send("Solicitud de amistad enviada");
})

router.put("/solicitudes-amistad/:id", (req,res) => {
    let id = parseInt(req.params.id);
    let { idSolicitante, aceptar } = req.body;
    
    if (aceptar) {
        solicitudAmistad.aceptarSolicitudAmistad(parseInt(idSolicitante), id);
        res.status(200).send("Solicitud de amistad aceptada");
    } else {
        solicitudAmistad.rechazarSolicitudAmistad(parseInt(idSolicitante), id);
        res.status(200).send("Solicitud de amistad rechazada");
    }
})

router.get("/:id/amigos", (req,res) => {
    let id = parseInt(req.params.id);
    let amigos = solicitudAmistad.getAmigos(id);
    res.status(200).json(amigos);
})

router.get("/:id/falsos-amigos", (req,res) => {
    let id = parseInt(req.params.id);
    let falsosAmigos = solicitudAmistad.getFalsosAmigos(id);
    res.status(200).json(falsosAmigos);
})

router.get("/:id/amigos-pendientes", (req,res) => {
    let id = parseInt(req.params.id);
    let solicitudesEnviadas = solicitudAmistad.getSolicitudesEnviadas(id);
    res.status(200).json(solicitudesEnviadas);
})

router.get("/:id/solicitudes-de-amistad", (req,res) => {
    let id = parseInt(req.params.id);
    let solicitudesRecibidas = solicitudAmistad.getSolicitudesRecibidas(id);
    res.status(200).json(solicitudesRecibidas);
})

// Statistics routes
router.get("/stats/spammers/:cantidad", (req,res) => {
    let cantidad = parseInt(req.params.cantidad);
    let spammers = solicitudAmistad.usuariosSpammers(cantidad);
    res.json(spammers);
})

router.get("/stats/callados/:amigos", (req,res) => {
    let amigos = parseInt(req.params.amigos);
    let callados = solicitudAmistad.usuariosCallados(amigos);
    res.json(callados);
})

router.get("/stats/mas-rechazados", (req,res) => {
    let masRechazados = solicitudAmistad.usuariosMasRechazados();
    res.json(masRechazados);
})

export { router as amigosRoute };