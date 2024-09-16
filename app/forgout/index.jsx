//FORMULARIO para poner el email que sera enviado para validar el email en la base de dato y se envia codigo de verificacion
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import useAuthStore from "../../stores/Auth.store";
import { generateCode } from "../../services/user.services";
import { useState } from "react";

export default function Index() {
    const router = useRouter();
    const { control, handleSubmit, reset } = useForm();
    const { setCode, setRegistrationData} = useAuthStore.getState();
    const [serverErrors, setServerErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setServerErrors(null);
        try {
            setIsLoading(true);
            const codeResult = await generateCode(data.email, "forgout");
            
            if (codeResult.status === 200) {
                setRegistrationData({email:data.email})
                setCode(codeResult.data.code);
                router.push("/forgout/validate");
                reset();
            }
        } catch (error) {
            const errorData = error.response.data;
            console.log(errorData);
            
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
    return (
        <View className="flex-1 justify-center items-center p-5">
            <Text className="text-lg font-semibold mb-4">
                Recuperar Cuenta
            </Text>
            <Text className="text-base mb-4">
                Por favor, introduce tu correo electrónico.
            </Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        className="border border-gray-400 p-2 rounded-md mb-4 w-full"
                        placeholder="Email"
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                    />
                )}
            />
            <Pressable
                onPress={handleSubmit(onSubmit)}
                className="mt-4 bg-orange-600 p-3 rounded-md"
            >
                <Text className="text-white text-center font-semibold">
                    Enviar
                </Text>
            </Pressable>
        </View>
    );
}