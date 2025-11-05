export class RepositorioDePosts {
    constructor() {
        this.posts = [];
    }

    guardar(post) {
        this.posts.push(post);
    }

    buscarPorId(id) {
        return this.posts.find(post => String(post.id) === String(id));
    }

    obtenerTodos() {
        return this.posts.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    }

    obtenerPostsPorUsuario(usuarioId) {
        return this.posts
            .filter(post => String(post.autorId) === String(usuarioId))
            .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    }

    obtenerPostsPorFecha(fecha) {
        const fechaInicio = new Date(fecha);
        fechaInicio.setHours(0, 0, 0, 0);
        const fechaFin = new Date(fecha);
        fechaFin.setHours(23, 59, 59, 999);

        return this.posts.filter(post => {
            const fechaPost = new Date(post.fechaCreacion);
            return fechaPost >= fechaInicio && fechaPost <= fechaFin;
        });
    }

    obtenerPostMasLikeadoDelDia(fecha) {
        const postsDelDia = this.obtenerPostsPorFecha(fecha);
        if (postsDelDia.length === 0) return null;

        return postsDelDia.reduce((maxPost, post) => 
            post.obtenerCantidadLikes() > maxPost.obtenerCantidadLikes() ? post : maxPost
        );
    }

    obtenerPostMasComentadoDelDia(fecha) {
        const postsDelDia = this.obtenerPostsPorFecha(fecha);
        if (postsDelDia.length === 0) return null;

        return postsDelDia.reduce((maxPost, post) => 
            post.obtenerCantidadComentarios() > maxPost.obtenerCantidadComentarios() ? post : maxPost
        );
    }

    obtenerPostsConMasDeXComentarios(limite) {
        return this.posts.filter(post => post.obtenerCantidadComentarios() > limite);
    }

    obtenerPostsConMasDeXLikes(limite) {
        return this.posts.filter(post => post.obtenerCantidadLikes() > limite);
    }

    contarPostsPorUsuarioEnPeriodo(usuarioId, fechaInicio, fechaFin) {
        return this.posts.filter(post => {
            const fechaPost = new Date(post.fechaCreacion);
            return String(post.autorId) === String(usuarioId) &&
                   fechaPost >= fechaInicio && fechaPost <= fechaFin;
        }).length;
    }

    obtenerPostsPorUsuarioEnPeriodo(usuarioId, fechaInicio, fechaFin) {
        return this.posts.filter(post => {
            const fechaPost = new Date(post.fechaCreacion);
            return String(post.autorId) === String(usuarioId) &&
                   fechaPost >= fechaInicio && fechaPost <= fechaFin;
        });
    }
}