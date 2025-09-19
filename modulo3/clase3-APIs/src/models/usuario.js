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
    }

    agregarPublicacion(contenido, tipoContenido = 'texto', urlImagen = null) {
        const nuevaPublicacion = new Publicacion(
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
}
