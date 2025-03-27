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

const api = { getToDosByDate };

export default api;
