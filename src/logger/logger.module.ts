import { Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';
import { CustomExceptionFilter } from './exeption-filter';

@Module({
  providers: [CustomLogger, CustomExceptionFilter],
})
export class LoggerModule {}
