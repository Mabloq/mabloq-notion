import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';

import { TextDto } from '../../common/text.dto';
import { AnnotationDto } from '../../common/annotations.dto';

@ApiExtraModels()
export class RichTextDto implements RichTextInterface {
  @ApiProperty()
  plain_text: string;
  @ApiProperty({ default: 'text' })
  type: string;
  @ApiProperty({ type: { $ref: getSchemaPath(TextDto) } })
  text: TextDto;
  @ApiProperty({ type: 'object' })
  annotation?: AnnotationDto;
}
