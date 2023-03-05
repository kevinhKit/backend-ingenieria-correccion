import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto';
import { JwtPayload } from 'src/user/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    

  ){}





  async create(createUserDto: CreateUserDto) {
    try {

      const {password,  ...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10),
      });


      user.email = user.email.toLowerCase()
      await this.userRepository.save(user);

      

      //#################################################################################################################################
      // TODO : Retornar el JWT de acceso
      return {
        ...user,
        token: this.getJwtToken( { id: user.id } )
      };

      delete user.password;
      delete user.resetcodepassword;
      delete user.validcode;
      delete user.isverified;
      delete user.state;
      delete user.date;
      return user;


    } catch(error){
      this.logger.error(error)
      // throw new InternalServerErrorException('Error de servidor')
      this.handleDBExeptions(error);
    }

  }


  async login(loginUserDto: LoginUserDto) {
    
    const { password, email } = loginUserDto;


    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if( !user)
      throw new UnauthorizedException('Correo electrónico invalido.');

    if( !bcrypt.compareSync( password , user.password ) )
      throw new UnauthorizedException('Contraseña invalida.');

    //#################################################################################################################################
      // TODO : Retornar el JWT de acceso
    return {
      ...user,
      token: this.getJwtToken( { id: user.id } )
    };
    return user;

    //  TODO: Retornar el JWT


    






    return user;

  }




  findAll() {
    return `Esta acción devuelve a todos los usuarios`;
  }







  async findOne(term: string) {
    let user : User;
    if (isUUID(term)){
      user = await this.userRepository.findOneBy({id:term})
    } else {
      // user = await this.userRepository.findOneBy({email:term})
      const queryBuilder = this.userRepository.createQueryBuilder()
      user = await queryBuilder
      .where('LOWER(email) =:emailTerm',
      {
        emailTerm: term.toLowerCase()
      }).getOne();
    }

    if( !user ){
      throw new NotFoundException(`Usuario no encontrado`)
    }

    let {date, isverified, validcode, resetcodepassword, state, ...other} = user;
    
    return user;
  }







  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });

    if ( !user ) throw new NotFoundException('El usuario no existe');


    await this.userRepository.save(user)


    return user;
    return `Está acción devuelve al usuario con id: #${id}`;
  }





  remove(id: number) {
    return `Está acción remueve al usuario con id: #${id}`;
  }





  private handleDBExeptions( error: any ){

      if( error.code === '23505' )
        throw new BadRequestException('El Correo Electrónico o el DNI ingresado ya está en uso.')
        // throw new BadRequestException('Error inesperado, verifique los registros del servidor')

        throw new BadRequestException('Error')

  }









  private getJwtToken( payload: JwtPayload ){
    //consumir el servicio configurado en el JwtModule del UserModule

    const token = this.jwtService.sign( payload ); // puede tener más parametros si se requiere configurar algo más



    return  token;


  }








}
