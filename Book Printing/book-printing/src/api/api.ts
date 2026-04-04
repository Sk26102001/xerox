// // src/api/api.js
// import axios from "axios";

// export const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });


// // src/api/api.js
// import axios from "axios";

// export const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔐 Attach token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });



// src/api/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export interface ApiError {
  error?: string;
  message?: string;
  status?: number;
}

export const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        toast.error("Session expired. Please login again.");
      } else if (status === 403) {
        toast.error("You don't have permission to perform this action.");
      } else if (status === 404) {
        toast.error("Resource not found.");
      } else if (status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(data?.error || data?.message || "An error occurred");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
    
    return Promise.reject(error);
  }
);