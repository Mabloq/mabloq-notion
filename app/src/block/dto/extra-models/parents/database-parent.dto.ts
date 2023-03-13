import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { DatabaseParentInterface } from 'src/block/interfaces/common/parent.interface';

@ApiExtraModels()
export class DatabaseParentDto implements DatabaseParentInterface {
  @ApiProperty({
    default: 'database_id',
    required: true,
  })
  type: 'database_id';
  @ApiProperty({ required: true })
  database_id: string;
}
