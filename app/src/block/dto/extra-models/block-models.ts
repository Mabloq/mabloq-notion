import { CodeBlockDto } from './blocks/code.dto';
import { ParagraphBlockDto } from './blocks/paragraph.dto';
import { Heading1BlockDto } from './blocks/heading1.dto';
import { ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { getSchemaPath } from '@nestjs/swagger';
import { ImageBlockDto } from './blocks/image.dto';
import { BlockEnum } from 'src/block/schemas/common/block-enum';

export type BlockDTOs =
  | CodeBlockDto
  | ParagraphBlockDto
  | Heading1BlockDto
  | ImageBlockDto;

export const BlockModelRefs: ReferenceObject[] = [
  { $ref: getSchemaPath(CodeBlockDto) },
  { $ref: getSchemaPath(ParagraphBlockDto) },
  { $ref: getSchemaPath(Heading1BlockDto) },
  { $ref: getSchemaPath(ImageBlockDto) },
];

export const BlockModelMappings = {
  [BlockEnum.PARAGRAPH]: getSchemaPath(ParagraphBlockDto),
  [BlockEnum.HEADING1]: getSchemaPath(Heading1BlockDto),
  [BlockEnum.CODE]: getSchemaPath(CodeBlockDto),
  [BlockEnum.IMAGE]: getSchemaPath(ImageBlockDto),
};

export const BlockModelList = [
  ParagraphBlockDto,
  Heading1BlockDto,
  CodeBlockDto,
  ImageBlockDto,
];
