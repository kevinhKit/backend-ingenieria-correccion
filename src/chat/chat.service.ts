import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';


@Injectable()
export class ChatService {
  
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    const { user1Id, user2Id } = createChatDto;

    const user1 = await this.userRepository.findOne({ where: { id: user1Id } });
    const user2 = await this.userRepository.findOne({ where: { id: user2Id } });

    const chat = this.chatRepository.create({
      user1: { id: user1.id },
      user2: { id: user2.id },
    });
    chat.title = `${user1.firstname} and ${user2.firstname}`;

    await this.chatRepository.save(chat);

    return chat;
  }

  async createMessage(chatId: string, createMessageDto: CreateMessageDto) {
    const { chatId: _chatId, content } = createMessageDto;

    const chat = await this.chatRepository.findOne({ where: {id: chatId}});
    const message = this.messageRepository.create({
      chat,
      content,
    });

    await this.messageRepository.save(message);

    return message;
  }

  async getMessages(chatId: string) {
    const chat = await this.chatRepository.findOne({
      where: {id:chatId},
      relations: ['messages'],
    });

    return chat.messages;
  }
}
