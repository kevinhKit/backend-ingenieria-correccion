import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),

    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

    JwtModule.registerAsync({
      imports: [],
      inject:[],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
          expiresIn: '2h'
        }}
      }
    })

    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '2h'
    //   }
    // })



  ],
  exports: [ TypeOrmModule , JwtStrategy, PassportModule, JwtModule ]
})
export class UserModule {}
