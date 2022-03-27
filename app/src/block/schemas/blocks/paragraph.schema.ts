import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import {
  BlockInterface,
  ParagraphInterface,
  ParagraphBlockInterface,
  BaseBlockInterface,
} from 'src/block/interfaces';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { Block, BlockSchema } from '../block.schema';
import { RichText, RichTextSchema } from '../common/rich-text.schema';
export type ParagraphDocument = Paragraph & Document;
export type ParagraphBlockDocument = ParagraphBlock & Document;

@Schema({ _id: false })
export class Paragraph implements ParagraphInterface {
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichTextInterface[];
  @Prop({ required: false })
  color: string;
  @Prop({ type: BlockSchema, required: false })
  children: BlockInterface[];
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);

@Schema({ _id: false })
export class ParagraphBlock implements ParagraphBlockInterface {
  @Prop({ type: ParagraphSchema, required: true })
  object: string;
  type: string;
  updated_by: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  children?: BlockInterface[];
  paragraph: ParagraphInterface;
}

export const ParagraphBlockSchema =
  SchemaFactory.createForClass(ParagraphBlock);
