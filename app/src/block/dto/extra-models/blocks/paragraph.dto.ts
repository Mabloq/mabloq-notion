import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
import { BaseBlockDto } from '../base-block.dto';

@ApiExtraModels(RichTextDto)
export class ParagraphDto {
  @ApiProperty()
  language: string;
  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(RichTextDto) },
  })
  rich_text: RichTextDto[];
}

@ApiExtraModels(ParagraphDto)
export class ParagraphBlockDto extends BaseBlockDto {
  @ApiProperty({
    type: 'object',
    items: { $ref: getSchemaPath(ParagraphDto) },
  })
  paragraph: ParagraphDto;
}
