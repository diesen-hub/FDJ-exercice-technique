import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { PlayerRepository } from '@infrastructure/typeorm/player/player.repository';
import { SigninRepository } from '@infrastructure/typeorm/signin/signin.repository';
import { TeamRepository } from '@infrastructure/typeorm/team/team.repository';
import { Provider } from '@nestjs/common';
import { CreateNewSigninUseCases } from '@useCases/signin/create-new-signin.usecase';
import { ESigninUseCaseProxy } from '../use-case.type';
import { UseCaseProxy } from '../usecases-proxy';

export const SigninProvider: Provider[] = [
  {
    inject: [
      SigninRepository,
      PlayerRepository,
      TeamRepository,
      ExceptionsService,
    ],
    provide: ESigninUseCaseProxy.createNewSigninUseCasesProxy,
    useFactory: (
      signinRepository: SigninRepository,
      playerRepository: PlayerRepository,
      teamRepository: TeamRepository,
      exceptionsService: ExceptionsService,
    ) =>
      new UseCaseProxy(
        new CreateNewSigninUseCases(
          signinRepository,
          playerRepository,
          teamRepository,
          exceptionsService,
        ),
      ),
  },
];
