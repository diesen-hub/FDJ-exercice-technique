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
import { CreateNewLeagueUseCases } from '@useCases/league/create-new-league.usecase';
import { RetrieveAllLeagueUseCases } from '@useCases/league/retrieve-all-league.usecase';
import { RetrieveLeagueByIdUseCases } from '@useCases/league/retrieve-league-by-id.usecase';
import { RetrieveTeamsByLeagueIdUseCases } from '@useCases/team/retrieve-teams-by-league-id.usecase';
import { IdDto } from '../dto/id.dto';
import { TeamPresenter } from '../team/team.presenter';
import { CreateLeagueDto } from './league.dto';
import { LeaguePresenter } from './league.presenter';

@Controller('league')
@ApiTags('league')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Internal error', type: String })
@ApiExtraModels(LeaguePresenter)
export class LeagueController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_NEW_LEAGUE_USE_CASE_PROXY)
    private readonly _createNewLeaguePassUseCases: UseCaseProxy<CreateNewLeagueUseCases>,
    @Inject(UsecasesProxyModule.RETRIEVE_ALL_LEAGUE_USE_CASE_PROXY)
    private readonly _retrieveAllLeaguePassUseCases: UseCaseProxy<RetrieveAllLeagueUseCases>,
    @Inject(UsecasesProxyModule.RETRIEVE_LEAGUE_BY_ID_USE_CASE_PROXY)
    private readonly _retrieveLeagueByIdPassUseCases: UseCaseProxy<RetrieveLeagueByIdUseCases>,
    @Inject(UsecasesProxyModule.RETRIEVE_TEAMS_BY_LEAGUE_ID_USE_CASE_PROXY)
    private readonly _retrieveTeamsByLeagueIdUseCases: UseCaseProxy<RetrieveTeamsByLeagueIdUseCases>,
  ) {}

  @Post('')
  @ApiOperation({ description: 'Create a league' })
  @ApiResponse({ status: 201, description: 'Succesful', type: LeaguePresenter })
  public async createLeague(
    @Body() body: CreateLeagueDto,
  ): Promise<LeaguePresenter> {
    const result = await this._createNewLeaguePassUseCases
      .getInstance()
      .execute(body);
    if (!result) {
      throw new InternalServerErrorException('Internal error');
    }
    return new LeaguePresenter(result);
  }

  @Get('')
  @ApiOperation({ description: 'Retrieve the list of all leagues' })
  @ApiResponse({
    status: 200,
    description: 'Succesful',
    type: [LeaguePresenter],
  })
  public async get(): Promise<LeaguePresenter[]> {
    const result = await this._retrieveAllLeaguePassUseCases
      .getInstance()
      .execute();

    return result.map((value) => new LeaguePresenter(value));
  }

  @Get(':id')
  @ApiOperation({ description: 'Retrieve a leagues by is id' })
  @ApiResponse({ status: 404, description: 'not found', type: String })
  @ApiResponse({
    status: 200,
    description: 'Succesful',
    type: LeaguePresenter,
  })
  public async getById(@Param() { id }: IdDto): Promise<LeaguePresenter> {
    const result = await this._retrieveLeagueByIdPassUseCases
      .getInstance()
      .execute(id);
    if (!result) {
      throw new NotFoundException(
        `League with the given id '${id}' was not found`,
      );
    }
    return new LeaguePresenter(result);
  }

  @Get(':id/team')
  @ApiOperation({ description: 'Retrieve the list of all teams by league id' })
  @ApiResponse({
    status: 200,
    description: 'Succesful',
    type: [TeamPresenter],
  })
  public async getTeamsByLeagueId(
    @Param() { id }: IdDto,
  ): Promise<TeamPresenter[]> {
    const result = await this._retrieveTeamsByLeagueIdUseCases
      .getInstance()
      .execute(id);

    return result.map((value) => new TeamPresenter(value));
  }
}
