import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import {
  login as loginService,
  logout as logoutService,
  verifyAuth,
  register as registerService
} from "../services/user.services";
import { Alert } from "react-native";

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  user: null,
  registrationData: null,
  code: null,


  setCode:(codigo)=>set({code:codigo}),
  setRegistrationData: (data) => set({ registrationData: data }),
  register: async (data) => {
    try {
      const response = await registerService(data);
      if (response.status === 200) {
       set({code:null, registrationData:null})
        Alert.alert("Registro exitoso", "Se ha registrado exitosamente");
        return response;
      }
      return false;
    } catch (error) {
      console.error("Error en el registro", error);
      return false;
    }
  },
  
  login: async (email, password) => {
    try {
      const result = await loginService(email, password);
      if (result.status === 200) {
        const { token } = result.data;
        await SecureStore.setItemAsync("token", token);

        // Fetch user data with the token
        const authResponse = await verifyAuth(token);
        if (authResponse.status === 200) {
          Alert.alert("Login exitoso", "Has iniciado sesión correctamente");
          set({
            token,
            isAuthenticated: true,
            user: authResponse.user,
          });
        }
      } else {
        set({ token: null, isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error("Login failed", error);
      set({ isAuthenticated: false });
    }
  },

  logout: async () => {
    try {
      await logoutService();
      await SecureStore.deleteItemAsync("token");
      set({ token: null, isAuthenticated: false, user: null });
    } catch (error) {
      console.error("Logout failed", error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        // Verify the token with the server
        const authResponse = await verifyAuth(token);
        if (authResponse.status === 200) {
          set({
            token,
            isAuthenticated: true,
            user: authResponse.user,
          });
        } else {
          set({ token: null, isAuthenticated: false, user: null });
          await SecureStore.deleteItemAsync("token");
        }
      } else {
        set({ token: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Check authentication failed", error);
      set({ token: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
