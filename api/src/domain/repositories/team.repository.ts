import { ICreateTeam, ITeam } from '../models/team.interface';

export interface ITeamRepository {
  create(data: ICreateTeam): Promise<ITeam | null>;
  get(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
  getByLeagueId(id: number): Promise<ITeam[]>;
}
