import axios from "axios";

export const backendInstance = axios.create({
  baseURL: "http://localhost:5010/api",
  timeout: 25000,
  withCredentials: true,
});
