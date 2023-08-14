import {
  IsNotEmpty,
  IsNumber,
  //IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ValidateIf((o) => o.artistId !== null)
  @IsNotEmpty()
  @IsUUID()
  artistId: string | null;
}
