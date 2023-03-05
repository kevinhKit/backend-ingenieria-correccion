import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto , UpdateUserDto , LoginUserDto } from './dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('private')
  @UseGuards( AuthGuard())
  private(){

    return {
      ok : true,
      message: 'Hola mundo Private'
    }


  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.userService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }




}
