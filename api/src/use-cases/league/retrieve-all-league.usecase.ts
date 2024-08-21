import { ILeague } from '@domain/models/league.interface';
import { ILeagueRepository } from '@domain/repositories/league.repository';

export class RetrieveAllLeagueUseCases {
  constructor(private readonly _leagueRepository: ILeagueRepository) {}

  async execute(name?: string): Promise<ILeague[]> {
    if (name?.length) {
      return this._leagueRepository.getByName(name);
    }
    return this._leagueRepository.get();
  }
}
