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
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';

import { RegisterUserReqDto } from '../dtos/registerReq.dto';
import { LoginUserReqDto } from '../dtos/loginReq.dto';
import { UpdateUserReqDto } from '../dtos/updateReq.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth.service';
import { Response, Request } from 'express';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() user: RegisterUserReqDto) {
    return await this.userService.registerUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginUserReqDto, @Res() res: Response) {
    const TOKEN = await this.userService.loginUser(user.email);
    res
      .cookie('access_token', TOKEN, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: 'none',
      })
      .send({ accessToken: TOKEN });
  }
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('update')
  async update(@Body() user: UpdateUserReqDto, @Req() req: Request) {
    console.log(req.user['userId']);
    const UPDATEDUSER = await this.userService.updateUser(
      user,
      req.user['userId'],
    );
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
