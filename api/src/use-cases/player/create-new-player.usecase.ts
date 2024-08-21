import { ICreatePlayer, IPlayer } from '@domain/models/player.interface';
import { IPlayerRepository } from '@domain/repositories/player.repository';

export class CreateNewPlayerUseCases {
  constructor(private readonly _playerRepository: IPlayerRepository) {}

  async execute(data: ICreatePlayer): Promise<IPlayer | null> {
    return this._playerRepository.create(data);
  }
}
