import express from 'express';
import { openLibraryService } from './services/openLibraryService.js';
import { serviceInterno } from './services/serviceInterno.js';
import { routeInterna } from './routes/routeInterna.js';

const app = express();

app.use(express.json());

const externo = new openLibraryService();
const interno = new serviceInterno();

app.get('/api/libros', async (req, res) => {
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


// POST

app.use("/api/libros", routeInterna)


//
app.get("/api/prueba", (req, res)=> {
    console.log("Recibi una request");

    res.json({ success: true })
});

app.listen(3000, ()=> {
    console.log("Servidor levantado y listo para atender request")
})

//----------- SIN SERVICE DE ACA PARA ABAJO ---------------------------

// async function buscarOLID(query){

//     try{
//         const busqueda = await axios.get('https://openlibrary.org/books/' + query + '.json', {
//         })
//         return busqueda.data;
//     }
//     catch(error){
//         console.log("Ooopss! error");
//         return null;
//     }
// }

//const OLID = await buscarOLID("OL7353617M");
//console.log(OLID);


// async function buscarISBN(query, size){

//     try{
//         const busqueda = await axios.get('https://covers.openlibrary.org/b/isbn/' + query + '-' + size + '.jpg', {
//         })
//         return busqueda.data;
//     }
//     catch(error){
//         console.log("Ooopss! error");
//         return null;
//     }
// }

//const ISBN = await buscarISBN("9780747532699", "M");
//console.log(ISBN);
