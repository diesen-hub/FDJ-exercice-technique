import { ISignin } from './signin.inerface';
import { ITeam } from './team.inerface';

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
