class Serie {
    constructor(nombre, cantTemporadas, genero, anio, cantVisitas){

        this.nombre = nombre;
        this.cantTemporadas = cantTemporadas;
        this.genero = genero;
        this.anio = anio;
        this.cantVisitas = cantVisitas;
        this.resenia = [];
    }

    recibirResenia(resenia){
        this.resenia.push(resenia);
    }
    //necesito un metodo para saber si la serie tiene un nombre largo, una serie tiene nombre largo si tiene mas de 15 caracteres

    tengoUnNombreLargo(){
        return this.nombre.length > 15;
    }

    //Fue filmada entre los años (parametros)

    fueFilmadaEntreLosAnios(anio1, anio2){
        return this.anio >=anio1 && this.anio <= anio2;
    }

    //detalle completo de cierta serie

    detalleCompleto(){
        return this.nombre + "-" + this.genero + "-" + this.anio + "-" + this.cantTemporadas + "-" + this.cantVisitas;
    }

    //ver si una serie es buena, es buena solo si tiene mas de 50.000.000 vistas
    // esBuenaONo(){
    //     return this.cantVisitas >= 50000000 && this.resenia.puntaje;
    // }

    //una serie es buena si la cantidad de visitas supera los 50M y el valor de los puntajes supera al 6

    cantidadDeVisitasSuperaA(numero){
        return this.cantVisitas > numero
    }

    promedioReseniasEsMayorA(promedio){
        const sumaDePuntajes = this.resenias.reduce((acumulador, resenia) => acumulador + resenia.puntaje, 0);
        const cantResenias = this.resenias.length;
        return (sumaDePuntajes / cantResenias) > promedio;
    }

    esBuena(){
        return this.cantidadDeVisitasSuperaA(50000000) && this.promedioReseniasEsMayorA(6);
    }


    //Devuelve en pantalla los nombres de las series interminables con mas de 5 temporadas
    esInterminable(){
        return this.cantTemporadas >= 5
    }

    //creamos las reseñas, cada reseña trndra un puntaje y descripcion lo que me interesa saber es si una reseña es positiva si tiene un puntaje mayor a 6 y una descripcion con 300 o mas caracteres

    agregarResenia(resenia){
        this.resenias.push(resenia);
    }

}

module.exports = Serie;

