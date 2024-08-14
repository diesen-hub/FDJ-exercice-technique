export interface ICreateSignin {
  amount: string;
  currency: string;
}

export interface ISignin {
  id: string;
  playerId: string;
  teamId: string;
  amount: number;
  currency: string;
  createdDate: Date;
  updatedDate: Date;
}
