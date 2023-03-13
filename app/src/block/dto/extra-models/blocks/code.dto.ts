import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
import { BaseBlockDto } from '../base-block.dto';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
import { forwardRef } from '@nestjs/common';
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
  // @ApiProperty({
  //   type: 'array',
  //   items: {
  //     anyOf: [
  //       { $ref: getSchemaPath(CodeBlockDto) },
  //       { $ref: getSchemaPath(ParagraphBlockDto) },
  //       { $ref: getSchemaPath(Heading1BlockDto) },
  //       { $ref: getSchemaPath(ImageBlockDto) },
  //     ],
  //   },
  //   required: false,
  // })
  // children?: (
  //   | CodeBlockDto
  //   | ParagraphBlockDto
  //   | Heading1BlockDto
  //   | ImageBlockDto
  // )[];
}
