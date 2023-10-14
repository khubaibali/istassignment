import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateUserReqDto {
  @IsString()
  @IsNotEmpty()
  @Transform((value) => value.toString().trim())
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform((value) => value.toString().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform((value) => value.toString().trim())
  password: string;
}
