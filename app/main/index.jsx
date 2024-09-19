import { View, Text,ActivityIndicator } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useAuthStore from "../../stores/Auth.store";
import { useRouter } from "expo-router";
import { Chat } from "../../components/chat/Chat";

const renderScene = SceneMap({
  routes: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Rutas</Text>
    </View>
  ),
  colectivos: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Colectivos</Text>
    </View>
  ),
  chat: () => (
   <Chat/>
  ),
  validar: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Validar</Text>
    </View>
  ),
});

export default function Index() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "routes", title: "Rutas", icon: "bus" },
    { key: "colectivos", title: "Colectivos", icon: "car" },
    { key: "chat", title: "Chat", icon: "commenting" },
    { key: "validar", title: "Validar", icon: "qrcode" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { checkAuth, isAuthenticated } = useAuthStore.getState();

  useEffect(() => {
    const verifyAuthentication = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    verifyAuthentication();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  
  if (isLoading) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#fff" }}
      style={{ backgroundColor: "white" }}
      renderLabel={({ route, focused }) => (
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              color: focused ? "red" : "gray",
            }}
          >
            {route.title}
          </Text>
        </View>
      )}
      renderIcon={({ route, focused }) => (
        <FontAwesome6
          name={route.icon}
          size={24}
          color={focused ? "red" : "gray"}
        />
      )}
    />
  );

  if (isLoading) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  return (
    
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
      />
    </View>
  );
}
