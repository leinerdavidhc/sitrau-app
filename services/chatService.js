import io from 'socket.io-client';

// Crear una instancia del socket
const socket = io('http://158.247.124.44:4000');

// Escuchar mensajes de bienvenida
socket.on('message', (message) => {
    console.log('Message received:', message);
});

// Enviar un mensaje al servidor
export const sendMessage = (message) => {
    socket.emit('message', { text: message, senderId: socket.id });
};

// Enviar un mensaje de prueba después de 1 segundo
setTimeout(() => {
    sendMessage('Hello from client');
}, 1000);
