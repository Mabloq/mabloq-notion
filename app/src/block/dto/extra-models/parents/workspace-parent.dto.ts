import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { WorkspaceParentInterface } from 'src/block/interfaces/common/parent.interface';

@ApiExtraModels()
export class WorkspaceParentDto implements WorkspaceParentInterface {
  @ApiProperty({
    default: 'workspace',
    required: true,
  })
  type: 'workspace';
  @ApiProperty({ required: true })
  workspace_id: string;
}
