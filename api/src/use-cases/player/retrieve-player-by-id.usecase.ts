import { IPlayer } from '@domain/models/player.inerface';
import { IPlayerRepository } from '@domain/repositories/player.repository';

export class RetrievePlayerByIdUseCases {
  constructor(private readonly _playerRepository: IPlayerRepository) {}

  async execute(id: number): Promise<IPlayer | null> {
    return this._playerRepository.getById(id);
  }
}
