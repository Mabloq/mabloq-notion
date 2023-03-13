import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ParagraphDto } from './extra-models/blocks/paragraph.dto';
import { Heading1Dto } from './extra-models/blocks/heading1.dto';
import { CodeDto } from './extra-models/blocks/code.dto';
import { ImageDto } from './extra-models/blocks/image.dto';
import { BlockInterface } from '../interfaces';
import { BlockEnum } from '../schemas/common/block-enum';
import { Schema } from 'mongoose';
import { PageParentInterface } from '../interfaces/common/parent.interface';
import { PageParentDto } from './extra-models/parents/page-parent.dto';

export class CreateBlockDto implements Omit<BlockInterface, 'id' | 'content'> {
  @ApiProperty({ required: true, enum: ['block'], default: 'block' })
  object: string;
  @ApiProperty({ enum: Object.values(BlockEnum) })
  type: string;
  @ApiProperty({ type: 'integer', required: true, default: 0 })
  indent: number;
  @ApiProperty({ type: PageParentDto })
  parent: PageParentInterface;
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
}

@ApiExtraModels(CodeDto)
export class CreateCodeBlockDto extends CreateBlockDto {
  @ApiProperty({ enum: [BlockEnum.CODE] })
  type: string;
  @ApiProperty({
    items: { $ref: getSchemaPath(CodeDto) },
  })
  [BlockEnum.CODE]: CodeDto;
}

@ApiExtraModels(ParagraphDto)
export class CreateParagraphBlockDto extends CreateBlockDto {
  @ApiProperty({ enum: [BlockEnum.PARAGRAPH] })
  type: string;
  @ApiProperty({
    items: { $ref: getSchemaPath(ParagraphDto) },
  })
  [BlockEnum.PARAGRAPH]: ParagraphDto;
}

@ApiExtraModels(Heading1Dto)
export class CreateHeading1BlockDto extends CreateBlockDto {
  @ApiProperty({ enum: [BlockEnum.HEADING1] })
  type: string;
  @ApiProperty({
    items: { $ref: getSchemaPath(Heading1Dto) },
  })
  [BlockEnum.HEADING1]: Heading1Dto;
}

@ApiExtraModels(ImageDto)
export class CreateImageBlockDto extends CreateBlockDto {
  @ApiProperty({ enum: [BlockEnum.IMAGE] })
  type: string;
  @ApiProperty({
    items: { $ref: getSchemaPath(ImageDto) },
  })
  [BlockEnum.IMAGE]: ImageDto;
}
