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
      console.log("Error en el registro", error);
      return false;
    }
  },
  
  login: async (email, password) => {
    const result = await loginService(email, password);
      if (result.status === 200) {
        const { token } = result.data;
        await SecureStore.setItemAsync("token", token);

        // Fetch user data with the token
        const authResponse = await verifyAuth(token);
        if (authResponse.status === 200) {
          set({
            token,
            isAuthenticated: true,
            user: authResponse.user,
          });
          Alert.alert("Login exitoso", "Has iniciado sesión correctamente");
          return {status: 200, data: authResponse.data}
        }
        return {status: 200, data: authResponse.data}
      } else {
        set({ token: null, isAuthenticated: false, user: null });
        await SecureStore.deleteItemAsync("token");
        return {status: 400}
      }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      set({ token: null, isAuthenticated: false, user: null });
    } catch (error) {
      console.log("Logout failed", error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");   
      console.log("Check authentication token", token);
        
      if (token) {      
        const response = await verifyAuth(token);     
        if (response.status === 200) {
          console.log("is check token true");
          console.log("Check authentication response", response.data);
          
          set({
            token,
            isAuthenticated: true,
            user: response.data.user,
          });
        } else {
          set({ token: null, isAuthenticated: false, user: null });
          await SecureStore.deleteItemAsync("token");
        }
      } else {
        set({ token: null, isAuthenticated: false });
        await SecureStore.deleteItemAsync("token");
      }
    } catch (error) {
      console.log("Check authentication failed", error);
     
      set({ token: null, isAuthenticated: false });
      await SecureStore.deleteItemAsync("token");
      Alert.alert("Error al Autenticar usuario:\n", error.response.data.error);
    }
  },
}));

export default useAuthStore;
