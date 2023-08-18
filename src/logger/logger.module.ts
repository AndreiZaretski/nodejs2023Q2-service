import { Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';

@Module({
  providers: [CustomLogger],
})
export class LoggerModule {}
