class Plataforma{
    constructor(nombre){
        this.nombre;    
        this.serie;
    }

    //PLATAFORMAS, de cada plataforma nos interesa saber su nombre y las series que nos ofrece, por cada plataforma queremos saber si tiene buen contenido cuando el promedio de sus series buenas es mayor a 6

    seriesBuenas(){
        return this.series.filter(serie=> serie.esBuena());
    }

    promedioSeriesBuenas(){
        return this.seriesBuenas().lenght / this.series.lenght;
    }

    tieneBuenContenido(){
        return promedioSeriesBuenas()* 10 < 6;
    }

    //Tambien nos interesa saber si una plataforma nos ofrece contenido pauperrimo, esta lo ofrece si mas del 45% de todas sus series son pauperrimas.

    seriesPauperrimas(){
        return this.series.filter(serie=> serie.esPauperrima());
    }

    promedioSeriesPauperrimas(){
        return this.seriesBuenas().lenght / this.series.lenght;
    }

    tieneContenidoPauperrimo(){
        return promedioSeriesBuenas()* 100 < 45;
    }
}

module.exports = Plataforma;
