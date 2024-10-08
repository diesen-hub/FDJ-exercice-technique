import { ICreatePlayer, IPlayer } from '../models/player.interface';

export interface IPlayerRepository {
  create(data: ICreatePlayer): Promise<IPlayer | null>;
  get(): Promise<IPlayer[]>;
  getById(id: number): Promise<IPlayer | null>;
  getByTeamId(id: number): Promise<IPlayer[]>;
}
