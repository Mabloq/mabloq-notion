import { ApiProperty } from '@nestjs/swagger';
import { BlockEnum } from 'src/block/schemas/common/block-enum';

export class BaseBlockDto {
  object: 'block';
  @ApiProperty({ enum: BlockEnum })
  type: BlockEnum;
}
