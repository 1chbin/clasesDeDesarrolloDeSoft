

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
function VistasDeFiccion(){
    return
}


//Obtener el promedio de cantidad de visitas de las series cuyo genero sean drama y su año de filmacion este comprendido entre 2012 y 2020


