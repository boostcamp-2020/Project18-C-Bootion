import { Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const webSocket = (server: http.Server, app: Application, session: any) => {
  const io = new Server(server, { path: '/socket.io' });

  app.set('io', io);
  const page = io.of('/page');
  const pageList = io.of('/pageList');

  io.use((socket, next) => {
    session(socket.request, {}, next);
  });

  pageList.on('connection', (socket: Socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    pageList.emit('allUserCount', pageList.sockets.size);
    socket.on('disconnect', () => {
      pageList.emit('allUserCount', pageList.sockets.size);
    });
  });

  page.on('connection', (socket: Socket) => {
    const req = socket.request as any;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const leaveBeforeRoom = (socket: Socket) => {
      socket.rooms.forEach((room) => {
        socket.leave(room);
        const clientsSize = (page.adapter as any).rooms.get(room)?.size;
        page.to(room).emit('pageUserCount', clientsSize ?? 0);
      });
    };
    leaveBeforeRoom(socket);
    socket.on('disconnect', () => {
      leaveBeforeRoom(socket);
    });

    socket.on('error', (error) => {
      console.error(error);
      leaveBeforeRoom(socket);
    });

    socket.on('join', (pageId) => {
      leaveBeforeRoom(socket);
      socket.join(pageId);
      page
        .to(pageId)
        .emit('pageUserCount', (page.adapter as any).rooms.get(pageId).size);
    });
  });
};

export default webSocket;
