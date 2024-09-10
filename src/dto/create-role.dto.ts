import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional, IsArray, IsNumber, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'typeorm';

export class CreateRoleDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

}
