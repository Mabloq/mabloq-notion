import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
export class Heading1Dto {
  @ApiProperty({ required: false })
  color: string;
  @ApiProperty({
    required: true,
    type: 'array',
    items: { $ref: getSchemaPath(RichTextDto) },
  })
  rich_text: RichTextDto[];
}
