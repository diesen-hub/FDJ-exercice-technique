import { ITeam } from './team.interface';

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
