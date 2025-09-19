import { Usuario } from "./Usuario.js";
import { usuarioRepo } from "../main.js";

export class SolicitudAmistad {
    constructor() {
        this.usuarios = usuarioRepo.getUsuarios();
    }

    getAmigos(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        if (i === -1) return [];
        return this.usuarios[i].amigos;
    }

    getFalsosAmigos(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        if (i === -1) return [];
        return this.usuarios[i].falsosAmigos;
    }

    getSolicitudesEnviadas(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        if (i === -1) return [];
        return this.usuarios[i].solicitudes.filter(s => s.enviada == true);
    }

    getSolicitudesRecibidas(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        if (i === -1) return [];
        return this.usuarios[i].solicitudes.filter(s => s.enviada == false);
    }

    crearSolicitudDeAmistad(idSolicitante, idSolicitado) {
        let iSolicitante = this.usuarios.findIndex(u => u.id === idSolicitante);
        let iSolicitado = this.usuarios.findIndex(u => u.id === idSolicitado);

        if (iSolicitante === -1 || iSolicitado === -1) {
            throw new Error("Usuario no encontrado");
        }

        // Check if friendship request already exists
        const existeEnviada = this.usuarios[iSolicitante].solicitudes.find(s => s.idSolicitado === idSolicitado);
        const existeRecibida = this.usuarios[iSolicitado].solicitudes.find(s => s.idSolicitante === idSolicitante);
        
        if (existeEnviada || existeRecibida) {
            throw new Error("Ya existe una solicitud de amistad");
        }

        // Check if they are already friends
        if (this.usuarios[iSolicitante].amigos.includes(idSolicitado)) {
            throw new Error("Ya son amigos");
        }

        this.usuarios[iSolicitante].solicitudes.push({idSolicitado, "enviada" : true});
        this.usuarios[iSolicitado].solicitudes.push({idSolicitante, "enviada" : false});
    }

    aceptarSolicitudAmistad(idSolicitante, idSolicitado) {
        let iSolicitante = this.usuarios.findIndex(u => u.id === idSolicitante);
        let iSolicitado = this.usuarios.findIndex(u => u.id === idSolicitado);

        if (iSolicitante == -1 || iSolicitado == -1) {
            throw new Error("Usuario no encontrado");
        }

        // Find the request from solicitante to solicitado (enviada: true)
        const solicitudEnviada = this.usuarios[iSolicitante].solicitudes.find(s => s.idSolicitado === idSolicitado && s.enviada === true);
        // Find the received request for solicitado (enviada: false)
        const solicitudRecibida = this.usuarios[iSolicitado].solicitudes.find(s => s.idSolicitante === idSolicitante && s.enviada === false);
        
        if (solicitudEnviada && solicitudRecibida) {
            // Add to friends
            this.usuarios[iSolicitante].amigos.push(idSolicitado);
            this.usuarios[iSolicitado].amigos.push(idSolicitante);

            // Remove requests
            this.usuarios[iSolicitante].solicitudes.splice(this.usuarios[iSolicitante].solicitudes.indexOf(solicitudEnviada), 1);
            this.usuarios[iSolicitado].solicitudes.splice(this.usuarios[iSolicitado].solicitudes.indexOf(solicitudRecibida), 1);
        } else {
            throw new Error("Solicitud de amistad no encontrada");
        }
    }

    rechazarSolicitudDeAmistad(idSolicitante, idSolicitado) {
        let iSolicitante = this.usuarios.findIndex(u => u.id === idSolicitante);
        let iSolicitado = this.usuarios.findIndex(u => u.id === idSolicitado);

        if (iSolicitante === -1 || iSolicitado === -1) {
            throw new Error("Usuario no encontrado");
        }

        // Find the request from solicitante to solicitado (enviada: true)
        const solicitudEnviada = this.usuarios[iSolicitante].solicitudes.find(s => s.idSolicitado === idSolicitado && s.enviada === true);
        // Find the received request for solicitado (enviada: false)
        const solicitudRecibida = this.usuarios[iSolicitado].solicitudes.find(s => s.idSolicitante === idSolicitante && s.enviada === false);

        if (solicitudEnviada && solicitudRecibida) {
            // Add to falsos amigos for the person who rejected
            this.usuarios[iSolicitado].falsosAmigos.push(idSolicitante);

            // Remove requests
            this.usuarios[iSolicitante].solicitudes.splice(this.usuarios[iSolicitante].solicitudes.indexOf(solicitudEnviada), 1);
            this.usuarios[iSolicitado].solicitudes.splice(this.usuarios[iSolicitado].solicitudes.indexOf(solicitudRecibida), 1);
        } else {
            throw new Error("Solicitud de amistad no encontrada");
        }
    }

    usuariosSpammers(solicitudes) {
        return this.usuarios.filter(u => u.solicitudes.filter(s => s.enviada == true).length > solicitudes);
    }

    usuariosCallados(amigos) {
        return this.usuarios.filter(u => u.amigos.length > amigos);
    }

    usuariosMasRechazados() {
        let masRechazados = [...this.usuarios];
        return masRechazados.sort((a, b) => b.falsosAmigos.length - a.falsosAmigos.length).slice(0, 3);
    }
}                                                                     