import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:44306/api/", 
  withCredentials: false,            
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      return Promise.resolve({
        data: error.response.data,
      });
    }
    return Promise.reject(error);
  }
);