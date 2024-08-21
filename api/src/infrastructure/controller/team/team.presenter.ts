import { TeamType } from '@common/types/team.type';
import { ITeam } from '@domain/models/team.interface';
import { ApiProperty } from '@nestjs/swagger';
import { LeaguePresenter } from '../league/league.presenter';
import { PlayerPresenter } from '../player/player.presenter';
import { SigninPresenter } from '../signin/signin.presenter';

export class TeamPresenter implements TeamType {
  @ApiProperty({ type: Number })
  public id: number;
  @ApiProperty({ type: Number })
  public leagueId: number;
  @ApiProperty({ type: String })
  public name: string;
  @ApiProperty({ type: String })
  public thumbnail: string;
  @ApiProperty({ type: () => LeaguePresenter })
  public league?: LeaguePresenter;
  @ApiProperty({ type: () => PlayerPresenter, isArray: true })
  public players: PlayerPresenter[];
  @ApiProperty({ type: () => SigninPresenter, isArray: true })
  public signins: SigninPresenter[];
  @ApiProperty({ type: Date })
  public createdDate: Date;
  @ApiProperty({ type: Date })
  public updatedDate: Date;

  constructor(data: ITeam) {
    this.id = data.id;
    this.leagueId = data.leagueId;
    this.name = data.name;
    this.thumbnail = data.thumbnail;
    this.league = data.league ? new LeaguePresenter(data.league) : undefined;
    this.players =
      data.players?.map((player) => new PlayerPresenter(player)) ?? [];
    this.signins =
      data.signins?.map((signin) => new SigninPresenter(signin)) ?? [];
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
