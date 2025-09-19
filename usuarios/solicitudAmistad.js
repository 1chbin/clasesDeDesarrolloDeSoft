import { Usuario } from "./Usuario.js";
import { usuarioRepo } from "../main";

export class SolicitudAmistad {
    constructor() {
        this.usuarios = usuarioRepo.getUsuarios();
    }

    getAmigos(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        return this.usuarios[i].amigos;
    }

    getFalsosAmigos(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        return this.usuarios[i].falsosAmigos;
    }

    getSolicitudesEnviadas(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        return this.usuarios[i].solicitudes.filter(s => s.enviada == true);
    }

    getSolicitudesRecibidas(idUsuario) {
        let i = this.usuarios.findIndex(u => u.id === idUsuario);
        return this.usuarios[i].solicitudes.filter(s => s.enviada == false);
    }

    crearSolicitudDeAmistad(idSolicitante, idSolicitado) {
        let iSolicitante = this.usuarios.findIndex(u => u.id === idSolicitante);
        let iSolicitado = this.usuarios.findIndex(u => u.id === idSolicitado);

        this.usuarios[iSolicitante].solicitudes.push({idSolicitado, "enviada" : true});
        this.usuarios[iSolicitado].solicitudes.push({idSolicitante, "enviada" : false});
    }

    aceptarSolicitudDeAmistad(idSolicitante, idSolicitado) {
        let iSolicitante = this.usuarios.findIndex(u => u.id === idSolicitante);
        let iSolicitado = this.usuarios.findIndex(u => u.id === idSolicitado);

        const solicitud = this.usuarios[iSolicitante].solicitudes.find(s => s.idSolicitado === idSolicitado);
        if (solicitud && solicitud.enviada == false) {
            this.usuarios[iSolicitante].amigos.push(iSolicitado);
            this.usuarios[iSolicitado].amigos.push(iSolicitante);

            this.usuarios[iSolicitante].splice(this.usuarios[iSolicitante].solicitudes.indexOf(solicitud), 1);
            this.usuarios[iSolicitado].splice(this.usuarios[iSolicitado].solicitudes.indexOf(solicitud), 1);
        }
    }

    rechazarSolicitudDeAmistad(idSolicitante, idSolicitado) {
        let iSolicitante = this.usuarios.findIndex(u => u.id === idSolicitante);
        let iSolicitado = this.usuarios.findIndex(u => u.id === idSolicitado);

        const solicitud = this.usuarios[iSolicitante].solicitudes.find(s => s.idSolicitado === idSolicitado);
        if (solicitud && solicitud.enviada == false) {
            this.usuarios[iSolicitante].falsosAmigos.push(idSolicitado);

            this.usuarios[iSolicitante].splice(this.usuarios[iSolicitante].solicitudes.indexOf(solicitud), 1);
            this.usuarios[iSolicitado].splice(this.usuarios[iSolicitado].solicitudes.indexOf(solicitud), 1);
        }
    }

    usuariosSpammers(solicitudes) {
        return this.usuarios.filter(u => u.solicitudes.filter(s => s.enviada == true).length > solicitudes);
    }

    usuariosCallados(amigos) {
        return this.usuarios.filter(u => u.amigos.length > amigos);
    }

    usuariosMasRechazados() {
        let masRechazados = this.usuarios;
        return masRechazados.sort((a, b) => b.falsosAmigos.length - a.falsosAmigos.length).slice(0,3);
    }
}