import { io } from 'socket.io-client';

const socket = io('http://158.247.124.44:4000', {
  reconnection: true,
  reconnectionAttempts: 5,
  transports: ['websocket'],
});

export default socket;
