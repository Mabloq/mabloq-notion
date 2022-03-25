import { ApiProperty } from '@nestjs/swagger';
import { BlockModelRefs, BlockModels } from './extra-models/block-models';
export class CreateBlockDto {
  @ApiProperty({ required: true })
  block_id: string;
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: BlockModelRefs,
    },
    required: true,
  })
  children: BlockModels;
}
