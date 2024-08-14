import { ISignin } from '@domain/models/signin.inerface';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '../helpers/numeric-column.transformer';
import { PlayerEntity } from '../player/player.entity';
import { TeamEntity } from '../team/team.entity';

@Entity('signin')
export class SigninEntity {
  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  public id?: string;

  @PrimaryColumn('uuid')
  public playerId: string;

  @PrimaryColumn('uuid')
  public teamId: string;

  @PrimaryColumn('varchar', { length: '20' })
  public currency: string;

  @PrimaryColumn('numeric', {
    precision: 20,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  public amount: number;

  @CreateDateColumn({ name: 'createdDate' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updatedDate' })
  public updatedDate: Date;

  @ManyToOne(() => TeamEntity, (team: TeamEntity) => team.signins)
  @JoinColumn({ name: 'teamId' })
  team?: TeamEntity;

  @ManyToOne(() => PlayerEntity, (player: PlayerEntity) => player.signins)
  @JoinColumn({ name: 'playerId' })
  player?: PlayerEntity;

  toDomaineEntity(): ISignin {
    return {
      id: this.id ?? '',
      playerId: this.playerId,
      teamId: this.teamId,
      currency: this.currency,
      amount: this.amount,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
    };
  }
}
