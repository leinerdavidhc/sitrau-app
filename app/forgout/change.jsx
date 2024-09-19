import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import useAuthStore from "../../stores/Auth.store";
import { changePassword } from "../../services/user.services";
import { useState } from "react";

export default function Change() {
    const router = useRouter();
    const { control, handleSubmit, reset,setError, formState: { errors, isSubmitting } } = useForm();
    const { registrationData } = useAuthStore.getState();
    const [serverErrors, setServerErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setServerErrors(null);
        setIsLoading(true);
        try {
            const response = await changePassword({password: data.password,confirmPassword: data.confirmPassword,email: registrationData.email});
            if (response.status === 200) {
                Alert.alert("Contraseña cambiada", "La contraseña ha sido cambiada con exito");
                router.push("/");
                reset();
            }
        } catch (error) {
            const errorData = error.response?.data;
            if (error.response?.status === 400 && errorData?.errors) {
              
                errorData.errors.forEach((error) => {
                    const field = Array.isArray(error.path) ? error.path[0] : error.path;
                    setError(field, { type: "manual", message: error.message });
                });
                Alert.alert(`Error al registrar`);
            } else {
                setServerErrors(error.response?.data?.error || "Error al registrar");
                Alert.alert(`Error al registrar:\n${error.response?.data?.error}`);
            }
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center items-center p-5">
            <Text className="text-lg font-semibold mb-4">
                Recuperar Cuenta
            </Text>

            <View className="w-full flex-col mb-4">
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
                            placeholder="Contraseña"
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && (
                    <Text className="text-red-500">{errors.password?.message}</Text>
                )}
            </View>

            <View className="w-full flex-col mb-4">
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
                    <Text className="text-red-500">{errors.confirmPassword?.message}</Text>
                )}
            </View>

            {serverErrors && (
                <Text className="text-red-500 text-sm my-2">{serverErrors}</Text>
            )}

            <Pressable
                onPress={handleSubmit(onSubmit)}
                className="w-[80%] p-3 bg-orange-600 self-center rounded-md"
                disabled={isSubmitting || isLoading}
            >
                <Text className="text-white text-center font-semibold text-base">
                    {isLoading ? "Cargando..." : "Cambiar Contraseña"}
                </Text>
            </Pressable>
        </View>
    );
}
