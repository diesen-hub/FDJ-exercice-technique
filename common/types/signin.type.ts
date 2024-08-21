export type CreateSigninType = {
  teamId: number;
  amount: number;
  currency: string;
};

export type SigninType = {
  id: number;
  playerId: number;
  teamId: number;
  amount: number;
  currency: string;
  createdDate: Date;
  updatedDate: Date;
};
