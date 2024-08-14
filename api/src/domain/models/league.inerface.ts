import { ITeam } from './team.inerface';

export interface ICreateLeague {
  name: string;
  sport: string;
}

export interface ILeague {
  id: string;
  name: string;
  sport: string;
  teams?: ITeam[];
  createdDate: Date;
  updatedDate: Date;
}

const tmp = {
  _id: '5d2cdcf7da07b95bb8f16ed1',
  name: 'English Premier League',
  sport: 'soccer',
  teams: [
    '5d2d01fdda07b95bb8f16f0a',
    '5d2d02d7da07b95bb8f16f2a',
    '5d2d8f60da07b95bb8f17170',
  ],
};
