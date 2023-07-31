import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/tracks/entities/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  findAll() {
    const favorites = this.db.getAllFavorites();

    const favoritesResponse: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    favoritesResponse.artists = favorites.artists
      .map((artistId) => this.db.getArtistDb().get(artistId))
      .filter((artist): artist is Artist => artist !== undefined);

    favoritesResponse.albums = favorites.albums
      .map((albumId) => this.db.getAlbumDb().get(albumId))
      .filter((album): album is Album => album !== undefined);
    favoritesResponse.tracks = favorites.tracks
      .map((trackId) => this.db.getTrackDb().get(trackId))
      .filter((track): track is Track => track !== undefined);

    return favoritesResponse;
  }

  create(path: string, id: string) {
    path = path.toLowerCase().trim();

    switch (path) {
      case 'artist':
        const artist = this.db.getArtistById(id);
        if (!artist) {
          throw new UnprocessableEntityException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist`,
          );
        }
        this.db.createFavorite(path, id);

        return `${path.toLocaleUpperCase()} with id ${id} was added to favorites`;
      case 'album':
        const album = this.db.getAlbumById(id);
        if (!album) {
          throw new UnprocessableEntityException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist`,
          );
        }
        this.db.createFavorite(path, id);

        return `${path.toLocaleUpperCase()} with id ${id} was added to favorites`;
      case 'track':
        const track = this.db.getTrackById(id);
        if (!track) {
          throw new UnprocessableEntityException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist`,
          );
        }
        this.db.createFavorite(path, id);

        return `${path.toLocaleUpperCase()} with id ${id} was added to favorites`;
      default:
        throw new BadRequestException(`Invalid path: ${path}`);
    }
  }

  remove(path: string, id: string) {
    path = path.toLowerCase().trim();
    let checkRemove: boolean;
    switch (path) {
      case 'artist':
        checkRemove = this.db.deleteFavorite(path, id);
        if (!checkRemove) {
          throw new NotFoundException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist in favorites`,
          );
        }
        return true;

      case 'album':
        checkRemove = this.db.deleteFavorite(path, id);
        if (!checkRemove) {
          throw new NotFoundException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist in favorites`,
          );
        }
        return true;

      case 'track':
        checkRemove = this.db.deleteFavorite(path, id);
        if (!checkRemove) {
          throw new NotFoundException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist in favorites`,
          );
        }
        return true;

      default:
        throw new BadRequestException(`Invalid path: ${path}`);
    }
  }
}
