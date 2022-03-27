import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { FileObjectDto } from '../common/file-object.dto';
import { BaseBlockDto } from '../base-block.dto';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';

@ApiExtraModels(FileObjectDto)
export class ImageDto implements FileObjectInterface {
  @ApiProperty({ default: 'external' })
  type: string;
  @ApiProperty({
    required: true,
  })
  url: string;
}

@ApiExtraModels(ImageDto)
export class ImageBlockDto extends BaseBlockDto {
  @ApiProperty({
    type: 'object',
    items: { $ref: getSchemaPath(ImageDto) },
  })
  image: ImageDto;
}
