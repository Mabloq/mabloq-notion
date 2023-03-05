import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
import { BaseBlockDto } from '../base-block.dto';
import { BlockModelRefs, BlockDTOs } from '../block-models';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
import { CodeBlockDto } from './code.dto';
import { ImageBlockDto } from './image.dto';
import { Heading1BlockDto } from './heading1.dto';

@ApiExtraModels(RichTextDto, CodeBlockDto, ImageBlockDto, Heading1BlockDto)
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
      anyOf: [
        { $ref: getSchemaPath(CodeBlockDto) },
        { $ref: getSchemaPath(ImageBlockDto) },
        { $ref: getSchemaPath(Heading1BlockDto) },
      ],
    },
    required: false,
  })
  children?: BlockDTOs[];
}

@ApiExtraModels(ParagraphDto)
export class ParagraphBlockDto extends BaseBlockDto {
  @ApiProperty({
    required: true,
    default: BlockEnum.PARAGRAPH,
    enum: [BlockEnum.PARAGRAPH],
  })
  type: string;
  @ApiProperty({
    items: { $ref: getSchemaPath(ParagraphDto) },
  })
  paragraph: ParagraphDto;
}
