import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { WorkspaceParentInterface } from 'src/block/interfaces/common/parent.interface';

@ApiExtraModels()
export class WorkspaceParentDto implements WorkspaceParentInterface {
  @ApiProperty({
    default: 'workspace_id',
    required: true,
  })
  type: 'workspace_id';
  @ApiProperty({ required: true })
  workspace_id: string;
}
