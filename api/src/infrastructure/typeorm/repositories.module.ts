import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './config/typeorm.config.module';
import { LeagueEntity } from './league/league.entity';
import { LeagueRepository } from './league/league.repository';
import { PlayerEntity } from './player/player.entity';
import { PlayerRepository } from './player/player.repository';
import { SigninEntity } from './signin/signin.entity';
import { SigninRepository } from './signin/signin.repository';
import { TeamEntity } from './team/team.entity';
import { TeamRepository } from './team/team.repository';

const entities = [LeagueEntity, PlayerEntity, TeamEntity, SigninEntity];
const entitiesRepositories = [
  LeagueRepository,
  TeamRepository,
  PlayerRepository,
  SigninRepository,
];

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature(entities)],
  providers: entitiesRepositories,
  exports: entitiesRepositories,
})
export class RepositoriesModule {}
