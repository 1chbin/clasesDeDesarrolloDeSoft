//import axios from 'axios';
import { Usuario } from '../models/usuario.js';
import { RepositorioDeUsuarios } from '../repository/usuariosRepositorio.js';

export class UsuarioService {

    constructor() {
        this.repo = new RepositorioDeUsuarios();
    }

    crearUsuario(req, res) {
        const id = req.body.id;
        const email = req.body.email;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const gustoPreferido = req.body.gustoPreferido;

        const usuariosConMismoEmail = this.repo.buscarPorEmail(email);

        if(usuariosConMismoEmail.length > 0) {
            res.status(400).json({
                success: false,
                message: "Ya existe un usuario con ese email."
        });
        }else {
            const usuario = new Usuario(id, email, nombre, apellido, gustoPreferido);
            this.repo.guardar(usuario);
            res.status(201).json({
                success: true,
                message: "Usuario creado exitosamente.",
                usuarios: this.repo.obtenerUsuarios()
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
            usuarios: usuariosActualizados
        });
    }

    agregarGustosMusicales(req, res) {
        const id = req.params.id;
        const gustos = req.body.gustosMusicales;
        const ok = this.repo.agregarGustosMusicales(id, gustos);
        if (ok) {
            res.status(200).json({ success: true, message: "Gustos musicales actualizados." });
        } else {
            res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }
    }

    obtenerGustosMusicales(req, res) {
        const id = req.params.id;
        const gustos = this.repo.obtenerGustosMusicales(id);
        if (gustos) {
            res.status(200).json({ success: true, gustosMusicales: gustos });
        } else {
            res.status(404).json({ success: false, message: "Usuario no encontrado o sin gustos musicales." });
        }
    }
}