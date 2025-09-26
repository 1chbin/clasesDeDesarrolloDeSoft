import { repositorio } from "../app.js";

export class Service {

    obtenerTareas(req, res){
        const tareas = repositorio.obtenerTareas();
        res.status(200).json({
            success: true,
            tareas: tareas
        })
    }

    agregarTarea(req, res){
        const {titulo, fechaVencimiento} = req.body;

        const id = repositorio.obtenerUltimoIdTarea();

        const tarea = {
            titulo, 
            fechaVencimiento, 
            id,
            completada: false
        }

        if(!titulo || titulo.length < 3){
            res.status(400).json({
                success: false,
                error: "Titulo no valido"
            })
        } else if (!fechaVencimiento || new Date(fechaVencimiento) <= new Date()){
            res.status(400).json({
                success: false,
                error: "fecha no valida"
            })
        } else {
            repositorio.crearTarea(tarea);
            res.status(201).json({
                success: true,
                tarea: tarea
            })
        }

    }

    filtrarTareas(req,res){
        let tareas = repositorio.obtenerTareas();
        let tareasListadas = req.body;

        if (new Date(tareasListadas.fechaDesde) > new Date(tareasListadas.fechaHasta)) {
            return res.status(400).json({
                success: false,
                error: "Fechas erroneas"
            })
        }


        if (tareasListadas.fechaDesde) {
            tareas = tareas.filter(t => new Date(tareasListadas.fechaDesde) <= new Date(t.fechaVencimiento)) 
        } 
        if (tareasListadas.fechaHasta) {
            tareas = tareas.filter(t => new Date(tareasListadas.fechaHasta) >= new Date(t.fechaVencimiento)) 
        }
        if (tareasListadas.titulo) {
            tareas = tareas.filter(t => tareasListadas.titulo === t.titulo)
        }


        res.status(200).json({
            success: true,
            tareas: tareas
        })
    }

    completarTarea(req, res) {
        const id = req.params.id;
        let tarea = repositorio.obtenerTareaPorId(id);

        if (!tarea) {
            return res.status(400).json({
                success: false,
                error: "No existe esa tarea"
            })
        }

        if (tarea.completada) {
            return res.status(400).json({
                success: false,
                error: "Ya esta completada"
            })
        }

        tarea.completada = true;

        res.status(200).json({
            success: true,
            tarea: tarea
        })
    }
}