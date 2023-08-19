import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });

      return user;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException(
          `User with login ${createUserDto.login} already exists in favorites`,
        );
      } else {
        throw err;
      }
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    const checkUser = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!checkUser) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    if (checkUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong');
    }
    try {
      const updateUser = await this.prisma.user.update({
        where: { id: id },
        data: {
          password: updateUserDto.newPassword,
          version: { increment: 1 },
        },
      });
      if (updateUser) {
        return updateUser;
      }
    } catch (err) {
      return err;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id: id },
      });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} doesn't exist`);
        } else {
          throw error;
        }
      } else {
        console.error;
      }
      return false;
    }
  }
}
