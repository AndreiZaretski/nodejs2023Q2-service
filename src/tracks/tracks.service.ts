import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    try {
      return await this.prisma.track.create({
        data: createTrackDto,
      });
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: id },
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }

    return track;
  }

  async update(updateTrackDto: UpdateTrackDto, id: string) {
    try {
      const updateTrack = await this.prisma.track.update({
        where: { id: id },
        data: updateTrackDto,
      });
      return updateTrack;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} doesn't exist`);
      } else {
        return err;
      }
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.track.delete({
        where: { id: id },
      });
      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} doesn't exist`);
      } else {
        return err;
      }
    }
  }
}
