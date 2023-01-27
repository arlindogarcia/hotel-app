import { Socket } from 'socket.io-client';
import { Notification } from './types';

const initializateSocket = (socket: Socket, user_id: string) => {
  socket.on('connect', () => {
    socket.emit("set_user_logged", { user_id: user_id });

    socket.on('notification', (notification: Notification) => {
      console.log(notification);
    });
  })
}

export default initializateSocket;