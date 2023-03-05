import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ParagraphBlockDto } from '../extra-models/blocks/paragraph.dto';
import { BlockEnum } from '../../schemas/common/block-enum';
import { CreateBlockDto } from '../create-block.dto';

@ApiExtraModels(ParagraphBlockDto)
export class CreateParagraphBlockDto {
  @ApiProperty({
    type: 'object',
    items: { $ref: getSchemaPath(ParagraphBlockDto) },
  })
  [BlockEnum.PARAGRAPH]: ParagraphBlockDto;
}
