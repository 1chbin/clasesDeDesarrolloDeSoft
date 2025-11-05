export class Post {
    constructor(id, titulo, cuerpo, autorId) {
        this.id = id;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.autorId = autorId;
        this.fechaCreacion = new Date();
        this.likes = [];
        this.comentarios = [];
    }

    agregarLike(usuarioId) {
        // Verificar que el usuario no haya dado like ya
        if (!this.likes.some(like => like.usuarioId === usuarioId)) {
            this.likes.push({
                usuarioId: usuarioId,
                fecha: new Date()
            });
            return true;
        }
        return false;
    }

    agregarComentario(comentario) {
        this.comentarios.push(comentario);
    }

    obtenerCantidadLikes() {
        return this.likes.length;
    }

    obtenerCantidadComentarios() {
        return this.comentarios.length;
    }
}