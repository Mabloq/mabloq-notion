import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { DatabaseParentInterface } from 'src/block/interfaces/common/parent.interface';
import { IsString } from 'class-validator';
@ApiExtraModels()
export class ParentDto {
  @IsString({
    message: '$property for $target must be string but is $value',
  })
  type: string;
}
