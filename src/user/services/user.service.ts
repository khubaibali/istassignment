import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserReqDto } from '../dtos/registerReq.dto';
import { withoutPasswords } from '../types/userTypes';
import { LogEntity, LogType } from 'src/logger/entities/log.entity';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(LogEntity)
    private readonly logEvent: Repository<LogEntity>,
    private readonly authService: AuthService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepo.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number): Promise<UserEntity | Error> {
    try {
      return await this.userRepo.findOneBy({ id: id });
    } catch (error) {
      return new Error(error.message);
    }
  }

  async loginUser(email: string): Promise<string> {
    try {
      const USER = await this.userExists(email);
      const access_token = await this.authService.issueUserToken(email);
      this.logEventDb(LogType.login, USER);
      return access_token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(
    user: Partial<UserEntity>,
    userid: number,
  ): Promise<Partial<UserEntity>> {
    try {
      const USER = this.userExists(user.email);
      console.log('update', USER);
      const updateUser = this.userRepo.create({ ...USER, ...user, id: userid });
      this.logEventDb(LogType.update, updateUser);
      return await this.userRepo.save(updateUser);
    } catch (error) {
      throw new Error(error.message);
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
      this.logEventDb(LogType.register, USERSAVE);
      return USERSAVE;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async userExists(email: string): Promise<UserEntity> {
    const USER = await this.userRepo.findOneBy({ email });
    if (USER) {
      return USER;
    }
    return null;
  }

  async logEventDb(logType: LogType, user: UserEntity) {
    console.log('here');
    let log: LogEntity = null;
    switch (logType) {
      case LogType.login:
        log = this.logEvent.create({ type: LogType.login, user });
        this.logEvent.save(log);
        break;
      case LogType.register:
        console.log('here2');
        log = this.logEvent.create({ type: LogType.register, user });
        this.logEvent.save(log);
        break;
      case LogType.update:
        log = this.logEvent.create({ type: LogType.update, user });
        this.logEvent.save(log);
        break;
      case LogType.delete:
        log = this.logEvent.create({ type: LogType.delete, user });
        this.logEvent.save(log);
        break;
    }
  }

  async deleteUser(email: string): Promise<void> {
    const USER = await this.userExists(email);
    if (!USER) {
      throw new NotFoundException('User not found');
    }
    this.logEventDb(LogType.delete, USER);
    await this.userRepo.softRemove(USER);
  }
}
