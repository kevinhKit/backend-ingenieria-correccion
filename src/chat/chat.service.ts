import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {

  //injectar los chat de la base de datos con el patron repositorio.
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,


    // @InjectRepository(Message)
    // private readonly messageRepository: Repository<Message>,
    
  ){}




  //Crear un nuevo chat
  async create(createChatDto: CreateChatDto) {
    // try {
      const {firstparticipan, secondparticipan, idProduct} = createChatDto;
      const participanOne = await this.userRepository.findOneBy({id:firstparticipan})

      // console.log(participanOne)
      
      if(!participanOne){
        throw new NotFoundException('Revise sus credenciales')
      }
      
      
      const participanTwo = await this.userRepository.findOneBy({id:secondparticipan})
      // console.log(participanTwo)
      
      if(!participanTwo){
        throw new NotFoundException('El identificador de este usuarios no es correcto.')
      }

      if(!participanTwo.state){
        throw new NotFoundException('El usuario seleccionado bloqueado.')
      }

      const {content, ...others} = createChatDto;
      let p = others.firstparticipan;
      const {dateTime, } = {...others};


      const chat = this.chatRepository.create(createChatDto)
      // const chat =this.chatRepository.create({
      //   ...others,
      //   message: this.messageRepository.create({
      //     content,
      //     dateTime,
      //     p
          
      //   })
      // });

      await this.chatRepository.save(chat);
      
    // } catch (error) {
        // console.log(error)
    // }


    return 'Está acción ha agregado un nuevo chat';
  }

  // findAll() {
  //   return `Está acción retorna todos los usuarios`;
  // }

  // findOne(id: string) {
  //   return `Está acción retorna al usuario con id: ${id}`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
