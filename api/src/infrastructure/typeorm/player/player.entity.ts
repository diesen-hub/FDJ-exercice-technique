import { IPlayer } from '@domain/models/player.inerface';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SigninEntity } from '../signin/signin.entity';
import { TeamEntity } from '../team/team.entity';

@Entity('player')
export class PlayerEntity {
  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  public id?: string;

  @Column('uuid')
  public teamId: string;

  @PrimaryColumn('varchar', { length: '100' })
  public name: string;

  @Column('varchar', { length: '100' })
  public position: string;

  @Column('varchar')
  public thumbnail: string;

  @Column('date')
  public born: Date;

  @CreateDateColumn({ name: 'createdDate' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updatedDate' })
  public updatedDate: Date;

  @ManyToOne(() => TeamEntity, (team: TeamEntity) => team.players)
  @JoinColumn({ name: 'teamId' })
  team?: TeamEntity;

  @OneToMany(() => SigninEntity, (signin: SigninEntity) => signin.player)
  @JoinColumn({ referencedColumnName: 'playerId' })
  public signins?: SigninEntity[];

  toDomaineEntity(): IPlayer {
    return {
      id: this.id ?? '',
      teamId: this.teamId,
      name: this.name,
      position: this.position,
      thumbnail: this.thumbnail,
      born: this.born,
      team: this.team?.toDomaineEntity(),
      signins: this.signins?.map((signin) => signin?.toDomaineEntity()) ?? [],
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
    };
  }
}
