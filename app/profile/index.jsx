import { View, Text } from 'react-native';
import useAuthStore from '../../stores/Auth.store';
import { useEffect } from 'react';
export default function Profile() {
    const { user,isAuthenticated } = useAuthStore.getState();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        } 
    }, [isAuthenticated]);
    return (
        <View className="flex-1 items-center justify-center">
            <Text>{user.name}</Text>
        </View>
    );
}