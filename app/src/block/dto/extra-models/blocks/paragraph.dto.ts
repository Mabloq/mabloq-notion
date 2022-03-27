import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
import { BaseBlockDto } from '../base-block.dto';
import { BlockModelRefs, BlockDTOs } from '../block-models';

@ApiExtraModels(RichTextDto)
export class ParagraphDto {
  @ApiProperty({ required: false })
  color?: string;
  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(RichTextDto) },
    required: true,
  })
  rich_text: RichTextDto[];
  @ApiProperty({
    type: 'array',
    items: {
      anyOf: BlockModelRefs,
    },
    required: false,
  })
  children?: BlockDTOs[];
}

@ApiExtraModels(ParagraphDto)
export class ParagraphBlockDto extends BaseBlockDto {
  @ApiProperty({
    type: 'object',
    items: { $ref: getSchemaPath(ParagraphDto) },
  })
  paragraph: ParagraphDto;
}
