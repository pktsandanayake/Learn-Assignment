import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  dependancy: { type: Array, required: false },
});

export const ToDoModel = mongoose.model("ToDo", ToDoSchema);
