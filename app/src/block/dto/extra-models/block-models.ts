import { CodeDto } from './blocks/code.dto';
import { ParagraphDto } from './blocks/paragraph.dto';
import { Heading1Dto } from './blocks/heading1.dto';
import { ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { getSchemaPath } from '@nestjs/swagger';
import { ImageDto } from './blocks/image.dto';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
import {
  CreateCodeBlockDto,
  CreateHeading1BlockDto,
  CreateImageBlockDto,
  CreateParagraphBlockDto,
} from '../create-block.dto';

export type BlockDTOs =
  | CreateCodeBlockDto
  | CreateParagraphBlockDto
  | CreateHeading1BlockDto
  | CreateImageBlockDto;

export const BlockModelRefs: ReferenceObject[] = [
  { $ref: getSchemaPath(CodeDto) },
  { $ref: getSchemaPath(ParagraphDto) },
  { $ref: getSchemaPath(Heading1Dto) },
  { $ref: getSchemaPath(ImageDto) },
];

export const BlockModelMappings = {
  [BlockEnum.PARAGRAPH]: getSchemaPath(ParagraphDto),
  [BlockEnum.HEADING1]: getSchemaPath(Heading1Dto),
  [BlockEnum.CODE]: getSchemaPath(CodeDto),
  [BlockEnum.IMAGE]: getSchemaPath(ImageDto),
};

export const BlockModelList = [ParagraphDto, Heading1Dto, CodeDto, ImageDto];
