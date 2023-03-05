import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
import { BaseBlockDto } from '../base-block.dto';
import { BlockEnum } from 'src/block/schemas/common/block-enum';

@ApiExtraModels(RichTextDto)
export class CodeDto {
  @ApiProperty({ required: false })
  language: string;
  @ApiProperty({
    required: true,
    type: 'array',
    items: { $ref: getSchemaPath(RichTextDto) },
  })
  rich_text: RichTextDto[];
}
