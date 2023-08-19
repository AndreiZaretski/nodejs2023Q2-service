import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @Post('login')
  login(@Body() createUser: CreateUserDto) {
    return this.authService.login(createUser);
  }

  @Post('refresh')
  refresh(@Body() createUser: CreateUserDto) {
    return this.authService.refresh(createUser);
  }
}
