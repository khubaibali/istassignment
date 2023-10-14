import {
  Body,
  Controller,
  Post,
  Patch,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { RegisterUserReqDto } from '../dtos/registerReq.dto';
import { LoginUserReqDto } from '../dtos/loginReq.dto';
import { UpdateUserReqDto } from '../dtos/updateReq.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: RegisterUserReqDto) {
    return await this.userService.registerUser(user);
  }

  @Post('login')
  login(@Body() user: LoginUserReqDto) {
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) @Body() user: UpdateUserReqDto) {
    const UPDATEDUSER = await this.userService.updateUser(user);
    return UPDATEDUSER;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async GetAllUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }
}
