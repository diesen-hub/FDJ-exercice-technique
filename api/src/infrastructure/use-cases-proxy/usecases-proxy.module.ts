import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from '@infrastructure/typeorm/repositories.module';
import { DynamicModule, Module } from '@nestjs/common';
import { LeagueProvider } from './providers/league.provider';
import { PlayerProvider } from './providers/player.provider';
import { SigninProvider } from './providers/signin.provider';
import { TeamProvider } from './providers/team.provider';
import {
  ELeagueUseCaseProxy,
  EPlayerUseCaseProxy,
  ESigninUseCaseProxy,
  ETeamUseCaseProxy,
} from './use-case.type';

@Module({
  imports: [ExceptionsModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  // League
  static CREATE_NEW_LEAGUE_USE_CASE_PROXY =
    ELeagueUseCaseProxy.createNewLeagueUseCasesProxy;
  static RETRIEVE_ALL_LEAGUE_USE_CASE_PROXY =
    ELeagueUseCaseProxy.retrieveAllLeagueUseCasesUseCasesProxy;
  static RETRIEVE_LEAGUE_BY_ID_USE_CASE_PROXY =
    ELeagueUseCaseProxy.retrieveLeagueByIdUseCasesUseCasesProxy;

  // Team
  static CREATE_NEW_TEAM_USE_CASE_PROXY =
    ETeamUseCaseProxy.createNewTeamUseCasesProxy;
  static RETRIEVE_TEAM_BY_ID_USE_CASE_PROXY =
    ETeamUseCaseProxy.retrieveTeamByIdUseCasesUseCasesProxy;
  static RETRIEVE_TEAMS_BY_LEAGUE_ID_USE_CASE_PROXY =
    ETeamUseCaseProxy.retrieveTeamsByLeagueIdUseCasesUseCasesProxy;

  // Team
  static CREATE_NEW_PLAYER_USE_CASE_PROXY =
    EPlayerUseCaseProxy.createNewPlayerUseCasesProxy;
  static RETRIEVE_PLAYER_BY_ID_USE_CASE_PROXY =
    EPlayerUseCaseProxy.retrievePlayerByIdUseCasesUseCasesProxy;
  static RETRIEVE_PLAYERS_BY_TEAM_ID_USE_CASE_PROXY =
    EPlayerUseCaseProxy.retrievePlayersByTeamIdUseCasesUseCasesProxy;

  // Signin
  static CREATE_NEW_SIGNIN_USE_CASE_PROXY =
    ESigninUseCaseProxy.createNewSigninUseCasesProxy;

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        ...LeagueProvider,
        ...TeamProvider,
        ...PlayerProvider,
        ...SigninProvider,
      ],
      exports: [
        UsecasesProxyModule.CREATE_NEW_LEAGUE_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_ALL_LEAGUE_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_LEAGUE_BY_ID_USE_CASE_PROXY,
        UsecasesProxyModule.CREATE_NEW_TEAM_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_TEAMS_BY_LEAGUE_ID_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_TEAM_BY_ID_USE_CASE_PROXY,
        UsecasesProxyModule.CREATE_NEW_PLAYER_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_PLAYERS_BY_TEAM_ID_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_PLAYER_BY_ID_USE_CASE_PROXY,
        UsecasesProxyModule.CREATE_NEW_SIGNIN_USE_CASE_PROXY,
      ],
    };
  }
}
