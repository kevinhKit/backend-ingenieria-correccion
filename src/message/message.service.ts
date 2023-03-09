import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>

  ){}



  create(createMessageDto: CreateMessageDto) {

    // const { content, dateTime, idEmisor, chats} = createMessageDto;

    console.log(createMessageDto)
    const message = this.messageRepository.create(createMessageDto)


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
