import { ICreateSignin, ISignin } from '../models/signin.interface';

export interface ISigninRepository {
  create(data: ICreateSignin): Promise<ISignin | null>;
  get(): Promise<ISignin[]>;
  getById(id: number): Promise<ISignin | null>;
}
