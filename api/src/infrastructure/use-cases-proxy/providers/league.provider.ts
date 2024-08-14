import { LeagueRepository } from '@infrastructure/typeorm/league/league.repository';
import { Provider } from '@nestjs/common';
import { CreateNewLeagueUseCases } from '@useCases/league/create-new-league.usecase';
import { RetrieveAllLeagueUseCases } from '@useCases/league/retrieve-all-league.usecase';
import { RetrieveLeagueByIdUseCases } from '@useCases/league/retrieve-league-by-id.usecase';
import { ELeagueUseCaseProxy } from '../use-case.type';
import { UseCaseProxy } from '../usecases-proxy';

export const LeagueProvider: Provider[] = [
  {
    inject: [LeagueRepository],
    provide: ELeagueUseCaseProxy.createNewLeagueUseCasesProxy,
    useFactory: (leagueRepository: LeagueRepository) =>
      new UseCaseProxy(new CreateNewLeagueUseCases(leagueRepository)),
  },
  {
    inject: [LeagueRepository],
    provide: ELeagueUseCaseProxy.retrieveAllLeagueUseCasesUseCasesProxy,
    useFactory: (leagueRepository: LeagueRepository) =>
      new UseCaseProxy(new RetrieveAllLeagueUseCases(leagueRepository)),
  },
  {
    inject: [LeagueRepository],
    provide: ELeagueUseCaseProxy.retrieveLeagueByIdUseCasesUseCasesProxy,
    useFactory: (leagueRepository: LeagueRepository) =>
      new UseCaseProxy(new RetrieveLeagueByIdUseCases(leagueRepository)),
  },
];
