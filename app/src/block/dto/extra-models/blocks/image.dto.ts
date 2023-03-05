import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { BaseBlockDto } from '../base-block.dto';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
export class ImageDto implements FileObjectInterface {
  @ApiProperty({ default: 'external', enum: ['external'] })
  type: string;
  @ApiProperty({
    required: true,
  })
  url: string;
}
