import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumsService {
  constructor(private db: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.db.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.db.getAllAlbums();
  }

  findOne(id: string) {
    const album = this.db.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }

    return album;
  }

  update(updateAlbumDto: UpdateAlbumDto, id: string) {
    const updateAlbum = this.db.updateAlbum(updateAlbumDto, id);
    if (!updateAlbum) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }

    return updateAlbum;
  }

  remove(id: string) {
    const removeAlbum = this.db.deleteAlbum(id);

    if (!removeAlbum) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }

    const tracks = this.db.getTrackDb();
    tracks.forEach((item, key) => {
      if (item.artistId === id) {
        item.artistId = null;
        tracks.set(key, item);
      }
    });

    const favorites = this.db.getAllFavorites();
    const newFavArtists = favorites.albums.filter((item) => item! == id);
    favorites.artists = newFavArtists;
    return removeAlbum;
  }
}
