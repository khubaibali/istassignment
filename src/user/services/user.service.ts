import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserReqDto } from '../dtos/registerReq.dto';
import { withoutPasswords } from '../types/userTypes';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[] | Error> {
    try {
      return await this.userRepo.find();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: number): Promise<UserEntity | Error> {
    try {
      return await this.userRepo.findOneBy({ id: id });
    } catch (error) {
      return new Error(error.message);
    }
  }

  async updateUser(
    user: Partial<UserEntity>,
  ): Promise<Partial<UserEntity | Error>> {
    try {
      return await this.userRepo.save(user);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async registerUser(
    user: RegisterUserReqDto,
  ): Promise<withoutPasswords | Error> {
    try {
      const USEREXist = await this.userExists(user.email);
      if (USEREXist) {
        return new BadRequestException('User already exists');
      }
      const USERCREATED = this.userRepo.create(user);
      const USERSAVE = await this.userRepo.save(USERCREATED);
      return USERSAVE;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async userExists(email: string): Promise<UserEntity> {
    const USER = await this.userRepo.findOneBy({ email });
    if (USER) {
      return USER;
    }
    return null;
  }
}
