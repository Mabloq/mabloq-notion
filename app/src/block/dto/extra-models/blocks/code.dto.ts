import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { BaseBlockDto } from '../base-block.dto';
import { RichTextDto } from '../common/rich-text.dto';

@ApiExtraModels(RichTextDto)
export class CodeDto {
  @ApiProperty()
  language: string;
  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(RichTextDto) },
  })
  rich_text: RichTextDto[];
}

@ApiExtraModels(CodeDto)
export class CodeBlockDto extends BaseBlockDto {
  @ApiProperty({
    type: 'object',
    items: { $ref: getSchemaPath(CodeDto) },
  })
  code: CodeDto;
}
