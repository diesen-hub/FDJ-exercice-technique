import { ILeague } from './league.interface';
import { IPlayer } from './player.interface';
import { ISignin } from './signin.interface';

export interface ICreateTeam {
  leagueId: number;
  name: string;
  thumbnail: string;
}

export interface ITeam {
  id: number;
  leagueId: number;
  name: string;
  thumbnail: string;
  league?: ILeague;
  players?: IPlayer[];
  signins?: ISignin[];
  createdDate: Date;
  updatedDate: Date;
}
