import { IsString } from 'class-validator';

export class LoginUserReqDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
