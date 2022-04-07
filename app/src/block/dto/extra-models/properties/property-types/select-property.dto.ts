import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { SelectPropertyInterface } from 'src/block/interfaces/properties/property-types/select-property.interface';

@ApiExtraModels()
export class SelectNameDto {
  @ApiProperty()
  name: string;
}
@ApiExtraModels()
export class SelectPropertyDto implements SelectPropertyInterface {
  @ApiProperty()
  type: 'select';
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      $ref: getSchemaPath(SelectNameDto),
    },
  })
  select: { name: string };
}
