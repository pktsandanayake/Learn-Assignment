import "./App.css";
import api from "../src/services/webApi";
import { useEffect, useState } from "react";
import { todo } from "./Interfaces/todo";
const App: React.FC = () => {
  const [todos, setToDos] = useState<todo[] | undefined>([]);
  // const getToDosByDate = (Date: string) => {
  //   console.log(Date);
  //   const ApiBaseUrl = "http://localhost:4000";
  //   axios
  //     .get(ApiBaseUrl + "/todos/date/" + Date)
  //     .then((data) => console.log("Data", data.data))
  //     .catch((error) => console.log("error", error));
  // };

  useEffect(() => {
    api
      .getToDosByDate("2025-03-25")
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  }, []);

  return (
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
  );
};

export default App;
