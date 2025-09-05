import express from 'express';
import { openLibraryService } from '../services/openLibraryService.js';
import { serviceInterno } from '../services/serviceInterno.js';

const router = express.Router();
const externo = openLibraryService
// Ruta interna: busca solo en el JSON local
router.get('/', async (req, res) => {
	const { titulo, autor, genero } = req.query;
	let librosLocales = [];
	try {
		const fs = await import('fs');
		const path = await import('path');
		const filePath = path.resolve('c:/Users/windows/Desktop/Carpetas/ClasesDeDesarrollo/clasesDeDesarrolloDeSoft/modulo3/clase1-APIs/libros.json');
		const data = fs.readFileSync(filePath, 'utf8');
		if (data) {
			const librosJson = JSON.parse(data);
			if (titulo) {
				librosLocales = librosJson.filter(libro => libro.titulo && libro.titulo.toLowerCase() === titulo.toLowerCase());
			} else if (autor) {
				librosLocales = librosJson.filter(libro => libro.autor && libro.autor.toLowerCase() === autor.toLowerCase());
			} else if (genero) {
				librosLocales = librosJson.filter(libro => libro.genero && libro.genero.toLowerCase() === genero.toLowerCase());
			}
		}
	} catch {
		return res.status(500).json({ error: 'Error leyendo el archivo local.' });
	}
	res.json({ libros: librosLocales });
});

const interno = new serviceInterno();

router.post('/', (req, res) => {
    const data = req.body;

    interno.crearLibro(data);
    res.json({
        success: true
    });

    // try {
    //     await interno.crearLibro(data);
    //     res.json({ success: true });
    // } catch (error) {
    //     res.status(500).json({ error: 'No se pudo guardar el libro.' });
    // }
});


// /:id clave para que busque el id y lo puedas cambiar usando params

router.put("/:id", (req, res) =>{
    const id = req.params.id
    const data = req.body;

    interno.modificarLibro(id, data);
    res.json({
        success: true
    });
})

router.delete("/:id", (req, res) =>{
    const id = req.params.id

    interno.eliminarLibro(id);
    res.json({
        success: true
    });
})

export { router as routeInterna };



