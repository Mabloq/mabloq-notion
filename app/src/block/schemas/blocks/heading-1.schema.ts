import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { RichText, RichTextSchema } from '../common/rich-text.schema';
export type Heading1Document = Heading1 & Document;
export type Heading1BlockDocument = Heading1Block & Document;

@Schema()
export class Heading1 {
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichText[];
  @Prop()
  color: string;
}

export class Heading1Block {
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
