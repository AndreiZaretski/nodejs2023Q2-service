import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.remove(id);
  }
}
