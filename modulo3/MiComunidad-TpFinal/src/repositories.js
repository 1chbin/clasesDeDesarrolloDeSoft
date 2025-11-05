import { RepositorioDeUsuarios } from './repository/usuariosRepositorio.js';
import { RepositorioDeSolicitudesAmistad } from './repository/solicitudAmistadRepositorio.js';
import { RepositorioDePosts } from './repository/postRepositorio.js';

// Instancias globales de repositorios para compartir datos
export const usuarioRepo = new RepositorioDeUsuarios();
export const solicitudAmistadRepo = new RepositorioDeSolicitudesAmistad();
export const postRepo = new RepositorioDePosts();