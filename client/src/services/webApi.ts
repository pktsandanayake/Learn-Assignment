import axios from "axios";
import { valuePair } from "../Interfaces/valuePair";
import getDays from "../utility/DayCalculation";

const ApiBaseUrl = "http://localhost:4000";

const getToDosByDate = async (Date: string) => {
  return await axios
    .get(`${ApiBaseUrl}/todos/date/${Date}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const getToDosByFilter = async (
  priority: string,
  status: string,
  title: string,
  interval: valuePair
) => {
  console.log("Serch function is calling....");
  const titleParam = title ? title : "NoTitle";
  const days = getDays.getDaysByWeek(interval.type);
  console.log("Number of days....", days);

  return await axios
    .get(`${ApiBaseUrl}/todos/filter/${priority}/${status}/${titleParam}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const getToDosByDependency = async (e: any) => {
  return await axios
    .post(`${ApiBaseUrl}/todos/dependency`, e)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const saveTodos = async (body: any) => {
  // const Tbody = [
  //   {
  //     date: "2025-03-31",
  //     title: "Grass cutting - Last day-Testing...bulk insertion",
  //     status: "NotDone",
  //     priority: "Medium",
  //     dependancy: [],
  //   },
  //   {
  //     date: "2025-03-31",
  //     title: "Grass cutting - Last day-Testing...",
  //     status: "NotDone",
  //     priority: "Low",
  //     dependancy: [],
  //   },
  // ];

  return await axios
    .post(`${ApiBaseUrl}/todos`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const editTodo = async (e: any) => {
  const body = {
    _id: e._id,
    date: e.date,
    title: e.title,
    status: e.status,
    priority: e.priority,
    dependancy: e.dependancy,
  };
  return await axios
    .put(`${ApiBaseUrl}/todo/${e._id}`, body)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const deleteTodo = async (e: any) => {
  return await axios
    .delete(`${ApiBaseUrl}/todo/${e}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const api = {
  getToDosByDate,
  getToDosByFilter,
  saveTodos,
  editTodo,
  deleteTodo,
  getToDosByDependency,
};

export default api;
