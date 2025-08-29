import { openLibraryService } from '../services/openLibraryService.js';
import express from 'express';

const router = express.Router();
const service = new openLibraryService();

router.get("/libros", async (req, res) => {
    const { titulo, autor, genero } = req.query;

    if (titulo) {
        const libros = await service.buscarLibros(titulo);
        res.json({ libros });
    } else if (autor) {
        const autorData = await service.buscarAutor(autor);
        res.json({ autor: autorData });
    } else if (genero) {
        const generoData = await service.buscarGenero(genero);
        res.json({ genero: generoData });
    } else {
        res.status(400).json({ error: "Debes enviar titulo, autor o genero como query param." });
    }
});

export { router as openLibraryRoutes };