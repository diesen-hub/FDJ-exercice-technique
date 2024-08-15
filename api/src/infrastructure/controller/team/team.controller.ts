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
import { RetrievePlayersByTeamIdUseCases } from '@useCases/player/retrieve-players-by-team-id.usecase';
import { CreateNewTeamUseCases } from '@useCases/team/create-new-team.usecase';
import { RetrieveTeamByIdUseCases } from '@useCases/team/retrieve-team-by-id.usecase';
import { IdDto } from '../dto/id.dto';
import { PlayerPresenter } from '../player/player.presenter';
import { CreateTeamDto } from './team.dto';
import { TeamPresenter } from './team.presenter';

@Controller('team')
@ApiTags('team')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal error', type: String })
@ApiExtraModels(TeamPresenter)
export class TeamController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_NEW_TEAM_USE_CASE_PROXY)
    private readonly _createNewTeamPassUseCases: UseCaseProxy<CreateNewTeamUseCases>,
    @Inject(UsecasesProxyModule.RETRIEVE_TEAM_BY_ID_USE_CASE_PROXY)
    private readonly _retrieveTeamByIdPassUseCases: UseCaseProxy<RetrieveTeamByIdUseCases>,
    @Inject(UsecasesProxyModule.RETRIEVE_PLAYERS_BY_TEAM_ID_USE_CASE_PROXY)
    private readonly _retrievePlayersByTeamIdUseCases: UseCaseProxy<RetrievePlayersByTeamIdUseCases>,
  ) {}

  @Post('')
  @ApiOperation({ description: 'Create a team' })
  @ApiResponse({ status: 201, description: 'Succesful', type: TeamPresenter })
  public async createTeam(@Body() body: CreateTeamDto): Promise<TeamPresenter> {
    const result = await this._createNewTeamPassUseCases
      .getInstance()
      .execute(body);
    if (!result) {
      throw new InternalServerErrorException('Internal error');
    }
    return new TeamPresenter(result);
  }

  @Get(':id')
  @ApiOperation({ description: 'Retrieve a team by is id' })
  @ApiResponse({ status: 404, description: 'not found', type: String })
  @ApiResponse({
    status: 200,
    description: 'Succesful',
    type: TeamPresenter,
  })
  public async getById(@Param() { id }: IdDto): Promise<TeamPresenter> {
    const result = await this._retrieveTeamByIdPassUseCases
      .getInstance()
      .execute(id);
    if (!result) {
      throw new NotFoundException(
        `Team with the given id '${id}' was not found`,
      );
    }
    return new TeamPresenter(result);
  }

  @Get('/player/:id')
  @ApiOperation({ description: 'Retrieve the list of all players by team id' })
  @ApiResponse({
    status: 200,
    description: 'Succesful',
    type: [PlayerPresenter],
  })
  public async getTeamsByLeagueId(
    @Param() { id }: IdDto,
  ): Promise<PlayerPresenter[]> {
    const result = await this._retrievePlayersByTeamIdUseCases
      .getInstance()
      .execute(id);

    return result.map((value) => new PlayerPresenter(value));
  }
}
