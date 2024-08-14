import { ILeague } from '@domain/models/league.inerface';
import { ITeam } from '@domain/models/team.inerface';
import { ApiProperty } from '@nestjs/swagger';

export class LeaguePresenter implements ILeague {
  @ApiProperty({ type: String })
  public id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  sport: string;
  @ApiProperty()
  teams?: ITeam[] | undefined;
  @ApiProperty({ type: Date })
  public createdDate: Date;
  @ApiProperty({ type: Date })
  public updatedDate: Date;

  constructor(data: ILeague) {
    this.id = data.id;
    this.name = data.name;
    this.sport = data.sport;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
