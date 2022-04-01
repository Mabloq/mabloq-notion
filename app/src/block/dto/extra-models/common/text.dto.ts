import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { TextInterface } from 'src/block/interfaces/common/text.interface';
@ApiExtraModels()
export class TextDto implements TextInterface {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  text: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  link?: string;
}
