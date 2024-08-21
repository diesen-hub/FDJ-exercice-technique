import { ICreateLeague, ILeague } from '@domain/models/league.interface';
import { ILeagueRepository } from '@domain/repositories/league.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { LeagueEntity } from './league.entity';

@Injectable()
export class LeagueRepository implements ILeagueRepository {
  constructor(
    @InjectRepository(LeagueEntity)
    private readonly _leagueRepository: Repository<LeagueEntity>,
  ) {}

  public async create(data: ICreateLeague): Promise<ILeague | null> {
    const insertResult: InsertResult = await this._leagueRepository.insert(
      data,
    );
    return this.getById(insertResult.generatedMaps[0].id);
  }

  public async get(): Promise<ILeague[]> {
    const leagueEntities: LeagueEntity[] = await this._leagueRepository.find();
    return leagueEntities.map((leagueEntity) => leagueEntity.toDomaineEntity());
  }

  public async getById(id: number): Promise<ILeague | null> {
    const leagueEntity = await this._leagueRepository.findOne({
      where: { id: id },
    });
    return leagueEntity?.toDomaineEntity() ?? null;
  }
}
