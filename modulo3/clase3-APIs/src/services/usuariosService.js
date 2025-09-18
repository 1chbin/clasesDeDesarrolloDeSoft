//import axios from 'axios';
import { Usuario } from '../models/usuario.js';
import { RepositorioDeUsuarios } from '../repository/usuariosRepositorio.js';

export class UsuarioService {

    constructor() {
        this.repo = new RepositorioDeUsuarios();
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
}