import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';

// @ApiExtraModels(ParagraphBlockDto)
export class ImageDto implements FileObjectInterface {
  @ApiProperty({ default: 'external', enum: ['external'] })
  type: string;
  @ApiProperty({
    required: true,
  })
  url: string;
}
