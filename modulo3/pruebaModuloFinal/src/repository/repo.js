export class Repositorio {
    constructor() {
        this.tareas = [];
    }

    obtenerUltimoIdTarea(){
        return (this.tareas.length > 0 ?
            Math.max(...this.tareas.map( t => t.id)): 0
        ) + 1;
    }

    crearTarea(tarea){
        this.tareas.push(tarea)
    }

    obtenerTareas(){
        return this.tareas;
    }

    obtenerTareaPorId(id) {
        return this.tareas.find(t => t.id == id);
    }

    

}