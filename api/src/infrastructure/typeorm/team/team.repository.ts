import { ICreateTeam, ITeam } from '@domain/models/team.interface';
import { ITeamRepository } from '@domain/repositories/team.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { TeamEntity } from './team.entity';

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly _teamRepository: Repository<TeamEntity>,
  ) {}

  public async create(data: ICreateTeam): Promise<ITeam | null> {
    const insertResult: InsertResult = await this._teamRepository.insert(data);
    return this.getById(insertResult.generatedMaps[0].id);
  }

  public async get(): Promise<ITeam[]> {
    const teamEntities: TeamEntity[] = await this._teamRepository.find();
    return teamEntities.map((teamEntity) => teamEntity.toDomaineEntity());
  }

  public async getById(id: number): Promise<ITeam | null> {
    const teamEntity = await this._teamRepository.findOne({
      where: { id: id },
    });
    return teamEntity?.toDomaineEntity() ?? null;
  }

  public async getByLeagueId(id: number): Promise<ITeam[]> {
    const teamEntities: TeamEntity[] = await this._teamRepository.find({
      where: {
        leagueId: id,
      },
    });
    return teamEntities.map((teamEntity) => teamEntity.toDomaineEntity());
  }
}
