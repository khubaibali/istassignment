import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginUserReqDto {
  @IsString()
  @IsNotEmpty()
  @Transform((value) => value.toString().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform((value) => value.toString().trim())
  password: string;
}
