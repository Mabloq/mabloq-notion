import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { DatabaseInterface } from 'src/block/interfaces/database.interface';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { FileObjectDto } from '../extra-models/common/file-object.dto';
import { RichTextDto } from '../extra-models/common/rich-text.dto';
import { PropertyConfigInterface } from 'src/block/interfaces/properties/property.interface';

export class CreateDatabseDto
  implements
    Pick<DatabaseInterface, 'object' | 'cover' | 'properties' | 'icon'>
{
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

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(RichTextDto),
    },
    required: true,
  })
  title: RichTextDto;
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: PropertyConfigInterface },
  })
  properties: {
    [key: string | symbol]: PropertyConfigInterface;
    title: PropertyConfigInterface;
  };
}
