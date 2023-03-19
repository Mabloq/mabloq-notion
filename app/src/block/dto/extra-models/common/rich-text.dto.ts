import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { AnnotationDto } from './annotations.dto';
import { TextDto } from './text.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
@ApiExtraModels(AnnotationDto, TextDto)
export class RichTextDto implements RichTextInterface {
  @ApiProperty({
    default: 'rich_text',
    required: true,
  })
  @IsString()
  type: string;
  @ApiProperty()
  @IsString()
  plain_text: string;
  @ApiProperty({ required: true, items: { $ref: getSchemaPath(TextDto) } })
  @ValidateNested()
  @Type(() => TextDto)
  text: TextDto;
  @ApiProperty({
    required: false,
    items: { $ref: getSchemaPath(AnnotationDto) },
  })
  @ValidateNested()
  @Type(() => AnnotationDto)
  annotation?: AnnotationDto;
}
