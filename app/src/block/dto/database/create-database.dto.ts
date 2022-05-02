import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { DatabaseInterface } from 'src/block/interfaces/database.interface';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { FileObjectDto } from '../extra-models/common/file-object.dto';
import { RichTextDto } from '../extra-models/common/rich-text.dto';
import { PropertyConfigInterface } from 'src/block/interfaces/properties/property.interface';
import { NumberConfigDto } from '../extra-models/properties/property-config/number-config.dto';
import { SelectConfigDto } from '../extra-models/properties/property-config/select-config-interface.dto';
import { ParentInerface } from 'src/block/interfaces/common/parent.interface';
import { DatabaseParentDto } from '../extra-models/parents/database-parent.dto';
import { PageParentDto } from '../extra-models/parents/page-parent.dto';
import { WorkspaceParentDto } from '../extra-models/parents/workspace-parent.dto';

export class CreateDatabaseDto implements Partial<DatabaseInterface> {
  @ApiProperty({ required: true })
  object: string;
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  cover?: FileObjectInterface;
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  icon?: FileObjectInterface;
  @ApiProperty()
  archived?: boolean;
  @ApiProperty()
  created_time: string;
  @ApiProperty()
  parent_id?: string;
  @ApiProperty({
    type: 'object',
    anyOf: [
      { $ref: getSchemaPath(DatabaseParentDto) },
      { $ref: getSchemaPath(PageParentDto) },
      { $ref: getSchemaPath(WorkspaceParentDto) },
    ],
  })
  parent?: ParentInerface;

  @ApiProperty({
    type: 'object',
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
