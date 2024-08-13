export interface ICreateSignin {
  amount: string;
  currency: string;
}

export interface ISignin extends ICreateSignin {
  id: string;
  playerId: string;
  createdDate: Date;
  updatedDate: Date;
}
