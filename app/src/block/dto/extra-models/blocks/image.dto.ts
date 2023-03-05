import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { BaseBlockDto } from '../base-block.dto';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
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
    required: true,
    default: BlockEnum.IMAGE,
    enum: [BlockEnum.IMAGE],
  })
  type: string;
  @ApiProperty({
    items: { $ref: getSchemaPath(ImageDto) },
  })
  image: ImageDto;
}
