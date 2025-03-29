import React, { SetStateAction } from "react";
import { todo } from "../../Interfaces/todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../Filters/Images/edit.png";
import "../ToDos/Style.css";
interface props {
  todos: todo[];
  setToDos: React.Dispatch<SetStateAction<todo[]>>;
}
const ToDoList: React.FC<props> = ({ todos, setToDos }) => {
  return (
    <div className="resp-table">
      <div className="resp-table-header">
        <div className="table-header-cell">Date</div>
        <div className="table-header-cell">Title</div>
        <div className="table-header-cell">Status</div>
        <div className="table-header-cell">Priority</div>
        <div className="table-header-cell">Action</div>
      </div>
      <div className="resp-table-body">
        {todos?.map((todo) => (
          <div className="resp-table-row" key={todo._id}>
            <div className="table-body-cell">{todo.date}</div>
            <div className="table-body-cell">{todo.title}</div>
            <div className="table-body-cell">{todo.status}</div>
            <div className="table-body-cell">{todo.priority}</div>
            <div className="table-body-cell">
              {/* <div className="resp-table-body">
                <div className="resp-table-row">
                  <span className="icon">E</span>
                  <br />
                  <span className="icon">D</span>
                  <br />
                  <span className="icon">D</span>
                </div>
              </div> */}
              {/* <span>
                <img
                  src="../Filters/Images/edit.png"
                  alt="sdwqdwqd"
                  width="10px"
                  height="10px"
                ></img>
              </span> */}
              {/* <span className="icon">
                <AiFillEdit />
              </span>
              <span className="icon">
                <AiFillDelete />
              </span>
              <span className="icon">
                <MdDone />
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
