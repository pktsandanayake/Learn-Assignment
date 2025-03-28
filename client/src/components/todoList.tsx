import React, { SetStateAction } from "react";
import { todo } from "../Interfaces/todo";
interface props {
  todos: todo[];
  setTodos: React.Dispatch<SetStateAction<todo[]>>;
}
const todoList: React.FC<props> = ({ todos, setTodos }) => {
  return (
    <div>
      {" "}
      <ul>
        {todos?.map((ele) => (
          <li key={ele._id}>
            <span className="tdWidth">{ele.date}</span>
            <span className="tdWidth">{ele.title}</span>
            <span className="tdWidth">{ele.priority}</span>
            <span className="tdWidth">{ele.status}</span>
            <ul>
              {ele?.dependancy?.map((dep, index) => (
                <li key={index}>
                  <span className="tdWidth">{dep}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default todoList;
