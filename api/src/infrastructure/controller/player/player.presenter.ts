import { IPlayer } from '@domain/models/player.inerface';
import { ApiProperty } from '@nestjs/swagger';
import { SigninPresenter } from '../signin/signin.presenter';
import { TeamPresenter } from '../team/team.presenter';

export class PlayerPresenter implements IPlayer {
  @ApiProperty({ type: Number })
  public id: number;
  @ApiProperty({ type: Number })
  public teamId?: number;
  @ApiProperty({ type: String })
  public name: string;
  @ApiProperty({ type: String })
  public position: string;
  @ApiProperty({ type: String })
  public thumbnail: string;
  @ApiProperty({ type: Date })
  public born: Date;
  @ApiProperty({ type: () => TeamPresenter })
  public team?: TeamPresenter;
  @ApiProperty({ type: () => SigninPresenter, isArray: true })
  public signins: SigninPresenter[];
  @ApiProperty({ type: Date })
  public createdDate: Date;
  @ApiProperty({ type: Date })
  public updatedDate: Date;

  constructor(data: IPlayer) {
    this.id = data.id;
    this.teamId = data.teamId;
    this.name = data.name;
    this.position = data.position;
    this.born = data.born;
    this.team = data.team ? new TeamPresenter(data.team) : undefined;
    this.signins =
      data.signins?.map((signin) => new SigninPresenter(signin)) ?? [];
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
