import { ISignin } from '@domain/models/signin.inerface';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlayerEntity } from '../player/player.entity';
import { TeamEntity } from '../team/team.entity';

@Entity('signin')
export class SigninEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id?: number;

  @PrimaryColumn({ type: 'integer' })
  public playerId: number;

  @PrimaryColumn({ type: 'integer' })
  public teamId: number;

  @PrimaryColumn('varchar', { length: '20' })
  public currency: string;

  @PrimaryColumn('integer')
  public amount: number;

  @CreateDateColumn({ name: 'createdDate' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updatedDate' })
  public updatedDate: Date;

  @ManyToOne(() => TeamEntity, (team: TeamEntity) => team.signins)
  @JoinColumn({ referencedColumnName: 'id' })
  public team?: TeamEntity;

  @ManyToOne(() => PlayerEntity, (player: PlayerEntity) => player.signins)
  @JoinColumn({ referencedColumnName: 'id' })
  public player?: PlayerEntity;

  toDomaineEntity(): ISignin {
    return {
      id: this.id ?? 0,
      playerId: this.playerId,
      teamId: this.teamId,
      currency: this.currency,
      amount: this.amount,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
    };
  }
}
