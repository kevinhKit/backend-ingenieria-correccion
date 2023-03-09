import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    // @InjectRepository(Chat)
    // private readonly chatRepository: Repository<Chat>

  ){}



  create(createMessageDto: CreateMessageDto) {

    // const { content, dateTime, idEmisor, chats} = createMessageDto;

    console.log(createMessageDto.chats)

    const {chats, ...other} = createMessageDto;
    // const userSend = this.chatRepository.findOneBy({id:createMessageDto.chats})
    // const message = new Message
    //   message.content = createMessageDto.content;
    //   message.dateTime = new Date();
    //   message.idEmisor = createMessageDto.idEmisor;
    //   message.chat = userSend;
    // }

    // console.log(userSend);

    const message = this.messageRepository.create(
      createMessageDto

    )


    this.messageRepository.save(message);


    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
