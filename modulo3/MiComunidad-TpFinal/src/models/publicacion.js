export class Publicacion {
    constructor(idPublicacion, contenido, fechaCreacion, tipoContenido = 'texto', urlImagen = null, likes = 0) {
        this.idPublicacion = idPublicacion;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion || new Date();
        this.tipoContenido = tipoContenido;
        this.urlImagen = urlImagen;
        this.likes = likes;
        this.comentarios = [];
    }
    
    agregarComentario(comentario) {
        this.comentarios.push(comentario);
    }
    
    incrementarLikes() {
        this.likes++;
    }
}