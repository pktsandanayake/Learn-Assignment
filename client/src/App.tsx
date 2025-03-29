import "./App.css";
import api from "../src/services/webApi";
import { useEffect, useState } from "react";
import { todo } from "./Interfaces/todo";
import ToDoList from "./components/ToDos/ToDoList";
import FilterPanel from "./components/Filters/FilterPanel";
const App = () => {
  const [todos, setToDos] = useState<todo[]>([]);
  const [priority, setPriority] = useState<string>("High");
  const [status, setStatus] = useState<string>("Done");
  const [interval, setInterval] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  useEffect(() => {
    api
      .getToDosByFilter(priority, status, searchText)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  }, [priority, status, searchText]);

  return (
    <div>
      <FilterPanel
        setPriority={setPriority}
        setStatus={setStatus}
        setInterval={setInterval}
        setSearchText={setSearchText}
      />
      <ToDoList todos={todos} setToDos={setToDos} />
    </div>
  );
};

export default App;
