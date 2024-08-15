import { TeamRepository } from '@infrastructure/typeorm/team/team.repository';
import { Provider } from '@nestjs/common';
import { CreateNewTeamUseCases } from '@useCases/team/create-new-team.usecase';
import { RetrieveTeamByIdUseCases } from '@useCases/team/retrieve-team-by-id.usecase';
import { RetrieveTeamsByLeagueIdUseCases } from '@useCases/team/retrieve-teams-by-league-id.usecase';
import { ETeamUseCaseProxy } from '../use-case.type';
import { UseCaseProxy } from '../usecases-proxy';

export const TeamProvider: Provider[] = [
  {
    inject: [TeamRepository],
    provide: ETeamUseCaseProxy.createNewTeamUseCasesProxy,
    useFactory: (teamRepository: TeamRepository) =>
      new UseCaseProxy(new CreateNewTeamUseCases(teamRepository)),
  },
  {
    inject: [TeamRepository],
    provide: ETeamUseCaseProxy.retrieveTeamsByLeagueIdUseCasesUseCasesProxy,
    useFactory: (teamRepository: TeamRepository) =>
      new UseCaseProxy(new RetrieveTeamsByLeagueIdUseCases(teamRepository)),
  },
  {
    inject: [TeamRepository],
    provide: ETeamUseCaseProxy.retrieveTeamByIdUseCasesUseCasesProxy,
    useFactory: (teamRepository: TeamRepository) =>
      new UseCaseProxy(new RetrieveTeamByIdUseCases(teamRepository)),
  },
];
