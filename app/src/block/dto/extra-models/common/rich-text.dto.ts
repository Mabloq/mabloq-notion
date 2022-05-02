import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { AnnotationDto } from './annotations.dto';
import { TextDto } from './text.dto';

@ApiExtraModels(AnnotationDto, TextDto)
export class RichTextDto implements RichTextInterface {
  @ApiProperty({
    default: 'rich_text',
    required: true,
  })
  type: 'rich_text';
  @ApiProperty()
  plain_text: string;
  @ApiProperty({ required: true })
  text: TextDto;
  @ApiProperty({ required: false })
  annotation?: AnnotationDto;
}
