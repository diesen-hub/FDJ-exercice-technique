import { ITeam } from './team.inerface';

export interface ICreateLeague {
  name: string;
  sport: string;
}

export interface ILeague {
  id: number;
  name: string;
  sport: string;
  teams?: ITeam[];
  createdDate: Date;
  updatedDate: Date;
}
