import { Exclude } from 'class-transformer';
export class UserResDto {
  id: number;
  email: string;
  fullName: string;
  createdAt: Date;

  @Exclude()
  password: string;
}
