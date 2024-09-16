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
  try{
    if (!token) {
      throw new Error("Token is required for authentication");
    }
    const response = await api.get("/auth/user/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {status: 200, message: response.data.message, user: response.data.user, authorized: response.data.authorized};
  }catch(error){
    return {status: 400, message: error.response.data.message, user: null, authorized: false};
  }
};

export const preRegister = async (data) => {
  return await api.post("auth/user/preRegister",data);
};

export const generateCode = async (email) => {  
  return await api.post("auth/user/generateCode", { email }, { timeout: 10000 });
}
