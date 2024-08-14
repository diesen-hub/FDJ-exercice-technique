import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { RepositoriesModule } from '@infrastructure/typeorm/repositories.module';
import { DynamicModule, Module } from '@nestjs/common';
import { LeagueProvider } from './providers/league.provider';
import { ELeagueUseCaseProxy } from './use-case.type';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  // League
  static CREATE_NEW_LEAGUE_USE_CASE_PROXY =
    ELeagueUseCaseProxy.createNewLeagueUseCasesProxy;
  static RETRIEVE_ALL_LEAGUE_USE_CASE_PROXY =
    ELeagueUseCaseProxy.retrieveAllLeagueUseCasesUseCasesProxy;
  static RETRIEVE_LEAGUE_BY_ID_USE_CASE_PROXY =
    ELeagueUseCaseProxy.retrieveLeagueByIdUseCasesUseCasesProxy;

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [...LeagueProvider],
      exports: [
        UsecasesProxyModule.CREATE_NEW_LEAGUE_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_ALL_LEAGUE_USE_CASE_PROXY,
        UsecasesProxyModule.RETRIEVE_LEAGUE_BY_ID_USE_CASE_PROXY,
      ],
    };
  }
}
