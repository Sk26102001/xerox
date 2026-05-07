import axios from "axios";

const axiosInstance = axios.create({
 
  //  baseURL: "http://localhost:5000/api",
    // baseURL: "https://xerox-2.onrender.com/api",
    baseURL: import.meta.env.VITE_API_URL || "https://admin.bookprinters.in/api/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;




// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.config.url} - Status: ${response.status}`);
//     return response;
//   },
//   (error) => {
//     console.error(`❌ API Error:`, error.response?.status, error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
