import { IException } from '@domain/exceptions/exceptions.interface';
import { ICreateSignin, ISignin } from '@domain/models/signin.interface';
import { IPlayerRepository } from '@domain/repositories/player.repository';
import { ISigninRepository } from '@domain/repositories/signin.repository';
import { ITeamRepository } from '@domain/repositories/team.repository';

export class CreateNewSigninUseCases {
  constructor(
    private readonly _signinRepository: ISigninRepository,
    private readonly _playerRepository: IPlayerRepository,
    private readonly _teamRepository: ITeamRepository,
    private readonly _exception: IException,
  ) {}

  async execute(data: ICreateSignin): Promise<ISignin | null> {
    const player = await this._playerRepository.getById(data.playerId);
    if (!player) {
      this._exception.notFoundException(
        `Player with the given id '${data.playerId}' was not found`,
      );
      return null;
    }
    const team = await this._teamRepository.getById(data.teamId);
    if (!team) {
      this._exception.notFoundException(
        `Team with the given id '${data.teamId}' was not found`,
      );
      return null;
    }
    const result = await this._signinRepository.create(data);
    player.teamId = team.id;
    await this._playerRepository.create(player);
    return result;
  }
}
