
import { IsEmail, IsNotEmpty,  IsString } from "class-validator";




export class LoginUserDto {
    
    @IsEmail()
    @IsNotEmpty({message:'No envió o dejo vacío el campo correo electrónico.'})
    email: string;

    @IsString({message: 'La contraseña debe ser una cadena de caracteres.'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo contraseña.'})
    password: string;
    
    // @MinLength(8,{message: 'El celular debe ser mayor a 7 carácter.'})
    // @IsNumberString()
    // @IsNotEmpty({message:'No envió o dejo vacío el campo celular.'})
    // phone: string;
    

    
    
    

    
 
}


