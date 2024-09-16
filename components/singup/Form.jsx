import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter, Link } from "expo-router";
import { generateCode, preRegister } from "../../services/user.services";
import useAuthStore from "../../stores/Auth.store";

export function Form() {
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setRegistrationData,setCode}=useAuthStore.getState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    setServerErrors(null);
    try {
      setIsLoading(true);
      const response = await preRegister(data);

      
      if (response.status === 200) {
        setRegistrationData(data)
        setIsLoading(false);
        const codeResult = await generateCode(data.email)
        if (codeResult.status === 200) {
          setCode(codeResult.data.code)
        }
        router.push("/validate-code");
        reset();
      }
    } catch (error) {
      const errorData = error.response.data;
      if (error.response.status === 400 && errorData.errors) {
        Alert.alert(`Error al registrar`);
        errorData.errors.forEach((error) => {
          const field = Array.isArray(error.path) ? error.path[0] : error.path;
          setError(field, { type: "manual", message: error.message });
        });
      } else {
        Alert.alert(`Error al registrar:\n${error.response.data.error}`);        
        setServerErrors(error.response.data.error || "Error al registrar");
      }
      setIsLoading(false);
    }
  };
  if(isLoading){
    return <ActivityIndicator size="large" color="#FF5733"/>
  }
  return (
    <View className="w-full px-5 flex-col gap-y-5">
      <View className="w-full flex-col">
        <View className="flex-row">
          <Text className="text-sm text-red-500">*</Text>
          <Text className="text-lg font-semibold mb-2">Documento</Text>
        </View>

        <Controller
          control={control}
          name="dni"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${
                errors.dni ? "border-red-500" : "border-gray-300"
              } border rounded-md p-2`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="documento"
              keyboardType="default"
            />
          )}
        />
        {errors.dni && (
          <Text className="text-red-500">{errors.dni?.message}</Text>
        )}
      </View>

      <View className="w-full flex-col">
        <View className="flex-row">
          <Text className="text-sm text-red-500">*</Text>
          <Text className="text-lg font-semibold mb-2">Nombre</Text>
        </View>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${
                errors.name ? "border-red-500" : "border-gray-300"
              } border rounded-md p-2`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="nombre"
              keyboardType="default"
            />
          )}
        />

        {errors.name && (
          <Text className="text-red-500">{errors.name?.message}</Text>
        )}
      </View>

      <View className="w-full flex-col">
        <View className="flex-row">
          <Text className="text-sm text-red-500">*</Text>
          <Text className="text-lg font-semibold mb-2">Apellido</Text>
        </View>

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } border rounded-md p-2`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="apellido"
              keyboardType="default"
            />
          )}
        />

        {errors.lastName && (
          <Text className="text-red-500">{errors.lastName?.message}</Text>
        )}
      </View>

      <View className="w-full flex-col">
        <View className="flex-row">
          <Text className="text-sm text-red-500">*</Text>
          <Text className="text-lg font-semibold mb-2">Correo</Text>
        </View>

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
          <Text className="text-red-500">{errors.email?.message}</Text>
        )}
      </View>

      <View className="w-full flex-col">
        <Text className="text-lg font-semibold mb-2">Celular</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${
                errors.phone ? "border-red-500" : "border-gray-300"
              } border rounded-md p-2`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Celular"
              keyboardType="phone-pad"
            />
          )}
        />

        {errors.phone && (
          <Text className="text-red-500">{errors.phone?.message}</Text>
        )}
      </View>

      <View className="w-full flex-col">
        <View className="flex-row">
          <Text className="text-sm text-red-500">*</Text>
          <Text className="text-lg font-semibold mb-2">Contraseña</Text>
        </View>

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
              secureTextEntry
            />
          )}
        />

        {errors.password && (
          <Text className="text-red-500">{errors.password?.message}</Text>
        )}
      </View>

      <View className="w-full flex-col">
        <View className="flex-row">
          <Text className="text-sm text-red-500">*</Text>
          <Text className="text-lg font-semibold mb-2">
            Confirmar contraseña
          </Text>
        </View>

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } border rounded-md p-2`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirmar contraseña"
              secureTextEntry
            />
          )}
        />

        {errors.confirmPassword && (
          <Text className="text-red-500">
            {errors.confirmPassword?.message}
          </Text>
        )}
      </View>
      {serverErrors && (
        <Text className="text-red-500 text-sm mt-2">{serverErrors}</Text>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="w-[80%] p-3 bg-orange-600 self-center rounded-md"
      >
        <Text className="text-white text-center font-semibold text-base">
          Registrarse
        </Text>
      </Pressable>

      <View className="w-full flex-row justify-center gap-2 items-center">
        <Text className="text-base font-semibold">Ya tengo una cuenta</Text>
        <Link href={"/"} className="text-orange-600 text-base">
          Iniciar Sesion
        </Link>
      </View>
    </View>
  );
}
