import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from '../service/message.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
export class MessageGateway {
  constructor(private messageService: MessageService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      content: string;
    },
  ) {
    const message = await this.messageService.sendMessage(
      data.senderId,
      data.receiverId,
      data.content,
    );
    this.server.to(data.receiverId).emit('newMessage', message);
  }

  @SubscribeMessage('messageDelivered')
  async messageDelivered(@MessageBody() messageId: string) {
    const message = await this.messageService.setMessageDelivered(messageId);
    this.server.to(message.senderId).emit('messageStatusChanged', message);
  }

  @SubscribeMessage('messageRead')
  async messageRead(@MessageBody() messageId: string) {
    const message = await this.messageService.setMessageRead(messageId);
    this.server.to(message.senderId).emit('messageStatusChanged', message);
  }
}
