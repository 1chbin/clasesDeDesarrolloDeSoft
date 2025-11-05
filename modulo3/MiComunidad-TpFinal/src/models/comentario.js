export class Comentario {
    constructor(id, contenido, autorId, postId) {
        this.id = id;
        this.contenido = contenido;
        this.autorId = autorId;
        this.postId = postId;
        this.fechaCreacion = new Date();
    }
}