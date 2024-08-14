import { IEnvConfig } from '@domain/config/env.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements IEnvConfig {
  constructor(private configService: ConfigService) {}
  public getNodeEnv(): string {
    return this.configService.get<string>('APP_ENV') as string;
  }

  public getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') as string;
  }

  public getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') as number;
  }

  public getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER') as string;
  }

  public getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') as string;
  }

  public getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME') as string;
  }

  public getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA') as string;
  }
}
