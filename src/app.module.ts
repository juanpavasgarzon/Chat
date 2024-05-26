import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './module/message module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@whatsapp.u00futw.mongodb.net/',
      { dbName: 'whatsapp_db' },
    ),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
