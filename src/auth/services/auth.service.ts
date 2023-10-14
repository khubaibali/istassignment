import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email, password);
    const USER = await this.userRepo.findOne({
      where: { email: email, password: password },
    });
    console.log('found user', USER);
    if (!USER) {
      throw new NotFoundException('User not found');
    }
    return USER;
  }

  async issueUserToken(email: string): Promise<string> {
    const USER = await this.userRepo.findOne({
      where: { email: email },
    });
    console.log(USER);
    const userId = USER.id;
    const payload = { userId, email };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
