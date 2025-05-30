class Reseña {
    constructor(puntaje, comentario){

        this.puntaje = puntaje;
        this.comentario = comentario;
    }

    esBuenaReseña(){
        return this.puntaje > 6 && this.comentario.length >= 300;
    }
}

module.exports = Reseña;