import { Global, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Global()
@Injectable()
export class DbService {
  users: Map<string, User> = new Map();
  albums: Map<string, Album> = new Map();
  artists: Map<string, Artist> = new Map();
  tracks: Map<string, Track> = new Map();
  favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAllUsers() {
    return Array.from(this.users.values());
  }

  getUserById(id: string) {
    return this.users.get(id);
  }

  createUser(data: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: data.login,
      password: data.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.set(newUser.id, newUser);
    return newUser;
  }

  updateUser(data: UpdateUserDto, id: string) {
    const updateUser = this.users.get(id);

    if (updateUser) {
      updateUser.password = data.newPassword;
      updateUser.version = updateUser.version + 1;
      updateUser.updatedAt = Date.now();

      return updateUser;
    }
  }

  deleteUser(id: string) {
    return this.users.delete(id);
  }

  getAllArtists() {
    return Array.from(this.artists.values());
  }

  getArtistById(id: string) {
    return this.artists.get(id);
  }

  createArtist(data: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: data.name,
      grammy: data.grammy,
    };

    this.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  updateArtist(data: UpdateArtistDto, id: string) {
    const updateArtist = this.artists.get(id);

    if (updateArtist) {
      updateArtist.name = data.name;
      updateArtist.grammy = data.grammy;

      return updateArtist;
    }
  }

  deleteArtist(id: string) {
    return this.artists.delete(id);
  }

  getAllFavorites() {
    return this.favorites;
  }

  getTrackDb() {
    return this.tracks;
  }

  getAlbumDb() {
    return this.albums;
  }

  getAllAlbums() {
    return Array.from(this.albums.values());
  }

  getAlbumById(id: string) {
    return this.albums.get(id);
  }

  createAlbum(data: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      name: data.name,
      year: data.year,
      artistId: data.artistId,
    };

    this.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  updateAlbum(data: UpdateAlbumDto, id: string) {
    const updateAlbum = this.albums.get(id);

    if (updateAlbum) {
      // updateAlbum = {
      //   ...updateAlbum,
      //   name: data.name,
      //   year: data.year,
      //   artistId: data.artistId,
      // };

      // this.albums.set(updateAlbum.id, updateAlbum);

      updateAlbum.name = data.name;
      updateAlbum.year = data.year;
      updateAlbum.artistId = data.artistId;
      return updateAlbum;
    }
  }

  deleteAlbum(id: string) {
    return this.albums.delete(id);
  }
}
