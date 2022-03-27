import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import {
  Heading1BlockInterface,
  Heading1Interface,
} from 'src/block/interfaces';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { RichTextSchema } from '../common/rich-text.schema';
export type Heading1Document = Heading1 & Document;
export type Heading1BlockDocument = Heading1Block & Document;

@Schema()
export class Heading1 implements Heading1Interface {
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichTextInterface[];
  @Prop()
  color: string;
}

export class Heading1Block implements Heading1BlockInterface {
  object: string;
  id: string;
  type: string;
  created_time: string;
  updated_by: string; //TODO: Partial<User>
  last_edited_time: string;
  has_children: boolean;
  @Prop({ type: Heading1, required: true })
  heading_1: Heading1;
}

export const Heading1Schema = SchemaFactory.createForClass(Heading1);

export const Heading1BlockSchema = SchemaFactory.createForClass(Heading1Block);
