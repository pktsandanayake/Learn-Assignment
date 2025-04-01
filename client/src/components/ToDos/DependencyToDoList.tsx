import { useState } from "react";
import { todo } from "../../Interfaces/todo";
import "../Filters/Images/edit.png";
import "../ToDos/Style.css";
import { dependency } from "@/src/Interfaces/dependency";

interface props {
  todos: todo[];
  setDependencies: React.Dispatch<React.SetStateAction<dependency>>;
  onClose: () => void;
}
const ArrToDo: todo[] = [];
const ArrIds: string[] = [];
const DependencyToDoList = ({ todos, setDependencies, onClose }: props) => {
  const [selectedDependecy, setSelectedDependencyList] = useState<dependency>({
    Ids: [],
    Objects: [],
  });

  const ItemRemove = (Arr: any, obj: any) => {
    const index = Arr.indexOf(obj);

    return Arr.splice(index, 1);
  };

  const handleCheckbox = (e: any, todo: todo) => {
    if (e) {
      ArrToDo.push(todo);
      ArrIds.push(todo._id.toString());
      selectedDependecy.Objects = ArrToDo;
      selectedDependecy.Ids = ArrIds;
      setSelectedDependencyList(selectedDependecy);
    } else {
      ItemRemove(ArrToDo, todo);
      ItemRemove(ArrIds, todo._id.toString());
      selectedDependecy.Objects = ArrToDo;
      selectedDependecy.Ids = ArrIds;
      setSelectedDependencyList(selectedDependecy);
    }
  };

  const handleSave = () => {
    setDependencies(selectedDependecy);
    onClose();
  };
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
                <input
                  type="checkbox"
                  id={todo._id}
                  onChange={(e) => handleCheckbox(e.target.checked, todo)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="resp-table-row">
          <div className="table-body-cell-non">
            <button className="save-button" onClick={() => handleSave()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependencyToDoList;
