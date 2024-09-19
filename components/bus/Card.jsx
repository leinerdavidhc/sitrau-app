import { View, Text, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export function Card({ nombre, Active, cantidad, capacidad }) {
  return (
    <View className="w-full my-2 bg-white rounded-md shadow-md overflow-hidden">
      <View className="flex-row justify-between items-center p-2" style={{ backgroundColor:"#0b0e14"}}>
        <View className="flex-row gap-x-2 justify-center items-center">
          <FontAwesome5 name="bus" size={24} color="#ed500a" />
          <Text className="text-white text-base">{nombre}</Text>
        </View>
        <View className={`justify-center items-center p-2 ${Active?"bg-green-500":"bg-red-500"} rounded-full`}>
          <Text className="text-white">{Active ? "Activo" : "Inactivo"}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-center p-2  w-full">
        <Image
          source={require("../../assets/BUS-UNIGUAJIRA.jpg")}
          style={{resizeMode: "contain" }}
          className="w-[100px] h-[100px]"
        />
        <View className="flex-col justify-center items-center w-[70%]  p-2">
          <Text>
            Capacidad: {cantidad}/{capacidad}
          </Text>
          <View className="w-full bg-gray-200 rounded-full h-4">
            <View
              className={`bg-green-600 h-4 rounded-full`}
              style={{ width: `${(cantidad / capacidad) * 100}%` }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
}
