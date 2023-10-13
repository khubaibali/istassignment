import { Body, Controller, Post, Patch, Get, Param, ParseIntPipe } from '@nestjs/common';

import { RegisterUserReqDto } from '../dtos/registerReq.dto';
import { LoginUserReqDto } from '../dtos/loginReq.dto';
import { UpdateUserReqDto } from '../dtos/updateReq.dto';

@Controller('users')
export class UserController {
  @Post('register')
  register(@Body() user: RegisterUserReqDto) {
    return user;
  }

  @Post('login')
  login(@Body() user: LoginUserReqDto) {
    return user;
  }

  @Patch('update/:id')
  update(@Body() user: UpdateUserReqDto) {
    return user;
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: string) {
    return user;
  }

  @Get()
  GetAllUsers(@Body() user: RegisterUserReqDto) {
    return user;
  }
}
