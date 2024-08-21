import { ICreateSignin, ISignin } from '@domain/models/signin.interface';
import { ISigninRepository } from '@domain/repositories/signin.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { SigninEntity } from './signin.entity';

@Injectable()
export class SigninRepository implements ISigninRepository {
  constructor(
    @InjectRepository(SigninEntity)
    private readonly _signinRepository: Repository<SigninEntity>,
  ) {}

  public async create(data: ICreateSignin): Promise<ISignin | null> {
    const insertResult: InsertResult = await this._signinRepository.insert(
      data,
    );
    return this.getById(insertResult.generatedMaps[0].id);
  }

  public async get(): Promise<ISignin[]> {
    const signinEntities: SigninEntity[] = await this._signinRepository.find();
    return signinEntities.map((signinEntity) => signinEntity.toDomaineEntity());
  }

  public async getById(id: number): Promise<ISignin | null> {
    const signinEntity = await this._signinRepository.findOne({
      where: { id: id },
    });
    return signinEntity?.toDomaineEntity() ?? null;
  }
}
