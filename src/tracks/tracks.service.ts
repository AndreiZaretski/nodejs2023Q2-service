import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TracksService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.db.createTrack(createTrackDto);
  }

  findAll() {
    return this.db.getAllTracks();
  }

  findOne(id: string) {
    const track = this.db.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }

    return track;
  }

  update(updateTrackDto: UpdateTrackDto, id: string) {
    const updateTrack = this.db.updateTrack(updateTrackDto, id);
    if (!updateTrack) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }

    return updateTrack;
  }

  remove(id: string) {
    const removeTrack = this.db.deleteTrack(id);

    if (!removeTrack) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }

    const favorites = this.db.getAllFavorites();
    const newFavArtists = favorites.tracks.filter((item) => item! == id);
    favorites.artists = newFavArtists;
    return removeTrack;
  }
}
