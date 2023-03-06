import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateChatDto {

    

    @IsUUID(undefined,{message:'El valor de $property no es un uuid'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo primer nombre.'})
    firstparticipan: string;

    @IsUUID(undefined,{message:'El valor de $property no es un uuid'})
    @IsNotEmpty({message:'No envió o dejo vacío el campo primer nombre.'})
    secondparticipan: string;

    @IsOptional()
    date: Date;

    @IsOptional()
    hour: number;

    @IsOptional()
    state: number;




}
