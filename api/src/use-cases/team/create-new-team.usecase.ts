import { ICreateTeam, ITeam } from '@domain/models/team.inerface';
import { ITeamRepository } from '@domain/repositories/team.repository';

export class CreateNewTeamUseCases {
  constructor(private readonly _teamRepository: ITeamRepository) {}

  async execute(data: ICreateTeam): Promise<ITeam | null> {
    return this._teamRepository.create(data);
  }
}
