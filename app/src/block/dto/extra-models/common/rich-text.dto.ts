import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { AnnotationDto } from './annotations.dto';
import { TextDto } from './text.dto';

@ApiExtraModels(AnnotationDto, TextDto)
export class RichTextDto {
  type: string;
  @ApiProperty({ required: true })
  text: TextDto;
  @ApiProperty({ required: false })
  annotation: AnnotationDto;
}
