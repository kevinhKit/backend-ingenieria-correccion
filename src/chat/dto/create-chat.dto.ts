import { IsNotEmpty, IsNumberString, IsOptional, IsUUID, MinLength } from "class-validator";

export class CreateChatDto {

    

    @IsUUID(undefined,{message:'El valor de $property no es un uuid'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo primer participante.'})
    firstparticipan: string;

    @IsUUID(undefined,{message:'El valor de $property no es un uuid'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo segundo participante.'})
    secondparticipan: string;


    @MinLength(11,{message: 'No envio una fecha valida.'})
    @IsNumberString({},{message:'El formato de la fecha no es correcto.'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo fecha y hora.'})
    dateTime: string;



    @IsUUID(undefined,{message:'El valor de $property no es un uuid'})
    @IsNotEmpty({message:'No envió o dejo vacío el identificador del producto.'})
    @IsOptional()
    idProduct?: string;

    @MinLength(11,{message: 'No puede enviar mensajes vacios.'})
    @IsNotEmpty({message:'No envió o dejo vacío el contenido del mensaje.'})
    @IsOptional()
    content?: string;




}
