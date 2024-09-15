import { View, Image,ScrollView } from "react-native";
import { Form } from "./Form";

export function Singup() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-56 h-28">
        <Image
          source={require("../../assets/logo.png")}
          className="w-full h-full"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Form />
    </ScrollView>
    </View>
  );
}
