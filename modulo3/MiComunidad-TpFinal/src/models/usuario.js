import { Publicacion } from './publicacion.js'; // Agregar esta línea

export class Usuario {
    constructor(id, email, nombre, apellido, fechaNacimiento, biografia, provincia, localidad) {
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.biografia = biografia;
        this.provincia = provincia;
        this.localidad = localidad;
        this.gustosMusicales = [];
        this.publicaciones = [];
        this.amigos = []; // IDs de usuarios amigos
        this.postsDelDia = []; // Para controlar límite diario de posts
    }

    agregarPublicacion(idPublicacion, contenido, tipoContenido = 'texto', urlImagen = null) {
        const nuevaPublicacion = new Publicacion(
            idPublicacion,
            Date.now(),
            contenido,
            new Date(),
            tipoContenido,
            urlImagen
        );
        this.publicaciones.push(nuevaPublicacion);
        return nuevaPublicacion;
    }
    
    eliminarPublicacion(publicacionId) {
        this.publicaciones = this.publicaciones.filter(publicacion => publicacion.id !== publicacionId);
    }

    agregarAmigo(usuarioId) {
        if (!this.amigos.includes(usuarioId) && usuarioId !== this.id) {
            this.amigos.push(usuarioId);
            return true;
        }
        return false;
    }

    esAmigoDe(usuarioId) {
        return this.amigos.includes(usuarioId);
    }

    puedePublicarHoy() {
        const hoy = new Date().toDateString();
        const postsHoy = this.postsDelDia.filter(fecha => 
            new Date(fecha).toDateString() === hoy
        );
        return postsHoy.length < 5;
    }

    registrarPostHoy() {
        this.postsDelDia.push(new Date());
        // Mantener solo posts de los últimos 30 días para no sobrecargar memoria
        const hace30Dias = new Date();
        hace30Dias.setDate(hace30Dias.getDate() - 30);
        this.postsDelDia = this.postsDelDia.filter(fecha => new Date(fecha) > hace30Dias);
    }
}
