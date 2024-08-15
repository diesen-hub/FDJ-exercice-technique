import { PlayerRepository } from '@infrastructure/typeorm/player/player.repository';
import { Provider } from '@nestjs/common';
import { CreateNewPlayerUseCases } from '@useCases/player/create-new-player.usecase';
import { RetrievePlayerByIdUseCases } from '@useCases/player/retrieve-player-by-id.usecase';
import { RetrievePlayersByTeamIdUseCases } from '@useCases/player/retrieve-players-by-team-id.usecase';
import { EPlayerUseCaseProxy } from '../use-case.type';
import { UseCaseProxy } from '../usecases-proxy';

export const PlayerProvider: Provider[] = [
  {
    inject: [PlayerRepository],
    provide: EPlayerUseCaseProxy.createNewPlayerUseCasesProxy,
    useFactory: (playerRepository: PlayerRepository) =>
      new UseCaseProxy(new CreateNewPlayerUseCases(playerRepository)),
  },
  {
    inject: [PlayerRepository],
    provide: EPlayerUseCaseProxy.retrievePlayerByIdUseCasesUseCasesProxy,
    useFactory: (playerRepository: PlayerRepository) =>
      new UseCaseProxy(new RetrievePlayerByIdUseCases(playerRepository)),
  },
  {
    inject: [PlayerRepository],
    provide: EPlayerUseCaseProxy.retrievePlayersByTeamIdUseCasesUseCasesProxy,
    useFactory: (playerRepository: PlayerRepository) =>
      new UseCaseProxy(new RetrievePlayersByTeamIdUseCases(playerRepository)),
  },
];
