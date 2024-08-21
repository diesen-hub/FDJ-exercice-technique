import { CreateTeamType } from '@common/types/team.type';
import { TEAM_CONST } from '@domain/const/team.const';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsUrl, MaxLength } from 'class-validator';

export class CreateTeamDto implements CreateTeamType {
  @ApiProperty({ required: true, type: Number })
  @Transform((p) => Number(p.value))
  @IsPositive()
  leagueId: number;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @MaxLength(TEAM_CONST.name.max)
  public readonly name: string;

  @ApiProperty({ required: true, type: String })
  @IsUrl()
  thumbnail: string;
}
