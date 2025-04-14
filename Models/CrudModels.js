import { json } from "express"
import fs from "fs/promises"
import { randomUUID } from "crypto"

export class CrudModel {
    static async CreateTask(task){
        const newtask = {
            id: randomUUID(),
            task: task,
        }
        try{
            const data = await fs.readFile('../db/db.json', 'utf-8')
            const tasks = JSON.parse(data)
            tasks.push(newtask)
            
            const result = await fs.writeFile('../db/db.json', JSON.stringify(tasks))
            return {
                success: true,
                message: 'Tarea creada correctamente',
                task: newtask,
            }
        }catch(error){
            if(error instanceof Error){
                console.error("Ups ", error , " creating the task")
            }
        }
    }
    static async GetAllTask(){
        const data = await fs.readFile('../db/db.json', 'utf-8')
        if(!data){
            return{
                error: true,
                message: 'No se han encontrado el archivo con las tareas',
            }
        }
        const tasks = JSON.parse(data)
        return{
            success: true,
            message: 'Tareas obtenidas correctamente',
            tasks: tasks,
        }
    }
    static async DeleteTask(id){
        try{
            const data = await fs.readFile('../db/db.json', 'utf-8')
            const dataParse = JSON.parse(data)
            const result = dataParse.findIndex(position => position.id === id)
            if(result === -1){
                return{
                    error: true,
                    message: 'No se ha podido encontrar la tarea',
                }
            }
            const Taskdelete = dataParse.filter(result => result.id !== id)
            await fs.writeFile('../db/db.json', JSON.stringify(Taskdelete))
            return {
                success: true,
                message: 'Tarea eliminada correctamente',
            }
        }catch(error){
            if(error instanceof Error){
                console.error("Ups error: ", error , " when deleting the task")
            }
        }
    }
    static async UpdateTask(id, newtask){
        try{
            const data = await fs.readFile('../db/db.json', 'utf-8')
            const dataParse = JSON.parse(data)
            console.log(dataParse)
            const taskUpdate = dataParse.findIndex(position => position.id === id)
            if(taskUpdate === -1){
                return{
                    error: true,
                    message: 'No se ha podido encontrar la tarea',
                }
            }
            dataParse[taskUpdate].task = newtask
            await fs.writeFile('../db/db.json', JSON.stringify(dataParse))
            return {
                    success: true,
                    message: 'Tarea actualizada correctamente',
                    
            }
            
    }catch(error){
            if(error instanceof Error){
                console.error("Ups error: ", error , " when updating the task")
            }
        }
}
}

(async ()=>{
    const result = await CrudModel.GetAllTask()
    console.log(result)
})()




