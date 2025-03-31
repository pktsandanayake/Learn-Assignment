import React, { SetStateAction } from "react";
import { todo } from "../../Interfaces/todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../Filters/Images/edit.png";
import "../ToDos/Style.css";
import EditToDoModal from "../Modals/EditToDoModal";
interface props {
  todos: todo[];

  editToDo: (e: any) => void;
  deleteDoTo: (e: any) => void;
  doneDoTo: (e: any) => void;
}
const ToDoList = ({ todos, editToDo, deleteDoTo, doneDoTo }: props) => {
  return (
    <div>
      <div className="resp-table">
        <div className="resp-table-header">
          <div className="table-header-cell">Date</div>
          <div className="table-header-cell">Title</div>
          <div className="table-header-cell">Status</div>
          <div className="table-header-cell">Priority</div>
          <div className="table-header-cell">Action</div>
          <div className="table-body-cell"></div>
          <div className="table-body-cell"></div>
        </div>
        <div className="resp-table-body">
          {todos?.map((todo) => (
            <div className="resp-table-row" key={todo._id}>
              <div className="table-body-cell">{todo.date}</div>
              <div className="table-body-cell">{todo.title}</div>
              <div className="table-body-cell">{todo.status}</div>
              <div className="table-body-cell">{todo.priority}</div>
              <div className="table-body-cell">
                <span className="icon">
                  <img
                    src={require("../Filters/Images/edit.png")}
                    onClick={() => editToDo(todo)}
                  />
                </span>
              </div>
              <div className="table-body-cell">
                <span className="icon">
                  <img
                    src={require("../Filters/Images/delete.png")}
                    onClick={() => deleteDoTo(todo._id)}
                  />
                </span>
              </div>
              <div className="table-body-cell">
                <span className="icon">
                  <img
                    src={require("../Filters/Images/done.png")}
                    onClick={() => doneDoTo(todo)}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
