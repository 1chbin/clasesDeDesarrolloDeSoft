import { Post } from '../models/post.js';
import { Comentario } from '../models/comentario.js';
import { usuarioRepo, postRepo } from '../repositories.js';

export class PostService {
    constructor() {
        this.postRepo = postRepo;
        this.usuarioRepo = usuarioRepo;
    }

    crearPost(req, res) {
        const { titulo, cuerpo, autorId } = req.body;

        // Validaciones
        if (!titulo || !cuerpo || !autorId) {
            return res.status(400).json({
                success: false,
                message: "Título, cuerpo y autor son obligatorios."
            });
        }

        if (cuerpo.length > 3000) {
            return res.status(400).json({
                success: false,
                message: "El cuerpo del post no puede contener más de 3000 caracteres."
            });
        }

        // Verificar que el usuario existe
        const usuario = this.usuarioRepo.buscarPorId(autorId);
        if (usuario.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        // Verificar límite diario de posts
        if (!usuario[0].puedePublicarHoy()) {
            return res.status(400).json({
                success: false,
                message: "Has alcanzado el límite diario de 5 posts."
            });
        }

        const id = Date.now().toString();
        const post = new Post(id, titulo, cuerpo, autorId);
        this.postRepo.guardar(post);
        
        // Registrar el post en el usuario
        usuario[0].registrarPostHoy();

        res.status(201).json({
            success: true,
            message: "Post creado exitosamente.",
            post: post
        });
    }

    obtenerPosts(req, res) {
        const usuarioId = req.query.usuarios;
        
        if (usuarioId) {
            const posts = this.postRepo.obtenerPostsPorUsuario(usuarioId);
            return res.status(200).json({
                success: true,
                posts: posts
            });
        }

        const todosPosts = this.postRepo.obtenerTodos();
        res.status(200).json({
            success: true,
            posts: todosPosts
        });
    }

    obtenerPostPorId(req, res) {
        const id = req.params.id;
        const post = this.postRepo.buscarPorId(id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post no encontrado."
            });
        }

        res.status(200).json({
            success: true,
            post: post
        });
    }

    darLike(req, res) {
        const postId = req.params.id;
        const { usuarioId } = req.body;

        if (!usuarioId) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario es obligatorio."
            });
        }

        // Verificar que el usuario existe
        const usuario = this.usuarioRepo.buscarPorId(usuarioId);
        if (usuario.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        const post = this.postRepo.buscarPorId(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post no encontrado."
            });
        }

        const likeAgregado = post.agregarLike(usuarioId);
        if (!likeAgregado) {
            return res.status(400).json({
                success: false,
                message: "El usuario ya ha dado like a este post."
            });
        }

        res.status(200).json({
            success: true,
            message: "Like agregado exitosamente.",
            totalLikes: post.obtenerCantidadLikes()
        });
    }

    obtenerLikes(req, res) {
        const postId = req.params.id;
        const post = this.postRepo.buscarPorId(postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post no encontrado."
            });
        }

        const likesDetallados = post.likes.map(like => {
            const usuario = this.usuarioRepo.buscarPorId(like.usuarioId)[0];
            return {
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido
                },
                fecha: like.fecha
            };
        });

        res.status(200).json({
            success: true,
            totalLikes: post.obtenerCantidadLikes(),
            likes: likesDetallados
        });
    }

    crearComentario(req, res) {
        const postId = req.params.id;
        const { contenido, autorId } = req.body;

        if (!contenido || !autorId) {
            return res.status(400).json({
                success: false,
                message: "Contenido y autor son obligatorios."
            });
        }

        if (contenido.length > 1000) {
            return res.status(400).json({
                success: false,
                message: "El comentario no puede contener más de 1000 caracteres."
            });
        }

        // Verificar que el usuario existe
        const usuario = this.usuarioRepo.buscarPorId(autorId);
        if (usuario.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        const post = this.postRepo.buscarPorId(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post no encontrado."
            });
        }

        const comentarioId = Date.now().toString();
        const comentario = new Comentario(comentarioId, contenido, autorId, postId);
        post.agregarComentario(comentario);

        res.status(201).json({
            success: true,
            message: "Comentario agregado exitosamente.",
            comentario: comentario
        });
    }

    obtenerComentarios(req, res) {
        const postId = req.params.id;
        const post = this.postRepo.buscarPorId(postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post no encontrado."
            });
        }

        const comentariosDetallados = post.comentarios.map(comentario => {
            const usuario = this.usuarioRepo.buscarPorId(comentario.autorId)[0];
            return {
                ...comentario,
                autor: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido
                }
            };
        });

        res.status(200).json({
            success: true,
            totalComentarios: post.obtenerCantidadComentarios(),
            comentarios: comentariosDetallados
        });
    }
}