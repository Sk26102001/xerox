// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // your backend URL
// });

// // 🔐 Login
// export const loginUser = (data: { email: string; password: string }) =>
//   API.post("/auth/login", data);

// // 📝 Register
// export const registerUser = (data: any) =>
//   API.post("/auth/register", data);

// // 📲 Send OTP
// export const sendOtp = (phone: string) =>
//   API.post("/auth/send-otp", { phone });

// // ✅ Verify OTP
// export const verifyOtp = (phone: string, otp: string) =>
//   API.post("/auth/verify-otp", { phone, otp });

// export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // change if needed
// });

// // REGISTER
// export const registerUser = (data: {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
// }) => API.post("/auth/register", data);

// // LOGIN
// export const loginUser = (data: {
//   emailOrPhone: string;
//   password: string;
// }) => API.post("/auth/login", data);




// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // =====================
// // 🔐 AUTH APIs
// // =====================

// // REGISTER
// export const registerUser = (data: {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
// }) => API.post("/auth/register", data);

// // LOGIN
// export const loginUser = (data: {
//   emailOrPhone: string;
//   password: string;
// }) => API.post("/auth/login", data);

// // =====================
// // 🔑 FORGOT PASSWORD
// // =====================

// // Send OTP
// export const forgotPassword = (data: { email: string }) =>
//   API.post("/auth/forgot-password", data);

// // Reset Password
// export const resetPassword = (data: {
//   email: string;
//   otp: string;
//   newPassword: string;
// }) => API.post("/auth/reset-password", data);


// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });


// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ||  "https://bookprinters.in/api/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 15000, // optional - prevents hanging forever
// });

// // Automatically add Bearer token to protected requests
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// // ────────────────────────────────────────────────
// //  AUTHENTICATION
// // ────────────────────────────────────────────────

// /**
//  * Register new user
//  */
// export const registerUser = (data: {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
// }) => API.post("/auth/register", data);

// /**
//  * Login with email or phone
//  */
// export const loginUser = (data: {
//   emailOrPhone: string;
//   password: string;
// }) => API.post("/auth/login", data);

// // ────────────────────────────────────────────────
// //  PASSWORD RECOVERY
// // ────────────────────────────────────────────────

// /**
//  * 1. Send reset password OTP to email
//  */
// export const forgotPassword = (data: { email: string }) =>
//   API.post("/auth/forgot-password", data);

// /**
//  * 2. Verify OTP and reset password in one request
//  * (most common & secure pattern)
//  */
// export const resetPasswordWithOtp = (data: {
//   email: string;
//   otp: string;
//   newPassword: string;
// }) => API.post("/auth/reset-password", data);

// // Optional: change password while already logged in
// export const changePassword = (data: {
//   currentPassword: string;
//   newPassword: string;
// }) => API.post("/auth/change-password", data);



// export default API;





import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookprinters.in/api/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ────────────────────────────────────────────────
// AUTH
// ────────────────────────────────────────────────

export const registerUser = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => API.post("/auth/register", data);

export const loginUser = (data: {
  emailOrPhone: string;
  password: string;
}) => API.post("/auth/login", data);

// ────────────────────────────────────────────────
// PASSWORD
// ────────────────────────────────────────────────

export const forgotPassword = (data: { email: string }) =>
  API.post("/auth/forgot-password", data);

export const resetPasswordWithOtp = (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => API.post("/auth/reset-password", data);

export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => API.post("/auth/change-password", data);

// ────────────────────────────────────────────────
// ✅ REGISTRATION OTP (FIXED)
// ────────────────────────────────────────────────

export const sendRegistrationOtp = (data: { email: string }) =>
  API.post("/auth/send-registration-otp", data);

export const verifyRegistrationOtp = (data: {
  email: string;
  otp: string;
}) => API.post("/auth/verify-registration-otp", data);

export default API;