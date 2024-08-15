import { ILeague } from './league.inerface';
import { IPlayer } from './player.inerface';
import { ISignin } from './signin.inerface';

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
