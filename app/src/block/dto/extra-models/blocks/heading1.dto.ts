import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
import { BaseBlockDto } from '../base-block.dto';

@ApiExtraModels(RichTextDto)
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

@ApiExtraModels(Heading1Dto)
export class Heading1BlockDto extends BaseBlockDto {
  @ApiProperty({
    type: 'object',
    items: { $ref: getSchemaPath(Heading1Dto) },
  })
  heading_1: Heading1Dto;
}
