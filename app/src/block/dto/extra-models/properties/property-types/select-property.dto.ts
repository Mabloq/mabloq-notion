import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { SelectPropertyInterface } from 'src/block/interfaces/properties/property-types/select-property.interface';

export class SelectNameDto {
  @ApiProperty()
  name: string;
}
@ApiExtraModels(SelectNameDto)
export class SelectPropertyDto implements SelectPropertyInterface {
  @ApiProperty()
  type: string;
  @ApiProperty({
    type: SelectNameDto,
  })
  select: { name: string };
}
