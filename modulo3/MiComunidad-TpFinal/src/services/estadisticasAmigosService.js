import { usuarioRepo, solicitudAmistadRepo } from '../repositories.js';

export class EstadisticasAmigosService {
    constructor() {
        this.usuarioRepo = usuarioRepo;
        this.solicitudRepo = solicitudAmistadRepo;
    }

    obtenerUsuariosSpammers(req, res) {
        const limite = parseInt(req.params.limite);
        const usuarios = this.usuarioRepo.obtenerUsuarios();
        
        const spammers = usuarios.filter(usuario => {
            const solicitudesPendientes = this.solicitudRepo.obtenerSolicitudesPendientesEnviadas(usuario.id);
            return solicitudesPendientes.length > limite;
        });

        const spammersInfo = spammers.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            solicitudesPendientes: this.solicitudRepo.obtenerSolicitudesPendientesEnviadas(usuario.id).length
        }));

        res.status(200).json({
            success: true,
            cantidad: spammersInfo.length,
            spammers: spammersInfo
        });
    }

    obtenerUsuariosCallados(req, res) {
        const limite = parseInt(req.params.limite);
        const usuarios = this.usuarioRepo.obtenerUsuarios();
        
        const callados = usuarios.filter(usuario => usuario.amigos.length < limite);

        const calladosInfo = callados.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            cantidadAmigos: usuario.amigos.length
        }));

        res.status(200).json({
            success: true,
            cantidad: calladosInfo.length,
            callados: calladosInfo
        });
    }

    obtenerUsuariosRechazados(req, res) {
        const usuarios = this.usuarioRepo.obtenerUsuarios();
        
        const rechazados = usuarios.filter(usuario => {
            const solicitudesRechazadas = this.solicitudRepo.obtenerSolicitudesRechazadas(usuario.id);
            return solicitudesRechazadas.length >= 1;
        });

        const rechazadosInfo = rechazados.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            solicitudesRechazadas: this.solicitudRepo.obtenerSolicitudesRechazadas(usuario.id).length
        }));

        res.status(200).json({
            success: true,
            cantidad: rechazadosInfo.length,
            rechazados: rechazadosInfo
        });
    }
}