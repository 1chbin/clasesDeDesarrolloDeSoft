const Serie = require('./serie');
const Reseña = require('./reseña');

const eternauta = new Serie("El eternauta", 1, "Ciencia ficción", 2025, 800000);

const workAmong = new Serie("Work among", 8 , "Terror", 2023, 219129);

console.log(eternauta.nombre, eternauta.genero, eternauta.tengoUnNombreLargo(), eternauta.fueFilmadaEntreLosAnios(2000, 2026));

console.log(workAmong.nombre, workAmong.genero, workAmong.tengoUnNombreLargo(), workAmong.fueFilmadaEntreLosAnios(2000, 2010));

const fs = require('fs');
const data = fs.readFileSync('series_netflix.json', 'utf8');
const seriesJson = JSON.parse(data);

const series = seriesJson.map((serie) => new Serie(
    serie.nombre,
    serie.cant_temporadas,
    serie.genero,
    serie.anio,
    serie.cant_visitas,
));


//series.forEach((serie) => console.log("Detalle " , serie.detalleCompleto() , " Es Buena? " , serie.esBuenaONo() , " Es interminable?" , serie.esInterminable()));

//series.forEach((serie) => console.log(serie.esBuenaONo()));

//series.forEach((serie) => console.log(serie.esInterminable()))


const resenia1 = new Reseña(8, "Estuvo muy buena!");
const resenia2 = new Reseña(4, "No estuvo buena");

eternauta.recibirResenia(resenia1);
eternauta.recibirResenia(resenia2);

console.log(eternauta.esBuena());



//Nos interesa saber si una serie fue fuertemente recomendada, una serie es fuertemente recomendada si es buena y al menos 2 resenias superan los 1500 caracteres

//Nos interesa saber si una serie es Pauperrima/malisima

//Determinar si el promedio de puntajes de reseñas es menor a 4 y al menos una reseña contiene la frase "es una perdida de tiempo"

//PLATAFORMAS, de cada plataforma nos interesa saber su nombre y las series que nos ofrece, por cada plataforma queremos saber si tiene buen contenido cuando el promedio de sus series buenas es mayor a 6

//Tambien nos interesa saber si una plataforma nos ofrece contenido pauperrimo, esta lo ofrece si mas del 45% de todas sus series son pauperrimas.

