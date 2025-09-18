// Centralized Axios instance (`api`) used for all backend (.NET API) communication.
// Features:
//   - Base URL configuration
//   - JSON request/response handling
//   - JWT token injection via interceptors
//   - Global error handling
//

import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

//  Create the Axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
})

//  Request interceptor
// Runs before every request → inject JWT token if available
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token") // Retrieve JWT from localStorage
    if (token) {
      config.headers = config.headers ?? {} // Ensure headers object exists
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Handle request setup errors
    return Promise.reject(error)
  }
)

//  Response interceptor
// Runs after every response (success or error)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Pass through successful responses
    return response
  },
  (error) => {
    // Global error handling
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        console.warn("Unauthorized → JWT may be invalid or expired.")
        // Example: redirect to login
        // window.location.href = "/login"
      }

      if (status === 403) {
        console.error("Forbidden → User does not have permission.")
      }

      if (status >= 500) {
        console.error("Server error → Please try again later.")
      }
    } else if (error.request) {
      console.error("No response from server → Check your connection.")
    } else {
      console.error("Axios setup error:", error.message)
    }

    return Promise.reject(error) // Ensure local code can also handle the error
  }
)

export default api