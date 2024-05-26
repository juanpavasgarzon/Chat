import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from '../controller/message.controller';
import { MessageService } from '../service/message.service';
import { MessageGateway } from '../gateway/message.gateway';
import { Message, MessageSchema } from '../schama/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
