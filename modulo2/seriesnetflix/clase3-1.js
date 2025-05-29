

const fs = require('fs');

function leerSeries(){
    const seriesJSON = fs.readFileSync('series_netflix.json', 'utf-8');
    return JSON.parse(seriesJSON);
}
const series = leerSeries();


//vamos a mostrar por pantalla todas las series cuyo genero sea de terror
// function seriesDeTerror(){
//     for (let i = 0; i < series.length; i++) {
//         const serieActual = series[i];
//         if (serieActual.genero == "Terror") {
//             console.log(serieActual);
//         }
//     }
// }

function seriesDeTerror(){
    return series.filter(series => series.genero === "Terror");
}
//console.log(seriesDeTerror());  

//mostrar por pantalla todas las series que tengan 3 o mas temporadas y sean del año 2017 en adelante
function seriesConTresOMasTemporadasNuevas(){
    return series.filter(series => series.cant_temporadas > 3 && series.anio > 2017);
}
//console.log(seriesConTresOMasTemporadasNuevas());


//obtener la cantidad total de visitas de las series de ciencia ficcion
function totalDeVisitasCienciaFiccion() {
    const seriesCienciaFiccion = series.filter(series => series.genero === "Ciencia ficción");

    return seriesCienciaFiccion.reduce((acumulador, serieActual) => 
        acumulador + serieActual.cant_visitas, 0
    );
}
console.log(totalDeVisitasCienciaFiccion());

//Obtener el promedio de cantidad de visitas de las series cuyo genero sean drama y su año de filmacion este comprendido entre 2012 y 2020
function promedioDeVistasDrama() {
    const seriesDrama = series.filter(series => series.genero == "Drama" && series.anio >= 2012 && series.anio <= 2020);

    const totalVisitasDrama = seriesDrama.reduce((acumulador, series) => 
        acumulador + series.cant_visitas, 0
    );
    const totalVisitas = series.reduce((acumulador, series) => 
        acumulador + series.cant_visitas, 0
    );

    return totalVisitasDrama / totalVisitas;
}
//console.log(promedioDeVistasDrama());

//Crear una funcion que nos figa si todas las series del genero drama que hayan sido filmadas entre el año 2012 y 2020 tienen titulo que comienzan con la letra "A"

function todasLasSeriesDramaConA() {
    const seriesDramaConA = series.filter(series => series.genero == "Drama" && series.anio >= 20 && series.anio <= 2020 && series.nombre.startsWith("A"));
    return seriesDramaConA;
}
//console.log(todasLasSeriesDramaConA());


