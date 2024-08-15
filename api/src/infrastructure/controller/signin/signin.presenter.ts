import { ISignin } from '@domain/models/signin.inerface';
import { ApiProperty } from '@nestjs/swagger';

export class SigninPresenter implements ISignin {
  @ApiProperty({ type: Number })
  public id: number;
  @ApiProperty({ type: Number })
  public teamId: number;
  @ApiProperty({ type: Number })
  public playerId: number;
  @ApiProperty({ type: Number })
  public amount: number;
  @ApiProperty({ type: String })
  public currency: string;
  @ApiProperty({ type: Date })
  public createdDate: Date;
  @ApiProperty({ type: Date })
  public updatedDate: Date;

  constructor(data: ISignin) {
    this.id = data.id;
    this.teamId = data.teamId;
    this.playerId = data.playerId;
    this.amount = data.amount;
    this.currency = data.currency;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
