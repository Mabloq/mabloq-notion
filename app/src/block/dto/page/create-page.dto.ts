import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
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
export class CreatePageDto implements Omit<PageInterface, 'id' | 'content'> {
  @ApiProperty({ required: true, enum: Object.values(ObjectEnum) })
  object: string;
  @ApiProperty()
  parent_id?: string;
  @ApiProperty({
    type: 'object',
    anyOf: [
      { $ref: getSchemaPath(DatabaseParentDto) },
      { $ref: getSchemaPath(PageParentDto) },
    ],
  })
  parent?: ParentInerface;
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  cover?: FileObjectInterface;
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  icon?: FileObjectInterface;
  @ApiProperty({ type: Boolean })
  archived?: boolean;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  created_time: string;
  @ApiProperty()
  last_edited_by: string;
  @ApiProperty()
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
    additionalProperties: {
      anyOf: [
        { $ref: getSchemaPath(RichTextDto) },
        { $ref: getSchemaPath(NumberPropertyDto) },
        { $ref: getSchemaPath(SelectPropertyDto) },
        { $ref: getSchemaPath(TitlePropertyDto) },
      ],
    },
  })
  properties: {
    [key: string | symbol]: PropertyInterface;
    title: PropertyInterface;
  };
  @ApiProperty({ default: true })
  has_content: boolean;
  @ApiProperty({
    type: 'array',
    items: {
      anyOf: BlockModelRefs,
    },
  })
  content?: BlockDTOs[];
}
