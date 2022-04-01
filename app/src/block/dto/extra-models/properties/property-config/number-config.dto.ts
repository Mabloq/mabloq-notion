import { ApiProperty } from '@nestjs/swagger';
import { NumberConfigInterface } from 'src/block/interfaces/properties/property-config/number-config.interface';

export enum NumberConfigEnum {
  NUMBER = 'number',
  DOLLAR = 'dollar',
  NUMBER_WITH_COMMAS = 'number_with_commas',
  PERCENT = 'percent',
}

export class NumberConfigDto implements NumberConfigInterface {
  @ApiProperty({ type: 'string', enum: Object.values(NumberConfigEnum) })
  format: NumberConfigEnum;
}
