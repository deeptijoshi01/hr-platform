import API from "../api/axios";

const authService = {
  // Login
  login: async (data) => {
    const response = await API.post("/auth/login", data);
    return response.data;
  },

  // Register
  register: async (data) => {
    const response = await API.post("/auth/register", data);
    return response.data;
  },

  // Current Logged In User
  getMe: async () => {
    const response = await API.get("/auth/me");
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await API.post("/auth/logout");
    return response.data;
  },
};

export default authService;