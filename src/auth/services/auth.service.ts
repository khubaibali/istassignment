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

  async validateUser(email: string, password: string): Promise<string> {
    const USER = await this.userRepo.findOne({
      where: { email: email, password: password },
    });
    if (!USER) {
      throw new NotFoundException('User not found');
    }
    const ACCESS_TOKEN = this.issueUserToken(USER.id, USER.email);
    return ACCESS_TOKEN;
  }

  async issueUserToken(userId: number, email: string): Promise<string> {
    const payload = { userId, email };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
