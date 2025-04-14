import { CrudModel } from "../Models/CrudModels.js";

export class CrudController{
    static async CreateTask(req,res){
        const {task} = req.body
        const response = await CrudModel.CreateTask(task)
        if(!response){
            res.status(404).json({
                status: 404,
                error: "No se pudo crear la tarea"
            })
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Tarea Creada correctamente"
        })
    }
    static async getallTask(req,res){
        const result = await CrudModel.GetAllTask()
        console.log(result)
        if(!result){
            res.status(404).json({
                status: 404,
                error: "No se han encontrado tareas"
            })
            return;
        }
        const tasks = result.tasks
        res.status(200).json({
            status: 200,
            message: "Tareas obtenidas correctamente",
            data: tasks,
        })
        
    }
    static async deleteTask(req,res){
        const {id} = req.params
        const result = await CrudModel.DeleteTask(id)
        if(!result){
            res.status(404).json({
                status: 404,
                error: "No se ha podido eliminar la tarea"
            })
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Tarea eliminada correctamente",
        })
    }
    static async updateTask(req,res){
        const {id} = req.params
        const task = req.body.task
        const result = await CrudModel.UpdateTask(id,task)
        if(!result){
            res.status(404).json({
                status: 404,
                error: "No se ha podido actualizar la tarea"
            })
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Tarea actualizada correctamente",
            task: result.task,
        })
    }
}