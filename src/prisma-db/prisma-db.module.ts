import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma-db.service';

@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaDbModule {}
