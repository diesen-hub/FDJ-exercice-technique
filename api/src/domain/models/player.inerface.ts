import { ICreateSignin, ISignin } from './signin.inerface';
import { ITeam } from './team.inerface';

export interface ICreatePlayer {
  name: string;
  position: string;
  thumbnail: string;
  born: Date;
  signin: ICreateSignin;
}

export interface IPlayer extends Omit<ICreatePlayer, 'signin'> {
  id: string;
  teamId: string;
  team: ITeam;
  signin: ISignin;
  createdDate: Date;
  updatedDate: Date;
}

const tmp = {
  _id: '5d2d058cda07b95bb8f16f80',
  name: 'Pierre-Emerick Aubameyang',
  position: 'Forward',
  thumbnail:
    'https://www.thesportsdb.com/images/media/player/thumb/fnk3u51520755737.jpg',
  signin: { amount: 63750000, currency: 'eur' },
  born: '1989-06-19T01:37:19.198Z',
};
