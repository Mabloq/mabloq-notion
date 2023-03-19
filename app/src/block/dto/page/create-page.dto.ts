import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { FileObjectDto } from '../extra-models/common/file-object.dto';
import { RichTextDto } from '../extra-models/common/rich-text.dto';
import { PropertyInterface } from 'src/block/interfaces/properties/property.interface';
import { NumberPropertyDto } from '../extra-models/properties/property-types/number-property.dto';
import { SelectPropertyDto } from '../extra-models/properties/property-types/select-property.dto';
import { TitlePropertyDto } from '../extra-models/properties/property-types/title-property.dto';
import { PageInterface } from 'src/block/interfaces/page.interface';

import { BlockDTOs, BlockModelRefs } from '../extra-models/block-models';
import { ParentInerface } from 'src/block/interfaces/common/parent.interface';
import { DatabaseParentDto } from '../extra-models/parents/database-parent.dto';
import { PageParentDto } from '../extra-models/parents/page-parent.dto';

import { ObjectEnum } from 'src/block/schemas/common/object-enum';
import { WorkspaceParentDto } from '../extra-models/parents/workspace-parent.dto';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsObject,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ParentDto } from '../extra-models/parents/parent.dto';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from '@nestjs/class-validator';
import { BlockEnum } from 'src/block/schemas/common/block-enum';

import { IsPropertyValue } from './create-page-validator';

@ApiExtraModels(
  RichTextDto,
  NumberPropertyDto,
  SelectPropertyDto,
  FileObjectDto,
)
export class CreatePageDto implements Omit<PageInterface, 'id' | 'content'> {
  @ApiProperty({
    required: true,
    enum: [ObjectEnum.PAGE],
    default: ObjectEnum.PAGE,
  })
  @IsString()
  object: string;
  @ApiProperty({ required: true })
  @IsString()
  parent_id?: string;

  @ApiProperty({
    type: 'object',
    required: true,
    anyOf: [
      { $ref: getSchemaPath(WorkspaceParentDto) },
      { $ref: getSchemaPath(DatabaseParentDto) },
      { $ref: getSchemaPath(PageParentDto) },
    ],
  })
  @ValidateNested()
  @Type(() => ParentDto, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: WorkspaceParentDto, name: 'workspace_id' },
        { value: DatabaseParentDto, name: 'database_id' },
        { value: PageParentDto, name: 'parent_id' },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  parent?: ParentInerface;
  @ApiProperty({ type: FileObjectDto, required: false })
  @Type(() => FileObjectDto)
  cover?: FileObjectInterface;
  @ApiProperty({ type: FileObjectDto, required: false })
  @Type(() => FileObjectDto)
  icon?: FileObjectInterface;
  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  archived?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  created_by: string;
  @ApiProperty({ required: false })
  @IsString()
  created_time: string;
  @ApiProperty({ required: false })
  @IsString()
  last_edited_by: string;
  @ApiProperty({ required: false })
  @IsString()
  last_edited_time: string;
  // @ApiProperty({
  //   type: 'array',
  //   items: {
  //     $ref: getSchemaPath(RichTextDto),
  //   },
  //   required: true,
  // })
  // title: RichTextDto[];
  @ApiProperty({
    type: 'object',
    properties: {
      title: { $ref: getSchemaPath(TitlePropertyDto) },
    },
    additionalProperties: {
      anyOf: [
        { $ref: getSchemaPath(RichTextDto) },
        { $ref: getSchemaPath(NumberPropertyDto) },
        { $ref: getSchemaPath(SelectPropertyDto) },
      ],
    },
  })
  // @Type(() => ParentDto, {
  //   discriminator: {
  //     property: 'type',
  //     subTypes: [
  //       { value: RichTextDto, name: 'rich_text' },
  //       { value: NumberPropertyDto, name: 'number' },
  //       { value: SelectPropertyDto, name: 'select' },
  //     ],
  //   },
  //   keepDiscriminatorProperty: true,
  // })
  @IsPropertyValue('properties')
  properties: Record<string, PropertyInterface>;
  @ApiProperty({ default: true })
  @IsBoolean()
  has_content: boolean;

  @ApiProperty({
    type: 'array',
    items: {
      anyOf: BlockModelRefs,
    },
    required: false,
  })
  @IsArray()
  content?: BlockDTOs[];
}
