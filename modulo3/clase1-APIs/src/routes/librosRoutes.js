import express from 'express';
import { openLibraryService } from '../services/openLibraryService.js';
import { serviceInterno } from '../services/serviceInterno.js';

const router = express.Router();
const externo = new openLibraryService();
const interno = new serviceInterno();

router.get('/', async (req, res) => {
    const { titulo, autor, genero } = req.query;

    if (!titulo && !autor && !genero) {
        return res.status(400).json({ error: "Debes enviar titulo, autor o genero como query param." });
    }

    try {
        // Buscar en local (solo coincidencias exactas)
        const librosLocales = (await interno.buscarLibros({ titulo, autor, genero }))
            .map(libro => ({ ...libro, fuente: 'local' }));

        // Buscar en OpenLibrary
        let resultadoExterno;
        if (titulo) resultadoExterno = await externo.buscarLibros(titulo);
        else if (autor) resultadoExterno = await externo.buscarAutor(autor);
        else if (genero) resultadoExterno = await externo.buscarGenero(genero);

        const docs = resultadoExterno?.docs || resultadoExterno?.works || [];
        
        // Separar exactos y parecidos (solo para externos)
        let librosExactosExternos = [];
        let librosParecidosExternos = [];

        if (titulo) {
            librosExactosExternos = docs
                .filter(doc => doc.title && doc.title.toLowerCase() === titulo.toLowerCase())
                .map(doc => ({
                    titulo: doc.title,
                    autor: doc.author_name ? doc.author_name.join(', ') : '',
                    año: doc.first_publish_year || '',
                    fuente: 'externa'
                }));
            
            librosParecidosExternos = docs
                .filter(doc => doc.title && 
                    doc.title.toLowerCase().includes(titulo.toLowerCase()) && 
                    doc.title.toLowerCase() !== titulo.toLowerCase())
                .map(doc => ({
                    titulo: doc.title,
                    autor: doc.author_name ? doc.author_name.join(', ') : '',
                    año: doc.first_publish_year || '',
                    fuente: 'externa'
                }));
        } else {
            // Para autor y género, todos se consideran exactos
            librosExactosExternos = docs.map(doc => ({
                titulo: doc.title,
                autor: doc.author_name ? doc.author_name.join(', ') : (doc.authors ? doc.authors.map(a => a.name).join(', ') : ''),
                año: doc.first_publish_year || '',
                fuente: 'externa'
            }));
        }

        res.json({
            exactos: [...librosLocales, ...librosExactosExternos],
            parecidos: librosParecidosExternos
        });

    } catch (error) {
        console.error('Error en búsqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export { router as librosRoutes };