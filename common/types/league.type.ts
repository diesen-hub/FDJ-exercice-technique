import { TeamType } from "./team.type";

export type CreateLeagueType = {
  name: string;
  sport: string;
};

export type GetLeagueType = {
  name?: string;
};

export type LeagueType = {
  id: number;
  name: string;
  sport: string;
  teams?: TeamType[];
  createdDate: Date;
  updatedDate: Date;
};
