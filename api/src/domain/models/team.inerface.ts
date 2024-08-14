import { ILeague } from './league.inerface';
import { IPlayer } from './player.inerface';
import { ISignin } from './signin.inerface';

export interface ICreateTeam {
  name: string;
  thumbnail: string;
}

export interface ITeam {
  id: string;
  leagueId: string;
  name: string;
  thumbnail: string;
  league?: ILeague;
  players: IPlayer[];
  signins: ISignin[];
  createdDate: Date;
  updatedDate: Date;
}

const tmp = {
  _id: '5d2d01fdda07b95bb8f16f0a',
  name: 'Arsenal',
  thumbnail:
    'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
  players: ['5d2d058cda07b95bb8f16f80', '5d2d0653da07b95bb8f16fa8'],
};
