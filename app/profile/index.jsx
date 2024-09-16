import { View, Text, ActivityIndicator } from "react-native";
import useAuthStore from "../../stores/Auth.store";
import { useEffect,useState } from "react";
import { useRouter } from "expo-router";
export default function Profile() {
    const router = useRouter();
  const { user, isAuthenticated,checkAuth } = useAuthStore.getState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const verifyAuthentication = async () => {
      await checkAuth(); 
      setLoading(false); 
    };

    verifyAuthentication();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
        router.push("/");
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View className="flex-1 flex-col items-center justify-center">
        <ActivityIndicator size="large" color="#FF5733" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 flex-col items-center justify-center">
        <Text>No hay usuario</Text>
      </View>
    );
  } else {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{user.name}</Text>
      </View>
    );
  }
}
