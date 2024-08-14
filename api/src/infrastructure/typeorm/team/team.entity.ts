import { ITeam } from '@domain/models/team.inerface';
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
import { LeagueEntity } from '../league/league.entity';
import { PlayerEntity } from '../player/player.entity';
import { SigninEntity } from '../signin/signin.entity';

@Entity('team')
export class TeamEntity {
  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  public id?: string;

  @PrimaryColumn('uuid')
  public leagueId: string;

  @PrimaryColumn('varchar', { length: '100' })
  public name: string;

  @Column('varchar')
  public thumbnail: string;

  @CreateDateColumn({ name: 'createdDate' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updatedDate' })
  public updatedDate: Date;

  @ManyToOne(() => LeagueEntity, (league: LeagueEntity) => league.teams)
  @JoinColumn({ name: 'leagueId' })
  league?: LeagueEntity;

  @OneToMany(() => PlayerEntity, (player: PlayerEntity) => player.team)
  @JoinColumn({ referencedColumnName: 'teamId' })
  public players?: PlayerEntity[];

  @OneToMany(() => SigninEntity, (signins: SigninEntity) => signins.team)
  @JoinColumn({ referencedColumnName: 'teamId' })
  public signins?: SigninEntity[];

  toDomaineEntity(): ITeam {
    return {
      id: this.id ?? '',
      leagueId: this.leagueId,
      name: this.name,
      thumbnail: this.thumbnail,
      league: this.league?.toDomaineEntity(),
      players: this.players?.map((player) => player?.toDomaineEntity()) ?? [],
      signins: this.signins?.map((signin) => signin?.toDomaineEntity()) ?? [],
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
    };
  }
}
