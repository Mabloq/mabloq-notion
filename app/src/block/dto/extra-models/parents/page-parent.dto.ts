import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { PageParentInterface } from 'src/block/interfaces/common/parent.interface';
import { IsString } from 'class-validator';
@ApiExtraModels()
export class PageParentDto implements PageParentInterface {
  @ApiProperty({
    default: 'page_id',
    required: true,
  })
  @IsString({
    message: '$property for $target must be string but is $value',
  })
  type: string;
  @ApiProperty({ required: true })
  @IsString()
  page_id: string;
}
