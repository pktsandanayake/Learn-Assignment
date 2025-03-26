import express from "express";
import ToDoController from "../Controllers/ToDoController";

const router = express.Router();

router.get("/todos", ToDoController.getAllToDos);
router.get("/todo/:id", ToDoController.getToDo);
router.post("/todo", ToDoController.createToDo);
router.post("/todos", ToDoController.createToDos);
router.put("/todo/:id", ToDoController.updateToDo);
router.delete("/todo/:id", ToDoController.deleteToDo);

export default router;
