import { UsecasesProxyModule } from '@infrastructure/use-cases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { HealthCheckController } from './health -check/health-check.controller';
import { LeagueController } from './league/league.controller';
import { PlayerController } from './player/player.controller';
import { TeamController } from './team/team.controller';

const controllers = [
  HealthCheckController,
  LeagueController,
  TeamController,
  PlayerController,
];

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers,
})
export class ControllersModule {}
