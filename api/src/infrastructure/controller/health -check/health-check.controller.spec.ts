import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(healthCheckController.ping()).toBe('Succesful');
    });
  });
});
