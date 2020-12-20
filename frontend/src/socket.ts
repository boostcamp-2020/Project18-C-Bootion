import { io } from 'socket.io-client';

export const pageIO = io(':4000/page', {
  path: '/socket.io',
  transports: ['websocket'],
  reconnection: true,
});

export const pageListIO = io(':4000/pageList', {
  path: '/socket.io',
  transports: ['websocket'],
});
