import { Socket } from 'socket.io-client';
import { Notification as NotificationType } from './types';

const initializateSocket = (socket: Socket, user_id: string) => {
  socket.on('connect', () => {
    socket.emit("set_user_logged", { user_id: user_id });

    socket.on('notification', (notification: NotificationType) => {
      new Notification(notification.message);
    });
  })
}

export default initializateSocket;