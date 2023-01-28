import { useToast } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { Notification as NotificationType } from './types';

const InitializateSocket = (socket: Socket, user_id: string) => {
  const toast = useToast();

  socket.on('connect', () => {
    socket.emit("set_user_logged", { user_id: user_id });

    socket.on('notification', (notification: NotificationType) => {
      new Notification(notification.message);

      toast({
        title: "Nova mensagem!",
        description: notification.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    });
  })
}

export default InitializateSocket;