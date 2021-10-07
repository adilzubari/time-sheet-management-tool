import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://time-sheet-management-tool.herokuapp.com/",
// });

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default instance;
