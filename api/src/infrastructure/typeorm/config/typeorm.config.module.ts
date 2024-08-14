import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    synchronize: false,
    schema: config.getDatabaseSchema(),
    migrationsRun: true,
    migrations: [__dirname + './../migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/infrastructure/typeorm/migrations',
    },
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
