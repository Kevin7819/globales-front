import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const Api: AxiosInstance = axios.create({
  baseURL: "https://localhost:7273/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request interceptor: add JWT token
Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle global errors
Api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.warn("Unauthorized → JWT may be invalid or expired.");
        //borrar los datos antes de redirigir
         localStorage.removeItem("token");
         localStorage.removeItem("user");
        window.location.href = "/login"
      }
      if (status === 403) {
        console.error("Forbidden → User does not have permission.");
      }
      if (status >= 500) {
        console.error("Server error → Please try again later.");
      }
    } else if (error.request) {
      console.error("No response from server → Check your connection.");
    } else {
      console.error("Axios setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default Api;
