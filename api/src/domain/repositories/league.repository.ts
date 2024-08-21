import { ICreateLeague, ILeague } from '../models/league.interface';

export interface ILeagueRepository {
  create(data: ICreateLeague): Promise<ILeague | null>;
  get(): Promise<ILeague[]>;
  getById(id: number): Promise<ILeague | null>;
  getByName(name: string): Promise<ILeague[]>;
}
