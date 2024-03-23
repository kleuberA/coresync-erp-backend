import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type NotificationPayload = {
  userId: string;
  message: string;
};

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private clientSockets = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.clientSockets.set(userId, client);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socket] of this.clientSockets) {
      if (socket === client) {
        this.clientSockets.delete(userId);
        break;
      }
    }
  }

  sendNotification({ userId, message }: NotificationPayload) {
    const clientSocket = this.clientSockets.get(userId);
    if (clientSocket) {
      clientSocket.emit('notification', message);
    }
  }

  @SubscribeMessage('notification')
  handleNotification(client: Socket, payload: any) {
    console.log(`Client id ${client.id}`);
    console.log(`Client ${payload.userId} sent message: ${payload.message}`);
    const { userId, message } = payload;
    this.sendNotification({ userId, message });
  }

}
