import { Global, Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
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
  favorites: Favorite[] = [];

  getAllUsers() {
    return Array.from(this.users.values());
    //.map((user) => {
    //delete user.password;
    //return user;
    //});
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
}
