import { Usuario } from '../models/Usuario.js';
import { RepositorioDeUsuarios } from '../repository/usuariosRespositorio.js';

export class UsuarioService {
    constructor() {
        this.repo = new RepositorioDeUsuarios();
    }

    validarCreacion(body){
        const requeridos = ['nombre','apellido','email','fechaNacimiento'];
        const faltan = requeridos.filter(c => !body[c]);
        if (faltan.length){
            const e = new Error('Faltan campos obligatorios');
            e.status = 400;
            e.details = { faltantes: faltan };
            throw e;
        }
        if (body.biografia && body.biografia.length > 500){
            const e = new Error('Biografía excede 500 caracteres');
            e.status = 400;
            throw e;
        }
        if (this.repo.buscarPorEmail(body.email)) {
            const e = new Error('Email ya registrado');
            e.status = 400;
            throw e;
        }
    }

    crear(data){
        this.validarCreacion(data);
        const usuario = new Usuario({
            id: this.repo.nextId(),
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            fechaNacimiento: data.fechaNacimiento,
            biografia: data.biografia,
            provincia: data.provincia,
            localidad: data.localidad
        });
        return this.repo.guardar(usuario);
    }

    obtenerTodos(){
        return this.repo.obtenerUsuarios();
    }

    obtener(id){
        const u = this.repo.buscarPorId(id);
        if (!u){
            const e = new Error('Usuario no encontrado');
            e.status = 404;
            throw e;
        }
        return u;
    }

    actualizar(id, data){
        const u = this.repo.buscarPorId(id);
        if (!u){
            const e = new Error('Usuario no encontrado');
            e.status = 404;
            throw e;
        }
        if (data.biografia && data.biografia.length > 500){
            const e = new Error('Biografía excede 500 caracteres');
            e.status = 400;
            throw e;
        }
        if (data.email && data.email !== u.email){
            if (this.repo.buscarPorEmail(data.email)){
                const e = new Error('Email ya registrado');
                e.status = 400;
                throw e;
            }
        }
        return this.repo.actualizar(id, data);
    }

    agregarGusto(id, gusto){
        if (!gusto){
            const e = new Error('Debe enviar gusto');
            e.status = 400;
            throw e;
        }
        const g = this.repo.agregarGusto(id, gusto);
        if (!g){
            const e = new Error('Usuario no encontrado');
            e.status = 404;
            throw e;
        }
        return g;
    }

    gustos(id){
        const g = this.repo.gustos(id);
        if (!g){
            const e = new Error('Usuario no encontrado');
            e.status = 404;
            throw e;
        }
        return g;
    }
}

export const usuarioService = new UsuarioService();