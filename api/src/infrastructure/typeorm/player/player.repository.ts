import { ICreatePlayer, IPlayer } from '@domain/models/player.interface';
import { IPlayerRepository } from '@domain/repositories/player.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { PlayerEntity } from './player.entity';

@Injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly _playerRepository: Repository<PlayerEntity>,
  ) {}

  public async create(data: ICreatePlayer): Promise<IPlayer | null> {
    const insertResult: InsertResult = await this._playerRepository.insert(
      data,
    );
    return this.getById(insertResult.generatedMaps[0].id);
  }

  public async get(): Promise<IPlayer[]> {
    const playerEntities: PlayerEntity[] = await this._playerRepository.find({
      relations: {
        signins: true,
      },
    });
    return playerEntities.map((playerEntity) => playerEntity.toDomaineEntity());
  }

  public async getById(id: number): Promise<IPlayer | null> {
    const playerEntity = await this._playerRepository.findOne({
      relations: {
        signins: true,
      },
      where: { id: id },
    });
    return playerEntity?.toDomaineEntity() ?? null;
  }

  public async getByTeamId(id: number): Promise<IPlayer[]> {
    const playerEntities = await this._playerRepository.find({
      where: { teamId: id },
      relations: {
        signins: true,
      },
    });

    return playerEntities.map((playerEntity) => playerEntity.toDomaineEntity());
  }
}
