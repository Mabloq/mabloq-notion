import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextDto } from '../common/rich-text.dto';
import { BaseBlockDto } from '../base-block.dto';
import { BlockModelRefs, BlockDTOs } from '../block-models';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
import { CodeDto } from './code.dto';
import { ImageDto } from './image.dto';
import { Heading1Dto } from './heading1.dto';

@ApiExtraModels(RichTextDto, CodeDto, ImageDto, Heading1Dto)
export class ParagraphDto {
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
        { $ref: getSchemaPath(CodeDto) },
        { $ref: getSchemaPath(ImageDto) },
        { $ref: getSchemaPath(Heading1Dto) },
      ],
    },
    required: false,
  })
  children?: BlockDTOs[];
}
