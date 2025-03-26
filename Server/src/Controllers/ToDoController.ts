import express from "express";
import { ToDoModel } from "../DB/ToDo";
class ToDoController {
  getAllToDos = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const todos = await ToDoModel.find();
      return res.json({ data: todos });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  getToDo = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const todo = await ToDoModel.findById(id);
      return res.json({ data: todo });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  getToDoByDate = async (req: express.Request, res: express.Response) => {
    try {
      const { date } = req.params;
      const todos = await ToDoModel.find({
        date: date,
      });
      return res.json({ data: todos });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  createToDo = async (req: express.Request, res: express.Response) => {
    try {
      const { date } = req.body;

      if (Object.keys(req.body).length === 0) {
        return res.sendStatus(400);
      }
      const todo = await ToDoModel.collection.insertOne(req.body);

      return res.json({ message: "Todo has been created", data: todo });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  createToDos = async (req: express.Request, res: express.Response) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.sendStatus(400);
      }
      const todos = await ToDoModel.collection.insertMany(req.body);

      return res.json({ message: "Todo has been created", data: todos });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  updateToDo = async (req: express.Request, res: express.Response) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.sendStatus(400);
      }
      const { id } = req.params;
      const { timeStamp, title, status, priority } = req.body;

      const todo = await ToDoModel.findById(id);
      if (todo) {
        todo.timeStamp = timeStamp;
        todo.title = title;
        todo.status = status;
        todo.priority = priority;
        await todo.save();
        return res.json({ message: "Todo has been updated", data: todo });
      }

      return res.sendStatus(400);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  deleteToDo = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      await ToDoModel.findByIdAndDelete({ _id: id });
      return res.json({ message: "record deleted" });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  deleteToDos = async (req: express.Request, res: express.Response) => {
    try {
      const todos = await ToDoModel.collection.deleteMany();
      return res.json({ message: "All record deleted" });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
}

export default new ToDoController();
