import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { PageParentInterface } from 'src/block/interfaces/common/parent.interface';

@ApiExtraModels()
export class PageParentDto implements PageParentInterface {
  @ApiProperty({
    default: 'page',
    required: true,
  })
  type: 'page';
  @ApiProperty({ required: true })
  page_id: string;
}
