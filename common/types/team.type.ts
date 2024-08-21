import { LeagueType } from "./league.type";
import { PlayerType } from "./player.type";
import { SigninType } from "./signin.type";

export type CreateTeamType = {
  leagueId: number;
  name: string;
  thumbnail: string;
};

export type TeamType = {
  id: number;
  leagueId: number;
  name: string;
  thumbnail: string;
  league?: LeagueType;
  players?: PlayerType[];
  signins?: SigninType[];
  createdDate: Date;
  updatedDate: Date;
};
