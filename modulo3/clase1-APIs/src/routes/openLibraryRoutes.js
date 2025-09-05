import { openLibraryService } from '../services/openLibraryService.js';
import express from 'express';

const router = express.Router();
const service = new openLibraryService();

router.get('/', async (req, res) => {
    const { titulo, autor, genero } = req.query;
    let resultado;
    if (titulo) resultado = await service.buscarLibros(titulo);
    else if (autor) resultado = await service.buscarAutor(autor);
    else if (genero) resultado = await service.buscarGenero(genero);
    else return res.status(400).json({ error: "Debes enviar titulo, autor o genero como query param." });

    const docs = resultado?.docs || resultado?.works || [];
    const libros = docs.map(doc => ({
        titulo: doc.title,
        autor: doc.author_name ? doc.author_name.join(', ') : (doc.authors ? doc.authors.map(a => a.name).join(', ') : ''),
        año: doc.first_publish_year || '',
        fuente: 'externa'
    }));
    res.json({ libros });
});

export { router as openLibraryRoutes };