import express from 'express';
import { openLibraryRoutes } from './routes/openLibraryRoutes.js';
import { librosRoutes } from './routes/librosRoutes.js';
import { routeInterna } from './routes/routeInterna.js';
import { multimediaRoute } from './routes/multimediaRoute.js';

const app = express();

app.use(express.json());


app.use("/api/libros", librosRoutes);
app.use("/api/libros-interno", routeInterna)
app.use("/api/libros-externo", openLibraryRoutes);
app.use("/api/multimedia", multimediaRoute);


// app.get("/api/prueba", (req, res)=> {
//     console.log("Recibi una request");

//     res.json({ success: true })
// });

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
