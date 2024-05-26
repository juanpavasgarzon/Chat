import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schama/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<Message> {
    const newMessage = new this.messageModel({
      senderId,
      receiverId,
      content,
    });
    return newMessage.save();
  }

  async setMessageDelivered(messageId: string): Promise<Message> {
    return this.messageModel.findByIdAndUpdate(
      messageId,
      { delivered: true },
      { new: true },
    );
  }

  async setMessageRead(messageId: string): Promise<Message> {
    return this.messageModel.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true },
    );
  }

  async receiveMessages(receiverId: string): Promise<Message[]> {
    return this.messageModel.find({ receiverId }).exec();
  }
}
