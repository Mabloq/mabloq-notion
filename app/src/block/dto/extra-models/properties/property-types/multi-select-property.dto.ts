import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { MultiSelectPropertyInterface } from 'src/block/interfaces/properties/property-types/multi-select-property.interface';

@ApiExtraModels()
export class SelectNameDto {
  @ApiProperty()
  name: string;
}
@ApiExtraModels()
export class MultiSelectPropertyDto implements MultiSelectPropertyInterface {
  @ApiProperty({ default: 'multi_select' })
  type: 'multi_select';
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: {
        $ref: getSchemaPath(SelectNameDto),
      },
    },
  })
  multi_select: Array<{ name: string }>;
}
