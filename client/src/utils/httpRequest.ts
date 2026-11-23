import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default httpRequest;
