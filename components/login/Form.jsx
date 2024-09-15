import { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Pressable, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter, Link } from "expo-router";
import { Checkbox } from "../Checkbox";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useAuthStore from "../../stores/Auth.store";

export function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const router = useRouter();
  const [isSelected, setSelection] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const { login, isAuthenticated, checkAuth } = useAuthStore.getState();

  // Verificar autenticación al cargar la pantalla
  useEffect(() => {
    const verifyAuthentication = async () => {
      await checkAuth(); 
      setIsLoading(false); 
    };

    verifyAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/main");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await login(email, password);
    } catch (error) {
      const errorData = error.response?.data;
      if (error.response?.status === 400 && errorData?.errors) {
        Alert.alert(`Error al iniciar sesión`);
        errorData.errors.forEach((error) => {
          const field = Array.isArray(error.path) ? error.path[0] : error.path;
          setError(field, { type: "manual", message: error.message });
        });
      } else {
        Alert.alert(
          `Error al iniciar sesión:\n${
            error.response?.data?.error || "Unknown error"
          }`
        );
      }
    }
  };

  if (isLoading) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  return (
    <View className="w-full px-5 flex-col gap-y-5">
      <View className="w-full flex-col">
        <Text className="text-lg font-semibold mb-2">Correo</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${
                errors.email ? "border-red-500" : "border-gray-300"
              } border rounded-md p-2`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500">{errors.email.message}</Text>
        )}
      </View>

      <View className="w-full flex-col">
        <Text className="text-lg font-semibold mb-2">Contraseña</Text>
        <View className="relative">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${
                  errors.password ? "border-red-500" : "border-gray-300"
                } border rounded-md p-2`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
            )}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-3"
          >
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        {errors.password && (
          <Text className="text-red-500">{errors.password.message}</Text>
        )}
      </View>

      <View className="flex-row justify-between items-center w-full">
        <Checkbox label="Recuerdame" onValueChange={setSelection} />
        <Link href={"/forgot"} className="text-orange-600 text-sm">
          ¿Has olvidado tu contraseña?
        </Link>
      </View>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="w-[80%] p-3 bg-orange-600 self-center rounded-md"
      >
        <Text className="text-white text-center font-semibold text-base">
          Login
        </Text>
      </Pressable>

      <View className="w-full flex-row justify-center gap-2 items-center">
        <Text className="text-base font-semibold">¿No tienes cuenta?</Text>
        <Link href={"/signup"} className="text-orange-600 text-base">
          Regístrate aquí
        </Link>
      </View>
    </View>
  );
}
