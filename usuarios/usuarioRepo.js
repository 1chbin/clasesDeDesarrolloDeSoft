import { Usuario } from "./Usuario.js";

export class UsuarioRepo {
    constructor() {
        this.usuarios = [];
    }

    getUsuarios() {
        return this.usuarios;
    }

    getUsuario(id) {
        return this.usuarios.find(u => u.id === id);
    }

    agregarUsuario(usuario) {
        this.usuarios.push(new Usuario(usuario));
    }

    editarUsuario(id, usuario) {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index!== -1) {
            this.usuarios[index] = {...usuario };
        }
        else {
            throw new Error('Usuario no encontrado');
        }
    }

    eliminarUsuario(id) {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index!== -1) {
            this.usuarios.splice(index, 1);
        }
        else {
            throw new Error('Usuario no encontrado');
        }
    }
    
    verificarMail(email) {
        return this.usuarios.some(u => u.email === email);
    }

    obtenerUltimoId() {
        return (this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) : 0) + 1;
    }

    agregarGustosMusicales(id, gustos) {
        let i = this.usuarios.findIndex(u => u.id === id);

        this.usuarios[i].gustosMusicales = gustos;
    }

    compartenGustosMusicales(genero) {
        let cantidad = this.usuarios.filter(u => u.gustosMusicales.includes(genero)).length;
        return cantidad;
    }        
    
    residenProvincia(provincia) {
        let cantidad = this.usuarios.filter(u => u.provincia === provincia).length;
        return cantidad;
    }

    residenLocalidad(localidad) {
        let cantidad = this.usuarios.filter(u => u.localidad === localidad).length;
        return cantidad;
    }

    mayoresDe(anios) {
        let cantidad = this.usuarios.filter(u => u.getEdad() >= anios).length;
        return cantidad;
    }
}