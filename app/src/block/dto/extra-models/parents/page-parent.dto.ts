import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { PageParentInterface } from 'src/block/interfaces/common/parent.interface';

@ApiExtraModels()
export class PageParentDto implements PageParentInterface {
  @ApiProperty({
    default: 'page_id',
    required: true,
  })
  type: 'page_id';
  @ApiProperty({ required: true })
  page_id: string;
}
