import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;
  version: number; // integer number, increments on update

  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number | Date; // timestamp of creation
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number | Date; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
