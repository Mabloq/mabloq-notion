import { ApiProperty } from '@nestjs/swagger';
import { BlockEnum } from '../../../block/schemas/common/block-enum';

export class BaseBlockDto {
  object: 'block';
  @ApiProperty({ enum: BlockEnum })
  type: string;
}
