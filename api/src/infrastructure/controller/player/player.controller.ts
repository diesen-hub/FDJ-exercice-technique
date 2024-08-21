import { ICreateSignin } from '@domain/models/signin.interface';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '@infrastructure/use-cases-proxy/usecases-proxy.module';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNewPlayerUseCases } from '@useCases/player/create-new-player.usecase';
import { RetrievePlayerByIdUseCases } from '@useCases/player/retrieve-player-by-id.usecase';
import { CreateNewSigninUseCases } from '@useCases/signin/create-new-signin.usecase';
import { IdDto } from '../dto/id.dto';
import { SigninPresenter } from '../signin/signin.presenter';
import { AgregateSiginToPlayerDto, CreatePlayerDto } from './player.dto';
import { PlayerPresenter } from './player.presenter';

@Controller('player')
@ApiTags('player')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal error', type: String })
@ApiExtraModels(PlayerPresenter)
export class PlayerController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_NEW_PLAYER_USE_CASE_PROXY)
    private readonly _createNewPlayerPassUseCases: UseCaseProxy<CreateNewPlayerUseCases>,
    @Inject(UsecasesProxyModule.RETRIEVE_PLAYER_BY_ID_USE_CASE_PROXY)
    private readonly _retrievePlayerByIdUseCases: UseCaseProxy<RetrievePlayerByIdUseCases>,
    @Inject(UsecasesProxyModule.CREATE_NEW_SIGNIN_USE_CASE_PROXY)
    private readonly _createNewSigninUseCases: UseCaseProxy<CreateNewSigninUseCases>,
  ) {}

  @Post('')
  @ApiOperation({ description: 'Create a player' })
  @ApiResponse({ status: 201, description: 'Succesful', type: PlayerPresenter })
  public async createPlayer(
    @Body() body: CreatePlayerDto,
  ): Promise<PlayerPresenter> {
    const result = await this._createNewPlayerPassUseCases
      .getInstance()
      .execute(body);
    if (!result) {
      throw new InternalServerErrorException('Internal error');
    }
    return new PlayerPresenter(result);
  }

  @Get(':id')
  @ApiOperation({ description: 'Retrieve a players by is id' })
  @ApiResponse({ status: 404, description: 'not found', type: String })
  @ApiResponse({
    status: 200,
    description: 'Succesful',
    type: PlayerPresenter,
  })
  public async getById(@Param() { id }: IdDto): Promise<PlayerPresenter> {
    const result = await this._retrievePlayerByIdUseCases
      .getInstance()
      .execute(id);
    if (!result) {
      throw new NotFoundException(
        `Player with the given id '${id}' was not found`,
      );
    }
    return new PlayerPresenter(result);
  }

  @Post(':id/signin')
  @ApiOperation({ description: 'Agregate signin to a player by is id' })
  @ApiResponse({ status: 201, description: 'Succesful', type: SigninPresenter })
  public async agregateSiginToPlayer(
    @Param() { id }: IdDto,
    @Body() body: AgregateSiginToPlayerDto,
  ): Promise<SigninPresenter> {
    const payload: ICreateSignin = {
      playerId: id,
      teamId: body.teamId,
      amount: body.amount,
      currency: body.currency,
    };

    const result = await this._createNewSigninUseCases
      .getInstance()
      .execute(payload);

    if (!result) {
      throw new NotFoundException(`Internal error`);
    }

    return new SigninPresenter(result);
  }
}
