import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty({ required: true, type: String })
  @IsUUID()
  public readonly id: string;
}
