import { ITeam } from '@domain/models/team.interface';
import { ITeamRepository } from '@domain/repositories/team.repository';

export class RetrieveTeamsByLeagueIdUseCases {
  constructor(private readonly _teamRepository: ITeamRepository) {}

  async execute(id: number): Promise<ITeam[]> {
    return this._teamRepository.getByLeagueId(id);
  }
}
