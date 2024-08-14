import { LEAGUE_CONST } from '@domain/const/league.const';
import { ICreateLeague } from '@domain/models/league.inerface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateLeagueDto implements ICreateLeague {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @MaxLength(LEAGUE_CONST.name.max)
  public readonly name: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @MaxLength(LEAGUE_CONST.sport.max)
  public readonly sport: string;
}
