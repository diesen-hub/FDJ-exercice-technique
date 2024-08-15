import { ICreateLeague, ILeague } from '../models/league.inerface';

export interface ILeagueRepository {
  create(data: ICreateLeague): Promise<ILeague | null>;
  get(): Promise<ILeague[]>;
  getById(id: number): Promise<ILeague | null>;
}
