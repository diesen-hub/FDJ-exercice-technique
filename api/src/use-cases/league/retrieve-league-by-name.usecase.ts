import { ILeague } from '@domain/models/league.interface';
import { ILeagueRepository } from '@domain/repositories/league.repository';

export class RetrieveLeagueByNameUseCases {
  constructor(private readonly _leagueRepository: ILeagueRepository) {}

  async execute(name: string): Promise<ILeague[]> {
    return this._leagueRepository.getByName(name);
  }
}
