import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import socket from '../../services/socket';
import { sendMessage } from '../../services/chatService';

export function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Escuchar los mensajes entrantes
        socket.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });


        // Limpiar el evento al desmontar el componente
        return () => {
            socket.off('message');
        };
    }, []);

    const handleSendMessage = () => {
        console.log("id del qie encia:", socket.id);
        
        // Enviar mensaje al servidor utilizando Socket.IO
        sendMessage(message, socket.id); // Asegúrate de enviar el ID del usuario
        setMessage(''); // Limpiar el input
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <ScrollView className="flex-1 mb-4">
                {messages.map((msg, index) => (
                    <View 
                        key={index} 
                        className={`my-2 p-3 rounded-lg ${msg.senderId === socket.id ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}
                    >
                        {
                            
                        console.log("recibe: ",msg.senderId, socket.id==msg.senderId, "idsocket: ", socket.id)
                        }
                        <Text className="text-base">{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <TextInput
                className="border border-gray-300 p-2 mb-2 rounded"
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Type a message"
            />
            <Button title="Send" onPress={handleSendMessage} />
        </View>
    );
};
