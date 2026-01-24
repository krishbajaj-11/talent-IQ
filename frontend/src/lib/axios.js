import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, //browser will send cookies to server along with requests automatically
});

export default axiosInstance;