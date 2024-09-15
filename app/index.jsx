import { SafeAreaView } from "react-native-safe-area-context";
import { Login } from "../components/login/Login";
import { Text } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <Login />
    </SafeAreaView>
  );
}
