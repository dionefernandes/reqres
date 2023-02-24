import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class ReqResAPIDTO {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  avatar: string;
}
