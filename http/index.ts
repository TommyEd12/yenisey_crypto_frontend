import axios from "axios";

export const backendInstance = axios.create({
  baseURL: "http://85.193.86.182//api",
  timeout: 25000,
  withCredentials: true,
});
