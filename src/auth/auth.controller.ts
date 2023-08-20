import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

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

  @Post('refresh')
  async refresh(@Body() createUser: CreateUserDto) {
    return await this.authService.refresh(createUser);
  }
}
