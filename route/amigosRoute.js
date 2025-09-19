import express from "express";

import { SolicitudAmistad } from "../main.js";
const router = express.Router();

router.post("/solicitudes-amistad", (req,res) => {
    let { idSolicitante, idSolicitado } = req.body;
    if (!idSolicitante && !idSolicitado) {
        res.status(400).send("Debe enviar los IDs de solicitante y solicitado");
    }

    if (idSolicitante == idSolicitado) {
        res.status(400).send("No se puede enviar una solicitud a si mismo");
    }
    
    solicitudAmistad.crearSolicitudDeAmistad(idSolicitante, idSolicitado);
    res.status(201).send("Solicitud de amistad enviada");
})

router.put("/solicitudes-amistad/:id", (req,res) => {
    let id = req.params.id;
    let { idSolicitante, aceptar } = req.body;
    
    if (aceptar) {
        solicitudAmistad.aceptarSolicitudAmistad(idSolicitante, id);
    } else {
        solicitudAmistad.rechazarSolicitudAmistad(idSolicitante, id);
    }

    res.status(200).send("Solicitud de amistad enviada");
})

router.get("/:id/amigos", (req,res) => {
    let id = req.params.id;
    let amigos = solicitudAmistad.getAmigos(id);
    res.status(200).send(amigos);
})

router.get("/:id/falsos-amigos", (req,res) => {
    let id = req.params.id;
    let falsosAmigos = solicitudAmistad.getFalsosAmigos(id);
    res.status(200).send(falsosAmigos);
})

router.get("/:id/amigos-pendientes", (req,res) => {
    let id = req.params.id;
    let solicitudesEnviadas = solicitudAmistad.getSolicitudesEnviadas(id);
    res.status(200).send(solicitudesEnviadas);
})

router.get("/:id/solicitudes-de-amistad", (req,res) => {
    let id = req.params.id;
    let solicitudesRecibidas = solicitudAmistad.getSolicitudesRecibidas(id);
    res.status(200).send(solicitudesRecibidas);
})


export { router as amigosRoute };