import { ITeam } from '@domain/models/team.inerface';
import { ITeamRepository } from '@domain/repositories/team.repository';

export class RetrieveTeamByIdUseCases {
  constructor(private readonly _teamRepository: ITeamRepository) {}

  async execute(id: number): Promise<ITeam | null> {
    return this._teamRepository.getById(id);
  }
}
