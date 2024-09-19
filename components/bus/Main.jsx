import { Card } from "./Card";
import { FlatList, View } from "react-native";
const data = [
    { id: '1', nombre: 'Bus 1', Active: true, cantidad: 50, capacidad: 60 },
    { id: '2', nombre: 'Bus 2', Active: false, cantidad: 0, capacidad: 60 },
    { id: '3', nombre: 'Bus 3', Active: true, cantidad: 30, capacidad: 50 },
    { id: '4', nombre: 'Bus 4', Active: true, cantidad: 25, capacidad: 50 },
    { id: '5', nombre: 'Bus 5', Active: false, cantidad: 0, capacidad: 50 },
];

const renderItem = ({ item }) => (
    <Card 
        nombre={item.nombre}
        Active={item.Active}
        cantidad={item.cantidad}
        capacidad={item.capacidad}
    />
);
export function Main() {
    return (
       <View className="flex-1 p-3">
         <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
       </View>
    );
}