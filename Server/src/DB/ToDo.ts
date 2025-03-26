import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
});

export const ToDoModel = mongoose.model("ToDo", ToDoSchema);
