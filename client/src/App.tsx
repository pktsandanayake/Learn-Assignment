import "./App.css";
import api from "../src/services/webApi";
import { useEffect, useState } from "react";
import { todo } from "./Interfaces/todo";
import ToDoList from "./components/ToDos/ToDoList";
import FilterPanel from "./components/Filters/FilterPanel";
import _debounce from "lodash/debounce";
import CreateToDos from "./components/CreateToDos";
const App = () => {
  const [todos, setToDos] = useState<todo[]>([]);
  const [dependencyToDos, setDependencyToDos] = useState<todo[]>([]);

  const [priority, setPriority] = useState<string>("High");
  const [status, setStatus] = useState<string>("Done");
  const [interval, setInterval] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const [priorityForSave, setPriorityForSave] = useState<string>("High");
  const [intervalForSave, setIntervalForSave] = useState<string>("");
  const [searchTextForSave, setSearchTextForSave] = useState<string>("");
  const editToDo = (e: any) => {
    api
      .editTodos(e)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  const deleteDoTo = (e: any) => {
    api
      .deleteTodo(e)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const doneDoTo = (e: any) => {
    console.log("Done object", e);
    api
      .getToDosByDependency(e)
      .then((data) => console.log("Done.....", data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    api
      .getToDosByFilter(priority, status, searchText)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  }, [priority, status, searchText]);

  const handleInsert = () => {
    alert("Testing app....");
    // api
    //   .saveTodos()
    //   .then((e) => console.log("Data saved", e))
    //   .catch((error) => console.log(error));
  };

  return (
    <div>
      {/* <button onClick={handleInsert}>Insert</button> */}
      <FilterPanel
        setPriority={setPriority}
        setStatus={setStatus}
        setInterval={setInterval}
        setSearchText={setSearchText}
      />
      <ToDoList
        todos={todos}
        editToDo={editToDo}
        deleteDoTo={deleteDoTo}
        doneDoTo={doneDoTo}
      />
      <CreateToDos
        setPriority={setPriorityForSave}
        setInterval={setIntervalForSave}
        setSearchText={setSearchTextForSave}
        handleInsert={handleInsert}
      />
    </div>
  );
};

export default App;
