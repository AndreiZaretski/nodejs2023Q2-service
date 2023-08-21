import { Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';
import { CustomExceptionFilter } from './exeption-filter';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  providers: [CustomLogger, CustomExceptionFilter, LoggerInterceptor],
})
export class LoggerModule {}
