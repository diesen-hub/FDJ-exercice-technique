import { IPlayer } from '@domain/models/player.interface';
import { IPlayerRepository } from '@domain/repositories/player.repository';

export class RetrievePlayersByTeamIdUseCases {
  constructor(private readonly _playerRepository: IPlayerRepository) {}

  async execute(id: number): Promise<IPlayer[]> {
    return this._playerRepository.getByTeamId(id);
  }
}
