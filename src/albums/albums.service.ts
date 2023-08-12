import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      return await this.prisma.album.create({
        data: createAlbumDto,
      });
    } catch (err) {
      //throw err;
      return err;
    }
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }

    return album;
  }

  async update(updateAlbumDto: UpdateAlbumDto, id: string) {
    try {
      const updateAlbum = await this.prisma.album.update({
        where: { id: id },
        data: updateAlbumDto,
      });
      return updateAlbum;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} doesn't exist`);
      } else {
        throw err;
      }
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({
        where: { id: id },
      });
      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} doesn't exist`);
      } else {
        //throw err;
        return false;
      }
    }

    // const tracks = this.db.getTrackDb();
    // tracks.forEach((item, key) => {
    //   if (item.albumId === id) {
    //     item.albumId = null;
    //     tracks.set(key, item);
    //   }
    // });

    // const favorites = this.db.getAllFavorites();
    // const newFavArtists = favorites.albums.filter((item) => item! == id);
    // favorites.artists = newFavArtists;
    // return removeAlbum;
  }
}
