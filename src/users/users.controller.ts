import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  InternalServerErrorException,
  // ClassSerializerInterceptor,
  // UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

//@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return new User(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    const correctUsers = users.map((user) => new User(user));
    return correctUsers;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return new User(user);
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(updateUserDto, id);
    if (!user) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return new User(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
