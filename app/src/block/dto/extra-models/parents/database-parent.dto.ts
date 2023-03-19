import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { DatabaseParentInterface } from 'src/block/interfaces/common/parent.interface';
import { IsString } from 'class-validator';
@ApiExtraModels()
export class DatabaseParentDto implements DatabaseParentInterface {
  @ApiProperty({
    default: 'database_id',
    required: true,
  })
  @IsString({
    message: '$property for $target must be string but is $value',
  })
  type: string;
  @ApiProperty({ required: true })
  @IsString()
  database_id: string;
}
