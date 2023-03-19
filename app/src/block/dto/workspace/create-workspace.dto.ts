import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { FileObjectDto } from '../extra-models/common/file-object.dto';
import { TitlePropertyInterface } from 'src/block/interfaces/properties/property-types/title-property.interface';
import { WorkspaceInterface } from 'src/block/interfaces/workspace.interface';
import { TitlePropertyDto } from '../extra-models/properties/property-types/title-property.dto';

export class CreateWorkspaceDto
  implements Pick<WorkspaceInterface, 'cover' | 'icon' | 'properties'>
{
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  cover?: FileObjectInterface;
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  icon?: FileObjectInterface;
  @ApiProperty({
    type: TitlePropertyDto,
  })
  properties: {
    title: TitlePropertyInterface;
  };
}
