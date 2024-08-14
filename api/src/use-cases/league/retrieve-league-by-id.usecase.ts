import { ILeague } from '@domain/models/league.inerface';
import { ILeagueRepository } from '@domain/repositories/league.repository';

export class RetrieveLeagueByIdUseCases {
  constructor(private readonly _leagueRepository: ILeagueRepository) {}

  async execute(id: string): Promise<ILeague | null> {
    return this._leagueRepository.getById(id);
  }
}
