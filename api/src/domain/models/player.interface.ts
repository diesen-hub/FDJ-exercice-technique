import { ISignin } from './signin.interface';
import { ITeam } from './team.interface';

export interface ICreatePlayer {
  name: string;
  position: string;
  thumbnail: string;
  born: Date;
}

export interface IPlayer {
  id: number;
  teamId?: number;
  name: string;
  position: string;
  thumbnail: string;
  born: Date;
  team?: ITeam;
  signins: ISignin[];
  createdDate: Date;
  updatedDate: Date;
}
