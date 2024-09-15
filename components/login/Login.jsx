import { View, Image,Text } from "react-native";
import { Form } from "./Form";

export function Login() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-56 h-28">
        <Image
          source={require("../../assets/logo.png")}
          className="w-full h-full"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <Form />
    </View>
  );
}
