import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  SelectConfigInterface,
  SelectOptionInterface,
} from 'src/block/interfaces/properties/property-config/select-config.interface';

@ApiExtraModels()
export class SelectOptionDto
  implements Pick<SelectOptionInterface, 'color' | 'name'>
{
  color: string;
  name: string;
}

@ApiExtraModels(SelectOptionDto)
export class SelectConfigDto implements SelectConfigInterface {
  type: 'select';
  @ApiProperty({
    type: 'array',
    anyOf: [{ $ref: getSchemaPath(SelectOptionDto) }],
  })
  options: SelectOptionInterface[];
}
