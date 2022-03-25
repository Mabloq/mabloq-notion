import { CodeBlockDto } from './blocks/code.dto';
import { ParagraphBlockDto } from './blocks/paragraph.dto';
import { Heading1BlockDto } from './blocks/heading1.dto';
import { ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { getSchemaPath } from '@nestjs/swagger';

export type BlockModels = CodeBlockDto | ParagraphBlockDto | Heading1BlockDto;

export const BlockModelRefs: ReferenceObject[] = [
  { $ref: getSchemaPath(CodeBlockDto) },
  { $ref: getSchemaPath(ParagraphBlockDto) },
  { $ref: getSchemaPath(Heading1BlockDto) },
];
