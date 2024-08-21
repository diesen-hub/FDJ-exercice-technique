import { ICreateLeague, ILeague } from '@domain/models/league.interface';
import { ILeagueRepository } from '@domain/repositories/league.repository';

export class CreateNewLeagueUseCases {
  constructor(private readonly _leagueRepository: ILeagueRepository) {}

  async execute(data: ICreateLeague): Promise<ILeague | null> {
    return this._leagueRepository.create(data);
  }
}
