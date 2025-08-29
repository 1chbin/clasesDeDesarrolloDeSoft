import { openLibraryService } from '../services/openLibraryService.js';
import express from 'express';

const router = express.Router();
const service = new openLibraryService();

router.get("/libros", async (req, res) => {
    const { titulo, autor, genero } = req.query;

    if (titulo) {
        // BASE LOCAL
        const librosLocales = await buscarLibrosLocales(titulo);
        // OpenLibrary
        const resultadoOL = await service.buscarLibros(titulo);
        let librosExternos = [];
        let librosParecidos = [];
        if (resultadoOL && resultadoOL.docs) {
            librosExternos = resultadoOL.docs.filter(doc => doc.title && doc.title.toLowerCase() === titulo.toLowerCase())
                .map(doc => ({
                    titulo: doc.title,
                    autor: doc.author_name ? doc.author_name.join(', ') : '',
                    año: doc.first_publish_year || '',
                    fuente: 'externa'
                }));
            librosParecidos = resultadoOL.docs.filter(doc => doc.title && doc.title.toLowerCase().includes(titulo.toLowerCase()) && doc.title.toLowerCase() !== titulo.toLowerCase())
                .map(doc => ({
                    titulo: doc.title,
                    autor: doc.author_name ? doc.author_name.join(', ') : '',
                    año: doc.first_publish_year || '',
                    fuente: 'externa-parecido'
                }));
        }
        res.json({
            exactos: [...librosLocales, ...librosExternos],
            parecidos: librosParecidos
        });
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

async function buscarLibrosLocales(titulo) {
    try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.resolve('c:/Users/windows/Desktop/Carpetas/ClasesDeDesarrollo/clasesDeDesarrolloDeSoft/modulo3/clase1-APIs/libros.json');
        const data = fs.readFileSync(filePath, 'utf8');
        if (!data) return [];
        const librosJson = JSON.parse(data);
        return librosJson.filter(libro => libro.titulo && libro.titulo.toLowerCase() === titulo.toLowerCase())
            .map(libro => ({ ...libro, fuente: 'local' }));
    } catch {
        return [];
    }
}


export { router as openLibraryRoutes };