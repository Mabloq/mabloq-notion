import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { TitlePropertyInterface } from 'src/block/interfaces/properties/property-types/title-property.interface';
import { RichTextDto } from '../../common/rich-text.dto';

@ApiExtraModels(RichTextDto)
export class TitlePropertyDto implements TitlePropertyInterface {
  @ApiProperty({ default: 'title' })
  type: 'title';
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      $ref: getSchemaPath(RichTextDto),
    },
  })
  title: RichTextInterface[];
}
