import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserReqDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString().trim())
  password: string;
}
