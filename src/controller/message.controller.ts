import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { MessageService } from '../service/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  async sendMessage(@Body() sendMessageDto: any): Promise<any> {
    const { senderId, receiverId, content } = sendMessageDto;
    return this.messageService.sendMessage(senderId, receiverId, content);
  }

  @Patch('delivered/:messageId')
  async setMessageDelivered(
    @Param('messageId') messageId: string,
  ): Promise<any> {
    return this.messageService.setMessageDelivered(messageId);
  }

  @Patch('read/:messageId')
  async setMessageRead(@Param('messageId') messageId: string): Promise<any> {
    return this.messageService.setMessageRead(messageId);
  }

  @Get('receive/:receiverId')
  async receiveMessages(@Param('receiverId') receiverId: string): Promise<any> {
    return this.messageService.receiveMessages(receiverId);
  }
}
