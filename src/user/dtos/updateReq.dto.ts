import { IsString, IsEmail } from 'class-validator';
export class UpdateUserReqDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
