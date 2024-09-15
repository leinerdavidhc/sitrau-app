import api from "./axios";

export const register = async (data) => {
  return api.post("/auth/user/register", data);
};

export const login = async (email, password) => {
  return await api.post("/auth/user/login", { email, password });
};

export const logout = async () => {
  return api.post("/auth/user/logout");
};

export const verifyAuth = async (token) => {
  if (!token) {
    throw new Error("Token is required for authentication");
  }
  return api.get("/auth/user/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
