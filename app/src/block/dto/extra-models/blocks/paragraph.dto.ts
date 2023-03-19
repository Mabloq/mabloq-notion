import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';

@ApiExtraModels(RichTextDto)
export class ParagraphDto {
  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(RichTextDto) },
    required: true,
  })
  rich_text: RichTextDto[];
  @ApiProperty({ required: false, default: 'black' })
  color: string;
}
