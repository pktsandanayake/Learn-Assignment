import express from "express";
import ToDoController from "../Controllers/ToDoController";

const router = express.Router();

router.get("/todos", ToDoController.getAllToDos);
router.get("/todo/:id", ToDoController.getToDo);
router.get("/todos/date/:date", ToDoController.getToDoByDate);
router.get(
  "/todos/filter/:priority/:status/:title",
  ToDoController.getToDosByFilter
);
router.get("/todos/dependency", ToDoController.getToDosByDependency);
router.post("/todo", ToDoController.createToDo);
router.post("/todos", ToDoController.createToDos);
router.put("/todo/:id", ToDoController.updateToDo);
router.delete("/todo/:id", ToDoController.deleteToDo);
router.delete("/todos", ToDoController.deleteToDos);

export default router;
