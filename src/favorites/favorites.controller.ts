import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post(':path/:id')
  async create(
    @Param('path') path: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.favoritesService.create(path, id);
  }

  @Delete(':path/:id')
  @HttpCode(204)
  async remove(
    @Param('path') path: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.favoritesService.remove(path, id);
  }
}
