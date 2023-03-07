import { IsDate, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    idProductCategory: string;
    
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    date: string;
    
    @IsString()
    @MinLength(1)
    state: string; 

    @IsString()
    @MinLength(1)
    idPerson: string;

    @IsString()
    @MinLength(1)
    department:string

    @IsInt()
    @IsPositive()
    stock:number

} 