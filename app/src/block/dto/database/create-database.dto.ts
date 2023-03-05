import { ApiProperty, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';

import { DatabaseInterface } from 'src/block/interfaces/database.interface';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { FileObjectDto } from 'src/block/dto/extra-models/common/file-object.dto';
import { TitlePropertyDto } from '../extra-models/properties/property-types/title-property.dto';
import { RichTextDto } from 'src/block/dto//extra-models/common/rich-text.dto';
import { PropertyConfigInterface } from 'src/block/interfaces/properties/property.interface';
import { NumberConfigDto } from 'src/block/dto//extra-models/properties/property-config/number-config.dto';
import { SelectConfigDto } from 'src/block/dto//extra-models/properties/property-config/select-config-interface.dto';
import { ParentInerface } from 'src/block/interfaces/common/parent.interface';
import { DatabaseParentDto } from 'src/block/dto//extra-models/parents/database-parent.dto';
import { PageParentDto } from 'src/block/dto//extra-models/parents/page-parent.dto';
import { WorkspaceParentDto } from 'src/block/dto//extra-models/parents/workspace-parent.dto';
import { ObjectEnum, ObjectType } from 'src/block/schemas/common/object-enum';

@ApiExtraModels(
  FileObjectDto,
  DatabaseParentDto,
  PageParentDto,
  WorkspaceParentDto,
  TitlePropertyDto,
  RichTextDto,
  NumberConfigDto,
  SelectConfigDto,
)
export class CreateDatabaseDto implements Partial<DatabaseInterface> {
  @ApiProperty({ default: 'database', enum: ['database'], required: true })
  object: string;
  @ApiProperty({
    items: { $ref: getSchemaPath(FileObjectDto) },
    required: false,
  })
  cover?: FileObjectInterface;
  @ApiProperty({
    items: { $ref: getSchemaPath(FileObjectDto) },
    required: false,
  })
  icon?: FileObjectInterface;
  @ApiProperty({ required: false, default: false })
  archived?: boolean;
  @ApiProperty({ required: false })
  created_time?: string;
  @ApiProperty()
  parent_id?: string;
  @ApiProperty({
    type: 'object',
    anyOf: [
      { $ref: getSchemaPath(PageParentDto) },
      { $ref: getSchemaPath(WorkspaceParentDto) },
    ],
  })
  parent?: ParentInerface;

  @ApiProperty({
    type: 'object',
    properties: {
      title: { $ref: getSchemaPath(TitlePropertyDto) },
    },
    additionalProperties: {
      anyOf: [
        { $ref: getSchemaPath(RichTextDto) },
        { $ref: getSchemaPath(NumberConfigDto) },
        { $ref: getSchemaPath(SelectConfigDto) },
      ],
    },
  })
  properties: {
    [key: string | symbol]: PropertyConfigInterface;
    title: PropertyConfigInterface;
  };
}
