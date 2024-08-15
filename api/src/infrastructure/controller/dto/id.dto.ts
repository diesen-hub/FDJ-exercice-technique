import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class IdDto {
  @ApiProperty({ required: true, type: Number })
  @Transform((p) => Number(p.value))
  @IsPositive()
  public readonly id: number;
}
