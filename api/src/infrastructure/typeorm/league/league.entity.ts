import { ILeague } from '@domain/models/league.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamEntity } from '../team/team.entity';

@Entity('league')
export class LeagueEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id?: number;

  @PrimaryColumn('varchar', { length: '100' })
  public name: string;

  @Column('varchar', { length: '50' })
  public sport: string;

  @CreateDateColumn({ name: 'createdDate' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updatedDate' })
  public updatedDate: Date;

  @OneToMany(() => TeamEntity, (team: TeamEntity) => team.league)
  @JoinColumn({ referencedColumnName: 'leagueId' })
  public teams?: TeamEntity[];

  toDomaineEntity(): ILeague {
    return {
      id: this.id ?? 0,
      name: this.name,
      sport: this.sport,
      teams: this.teams?.map((team) => team?.toDomaineEntity()) ?? [],
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
    };
  }
}
