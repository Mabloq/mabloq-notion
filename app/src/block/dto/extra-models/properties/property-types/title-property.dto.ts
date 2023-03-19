import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { TitlePropertyInterface } from 'src/block/interfaces/properties/property-types/title-property.interface';
import { RichTextDto } from '../../common/rich-text.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
@ApiExtraModels(RichTextDto)
export class TitlePropertyDto implements TitlePropertyInterface {
  @ApiProperty({ default: 'title', required: true })
  @IsString()
  type: string;
  @ApiProperty({
    type: RichTextDto,
    required: true,
  })
  @ValidateNested()
  @Type(() => RichTextDto)
  title: RichTextInterface[];
}
