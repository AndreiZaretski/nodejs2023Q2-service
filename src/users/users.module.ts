import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcryptService } from './bcrypt.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
  exports: [UsersService, BcryptService],
})
export class UsersModule {}
