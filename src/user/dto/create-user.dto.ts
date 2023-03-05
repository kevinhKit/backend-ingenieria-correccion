
import { Type } from "class-transformer";
import { IsDate,  IsDateString, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, isPhoneNumber, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class CreateUserDto {


    @MinLength(1,{message: 'El primer nombre debe ser mayor a un carácter.'})
    @IsString({message: `El primer nombre debe ser una cadena de caracteres.`})
    @IsNotEmpty({message:'No envió o dejo vacío el campo primer nombre.'})
    firstname: string;
    

    @IsOptional()
    @MinLength(1,{message: 'El segundo nombre debe ser mayor a un carácter.'})
    @IsString({message: `El segundo nombre debe ser una cadena de caracteres.`})
    @IsNotEmpty({message:'No envió o dejo vacío el campo segundo nombre.'})
    secondname?: string;
    
    @MinLength(1,{message: 'El primer apellido debe ser mayor a un carácter.'})
    @IsString({message: `El primer apellido debe ser una cadena de caracteres.`})
    @IsNotEmpty({message:'No envió o dejo vacío el campo primer apellido.'})
    firstsurname: string;
    
    
    @MinLength(1,{message: 'El segundo apellido debe ser mayor a un carácter.'})
    @IsString({message: `El segundo apellido debe ser una cadena de caracteres.`})
    @IsNotEmpty({message:'No envió o dejo vacío el campo segundo apellido.'})
    secondsurname: string;
    
    
    @MinLength(1,{message: 'La direccion debe ser mayor a un carácter.'})
    @IsString({message: `La direccion debe ser una cadena de caracteres.`})
    @IsNotEmpty({message:'No envió o dejo vacío el campo dirección.'})
    address: string;
    
    
    
    @MinLength(8,{message: 'El celular debe ser mayor a 7 carácter.'})
    @IsNumberString({},{message:'El celular debe ser un número.'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo celular.'})
    phone: string;
    
    
    
    @IsDateString({},{message:'La propiedad $property no contiene el formato de fecha valido (YYYY-MM-DD).'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo fecha de nacimiento.'})
    birthdate: string;
    
    

    
    @IsNumberString({},{message:'El DNI debe ser de tipo número.'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo identidad.'})
    dni: string;
    
    
    
    @IsString({message: 'La contraseña debe ser una cadena de caracteres.'})
    @MaxLength(50, {message: 'El tamaño maximo de la contraseña es de 50 caracteres.'})
    @MinLength(6, {message: 'El tamaño minimo de la contraseña es de 6 caracteres.'})
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener letras minusculas, mayusculas y números.'
    })
    @IsNotEmpty({message:'No envió o dejo vacío el campo contraseña.'})
    password: string;
    

    
    @IsEmail({},{message:'El correo electrónico proporcionado es inválido.'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo correo electrónico.'})
    email: string;
    
    


    @IsOptional()
    resetcodepassword: string;

    @IsOptional()
    validcode: string;

    @IsOptional()
    isverified: string;

    @IsOptional()
    state: string;

    
    
    @IsOptional()
    date: string;

    


}


