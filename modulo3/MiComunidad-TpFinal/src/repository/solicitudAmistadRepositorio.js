export class RepositorioDeSolicitudesAmistad {
    constructor() {
        this.solicitudes = [];
    }

    guardar(solicitud) {
        this.solicitudes.push(solicitud);
    }

    buscarPorId(id) {
        return this.solicitudes.find(solicitud => String(solicitud.id) === String(id));
    }

    buscarSolicitudPendiente(usuarioEmisorId, usuarioReceptorId) {
        return this.solicitudes.find(solicitud => 
            (String(solicitud.usuarioEmisorId) === String(usuarioEmisorId) && 
             String(solicitud.usuarioReceptorId) === String(usuarioReceptorId) &&
             solicitud.estado === 'pendiente') ||
            (String(solicitud.usuarioEmisorId) === String(usuarioReceptorId) && 
             String(solicitud.usuarioReceptorId) === String(usuarioEmisorId) &&
             solicitud.estado === 'pendiente')
        );
    }

    obtenerSolicitudesEnviadas(usuarioId) {
        return this.solicitudes.filter(solicitud => 
            String(solicitud.usuarioEmisorId) === String(usuarioId)
        );
    }

    obtenerSolicitudesRecibidas(usuarioId) {
        return this.solicitudes.filter(solicitud => 
            String(solicitud.usuarioReceptorId) === String(usuarioId)
        );
    }

    obtenerSolicitudesPendientesEnviadas(usuarioId) {
        return this.solicitudes.filter(solicitud => 
            String(solicitud.usuarioEmisorId) === String(usuarioId) && 
            solicitud.estado === 'pendiente'
        );
    }

    obtenerSolicitudesPendientesRecibidas(usuarioId) {
        return this.solicitudes.filter(solicitud => 
            String(solicitud.usuarioReceptorId) === String(usuarioId) && 
            solicitud.estado === 'pendiente'
        );
    }

    obtenerSolicitudesRechazadas(usuarioId) {
        return this.solicitudes.filter(solicitud => 
            String(solicitud.usuarioEmisorId) === String(usuarioId) && 
            solicitud.estado === 'rechazada'
        );
    }

    contarUsuariosSpammers(limite) {
        const contadores = {};
        
        this.solicitudes
            .filter(s => s.estado === 'pendiente')
            .forEach(solicitud => {
                const emisorId = solicitud.usuarioEmisorId;
                contadores[emisorId] = (contadores[emisorId] || 0) + 1;
            });

        return Object.keys(contadores).filter(usuarioId => 
            contadores[usuarioId] > limite
        ).length;
    }

    contarUsuariosRechazados() {
        const usuariosRechazados = new Set();
        
        this.solicitudes
            .filter(s => s.estado === 'rechazada')
            .forEach(solicitud => {
                usuariosRechazados.add(solicitud.usuarioEmisorId);
            });

        return usuariosRechazados.size;
    }
}