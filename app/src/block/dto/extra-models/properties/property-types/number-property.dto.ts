import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { NumberPropertyInterface } from 'src/block/interfaces/properties/property-types/number-property.interface';

@ApiExtraModels()
export class NumberPropertyDto implements NumberPropertyInterface {
  @ApiProperty({ default: 'number' })
  type: 'number';
  @ApiProperty()
  number: number;
}
