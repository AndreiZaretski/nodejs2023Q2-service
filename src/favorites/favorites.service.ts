import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { DbService } from 'src/db/db.service';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Track } from 'src/tracks/entities/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class FavoritesService {
  constructor(
    private db: DbService,
    private prisma: PrismaService,
  ) {}

  async findAll() {
    const favoritesResponse: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const favArtist = await this.prisma.favArtist.findMany({
      include: {
        artist: true,
      },
    });

    favoritesResponse.artists = favArtist.map((artist) => artist.artist);
    favoritesResponse.albums = await this.prisma.favAlbum
      .findMany({
        include: {
          album: true,
        },
      })
      .then((res) => res.map((album) => album.album));

    favoritesResponse.tracks = await this.prisma.favTrack
      .findMany({
        include: {
          track: true,
        },
      })
      .then((res) => res.map((track) => track.track));

    return favoritesResponse;
  }

  async create(path: string, id: string) {
    path = path.toLowerCase().trim();

    switch (path) {
      case 'artist':
        const artist = await this.prisma.artist.findUnique({
          where: { id: id },
        });
        if (!artist) {
          throw new UnprocessableEntityException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist`,
          );
        }
        try {
          await this.prisma.favArtist.create({
            data: { artistId: id },
          });
        } catch (err) {
          return err;
        }

        return `${path.toLocaleUpperCase()} with id ${id} was added to favorites`;
      case 'album':
        const album = await this.prisma.album.findUnique({
          where: { id: id },
        });
        if (!album) {
          throw new UnprocessableEntityException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist`,
          );
        }
        try {
          await this.prisma.favAlbum.create({
            data: { albumId: id },
          });
        } catch (err) {
          return err;
        }

        return `${path.toLocaleUpperCase()} with id ${id} was added to favorites`;
      case 'track':
        const track = await this.prisma.track.findUnique({
          where: { id: id },
        });
        if (!track) {
          throw new UnprocessableEntityException(
            `${path.toLocaleUpperCase()} with id ${id} doesn't exist`,
          );
        }
        try {
          await this.prisma.favTrack.create({
            data: { trackId: id },
          });
        } catch (err) {
          return err;
        }

        return `${path.toLocaleUpperCase()} with id ${id} was added to favorites`;
      default:
        throw new BadRequestException(`Invalid path: ${path}`);
    }
  }

  async remove(path: string, id: string) {
    path = path.toLowerCase().trim();

    switch (path) {
      case 'artist':
        try {
          await this.prisma.favArtist.delete({
            where: { artistId: id },
          });

          return true;
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2025'
          ) {
            throw new NotFoundException(
              `${path.toLocaleUpperCase()} with id ${id} doesn't exist in favorites`,
            );
          } else {
            return err;
          }
        }

      case 'album':
        try {
          await this.prisma.favAlbum.delete({
            where: { albumId: id },
          });

          return true;
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2025'
          ) {
            throw new NotFoundException(
              `${path.toLocaleUpperCase()} with id ${id} doesn't exist in favorites`,
            );
          } else {
            return err;
          }
        }

      case 'track':
        try {
          await this.prisma.favTrack.delete({
            where: { trackId: id },
          });

          return true;
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2025'
          ) {
            throw new NotFoundException(
              `${path.toLocaleUpperCase()} with id ${id} doesn't exist in favorites`,
            );
          } else {
            return err;
          }
        }

      default:
        throw new BadRequestException(`Invalid path: ${path}`);
    }
  }
}
