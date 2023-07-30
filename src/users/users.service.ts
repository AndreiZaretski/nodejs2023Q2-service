import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

export interface ReturnUser {
  id: string;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.db.createUser(createUserDto);

    return this.removePassword(user);
  }

  async findAll() {
    return this.db.getAllUsers().map((user) => {
      return this.removePassword(user);
    });
  }

  async findOne(id: string) {
    const user = this.db.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    return this.removePassword(user);
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    const checkUser = this.db.getUserById(id);
    if (!checkUser) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    if (checkUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong');
    }
    const updateUser = this.db.updateUser(updateUserDto, id);
    if (updateUser) {
      return this.removePassword(updateUser);
    }
  }

  async remove(id: string) {
    const removeUser = this.db.deleteUser(id);

    if (!removeUser) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
    return removeUser;
  }

  private removePassword(user: User): ReturnUser {
    const userWithoutPassword: ReturnUser = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }
}
