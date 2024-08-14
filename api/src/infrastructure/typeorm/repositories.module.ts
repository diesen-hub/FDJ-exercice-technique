import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './config/typeorm.config.module';
import { LeagueEntity } from './league/league.entity';
import { LeagueRepository } from './league/league.repository';
import { PlayerEntity } from './player/player.entity';
import { SigninEntity } from './signin/signin.entity';
import { TeamEntity } from './team/team.entity';

const entities = [LeagueEntity, PlayerEntity, TeamEntity, SigninEntity];
const entitiesRepositories = [LeagueRepository];

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature(entities)],
  providers: entitiesRepositories,
  exports: entitiesRepositories,
})
export class RepositoriesModule {}
