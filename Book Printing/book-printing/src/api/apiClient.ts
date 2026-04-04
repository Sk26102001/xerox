// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://localhost:5000/api", // 🔥 your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // optional (if using cookies/auth)
// });

// export default apiClient;

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // 🔥 your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional (if using cookies/auth)
});

// ✅ Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token exists:', token ? 'Yes' : 'No');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('⚠️ No token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Handle 401 responses globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('🔒 Unauthorized! Redirecting to login...');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;