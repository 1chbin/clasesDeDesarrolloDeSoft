import { SolicitudAmistad } from '../models/solicitudAmistad.js';
import { usuarioRepo, solicitudAmistadRepo } from '../repositories.js';

export class SolicitudAmistadService {
    constructor() {
        this.usuarioRepo = usuarioRepo;
        this.solicitudRepo = solicitudAmistadRepo;
    }

    crearSolicitudAmistad(req, res) {
        const { usuarioEmisorId, usuarioReceptorId } = req.body;

        // Validar que no sea el mismo usuario
        if (String(usuarioEmisorId) === String(usuarioReceptorId)) {
            return res.status(400).json({
                success: false,
                message: "Un usuario no puede enviarse una solicitud de amistad a sí mismo."
            });
        }

        // Verificar que ambos usuarios existan
        const emisor = this.usuarioRepo.buscarPorId(usuarioEmisorId);
        const receptor = this.usuarioRepo.buscarPorId(usuarioReceptorId);

        if (emisor.length === 0 || receptor.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Uno o ambos usuarios no existen."
            });
        }

        // Verificar que ya no sean amigos
        if (emisor[0].esAmigoDe(usuarioReceptorId)) {
            return res.status(400).json({
                success: false,
                message: "Los usuarios ya son amigos."
            });
        }

        // Verificar que no exista una solicitud pendiente
        const solicitudExistente = this.solicitudRepo.buscarSolicitudPendiente(usuarioEmisorId, usuarioReceptorId);
        if (solicitudExistente) {
            return res.status(400).json({
                success: false,
                message: "Ya existe una solicitud de amistad pendiente entre estos usuarios."
            });
        }

        const id = Date.now().toString();
        const solicitud = new SolicitudAmistad(id, usuarioEmisorId, usuarioReceptorId);
        this.solicitudRepo.guardar(solicitud);

        res.status(201).json({
            success: true,
            message: "Solicitud de amistad creada exitosamente.",
            solicitud: solicitud
        });
    }

    responderSolicitudAmistad(req, res) {
        const solicitudId = req.params.id;
        const { accion } = req.body; // "aceptar" o "rechazar"

        const solicitud = this.solicitudRepo.buscarPorId(solicitudId);
        if (!solicitud) {
            return res.status(404).json({
                success: false,
                message: "Solicitud de amistad no encontrada."
            });
        }

        if (solicitud.estado !== 'pendiente') {
            return res.status(400).json({
                success: false,
                message: "La solicitud ya ha sido respondida."
            });
        }

        if (accion === 'aceptar') {
            solicitud.aceptar();
            
            // Agregar como amigos mutuamente
            const emisor = this.usuarioRepo.buscarPorId(solicitud.usuarioEmisorId)[0];
            const receptor = this.usuarioRepo.buscarPorId(solicitud.usuarioReceptorId)[0];
            
            emisor.agregarAmigo(solicitud.usuarioReceptorId);
            receptor.agregarAmigo(solicitud.usuarioEmisorId);

            res.status(200).json({
                success: true,
                message: "Solicitud de amistad aceptada.",
                solicitud: solicitud
            });
        } else if (accion === 'rechazar') {
            solicitud.rechazar();
            
            res.status(200).json({
                success: true,
                message: "Solicitud de amistad rechazada.",
                solicitud: solicitud
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Acción no válida. Use 'aceptar' o 'rechazar'."
            });
        }
    }
}