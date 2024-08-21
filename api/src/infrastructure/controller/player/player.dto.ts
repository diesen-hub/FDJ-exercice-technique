import { CreatePlayerType } from '@common/types/player.type';
import { CreateSigninType } from '@common/types/signin.type';
import { PLAYER_CONST } from '@domain/const/player.const';
import { SIGNIN_CONST } from '@domain/const/signin.const';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePlayerDto implements CreatePlayerType {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @MaxLength(PLAYER_CONST.name.max)
  public readonly name: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @MaxLength(PLAYER_CONST.position.max)
  public readonly position: string;

  @ApiProperty({ required: true, type: String })
  @IsUrl()
  public readonly thumbnail: string;

  @ApiProperty({ required: true, type: String })
  @Transform((p) => new Date(p.value))
  @IsDate()
  public readonly born: Date;
}

export class AgregateSiginToPlayerDto implements CreateSigninType {
  @ApiProperty({ required: true, type: Number })
  @Transform((p) => Number(p.value))
  @IsPositive()
  public readonly teamId: number;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @MaxLength(SIGNIN_CONST.currency.max)
  public readonly currency: string;

  @ApiProperty({ required: true, type: Number })
  @Transform((p) => Number(p.value))
  @IsNumber()
  @Min(0)
  public readonly amount: number;
}
