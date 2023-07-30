import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistsService {
  constructor(private db: DbService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.db.createArtist(createArtistDto);
  }

  async findAll() {
    return this.db.getAllArtists();
  }

  async findOne(id: string) {
    const artist = this.db.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }

    return artist;
  }

  async update(updateArtistDto: UpdateArtistDto, id: string) {
    const updateArtist = this.db.updateArtist(updateArtistDto, id);
    if (!updateArtist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }

    return updateArtist;
  }

  remove(id: string) {
    const removeArtist = this.db.deleteArtist(id);

    if (!removeArtist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }

    const tracks = this.db.getTrackDb();
    tracks.forEach((item, key) => {
      if (item.artistId === id) {
        item.artistId = null;
        tracks.set(key, item);
      }
    });

    const albums = this.db.getAlbumDb();
    albums.forEach((item, key) => {
      if (item.artistId === id) {
        item.artistId = null;
        albums.set(key, item);
      }
    });

    const favorites = this.db.getAllFavorites();
    const newFavArtists = favorites.artists.filter((item) => item! == id);
    favorites.artists = newFavArtists;
    return removeArtist;
  }
}
