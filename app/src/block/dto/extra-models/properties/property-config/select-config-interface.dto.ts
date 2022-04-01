import { ApiExtraModels } from '@nestjs/swagger';
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

@ApiExtraModels()
export class SelectConfigDto implements SelectConfigInterface {
  options: SelectOptionInterface[];
}
