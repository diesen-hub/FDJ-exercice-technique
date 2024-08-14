import { UsecasesProxyModule } from '@infrastructure/use-cases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config.module';
import { ControllersModule } from './infrastructure/controller/controller.module';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    ControllersModule,
    EnvironmentConfigModule,
  ],
  providers: [],
})
export class AppModule {}
