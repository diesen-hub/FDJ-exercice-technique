import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('health-check')
@ApiTags('health-check')
@ApiResponse({ status: 500, description: 'Unsuccessful' })
export class HealthCheckController {
  @Get('')
  @ApiOperation({ description: 'Api health check' })
  @ApiResponse({ status: 200, description: 'Succesful', type: String })
  public ping(): string {
    return 'Succesful';
  }
}
