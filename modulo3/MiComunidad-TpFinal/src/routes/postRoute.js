import express from 'express';
import { PostService } from '../services/postService.js';

const router = express.Router();
const postService = new PostService();

// POST /api/posts
router.post("/", (req, res) => {
    postService.crearPost(req, res);
});

// GET /api/posts?usuarios=id
router.get("/", (req, res) => {
    postService.obtenerPosts(req, res);
});

// GET /api/posts/:id
router.get("/:id", (req, res) => {
    postService.obtenerPostPorId(req, res);
});

// POST /api/posts/:id/like
router.post("/:id/like", (req, res) => {
    postService.darLike(req, res);
});

// GET /api/posts/:id/likes
router.get("/:id/likes", (req, res) => {
    postService.obtenerLikes(req, res);
});

// POST /api/posts/:id/comentarios
router.post("/:id/comentarios", (req, res) => {
    postService.crearComentario(req, res);
});

// GET /api/posts/:id/comentarios
router.get("/:id/comentarios", (req, res) => {
    postService.obtenerComentarios(req, res);
});

export { router as postRoute };