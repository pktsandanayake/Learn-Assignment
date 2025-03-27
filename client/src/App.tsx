import "./App.css";
import { getToDosByDate } from "../src/services/webApi";
import axios from "axios";
function App() {
  const getToDosByDate = (Date: string) => {
    console.log(Date);
    const ApiBaseUrl = "http://localhost:4000";
    axios
      .get(ApiBaseUrl + "/todos/date/" + Date)
      .then((data) => console.log("Data", data))
      .catch((error) => console.log("error", error));
  };
  getToDosByDate("2025-03-24");
  return (
    <div>
      <h1> testing....</h1>
    </div>
  );
}

export default App;
