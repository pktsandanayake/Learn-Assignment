import "./App.css";
import api from "../src/services/webApi";
import { useEffect, useState } from "react";
import { todo } from "./Interfaces/todo";
import ToDoList from "./components/ToDos/ToDoList";
import FilterPanel from "./components/Filters/FilterPanel";
const App = () => {
  const [todos, setToDos] = useState<todo[]>([]);

  useEffect(() => {
    api
      .getToDosByDate("2025-03-25")
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <FilterPanel />
      <ToDoList todos={todos} setToDos={setToDos} />
    </div>
  );
};

export default App;
