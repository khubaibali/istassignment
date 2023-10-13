import { IsString, IsEmail } from 'class-validator';

export class RegisterUserReqDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
