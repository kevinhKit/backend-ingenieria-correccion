import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, getConnection, Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {

  //injectar los chat de la base de datos con el patron repositorio.
  constructor(

    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    
    private readonly dataSource: DataSource,

  ){}




  //Crear un nuevo chat
  async create(createChatDto: CreateChatDto) {

    try {
      
      const {firstparticipan, secondparticipan, idProduct} = createChatDto;

      const participanOne = await this.userRepository.findOneBy({id:firstparticipan})
      if(!participanOne){
        throw new NotFoundException('El primer usuario enviado no existe.')
      }
      
      const participanTwo = await this.userRepository.findOneBy({id:secondparticipan})  
      if(!participanTwo){
        throw new NotFoundException('El segundo usuario enviado no existe.')
      }
            
      if(!participanTwo.state){

        throw new NotFoundException('El segundo usuario enviado no existe.')
      }
    
      const { ...other} = {...createChatDto};
      // const { message,...other} = {...createChatDto};

      const persona = createChatDto.firstparticipan; 
      const dateTime = createChatDto.dateTime; 
    
      // const chat = await this.chatRepository.create({...createChatDto, });
      const chat = await this.chatRepository.create({...createChatDto});
  
      console.log(chat)
      await this.chatRepository.save(chat);

      
      console.log('Succesful')

    } catch (error) {
      console.log(error,'error')
    }

    //Crear Querry Runner
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()

    try {
      
    } catch (error) {
      console.log(error)
      queryRunner.release();
    }




    return 'Está acción ha agregado un nuevo chat';
  }

  findAll() {
    return `Está acción retorna todos los usuarios`;
  }

  findOne(id: string) {
    return `Está acción retorna al usuario con id: ${id}`;
    // verificar si los usuarios enviaods existen, verificar 


  }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
