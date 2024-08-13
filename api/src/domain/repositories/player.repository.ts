import { ICreatePlayer, IPlayer } from '../models/player.inerface';

export interface IPlayerRepository {
  create(data: ICreatePlayer): Promise<IPlayer | null>;
  get(): Promise<IPlayer[]>;
  getById(id: string): Promise<IPlayer | null>;
}
