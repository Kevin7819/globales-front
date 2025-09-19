// Centralized Axios instance for .NET backend communication
// Features:
// - Base URL configuration
// - JSON request/response handling
// - JWT token injection via interceptors
// - Global error handling
// - Functions for auth (login, register) and user data

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"

// -------------------------
// Axios instance
// -------------------------
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5089/api", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
})

// -------------------------
// Request interceptor: add JWT token
// -------------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// -------------------------
// Response interceptor: handle global errors
// -------------------------
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        console.warn("Unauthorized → JWT may be invalid or expired.")
        // Optionally redirect to login
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
    return Promise.reject(error)
  }
)

// -------------------------
// Auth & User API functions
// -------------------------
export const AuthApi = {
  // Login user
  login: async (userName: string, password: string) => {
    const response = await api.post("/Auth/Login", { userName, password })
    if (response.data.isSuccess) {
      // Store token and user info
      localStorage.setItem("token", response.data.user.token)
      localStorage.setItem("userId", response.data.user.id)
      localStorage.setItem("role", response.data.user.role)
    }
    return response.data
  },

  // Register new user
  register: async (userName: string, email: string, password: string) => {
    const response = await api.post("/Auth/Register", {
      userName,
      email,
      password,
    })
    return response.data
  },

  // Get current user (example protected endpoint)
  getUser: async (userId: number) => {
    const response = await api.get(`/User/${userId}`)
    return response.data
  },
}

// -------------------------
// Export default Axios instance
// -------------------------
export default api
