import { SafeAreaView } from "react-native-safe-area-context";
import { Singup } from "../../components/singup/Singup";
import { Text } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <Singup />
    </SafeAreaView>
  );
}
