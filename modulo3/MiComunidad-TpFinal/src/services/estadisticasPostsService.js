import { usuarioRepo, postRepo } from '../repositories.js';

export class EstadisticasPostsService {
    constructor() {
        this.usuarioRepo = usuarioRepo;
        this.postRepo = postRepo;
    }

    obtenerUsuariosActivosDelDia(req, res) {
        const fecha = req.params.fecha;
        const usuarios = this.usuarioRepo.obtenerUsuarios();
        
        const usuariosActivos = usuarios.filter(usuario => {
            const postsDelDia = this.postRepo.obtenerPostsPorUsuarioEnPeriodo(
                usuario.id, 
                new Date(fecha + 'T00:00:00'),
                new Date(fecha + 'T23:59:59')
            );
            
            // Usuarios activos: han superado el 60% de posts permitidos diarios (más de 3 posts)
            return postsDelDia.length > 3;
        });

        const usuariosActivosInfo = usuariosActivos.map(usuario => {
            const postsDelDia = this.postRepo.obtenerPostsPorUsuarioEnPeriodo(
                usuario.id, 
                new Date(fecha + 'T00:00:00'),
                new Date(fecha + 'T23:59:59')
            );
            
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                postsDelDia: postsDelDia.length
            };
        });

        res.status(200).json({
            success: true,
            fecha: fecha,
            cantidad: usuariosActivosInfo.length,
            usuariosActivos: usuariosActivosInfo
        });
    }

    obtenerUsuariosQuePosteanPoco(req, res) {
        const usuarios = this.usuarioRepo.obtenerUsuarios();
        const ahora = new Date();
        
        const usuariosQuePosteanPoco = usuarios.filter(usuario => {
            let totalPosts = 0;
            
            // Verificar las últimas 4 semanas
            for (let semana = 0; semana < 4; semana++) {
                const fechaFin = new Date(ahora);
                fechaFin.setDate(fechaFin.getDate() - (semana * 7));
                
                const fechaInicio = new Date(fechaFin);
                fechaInicio.setDate(fechaInicio.getDate() - 6);
                
                const postsSemana = this.postRepo.contarPostsPorUsuarioEnPeriodo(
                    usuario.id, fechaInicio, fechaFin
                );
                
                totalPosts += postsSemana;
            }
            
            // Máximo 1 post por semana en 4 semanas = máximo 4 posts
            return totalPosts <= 4;
        });

        const usuariosInfo = usuariosQuePosteanPoco.map(usuario => {
            let totalPosts = 0;
            
            for (let semana = 0; semana < 4; semana++) {
                const fechaFin = new Date(ahora);
                fechaFin.setDate(fechaFin.getDate() - (semana * 7));
                
                const fechaInicio = new Date(fechaFin);
                fechaInicio.setDate(fechaInicio.getDate() - 6);
                
                const postsSemana = this.postRepo.contarPostsPorUsuarioEnPeriodo(
                    usuario.id, fechaInicio, fechaFin
                );
                
                totalPosts += postsSemana;
            }
            
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                postsUltimas4Semanas: totalPosts
            };
        });

        res.status(200).json({
            success: true,
            cantidad: usuariosInfo.length,
            usuariosQuePosteanPoco: usuariosInfo
        });
    }

    obtenerUsuariosQueEscribenMucho(req, res) {
        const usuarios = this.usuarioRepo.obtenerUsuarios();
        
        const usuariosQueEscribenMucho = usuarios.filter(usuario => {
            const postsUsuario = this.postRepo.obtenerPostsPorUsuario(usuario.id);
            
            if (postsUsuario.length === 0) return false;
            
            // Contar posts que alcanzan el 90% de 3000 caracteres (2700 caracteres)
            const postsLargos = postsUsuario.filter(post => post.cuerpo.length >= 2700);
            
            // Al menos el 70% de sus posts deben ser largos
            const porcentaje = (postsLargos.length / postsUsuario.length) * 100;
            return porcentaje >= 70;
        });

        const usuariosInfo = usuariosQueEscribenMucho.map(usuario => {
            const postsUsuario = this.postRepo.obtenerPostsPorUsuario(usuario.id);
            const postsLargos = postsUsuario.filter(post => post.cuerpo.length >= 2700);
            const porcentaje = Math.round((postsLargos.length / postsUsuario.length) * 100);
            
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                totalPosts: postsUsuario.length,
                postsLargos: postsLargos.length,
                porcentajePostsLargos: porcentaje
            };
        });

        res.status(200).json({
            success: true,
            cantidad: usuariosInfo.length,
            usuariosQueEscribenMucho: usuariosInfo
        });
    }

    obtenerPostMasLikeadoDelDia(req, res) {
        const fecha = req.params.fecha;
        const postMasLikeado = this.postRepo.obtenerPostMasLikeadoDelDia(fecha);
        
        if (!postMasLikeado) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron posts para la fecha especificada."
            });
        }

        const autor = this.usuarioRepo.buscarPorId(postMasLikeado.autorId)[0];
        
        res.status(200).json({
            success: true,
            fecha: fecha,
            postMasLikeado: {
                ...postMasLikeado,
                autor: {
                    id: autor.id,
                    nombre: autor.nombre,
                    apellido: autor.apellido
                },
                totalLikes: postMasLikeado.obtenerCantidadLikes()
            }
        });
    }

    obtenerPostMasComentadoDelDia(req, res) {
        const fecha = req.params.fecha;
        const postMasComentado = this.postRepo.obtenerPostMasComentadoDelDia(fecha);
        
        if (!postMasComentado) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron posts para la fecha especificada."
            });
        }

        const autor = this.usuarioRepo.buscarPorId(postMasComentado.autorId)[0];
        
        res.status(200).json({
            success: true,
            fecha: fecha,
            postMasComentado: {
                ...postMasComentado,
                autor: {
                    id: autor.id,
                    nombre: autor.nombre,
                    apellido: autor.apellido
                },
                totalComentarios: postMasComentado.obtenerCantidadComentarios()
            }
        });
    }

    obtenerPostsConMasDeXComentarios(req, res) {
        const limite = parseInt(req.params.limite);
        const posts = this.postRepo.obtenerPostsConMasDeXComentarios(limite);
        
        const postsInfo = posts.map(post => {
            const autor = this.usuarioRepo.buscarPorId(post.autorId)[0];
            return {
                ...post,
                autor: {
                    id: autor.id,
                    nombre: autor.nombre,
                    apellido: autor.apellido
                },
                totalComentarios: post.obtenerCantidadComentarios()
            };
        });

        res.status(200).json({
            success: true,
            limite: limite,
            cantidad: postsInfo.length,
            posts: postsInfo
        });
    }

    obtenerPostsConMasDeXLikes(req, res) {
        const limite = parseInt(req.params.limite);
        const posts = this.postRepo.obtenerPostsConMasDeXLikes(limite);
        
        const postsInfo = posts.map(post => {
            const autor = this.usuarioRepo.buscarPorId(post.autorId)[0];
            return {
                ...post,
                autor: {
                    id: autor.id,
                    nombre: autor.nombre,
                    apellido: autor.apellido
                },
                totalLikes: post.obtenerCantidadLikes()
            };
        });

        res.status(200).json({
            success: true,
            limite: limite,
            cantidad: postsInfo.length,
            posts: postsInfo
        });
    }
}