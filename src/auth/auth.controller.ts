import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RefreshGuard } from './refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUser: CreateUserDto) {
    return await this.authService.signup(createUser);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() createUser: CreateUserDto) {
    return await this.authService.login(createUser);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }
}
