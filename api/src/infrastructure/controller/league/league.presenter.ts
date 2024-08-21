import { LeagueType } from '@common/types/league.type';
import { ILeague } from '@domain/models/league.interface';
import { ApiProperty } from '@nestjs/swagger';
import { TeamPresenter } from '../team/team.presenter';

export class LeaguePresenter implements LeagueType {
  @ApiProperty({ type: Number })
  public id: number;
  @ApiProperty({ type: String })
  public name: string;
  @ApiProperty({ type: String })
  public sport: string;
  @ApiProperty({ type: () => TeamPresenter, isArray: true })
  public teams: TeamPresenter[];
  @ApiProperty({ type: Date })
  public createdDate: Date;
  @ApiProperty({ type: Date })
  public updatedDate: Date;

  constructor(data: ILeague) {
    this.id = data.id;
    this.name = data.name;
    this.sport = data.sport;
    this.teams = data.teams?.map((team) => new TeamPresenter(team)) ?? [];
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
