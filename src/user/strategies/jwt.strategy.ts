import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { isBoolean, isString } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/user/interfaces/jwt-payload.interface";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";


    @Injectable()
    export class JwtStrategy extends PassportStrategy(  Strategy  ){

        constructor(
            @InjectRepository( User )
            private readonly userRepository: Repository<User>,
        ){
            super({
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            });
        }



        async validate( payload: JwtPayload ) : Promise<User> {



            const { id } = payload;


            const user = await this.userRepository.findOne({
                where: { id },
                select: { email:true, password:true, id:true, state:true }
            });

            if (!user)
                throw new UnauthorizedException('Token no es valido');


            if(!(+user.state))
                throw new UnauthorizedException('Usuario esta actualmente bloqueado');

            return user;


        }


    }