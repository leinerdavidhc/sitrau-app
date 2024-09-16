import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack,Link } from 'expo-router';
import { View, Text,Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="signup/index"
          options={{ headerShown: false }}
        />
               <Stack.Screen
          name="validate-code/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main/index"
          options={{
            headerStyle: { backgroundColor: '#FFF' },
            headerTitle: '',
            headerLeft: () => (
              <View className="w-12 h-12">
                <Image
                  source={require('../assets/icono.png')}
                  className="w-full h-full"
                />
              </View>
            ),
            headerRight: () => (
              <View style={{ marginRight: 15 }}>
                <Link href="/profile">
                  <Text>Perfil</Text>
                </Link>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="profile/index"
          options={{
            headerTitle: 'Perfil',            
          }}
          />
          <Stack.Screen
          name="forgout/index"
          options={{
            headerTitle: 'Recuperar cuenta',            
          }}
          />
           <Stack.Screen
          name="forgout/change"
          options={{
            headerTitle: 'Recuperar cuenta',            
          }}
          />
           <Stack.Screen
          name="forgout/validate"
          options={{
            headerTitle: 'Recuperar cuenta',            
          }}
          />
      </Stack>
      <StatusBar style="dark"/>
    </SafeAreaProvider>
  );
}
