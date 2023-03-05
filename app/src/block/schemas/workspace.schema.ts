import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { FileObjectInterface } from '../interfaces/common/file-object.interface';
import { PropertyInterface } from '../interfaces/properties/property.interface';
import { ParentInerface } from '../interfaces/common/parent.interface';
import mongoose from 'mongoose';
import { WorkspaceInterface } from '../interfaces/workspace.interface';
import { RichTextPropertySchema } from './properties/property-types/rich-text-property.schema';
import { SelectPropertySchema } from './properties/property-types/select-property.schema';
import { NumberPropertySchema } from './properties/property-types/number-property.schema';
import { TitlePropertySchema } from './properties/property-types/title-property.schema';
import { PropertySchema } from './properties/property.schema';
import { PropertyTypeEnum } from './properties/property-type.enum';
import { ObjectEnum, ObjectType } from './common/object-enum';

@Schema()
export class Workspace implements WorkspaceInterface {
  object!: string;
  archived: boolean;
  icon: FileObjectInterface;
  cover: FileObjectInterface;
  @Prop({
    type: Map,
    of: PropertySchema,
    discriminators: [
      { name: PropertyTypeEnum.TITLE, schema: TitlePropertySchema },
    ],
  })
  properties: {
    title: PropertyInterface;
  };
  parent?: ParentInerface;
  parent_id?: string;
  created_time: string;
  created_by: string; //TODO: Partial<User>
  last_edited_time: string;
  last_edited_by: string; //TODO: Partial<User>
  @Prop({ type: Boolean, default: false })
  has_content: boolean;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Block' })
  content: string[];
}
export type WorkspaceDocument = Workspace & Document;
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
