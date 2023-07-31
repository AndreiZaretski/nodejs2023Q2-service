import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.artistId !== null)
  @IsNotEmpty()
  @IsUUID()
  artistId: string | null;

  @ValidateIf((o) => o.albumId !== null)
  @IsNotEmpty()
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
