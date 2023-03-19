import { ApiProperty } from '@nestjs/swagger';
import { BlockModelRefs, BlockDTOs } from './extra-models/block-models';

export class AppendBlockBlockDto {
  @ApiProperty({ required: true })
  block_id: string;
  // @ApiProperty({
  //   type: 'array',
  //   items: {
  //     anyOf: BlockModelRefs,
  //   },
  //   required: true,
  // })
  // children: BlockDTOs;
}
