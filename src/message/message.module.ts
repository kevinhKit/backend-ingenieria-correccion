import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UserModule } from 'src/user/user.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [

    TypeOrmModule.forFeature([ Message ]),
    // ChatModule,
    UserModule

  ],
  exports: [MessageModule, TypeOrmModule, UserModule]
})
export class MessageModule {}
