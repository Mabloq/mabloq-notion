import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { WorkspaceParentInterface } from 'src/block/interfaces/common/parent.interface';
import { IsString } from 'class-validator';
import { ParentDto } from './parent.dto';
@ApiExtraModels()
export class WorkspaceParentDto extends ParentDto {
  // @ApiProperty({
  //   required: true,
  // })
  // @IsString({
  //   message: '$property for $target must be string but is $value',
  // })
  // type: string;
  // @ApiProperty({ required: true })
  @IsString()
  workspace_id: string;
}
