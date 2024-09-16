import React from "react";
import { View, Text, Alert, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import OTPInput from "../../components/OTPInput"; // Asegúrate de importar el componente correctamente
import { useRouter } from "expo-router";
import useAuthStore from "../../stores/Auth.store";

export default function Index() {
  const { control, handleSubmit,reset } = useForm();
  const router = useRouter();
  const { registrationData, code, register } = useAuthStore.getState();

  const formatEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    return `${localPart.slice(0, 4)}********@${domain}`;
  };

  const onSubmit = async (data) => {
    try {
      if (data.otp == code) {
        const res = await register(registrationData);
        if (res.status === 200) {
            reset()
          router.replace("/");
        }
      } else {
        Alert.alert("Codigo incorrecto", "El código ingresado no es correcto");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Ocurrió un error al verificar el código. Inténtalo nuevamente."
      );
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-lg font-semibold mb-4">Registro Exitoso</Text>
      <Text className="text-base mb-4">
        Se ha enviado un código de verificación a tu correo electrónico. Por
        favor, ingrésalo a continuación para completar el registro.
      </Text>

      <Text className="text-base mb-4 ">
        Enviado a:
        <Text className="font-semibold">
          {formatEmail(registrationData?.email)}
        </Text>
      </Text>

      <Controller
        control={control}
        name="otp"
        render={({ field: { onChange, value } }) => (
          <OTPInput length={6} onChange={onChange} />
        )}
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="mt-4 bg-orange-600 p-3 rounded-md"
      >
        <Text className="text-white text-center font-semibold">
          Verificar Código
        </Text>
      </Pressable>
    </View>
  );
}
