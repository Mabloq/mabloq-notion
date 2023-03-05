import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class WorkspaceParent {
  @Prop()
  workspace_id: string;
}
export const WorkspaceParentSchema =
  SchemaFactory.createForClass(WorkspaceParent);
