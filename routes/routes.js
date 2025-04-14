import { Router } from "express";
import { CrudController } from "../controllers/CrudControllers";

const router = Router()

router.get('/', CrudController.getallTask)
router.post('/', CrudController.CreateTask)
router.delete('/:id', CrudController.deleteTask)
router.put('/:id', CrudController.updateTask)