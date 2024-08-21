import { ILeague } from '@domain/models/league.interface';
import { ILeagueRepository } from '@domain/repositories/league.repository';

export class RetrieveAllLeagueUseCases {
  constructor(private readonly _leagueRepository: ILeagueRepository) {}

  async execute(): Promise<ILeague[]> {
    return this._leagueRepository.get();
  }
}
