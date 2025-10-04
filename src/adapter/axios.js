import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptor để tự động gắn token
function getToken() {
  return localStorage.getItem("accessToken");
}

// Request interceptor → gắn token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → chỉ trả data
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
