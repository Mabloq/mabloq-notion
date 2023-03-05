import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ParentSchema } from './parents/parent.schema';
import { FileObjectInterface } from '../interfaces/common/file-object.interface';
import { ParentInerface } from '../interfaces/common/parent.interface';
import { ObjectEnum, ObjectType } from './common/object-enum';
import { HigherOrderBlockInterface } from '../interfaces/high-order-block.interface';
import { DatabaseParentSchema } from './parents/database-parent.schema';
import { PageParentSchema } from './parents/page-parent.schema';
import mongoose from 'mongoose';
import { FileObjectSchema } from './common/file-object.schema';
import { WorkspaceParentSchema } from './parents/workspace-parent.schema';

export enum ParentEnum {
  DATABASE_ID = 'database_id',
  PAGE_ID = 'page_id',
}
@Schema({ discriminatorKey: 'object' })
export class HigherOrderBlock implements HigherOrderBlockInterface {
  @Prop({
    type: String,
    required: true,
    enum: Object.values(ObjectEnum),
    message: '{VALUE} is not supported',
  })
  object!: ObjectType;
  @Prop({ type: Boolean, default: false })
  archived: boolean;
  @Prop({ type: FileObjectSchema, required: false })
  icon: FileObjectInterface;
  @Prop({ type: FileObjectSchema, required: false })
  cover: FileObjectInterface;
  @Prop({ type: ParentSchema, required: false })
  parent: ParentInerface;
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'HigherOrderBlock',
    required: false,
    index: {
      partialFilterExpression: { parent_id: { $exists: true, $gt: '' } },
    },
  })
  parent_id: string;
  @Prop({
    type: Date,
  })
  created_time: string;

  @Prop()
  created_by: string; //TODO: Partial<User>

  @Prop({
    type: Date,
  })
  last_edited_time: string;

  @Prop()
  last_edited_by: string; //TODO: Partial<User>
}

export type HigherOrderBlockDocument = HigherOrderBlock & Document;
export const HigherOrderBlockSchema =
  SchemaFactory.createForClass(HigherOrderBlock);

HigherOrderBlockSchema.index(
  { parent: 1 },
  {
    partialFilterExpression: { index: { $exists: true, $gt: '' } },
  },
);
HigherOrderBlockSchema.path<MongooseSchema.Types.Subdocument>(
  'parent',
).discriminator('database_id', DatabaseParentSchema);

HigherOrderBlockSchema.path<MongooseSchema.Types.Subdocument>(
  'parent',
).discriminator('page_id', PageParentSchema);

HigherOrderBlockSchema.path<MongooseSchema.Types.Subdocument>(
  'parent',
).discriminator('workspace_id', WorkspaceParentSchema);
