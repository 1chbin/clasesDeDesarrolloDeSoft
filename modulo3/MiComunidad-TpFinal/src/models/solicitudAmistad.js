export class SolicitudAmistad {
    constructor(id, usuarioEmisorId, usuarioReceptorId) {
        this.id = id;
        this.usuarioEmisorId = usuarioEmisorId;
        this.usuarioReceptorId = usuarioReceptorId;
        this.fechaCreacion = new Date();
        this.estado = 'pendiente'; // pendiente, aceptada, rechazada
    }

    aceptar() {
        this.estado = 'aceptada';
        this.fechaRespuesta = new Date();
    }

    rechazar() {
        this.estado = 'rechazada';
        this.fechaRespuesta = new Date();
    }
}