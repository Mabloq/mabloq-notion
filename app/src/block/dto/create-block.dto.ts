import { BlockDTOs } from './extra-models/block-models';
import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ParagraphBlockDto } from './extra-models/blocks/paragraph.dto';
import { Heading1BlockDto } from './extra-models/blocks/heading1.dto';
import { CodeBlockDto } from './extra-models/blocks/code.dto';
import { ImageBlockDto } from './extra-models/blocks/image.dto';
import { BlockInterface } from '../interfaces';
import { BlockEnum } from '../schemas/common/block-enum';
import {
  BlockModelList,
  BlockModelMappings,
  BlockModelRefs,
} from './extra-models/block-models';

// export type CreateBlockDto = BlockDTOs;

export class CreateBlockDto implements Omit<BlockInterface, 'id' | 'content'> {
  @ApiProperty({ required: true, enum: ['block'], default: 'block' })
  object: string;
  @ApiProperty({ enum: Object.values(BlockEnum) })
  type: string;
  @ApiProperty({ type: Boolean, default: false })
  archived?: boolean;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  created_time: string;
  @ApiProperty()
  updated_by: string;
  @ApiProperty()
  last_edited_time: string;

  @ApiProperty({ default: true })
  has_content: boolean;
  @ApiProperty({
    type: 'array',
    items: {
      anyOf: [
        { $ref: getSchemaPath(ParagraphBlockDto) },
        { $ref: getSchemaPath(CodeBlockDto) },
        { $ref: getSchemaPath(Heading1BlockDto) },
        { $ref: getSchemaPath(ImageBlockDto) },
      ],
    },
  })
  children: BlockDTOs[];
}

@ApiExtraModels(CodeBlockDto)
export class CreateCodeBlockDto extends CreateBlockDto {
  @ApiProperty({
    items: { $ref: getSchemaPath(CodeBlockDto) },
  })
  [BlockEnum.CODE]: CodeBlockDto;
}

@ApiExtraModels(ParagraphBlockDto)
export class CreateParagraphBlockDto extends CreateBlockDto {
  @ApiProperty({
    items: { $ref: getSchemaPath(ParagraphBlockDto) },
  })
  [BlockEnum.PARAGRAPH]: ParagraphBlockDto;
}

@ApiExtraModels(Heading1BlockDto)
export class CreateHeading1BlockDto extends CreateBlockDto {
  @ApiProperty({
    items: { $ref: getSchemaPath(Heading1BlockDto) },
  })
  [BlockEnum.HEADING1]: Heading1BlockDto;
}

@ApiExtraModels(ImageBlockDto)
export class CreateImageBlockDto extends CreateBlockDto {
  @ApiProperty({
    items: { $ref: getSchemaPath(ImageBlockDto) },
  })
  [BlockEnum.IMAGE]: ImageBlockDto;
}
