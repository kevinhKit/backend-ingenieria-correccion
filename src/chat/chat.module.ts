import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { UserModule } from 'src/user/user.module';
import { MessageModule } from 'src/message/message.module';
import { MessageController } from 'src/message/message.controller';
import { MessageService } from 'src/message/message.service';


@Module({
  controllers: [ChatController,],
  providers: [ChatService ],
  imports: [
    
    TypeOrmModule.forFeature([Chat]),
    UserModule,
    MessageModule,
    UserModule
  ],
  exports: [ ChatModule, UserModule,  ]
})
export class ChatModule {}
