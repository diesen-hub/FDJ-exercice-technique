import { ICreateSignin, ISignin } from '../models/signin.inerface';

export interface ISigninRepository {
  create(data: ICreateSignin): Promise<ISignin | null>;
  get(): Promise<ISignin[]>;
  getById(id: string): Promise<ISignin | null>;
}
