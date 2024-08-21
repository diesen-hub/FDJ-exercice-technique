export interface ICreateSignin {
  playerId: number;
  teamId: number;
  amount: number;
  currency: string;
}

export interface ISignin {
  id: number;
  playerId: number;
  teamId: number;
  amount: number;
  currency: string;
  createdDate: Date;
  updatedDate: Date;
}
