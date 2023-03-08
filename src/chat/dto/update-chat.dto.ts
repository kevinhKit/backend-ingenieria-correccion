
import { IsNotEmpty, IsNumberString, IsOptional, IsUUID, MaxLength } from 'class-validator';


export class UpdateChatDto {

    @IsUUID(undefined,{message:'El valor de $property no es un uuid'})
    @IsNotEmpty({message:'No envió o dejo vacío el identificador del usuario.'})
    @IsOptional()
    id: string;


    @MaxLength(3,{message: 'No envio un estado valido.'})
    @IsNumberString({},{message:'El estado no contiene un valor correcto.'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo fecha y hora.'})
    state: number;

}
