import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
    DbModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    PrismaDbModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
