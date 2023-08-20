import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/users/bcrypt.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async signup(createUser: CreateUserDto) {
    try {
      const user = await this.userService.create(createUser);

      return { message: 'User created successfully', id: user.id };
    } catch (err) {
      throw err;
    }
  }

  async login(createuser: CreateUserDto) {
    const user = await this.userService.findOneByLogin(createuser.login);
    if (!user) {
      throw new ForbiddenException(
        `User with id ${createuser.login} doesn't exist`,
      );
    }

    if (user) {
      const isMatch = await this.bcrypt.comparePassword(
        createuser.password,
        user.password,
      );
      if (!isMatch) {
        throw new ForbiddenException('Password is wrong');
      }
      const payload = { sub: user.id, username: user.login };

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    }
  }

  async refresh(createuser: CreateUserDto) {
    console.log(createuser);
  }
}
