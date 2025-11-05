//import axios from 'axios';
import { Usuario } from '../models/usuario.js';
import { usuarioRepo, solicitudAmistadRepo } from '../repositories.js';

export class UsuarioService {

    constructor() {
        this.repo = usuarioRepo;
        this.solicitudRepo = solicitudAmistadRepo;
    }

    crearUsuario(req, res) {
        //Poner el req.body solo al final es mejor
        const { id, email, nombre, apellido, fechaNacimiento, biografia, provincia, localidad } = req.body;

        const usuariosConMismoEmail = this.repo.buscarPorEmail(email);

        if(usuariosConMismoEmail.length > 0) {
            res.status(400).json({
                success: false,
                message: "Ya existe un usuario con ese email."
            });
        } else {
            const usuario = new Usuario(id, email, nombre, apellido, fechaNacimiento, biografia, provincia, localidad);
            this.repo.guardar(usuario);
            res.status(201).json({
                success: true,
                message: "Usuario creado exitosamente.",
                usuarios: this.repo.buscarPorId(id)
            });
        }
    }

    obtenerUsuarios(req, res) {
        const usuarios = this.repo.obtenerUsuarios();
        res.status(200).json({
            success: true,
            usuarios
        });
    }

    obtenerUsuarioPorId(req, res) {
        const id = req.params.id;
        const usuarios = this.repo.buscarPorId(id);
        res.status(200).json({
            success: true,
            usuarios
        });
    }

    actualizarUsuario(req, res) {
        const id = req.params.id;
        const datosActualizados = req.body;
        const usuariosActualizados = this.repo.actualizarUsuario(id, datosActualizados);
        res.status(200).json({
            success: true,
            usuarioActualizado: this.repo.buscarPorId(id)
        });
    }

    agregarGustosMusicales(req, res) {
        const id = req.params.id;
        const gustos = req.body.gustosMusicales;
        const ok = this.repo.agregarGustosMusicales(id, gustos);
        if (ok) {
            res.status(200).json({ 
                success: true, 
                message: "Gustos musicales actualizados.",
                gustosMusicalesAñadidos: gustos 
            });
        } else {
            res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }
    }

    obtenerGustosMusicales(req, res) {
        const id = req.params.id;
        const gustos = this.repo.obtenerGustosMusicales(id);
        if (gustos) {
            res.status(200).json({ 
                success: true, 
                gustosMusicales: gustos 
            });
        } else {
            res.status(404).json({ success: false, message: "Usuario no encontrado o sin gustos musicales." });
        }
    }

    contarPorGustoMusical(req, res) {
        const gusto = req.params.gusto;
        const cantidad = this.repo.contarPorGustoMusical(gusto);
        res.status(200).json({ success: true, cantidad });
    }

    contarPorProvincia(req, res) {
        const provincia = req.params.provincia;
        const cantidad = this.repo.contarPorProvincia(provincia);
        res.status(200).json({ success: true, cantidad });
    }

    contarPorLocalidad(req, res) {
        const localidad = req.params.localidad;
        const cantidad = this.repo.contarPorLocalidad(localidad);
        res.status(200).json({ success: true, cantidad });
    }

    contarMayoresDe(req, res) {
        const edad = parseInt(req.params.edad);
        const cantidad = this.repo.contarMayoresDe(edad);
        res.status(200).json({ success: true, cantidad });
    }

    agregarPublicacion(req, res) {
        const id = req.params.id;
        const { idPublicacion, contenido, tipoContenido, urlImagen } = req.body;
        const ok = this.repo.agregarPublicacion(id, { idPublicacion, contenido, tipoContenido, urlImagen });
        if (ok) {
            res.status(200).json({ 
                success: true, 
                message: "Publicacion agregada",
                publicacionAñadida: { idPublicacion, contenido, tipoContenido, urlImagen }
            });
        } else {
            res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }
    }

    obtenerPublicaciones(req, res) {
        const publicaciones = this.repo.obtenerTodasLasPublicaciones();
        if (publicaciones && publicaciones.length > 0) {
            res.status(200).json({ 
                success: true, 
                publicaciones: publicaciones
            });
        } else {
            res.status(200).json({ 
                message: "No hay publicaciones disponibles.",
                publicaciones: []
            });
        }
    }

    obtenerPublicacionesPorUsuario(req, res) {
        const id = req.params.id;
        const publicaciones = this.repo.obtenerPublicacionesPorId(id);
        
        if (publicaciones && publicaciones.length > 0) {
            res.status(200).json({ 
                success: true, 
                publicaciones: publicaciones,
            });
        } else {
            res.status(200).json({ 
                message: "No hay publicaciones disponibles.",
                publicaciones: []
            });
        }
    }

    obtenerPublicacionPorId(req, res) {
        const idPublicacion = req.params.idPublicacion;
        const publicacion = this.repo.obtenerPublicacion(idPublicacion);
        
        if (publicacion) {
            res.status(200).json({
                success: true,
                publicacion: publicacion
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Publicación no encontrada."
            });
        }
    }

    obtenerAmigos(req, res) {
        const id = req.params.id;
        const usuario = this.repo.buscarPorId(id)[0];
        
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        const amigos = usuario.amigos.map(amigoId => {
            const amigo = this.repo.buscarPorId(amigoId)[0];
            return {
                id: amigo.id,
                nombre: amigo.nombre,
                apellido: amigo.apellido,
                email: amigo.email
            };
        });

        res.status(200).json({
            success: true,
            amigos: amigos
        });
    }

    obtenerAmigosPendientes(req, res) {
        const id = req.params.id;
        const solicitudesPendientes = this.solicitudRepo.obtenerSolicitudesPendientesEnviadas(id);
        
        const amigosPendientes = solicitudesPendientes.map(solicitud => {
            const receptor = this.repo.buscarPorId(solicitud.usuarioReceptorId)[0];
            return {
                solicitudId: solicitud.id,
                usuario: {
                    id: receptor.id,
                    nombre: receptor.nombre,
                    apellido: receptor.apellido,
                    email: receptor.email
                },
                fechaEnvio: solicitud.fechaCreacion
            };
        });

        res.status(200).json({
            success: true,
            amigosPendientes: amigosPendientes
        });
    }

    obtenerSolicitudesRecibidas(req, res) {
        const id = req.params.id;
        const solicitudesRecibidas = this.solicitudRepo.obtenerSolicitudesPendientesRecibidas(id);
        
        const solicitudes = solicitudesRecibidas.map(solicitud => {
            const emisor = this.repo.buscarPorId(solicitud.usuarioEmisorId)[0];
            return {
                solicitudId: solicitud.id,
                usuario: {
                    id: emisor.id,
                    nombre: emisor.nombre,
                    apellido: emisor.apellido,
                    email: emisor.email
                },
                fechaEnvio: solicitud.fechaCreacion
            };
        });

        res.status(200).json({
            success: true,
            solicitudesRecibidas: solicitudes
        });
    }

    obtenerFalsosAmigos(req, res) {
        const id = req.params.id;
        const solicitudesRechazadas = this.solicitudRepo.obtenerSolicitudesRechazadas(id);
        
        const falsosAmigos = solicitudesRechazadas.map(solicitud => {
            const receptor = this.repo.buscarPorId(solicitud.usuarioReceptorId)[0];
            return {
                usuario: {
                    id: receptor.id,
                    nombre: receptor.nombre,
                    apellido: receptor.apellido,
                    email: receptor.email
                },
                fechaRechazo: solicitud.fechaRespuesta
            };
        });

        res.status(200).json({
            success: true,
            falsosAmigos: falsosAmigos
        });
    }
}