import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateUserReqDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  fullName: string;

  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;
}
