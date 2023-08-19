import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  signup(createuser: CreateUserDto) {
    console.log(createuser);
  }

  login(createuser: CreateUserDto) {
    console.log(createuser);
  }

  refresh(createuser: CreateUserDto) {
    console.log(createuser);
  }
}
