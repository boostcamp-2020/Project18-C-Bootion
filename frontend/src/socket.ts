import { io } from 'socket.io-client';

export const pageIO = io('/page', {
  path: '/socket.io',
  transports: ['websocket'],
  reconnection: true,
});

export const pageListIO = io('/pageList', {
  path: '/socket.io',
  transports: ['websocket'],
});
