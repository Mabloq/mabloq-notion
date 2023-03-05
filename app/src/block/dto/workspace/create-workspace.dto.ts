import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { FileObjectDto } from '../extra-models/common/file-object.dto';
import { RichTextDto } from '../extra-models/common/rich-text.dto';
import { PropertyInterface } from 'src/block/interfaces/properties/property.interface';
import { NumberPropertyDto } from '../extra-models/properties/property-types/number-property.dto';
import { SelectPropertyDto } from '../extra-models/properties/property-types/select-property.dto';
import { TitlePropertyDto } from '../extra-models/properties/property-types/title-property.dto';
import { PageInterface } from 'src/block/interfaces/page.interface';
import { ParagraphBlockDto } from '../extra-models/blocks/paragraph.dto';
import { CodeBlockDto } from '../extra-models/blocks/code.dto';
import { Heading1BlockDto } from '../extra-models/blocks/heading1.dto';
import { ImageBlockDto } from '../extra-models/blocks/image.dto';
import { BlockDTOs, BlockModelRefs } from '../extra-models/block-models';
import { ParentInerface } from 'src/block/interfaces/common/parent.interface';
import { DatabaseParentDto } from '../extra-models/parents/database-parent.dto';
import { PageParentDto } from '../extra-models/parents/page-parent.dto';
import { TitlePropertyInterface } from 'src/block/interfaces/properties/property-types/title-property.interface';
import { WorkspaceInterface } from 'src/block/interfaces/workspace.interface';

export class CreateWorkspaceDto
  implements Pick<WorkspaceInterface, 'cover' | 'icon' | 'properties'>
{
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  cover?: FileObjectInterface;
  @ApiProperty({ items: { $ref: getSchemaPath(FileObjectDto) } })
  icon?: FileObjectInterface;
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      anyOf: [{ $ref: getSchemaPath(TitlePropertyDto) }],
    },
  })
  properties: {
    title: TitlePropertyInterface;
  };
}
