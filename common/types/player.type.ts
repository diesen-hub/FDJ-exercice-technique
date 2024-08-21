import { SigninType } from "./signin.type";
import { TeamType } from "./team.type";

export type CreatePlayerType = {
  name: string;
  position: string;
  thumbnail: string;
  born: Date;
};

export type PlayerType = {
  id: number;
  teamId?: number;
  name: string;
  position: string;
  thumbnail: string;
  born: Date;
  team?: TeamType;
  signins: SigninType[];
  createdDate: Date;
  updatedDate: Date;
};
