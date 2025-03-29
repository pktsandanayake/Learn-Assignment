import axios from "axios";

const ApiBaseUrl = "http://localhost:4000";

const getToDosByDate = (Date: string) => {
  return axios
    .get(`${ApiBaseUrl}/todos/date/${Date}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const getToDosByFilter = (priority: string, status: string, title: string) => {
  const titleParam = title ? title : "NoTitle";
  return axios
    .get(`${ApiBaseUrl}/todos/filter/${priority}/${status}/${titleParam}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const api = { getToDosByDate, getToDosByFilter };

export default api;
