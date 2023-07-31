import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
    DbModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
